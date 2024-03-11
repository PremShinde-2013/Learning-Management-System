import React, { FC, useState } from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

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
	const [isCollapsed, setIsCollapsed] = useState(
		Array(courseContentData.length).fill(false)
	);

	const [activeSection, setActiveSection] = useState(1);

	const handleCollapseToggle = (index: number) => {
		const updatedCOllapsed = [...isCollapsed];
		updatedCOllapsed[index] = !updatedCOllapsed[index];
		setIsCollapsed(updatedCOllapsed);
	};

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

					return (
						<>
							<div
								className={`w-full p-4 ${showSectionInput ? "mt-10" : "mb-0"}`}
							>
								<div className='flex w-full items-center justify-between my-0'>
									{isCollapsed[index] ? (
										<>
											{item.title ? (
												<p>
													{index + 1}.{item.title}
												</p>
											) : (
												<></>
											)}
										</>
									) : (
										<div></div>
									)}

									{/* arrow button  for collasped video content  */}
									<div className='flex items-center'>
										<DeleteRoundedIcon
											className={`mr-2  ${
												index > 0 ? "cursor-pointer" : "cursor-no-drop"
											}`}
											onClick={() => {
												if (index > 0) {
													const updatedData = [...courseContentData];
													updatedData.splice(index, 1);
													setCourseContentData(updatedData);
												}
											}}
										/>
										<ArrowDropDownRoundedIcon
											fontSize='large'
											style={{
												transform: isCollapsed[index]
													? "rotate(180deg)"
													: "rotate(0deg)",
											}}
											onClick={() => handleCollapseToggle(index)}
										/>
									</div>
								</div>
								{!isCollapsed[index] && (
									<>
										<div className='my-3'>
											<label>Video Title</label>
										</div>
									</>
								)}
							</div>
						</>
					);
				})}
			</form>
		</div>
	);
};

export default CourseContent;
