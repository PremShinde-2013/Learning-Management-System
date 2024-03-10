import React, { FC, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";

type Props = {
	activeStep: number;
	setActiveStep: (activeStep: number) => void;
	courseContentData: any;
	setCourseContentData: (courseContentData: any) => void;
	handleSubmit: any;
};

const CourseContent: FC<Props> = ({
	courseContentData,
	setCourseContentData,
	activeStep,
	setActiveStep,
	handleSubmit: handleCourseSubmit,
}) => {
	const [isCollapses, setIsCollapses] = useState(
		Array(courseContentData.length).fill(false)
	);

	const [activeSection, setActiveSection] = useState(1);

	const handleSubmit = (e: any) => {
		e.preventDefault();
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				{courseContentData?.map((item: any, index: number) => {
					const showSectionInput =
						index === 0 ||
						item.videoSection !== courseContentData[index - 1].videoSection;

					return <></>;
				})}
			</form>
		</div>
	);
};

export default CourseContent;
