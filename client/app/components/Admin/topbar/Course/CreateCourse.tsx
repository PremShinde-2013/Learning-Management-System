"use client";
import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useCreateCourseMutation } from "@/redux/features/courses/coursesApi";
import { redirect } from "next/navigation";

type Props = {};

const CreateCourse = (props: Props) => {
	const [createCourse, { isLoading, isSuccess, error }] =
		useCreateCourseMutation();

	useEffect(() => {
		if (isSuccess) {
			console.log("course created successfully");
			redirect("/admin/all-courses");
		}
		if (error) {
			if ("data" in error) {
				const errorMessage = error as any;
				console.log(errorMessage.data.message);
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
		//   Format benefits array

		const formattedBenefits = benefits.map((benefit) => ({
			title: benefit.title,
		}));

		// format prerequisites array

		const formattedPrerequisites = prerequisites.map((prerequisites) => ({
			title: prerequisites.title,
		}));

		// format course content array
		const formattedCourseContentData = courseContentData.map(
			(CourseContent) => ({
				videoUrl: CourseContent.videoUrl,
				title: CourseContent.title,
				description: CourseContent.description,
				videoSection: CourseContent.videoSection,
				links: CourseContent.links.map((link) => ({
					title: link.title,
					url: link.url,
				})),
				suggestion: CourseContent.suggestion,
			})
		);

		// prepare our data object

		const data = {
			name: courseInfo.name,
			description: courseInfo.description,
			price: courseInfo.price,
			estimatedPrice: courseInfo.estimatedPrice,
			tags: courseInfo.tags,
			thumbnail: courseInfo.thumbnail,
			level: courseInfo.level,
			demoUrl: courseInfo.demoUrl,
			totalVideos: courseContentData.length,
			benefits: formattedBenefits,
			prerequisites: formattedPrerequisites,
			CourseContent: formattedCourseContentData,
		};

		setCourseData(data);
	};

	const handleCourseCreate = async (e: any) => {
		const data = courseData;

		await createCourse(data);
	};

	return (
		<div className='flex md:flex-row flex-col relative'>
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
