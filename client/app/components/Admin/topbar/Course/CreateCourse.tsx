"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/redux/features/courses/coursesApi";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

type Props = {};

const CreateCourse = ({}: Props) => {
	const [createCourse, { isLoading, isSuccess, error }] =
		useCreateCourseMutation();

	useEffect(() => {
		if (isSuccess) {
			toast.success("course created successfully");
			redirect("/admin/all-courses");
		}
		if (error) {
			if ("data" in error) {
				const errorMessage = error as any;
				// console.log(errorMessage.data.message);
				toast.error(errorMessage.data.message);
			}
		}
	}, [isLoading, isSuccess, error]);

	const [activeStep, setActiveStep] = useState(0);
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleReset = () => {
		setActiveStep(0);
	};

	const [courseInfo, setCourseInfo] = useState({
		name: "",
		description: "",
		price: "",
		estimatedPrice: "",
		tags: "",
		level: "",
		categories: "",
		demoUrl: "",
		thumbnail: "",
	});
	const [benefits, setBenefits] = useState([{ title: "" }]);
	const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
	const [courseContentData, setCourseContentData] = useState([
		{
			videoUrl: "",
			title: "",
			description: "",
			videoSection: "Untitled Section",
			videoLength: "",
			links: [
				{
					title: "",
					url: "",
				},
			],
			suggestion: "",
		},
	]);

	const [courseData, setCourseData] = useState({});
	const handleSubmit = async () => {
		const formattedBenefits = benefits.map((benefit) => ({
			title: benefit.title,
		}));

		const formattedPrerequisites = prerequisites.map((prerequisite) => ({
			title: prerequisite.title,
		}));

		const formattedCourseContentData = courseContentData.map(
			(courseContent) => ({
				videoUrl: courseContent.videoUrl,
				title: courseContent.title,
				description: courseContent.description,
				videoLength: courseContent.videoLength,
				videoSection: courseContent.videoSection,
				links: courseContent.links.map((link) => ({
					title: link.title,
					url: link.url,
				})),
				suggestion: courseContent.suggestion,
			})
		);

		const data = {
			name: courseInfo.name,
			description: courseInfo.description,
			categories: courseInfo.categories,
			price: courseInfo.price,
			estimatedPrice: courseInfo.estimatedPrice,
			tags: courseInfo.tags,
			thumbnail: courseInfo.thumbnail,
			level: courseInfo.level,
			demoUrl: courseInfo.demoUrl,
			totalVideos: courseContentData.length,
			benefits: formattedBenefits,
			prerequisites: formattedPrerequisites,
			courseData: formattedCourseContentData,
		};
		setCourseData(data);
	};
	const handleCourseCreate = async (e: any) => {
		if (!isLoading) {
			await createCourse(courseData);
		}
	};

	console.log(courseInfo);
	console.log(courseData);

	return (
		<div className='flex md:flex-row flex-col relative ml-2'>
			{activeStep === 0 && (
				<CourseInformation
					courseInfo={courseInfo}
					setCourseInfo={setCourseInfo}
					activeStep={activeStep}
					setActiveStep={setActiveStep}
				/>
			)}

			{activeStep === 1 && (
				<CourseData
					benefits={benefits}
					setBenefits={setBenefits}
					prerequisites={prerequisites}
					setPrerequisities={setPrerequisites}
					activeStep={activeStep}
					setActiveStep={setActiveStep}
				/>
			)}
			{activeStep === 2 && (
				<CourseContent
					courseContentData={courseContentData}
					setCourseContentData={setCourseContentData}
					activeStep={activeStep}
					setActiveStep={setActiveStep}
					handleSubmit={handleSubmit}
				/>
			)}
			{activeStep === 3 && (
				<CoursePreview
					courseData={courseData}
					handleCourseCreate={handleCourseCreate}
					activeStep={activeStep}
					setActiveStep={setActiveStep}
				/>
			)}
			<div className='md:fixed md:absolute md:top-0 md:right-0 md:static w-full md:w-auto'>
				<CourseOptions
					activeStep={activeStep}
					handleNext={handleNext}
					handleBack={handleBack}
					handleReset={handleReset}
				/>
			</div>
		</div>
	);
};

export default CreateCourse;
