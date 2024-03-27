import Image from "next/image";
import { format } from "timeago.js";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import socketIO from "socket.io-client";
import CoursePlayer from "@/app/utils/CoursePlayer";
import {
	useAddAnswerInQuestionMutation,
	useAddNewQuestionMutation,
	useAddReplyInReviewMutation,
	useAddReviewInCourseMutation,
	useGetCourseDetailsQuery,
} from "@/redux/features/courses/coursesApi";
import Ratings from "@/app/utils/Ratings";
import { Button } from "@nextui-org/button";
import {
	Avatar,
	Card,
	CardBody,
	Input,
	Tab,
	Tabs,
	Textarea,
} from "@nextui-org/react";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type CourseContentMediaProps = {
	data: any;
	id: string;
	activeVideo: number;
	setActiveVideo: (activeVideo: number) => void;
	user: any;
	refetch: any;
};

const CourseContentMedia = ({
	data,
	id,
	activeVideo,
	setActiveVideo,
	user,
	refetch,
}: CourseContentMediaProps) => {
	interface TabData {
		id: number;
		label: string;
		content: React.ReactNode;
	}

	const [activeBar, setactiveBar] = useState(0);

	const [question, setQuestion] = useState("");

	const [review, setReview] = useState("");

	const [rating, setRating] = useState(1);

	const [answer, setAnswer] = useState("");

	const [questionId, setQuestionId] = useState("");

	const [reply, setReply] = useState("");

	const [reviewId, setReviewId] = useState("");

	const [isReviewReply, setIsReviewReply] = useState(false);

	const [
		addNewQuestion,
		{ isSuccess, error, isLoading: questionCreationLoading },
	] = useAddNewQuestionMutation();

	const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
		id,
		{ refetchOnMountOrArgChange: true }
	);

	const [
		addAnswerInQuestion,
		{
			isSuccess: answerSuccess,
			error: answerError,
			isLoading: answerCreationLoading,
		},
	] = useAddAnswerInQuestionMutation();

	const course = courseData?.course;

	const [
		addReviewInCourse,
		{
			isSuccess: reviewSuccess,
			error: reviewError,
			isLoading: reviewCreationLoading,
		},
	] = useAddReviewInCourseMutation();

	const [
		addReplyInReview,
		{
			isSuccess: replySuccess,
			error: replyError,
			isLoading: replyCreationLoading,
		},
	] = useAddReplyInReviewMutation();

	const isReviewExists = course?.reviews?.find(
		(item: any) => item.user._id === user._id
	);

	const handleQuestion = () => {
		if (question.length === 0) {
			toast.error("Question can't be empty");
		} else {
			addNewQuestion({
				question,
				courseId: id,
				contentId: data[activeVideo]._id,
			});
		}
	};

	useEffect(() => {
		if (isSuccess) {
			setQuestion("");
			refetch();
			socketId.emit("notification", {
				title: `New Question Received`,
				message: `You have a new question in ${data[activeVideo].title}`,
				userId: user._id,
			});
		}

		if (answerSuccess) {
			setAnswer("");
			refetch();
			if (user.role !== "admin") {
				socketId.emit("notification", {
					title: `New Reply Received`,
					message: `You have a new reply in ${data[activeVideo].title}`,
					userId: user._id,
				});
			}
		}

		if (error && "data" in error) {
			const errorMessage = error as any;
			toast.error(errorMessage.data.message);
		}

		if (answerError && "data" in answerError) {
			const errorMessage = answerError as any;
			toast.error(errorMessage.data?.message || "An unexpected error occurred");
		}

		if (reviewSuccess) {
			setReview("");
			setRating(1);
			courseRefetch();
			socketId.emit("notification", {
				title: `New Question Received`,
				message: `You have a new question in ${data[activeVideo].title}`,
				userId: user._id,
			});
		}

		if (reviewError && "data" in reviewError) {
			const errorMessage = reviewError as any;
			toast.error(errorMessage.data?.message || "An unexpected error occurred");
		}

		if (replySuccess) {
			setReply("");
			courseRefetch();
		}

		if (replyError && "data" in replyError) {
			const errorMessage = replyError as any;
			toast.error(errorMessage.data?.message || "An unexpected error occurred");
		}
	}, [
		isSuccess,
		error,
		answerSuccess,
		answerError,
		reviewSuccess,
		reviewError,
		replySuccess,
		replyError,
		refetch,
		data,
		activeVideo,
		user._id,
		user.role,
		courseRefetch,
	]);

	const handleAnswerSubmit = () => {
		addAnswerInQuestion({
			answer,
			courseId: id,
			contentId: data[activeVideo]._id,
			questionId,
		});
	};

	const handleReviewSubmit = async () => {
		if (review.length === 0) {
			toast.error("Review can't be empty");
		} else {
			try {
				await addReviewInCourse({ review, rating, courseId: id });
			} catch (error) {
				console.error("Error adding review:", error);
				toast.error("Failed to submit review");
			}
		}
	};

	const handleReviewReplySubmit = () => {
		if (!replyCreationLoading) {
			if (reply === "") {
				toast.error("Reply can't be empty");
			} else {
				addReplyInReview({ comment: reply, courseId: id, reviewId });
			}
		}
	};
	const [activeTab, setActiveTab] = useState<number>(0);
	const tabs: TabData[] = [
		{
			id: 0,
			label: "Overview",
			content: (
				<p
					className='lg:text-xl text-base  font-medium
                '
				>
					{data[activeVideo]?.description}
				</p>
			),
		},
		{
			id: 1,
			label: "Resources",
			content: (
				<div>
					{data[activeVideo]?.links.map((item: any, index: number) => (
						<div className='mb-5' key={index}>
							<h2 className='lg:text-3xl text-base  mb-4  font-medium '>
								{item.title && `${item.title} :`}
							</h2>
							<a
								className='lg:text-xl text-base  mb-4  font-medium  text-blue-600'
								href={item.url}
							>
								{item.url}
							</a>
						</div>
					))}
				</div>
			),
		},
		{
			id: 2,
			label: "Q&A",
			content: (
				<>
					<div className='flex w-full'>
						<Avatar
							src={
								user.avatar
									? user.avatar.url
									: "https://res.cloudinary.com/kouroshrstn/image/upload/v1707293133/Avatars/avatar_dwjgxo.png"
							}
							isBordered
							alt=''
							className='w-[50px] h-[50px] rounded-full object-cover'
						/>
						<Textarea
							name=''
							value={question}
							onChange={(e) => setQuestion(e.target.value)}
							id=''
							cols={40}
							rows={5}
							placeholder='Write your question...'
							className=' p-2  mx-4'
						/>
					</div>
					<div className='w-full flex justify-end'>
						<Button
							color='primary'
							variant='flat'
							className={` mx-6 mt-5 ${
								questionCreationLoading && "cursor-not-allowed"
							}`}
							onClick={questionCreationLoading ? () => {} : handleQuestion}
						>
							Submit
						</Button>
					</div>
					<br />
					<br />
					<div className='w-full h-[1px] ' />
					<div>
						<CommentReply
							data={data}
							activeVideo={activeVideo}
							answer={answer}
							setAnswer={setAnswer}
							handleAnswerSubmit={handleAnswerSubmit}
							user={user}
							questionId={questionId}
							setQuestionId={setQuestionId}
							answerCreationLoading={answerCreationLoading}
						/>
					</div>
				</>
			),
		},
		{
			id: 3,
			label: "Reviews",
			content: (
				<div className='w-full'>
					<>
						{!isReviewExists && (
							<>
								<div className='flex w-full'>
									<Avatar
										src={
											user.avatar
												? user.avatar.url
												: "https://res.cloudinary.com/kouroshrstn/image/upload/v1707293133/Avatars/avatar_dwjgxo.png"
										}
										isBordered
										alt=''
										className='w-[50px] h-[50px] rounded-full object-cover'
									/>
									<div className='w-full'>
										<h5 className='pl-3 text-[20px] font-[500] dark:text-white text-black '>
											Give a Rating <span className='text-purple-600'>*</span>
										</h5>
										<div className='flex w-full ml-2 pb-3'>
											{[1, 2, 3, 4, 5].map((i) =>
												rating >= i ? (
													<StarRoundedIcon
														key={i}
														className='mr-1 cursor-pointer'
														color='warning'
														onClick={() => setRating(i)}
													/>
												) : (
													<StarBorderRoundedIcon
														key={i}
														className='mr-1 cursor-pointer'
														color='warning'
														onClick={() => setRating(i)}
													/>
												)
											)}
										</div>
										<Textarea
											name=''
											value={review}
											onChange={(e) => setReview(e.target.value)}
											id=''
											cols={40}
											rows={5}
											placeholder='Write your comment...'
											className='   mr-6'
										/>
									</div>
								</div>
								<div className='w-full flex justify-end'>
									<Button
										variant='flat'
										color='primary'
										className={`  mt-5  mr-2 ${
											reviewCreationLoading && "cursor-no-drop"
										}`}
										onClick={
											reviewCreationLoading ? () => {} : handleReviewSubmit
										}
									>
										Submit
									</Button>
								</div>
							</>
						)}
						<br />
						<div className='w-full h-[1px] bg-[#ffffff3b]' />
						<div className='w-full'>
							{(course?.reviews && [...course.reviews].reverse())?.map(
								(item: any, index: number) => {
									return (
										<div
											className='w-full my-5 dark:text-white text-black'
											key={index}
										>
											<div className='w-full flex'>
												<div>
													<Avatar
														src={
															item.user.avatar
																? item.user.avatar.url
																: "https://res.cloudinary.com/kouroshrstn/image/upload/v1707293133/Avatars/avatar_dwjgxo.png"
														}
														isBordered
														alt=''
														className='w-[50px] h-[50px] rounded-full object-cover'
													/>
												</div>
												<div className='ml-2'>
													<h1 className='text-[18px]'>{item?.user.name}</h1>
													<Ratings rating={item.rating} />
													<p>{item.comment}</p>
													<small>{format(item.createdAt)} •</small>
												</div>
											</div>
											{user.role === "admin" &&
												item.commentReplies.length === 0 && (
													<span
														className={` !ml-10 cursor-pointer`}
														onClick={() => {
															setIsReviewReply(true);
															setReviewId(item._id);
														}}
													>
														Add Reply
													</span>
												)}

											{isReviewReply && reviewId === item._id && (
												<div className='w-full flex relative'>
													<Input
														variant='flat'
														type='text'
														placeholder='Enter your reply...'
														value={reply}
														onChange={(e: any) => setReply(e.target.value)}
														className='mr-24 ml-8 mt-4'
													/>
													<Button
														variant='flat'
														color='primary'
														type='submit'
														className='absolute right-0 bottom-1'
														onClick={handleReviewReplySubmit}
													>
														Submit
													</Button>
												</div>
											)}

											{item.commentReplies.map((i: any, index: number) => (
												<div
													className='w-full flex 800px:ml-16 my-5'
													key={index}
												>
													<div className='w-[50px] h-[50px]'>
														<Avatar
															src={
																i.user.avatar
																	? i.user.avatar.url
																	: "https://res.cloudinary.com/kouroshrstn/image/upload/v1707293133/Avatars/avatar_dwjgxo.png"
															}
															isBordered
															alt=''
															className='w-[50px] h-[50px] rounded-full object-cover'
														/>
													</div>
													<div className='pl-2'>
														<div className='flex items-center'>
															<h5 className='text-[20px]'>{i.user.name}</h5>{" "}
															<VerifiedRoundedIcon className='text-[#0095F6] ml-2 text-[20px]' />
														</div>
														<p>{i.comment}</p>
														<small className='text-[#ffffff83]'>
															{format(i.createdAt)} •
														</small>
													</div>
												</div>
											))}
										</div>
									);
								}
							)}
						</div>
					</>
				</div>
			),
		},
	];

	return (
		<div className='w-[95%] 800px:w-[86%] py-4 m-auto'>
			<CoursePlayer
				title={data[activeVideo]?.title}
				videoUrl={data[activeVideo]?.videoUrl}
			/>
			<div className='w-full flex items-center justify-between my-3'>
				<Button
					variant='flat'
					color='primary'
					className={`    ${
						activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
					}`}
					onClick={() =>
						setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
					}
				>
					<ChevronLeftRoundedIcon className='' />
					Prev Lesson
				</Button>

				<Button
					variant='flat'
					color='primary'
					className={`${data.length - 1 === activeVideo && "!cursor-no-drop "}`}
					onClick={() =>
						setActiveVideo(
							data && data.length - 1 === activeVideo
								? activeVideo
								: activeVideo + 1
						)
					}
				>
					Next Lesson
					<ChevronRightRoundedIcon />
				</Button>
			</div>
			<h1 className='pt-2  font-medium  lg:text-3xl text-2xl '>
				{data[activeVideo].title}
			</h1>
			<br />
			<Card className='w-full p-4 flex items-center justify-between flex-row  '>
				<div className='flex w-full flex-col'>
					<Tabs aria-label='Dynamic tabs' items={tabs}>
						{(item) => (
							<Tab key={item.id} title={item.label}>
								<Card>
									<CardBody>{item.content}</CardBody>
								</Card>
							</Tab>
						)}
					</Tabs>
				</div>
			</Card>
			<br />
		</div>
	);
};

