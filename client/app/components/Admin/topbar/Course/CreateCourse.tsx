"use client";
import React, { useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";

type Props = {};

const CreateCourse = (props: Props) => {
	const [activeStep, setActiveStep] = useState(1);
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
	const handleSubmit = async () => {};
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
