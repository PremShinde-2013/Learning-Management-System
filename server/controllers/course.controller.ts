import { NextFunction, Request, Response, response } from "express";
import { catchAsyncErrors } from "../middelware/catchAsyncErrors";

import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createCourse, getAllCoursesService } from "../services/course.service";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";
import { IUser } from "../models/user.model";
import mongoose from "mongoose";
import path from "path";
import ejs, { Template } from "ejs";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.Model";
import axios from "axios";

// Now you can use ejs in your TypeScript code

declare module "express" {
	interface Request {
		user?: IUser;
	}
}

// upload course

export const uploadCourse = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = req.body;
			const thumbnail = data.thumbnail;
			if (thumbnail) {
				const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
					folder: "courses",
				});
				data.thumbnail = {
					public_id: myCloud.public_id,
					url: myCloud.secure_url,
				};
			}
			createCourse(data, res, next);
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

// edit course

export const editCourse = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const data = req.body;
			const thumbnail = data.thumbnail;
			if (thumbnail) {
				await cloudinary.v2.uploader.destroy(thumbnail.public_id);
				const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
					folder: "courses",
				});
				data.thumbnail = {
					public_id: myCloud.public_id,
					url: myCloud.secure_url,
				};
			}
			const courseId = req.params.id;
			const course = await CourseModel.findByIdAndUpdate(
				courseId,
				{
					$set: data,
				},
				{
					new: true,
				}
			);
			res.status(201).json({
				success: true,
				course,
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

// get single course **** without purchacing

export const getSingleCourse = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const courseId = req.params._id;
			const isCacheExist = await redis.get(courseId);

			if (isCacheExist) {
				const course = JSON.parse(isCacheExist);
				res.status(200).json({
					success: true,
					course,
				});
			} else {
				const course = await CourseModel.findById(req.params.id).select(
					"-courseData.videoUrl -courseData.suggestion -courseData.questions  -courseData.links"
				);
				await redis.set(courseId, JSON.stringify(course), "EX", 604800); // 7 divas
				res.status(200).json({
					success: true,
					course,
				});
			}
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);
// get all course **** without purchacing

export const getAllCourse = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const isCacheExist = await redis.get("allCourses");

			if (isCacheExist) {
				const course = JSON.parse(isCacheExist);
				res.status(200).json({
					success: true,
					course,
				});
			} else {
				const course = await CourseModel.find().select(
					"-courseData.videoUrl -courseData.suggestion -courseData.questions  -courseData.links"
				);
				await redis.set("allCourses", JSON.stringify(course));

				res.status(200).json({
					success: true,
					course,
				});
			}
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

// get courses content   **** for valid users

export const getCourseByUser = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userCourseList = req.user?.courses;
			const courseId = req.params.id;

			const courseExists = userCourseList?.find(
				(course: any) => course._id.toString() === courseId.toString()
			);

			if (!courseExists) {
				return next(
					new ErrorHandler("you are not eligible to access this course", 404)
				);
			}
			const course = await CourseModel.findById(courseId);
			const content = course?.courseData;
			res.status(200).json({
				success: true,
				course,
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

// add questions in course

interface IAddQuestionData {
	question: string;
	courseId: string;
	contentId: string;
}

export const addQuestion = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { question, courseId, contentId }: IAddQuestionData = req.body;
			const course = await CourseModel.findById(courseId);

			if (!mongoose.Types.ObjectId.isValid(contentId)) {
				return next(new ErrorHandler("Invalid Content", 400));
			}

			const courseContent = course?.courseData?.find((item: any) =>
				item._id.equals(contentId)
			);
			if (!courseContent) {
				return next(new ErrorHandler("Invalid content id", 500));
			}

			// create new question object
			const newQuestion: any = {
				user: req.user,
				question,
				questionReplies: [],
			};

			//  add this question to our course content
			courseContent.questions.push(newQuestion);

			await NotificationModel.create({
				user: req.user?._id,
				title: "New Question Received",
				message: `You have new Question in ${courseContent.title}`,
			});

			// save updated course
			await course?.save();

			res.status(200).json({
				success: true,
				course,
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

// add ans in course question

interface IAddAnswerData {
	answer: string;
	courseId: string;
	contentId: string;
	questionId: string;
}

export const addAnswer = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { answer, courseId, contentId, questionId }: IAddAnswerData =
				req.body;
			const course = await CourseModel.findById(courseId);

			if (!mongoose.Types.ObjectId.isValid(contentId)) {
				return next(new ErrorHandler("Invalid Content", 400));
			}

			const courseContent = course?.courseData?.find((item: any) =>
				item._id.equals(contentId)
			);
			if (!courseContent) {
				return next(new ErrorHandler("Invalid content id", 500));
			}

			// create new question object
			const question = courseContent?.questions?.find((item: any) =>
				item._id.equals(questionId)
			);

			if (!question) {
				return next(new ErrorHandler("Invalid question id", 500));
			}

			// create a new ans object

			const newAnswer: any = {
				user: req.user,
				answer,
			};

			// add this ans to our course
			question.questionReplies.push(newAnswer);

			// save updated course
			await course?.save();

			if (req.user?._id === question.user._id) {
				// create notification
				await NotificationModel.create({
					user: req.user?._id,
					title: "New Question Reply Received",
					message: `You have new Question reply in ${course?.name}`,
				});
			} else {
				const data = {
					name: question.user.name,
					title: courseContent.title,
				};
				const html = await ejs.renderFile(
					path.join(__dirname, "../mails/question-reply.ejs"),
					data
				);

				try {
					await sendMail({
						email: question.user.email,
						subject: "Question Reply ",
						template: "question-reply.ejs",
						data,
					});
				} catch (error: any) {
					return next(new ErrorHandler(error.message, 500));
				}
			}
			res.status(200).json({
				success: true,
				course,
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

// add review in course

interface IAddReviewData {
	review: string;
	rating: number;
	userId: string;
}

export const addReview = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const userCourseList = req.user?.courses;
			const courseId = req.params.id;

			// check if courseId already exist in usercourselist based on _id

			const courseExists = userCourseList?.some(
				(course: any) => course._id.toString() === courseId.toString()
			);

			if (!courseExists) {
				return next(
					new ErrorHandler("You are not eligible to access this course", 404)
				);
			}

			const course = await CourseModel.findById(courseId);
			const { review, rating } = req.body as IAddReviewData;

			const reviewData: any = {
				user: req.user,
				Comment: review,
				rating,
			};

			course?.reviews.push(reviewData);

			let avg = 0;

			course?.reviews.forEach((rev: any) => {
				avg += rev.rating;
			});

			if (course) {
				course.rating = avg / course.reviews.length;
			}

			await course?.save();

			const notification = {
				title: "new Review Received",
				message: `${req.user?.name} has given a review in ${course?.name}`,
			};

			// create notification

			res.status(200).json({
				success: true,
				course,
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

// add reply in review

interface IAddReviewData {
	comment: string;
	courseId: string;
	reviewId: string;
}

export const addReplyToReview = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { comment, courseId, reviewId } = req.body as IAddReviewData;

			const course = await CourseModel.findById(courseId);

			if (!course) {
				return next(new ErrorHandler("Course not found", 404));
			}

			const review = course?.reviews?.find(
				(rev: any) => rev._id.toString() === reviewId
			);

			if (!review) {
				return next(new ErrorHandler("Review not found", 404));
			}

			const replyData: any = {
				user: req.user,
				comment,
			};

			if (!review.commentReplies) {
				review.commentReplies = [];
			}

			review.commentReplies?.push(replyData);
			await course?.save();

			res.status(200).json({
				success: true,
				course,
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 500));
		}
	}
);

// get all users ******* only for admin

export const getAllCources = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			getAllCoursesService(res);
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 400));
		}
	}
);

// delete course   ***** only for admin

export const deleteCourse = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { id } = req.params;
			const course = await CourseModel.findById(id);

			if (!course) {
				return next(new ErrorHandler("User not found", 404));
			}

			await course.deleteOne({ id });

			await redis.del(id);

			res.status(200).json({
				success: true,
				message: "Course deleted successfully",
			});
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 400));
		}
	}
);

// generate video url

export const generateVideoUrl = catchAsyncErrors(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const { videoId } = req.body;
			const response = await axios.post(
				`https://dev.vdocipher.com/api/videos/${videoId}/otp`,
				{ ttl: 300 },
				{
					headers: {
						Accept: "application/json",
						"Content-Type": "application/json",
						Authorization: `Apisecret ${process.env.VDOCIPHER_API_SECRET}`,
					},
				}
			);
			res.json(response.data);
		} catch (error: any) {
			return next(new ErrorHandler(error.message, 400));
		}
	}
);