const CommentReply = ({
	data,
	activeVideo,
	answer,
	setAnswer,
	handleAnswerSubmit,
	questionId,
	setQuestionId,
	answerCreationLoading,
}: any) => {
	return (
		<div className='w-full my-3'>
			{data[activeVideo].questions.map((item: any, index: any) => (
				<CommentItem
					key={index}
					data={data}
					activeVideo={activeVideo}
					item={item}
					index={index}
					answer={answer}
					setAnswer={setAnswer}
					questionId={questionId}
					setQuestionId={setQuestionId}
					handleAnswerSubmit={handleAnswerSubmit}
					answerCreationLoading={answerCreationLoading}
				/>
			))}
		</div>
	);
};

const CommentItem = ({
	questionId,
	setQuestionId,
	item,
	answer,
	setAnswer,
	handleAnswerSubmit,
	answerCreationLoading,
}: any) => {
	const [replyActive, setReplyActive] = useState(false);
	return (
		<div className='my-4'>
			<div className='flex mb-2'>
				<div>
					<Avatar
						src={
							item.user.avatar
								? item.user.avatar.url
								: "https://res.cloudinary.com/kouroshrstn/image/upload/v1707293133/Avatars/avatar_dwjgxo.png"
						}
						isBordered
						alt=''
						className='w-[50px] h-[50px] rounded-full object-cover'
					/>
				</div>
				<div className='pl-3 '>
					<h5 className='text-[20px]'>{item?.user.name}</h5>
					<p>{item?.question}</p>
					<small>{item.createdAt ? format(item?.createdAt) : ""} •</small>
				</div>
			</div>
			<div className='w-full flex'>
				<span
					className='  cursor-pointer mr-2'
					onClick={() => {
						setReplyActive(!replyActive);
						setQuestionId(item._id);
					}}
				>
					{!replyActive
						? item.questionReplies.length === 0
							? "Add Reply"
							: "All Replies"
						: "Hide Replies"}
				</span>
				<MessageRoundedIcon />
				<span className='pl-1 mt-[-4px] cursor-pointer text-[#000000b8] dark:text-[#ffffff83]'>
					{item.questionReplies.length}
				</span>
			</div>

			{replyActive && questionId === item._id && (
				<>
					{item.questionReplies.map((item: any) => (
						<div
							className='w-full flex 800px:ml-16 my-5 text-black dark:text-white'
							key={item._id}
						>
							<div>
								<Avatar
									src={
										item.user.avatar
											? item.user.avatar.url
											: "https://res.cloudinary.com/kouroshrstn/image/upload/v1707293133/Avatars/avatar_dwjgxo.png"
									}
									isBordered
									alt=''
									className='w-[50px] h-[50px] rounded-full object-cover'
								/>
							</div>
							<div className='pl-3'>
								<div className='flex items-center'>
									<h5 className='text-[20px]'>{item.user.name}</h5>{" "}
									{item.user.role === "admin" && (
										<VerifiedRoundedIcon className='text-[#0095F6] ml-2 text-[20px]' />
									)}
								</div>
								<p>{item.answer}</p>
								<small>{format(item.createdAt)} •</small>
							</div>
						</div>
					))}
					<>
						<div className='w-full flex relative dark:text-white text-black'>
							<Input
								variant='flat'
								type='text'
								placeholder='Enter your answer...'
								value={answer}
								onChange={(e: any) => setAnswer(e.target.value)}
								className={`														mr-24 ml-8 mt-4
 ${answer === "" || (answerCreationLoading && "cursor-not-allowed")}`}
							/>
							<Button
								variant='flat'
								color='primary'
								type='submit'
								className='absolute right-0 bottom-1'
								onClick={handleAnswerSubmit}
								disabled={answer === "" || answerCreationLoading}
							>
								Submit
							</Button>
						</div>
						<br />
					</>
				</>
			)}
		</div>
	);
};

export default CourseContentMedia;
