"use client";
import React, { FC, useState } from "react";
import {
	Accordion,
	AccordionItem,
	Button,
	Card,
	CardHeader,
	Chip,
	Divider,
	Input,
	Textarea,
} from "@nextui-org/react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import AddLinkRoundedIcon from "@mui/icons-material/AddLinkRounded";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import toast from "react-hot-toast";

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
	const [error, setError] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [isCollapsed, setIsCollapsed] = useState(
		Array(courseContentData.length).fill(false)
	);

	const [activeSection, setActiveSection] = useState(1);

	const handleBackClick = () => {
		setActiveStep(activeStep - 1);
	};

	const handleNextClick = () => {
		if (
			courseContentData[courseContentData.length - 1].title === "" ||
			courseContentData[courseContentData.length - 1].description === "" ||
			courseContentData[courseContentData.length - 1].videoUrl === "" ||
			courseContentData[courseContentData.length - 1].links[0].title === "" ||
			courseContentData[courseContentData.length - 1].links[0].title === ""
		) {
			setError("Section can't be empty");
			setOpenSnackbar(true); // Set openSnackbar to true when error occurs
		} else {
			setActiveStep(activeStep + 1);
			handleCourseSubmit();
		}
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	const newContentHandler = (item: any) => {
		if (
			item.title === "" ||
			item.description === "" ||
			item.videoUrl === "" ||
			item.links[0].title === "" ||
			item.links[0].url === "" ||
			item.videoLength === ""
		) {
			setError("Please fill all fields first!");
			setOpenSnackbar(true); // Set openSnackbar to true when error occurs
		} else {
			let newVideoSection = "";
			if (courseContentData.length > 0) {
				const lastVideoSection =
					courseContentData[courseContentData.length - 1].videoSection;

				// use last videoSection if avaliable else use user input

				if (lastVideoSection) {
					newVideoSection = lastVideoSection;
				}
			}

			const newContent = {
				videoUrl: "",
				title: "",
				description: "",
				videoSection: newVideoSection,
				videoLength: "",

				links: [{ title: "", url: "" }],
			};

			setCourseContentData([...courseContentData, newContent]);
		}
	};

	const handleCollapseToggle = (index: number) => {
		const updatedCOllapsed = [...isCollapsed];
		updatedCOllapsed[index] = !updatedCOllapsed[index];
		setIsCollapsed(updatedCOllapsed);
	};
	const handleRemoveLink = (index: number, linkIndex: number) => {
		const updatedData = [...courseContentData];
		updatedData[index].links.splice(linkIndex, 1);
		setCourseContentData(updatedData);
	};
	const handleAddLink = (index: number) => {
		const updatedData = [...courseContentData];
		const updatedLinks = [...updatedData[index].links]; // Create a copy of links array
		updatedLinks.push({ title: "", url: "" }); // Add new link
		updatedData[index] = { ...updatedData[index], links: updatedLinks }; // Update the links array in the object
		setCourseContentData(updatedData);
	};

	const addNewSection = () => {
		if (
			courseContentData[courseContentData.length - 1].title === "" ||
			courseContentData[courseContentData.length - 1].description === "" ||
			courseContentData[courseContentData.length - 1].videoUrl === "" ||
			courseContentData[courseContentData.length - 1].links[0].title === "" ||
			courseContentData[courseContentData.length - 1].links[0].url === ""
		) {
			toast.error("Please fill all the fields first!");
			return;
		}

		setActiveSection(activeSection + 1);

		const newContent = {
			videoUrl: "",
			title: "",
			description: "",
			videoLength: "",
			videoSection: `Untitled Section ${activeSection}`,
			links: [{ title: "", url: "" }],
		};

		setCourseContentData([...courseContentData, newContent]);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
	};

	const handleOptions = () => {
		if (
			courseContentData[courseContentData.length - 1].title === "" ||
			courseContentData[courseContentData.length - 1].description === "" ||
			courseContentData[courseContentData.length - 1].videoUrl === "" ||
			courseContentData[courseContentData.length - 1].links[0].title === "" ||
			courseContentData[courseContentData.length - 1].links[0].url === ""
		) {
			toast.error("Section can't be empty!");
		} else {
			// setActive(active + 1);
			handleCourseSubmit();
			setActiveSection(activeSection + 1);
		}
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
							<Card className='md:max-w-[750px]  drop-shadow-lg  '>
								<CardHeader className='flex gap-3'>
									<div
										className={`w-full p-4 ${
											showSectionInput ? "mt-10" : "mb-0"
										}`}
										key={index}
									>
										{showSectionInput && (
											<>
												<div className='flex justify-between gap-1 mb-6'>
													<Input
														labelPlacement='outside'
														className={` ${
															item.videoSection === "Untitled Section"
														} border-none `}
														type='text'
														variant='underlined'
														required
														value={item.videoSection}
														onChange={(e: any) => {
															const updatedData = [...courseContentData];
															updatedData[index].videoSection = e.target.value;
															setCourseContentData(updatedData);
														}}
													/>

													<EditRoundedIcon className='cursor-pointer flex ' />
												</div>
											</>
										)}
										<div className='flex  md:min-w-[900px]   gap-48  items-center justify-between my-0'>
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
												<div className='flex justify-end'></div>
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
													className='cursor-pointer'
													onClick={() => handleCollapseToggle(index)}
												/>
											</div>
										</div>
										{!isCollapsed[index] && (
											<>
												<div className='flex flex-col gap-4'>
													<Input
														labelPlacement='outside'
														label='Title'
														type='text'
														variant='bordered'
														placeholder='Project Plan...'
														required
														value={item.title}
														onChange={(e: any) => {
															const updatedData = [...courseContentData];
															updatedData[index].title = e.target.value;
															setCourseContentData(updatedData);
														}}
													/>

													<Input
														labelPlacement='outside'
														type='text'
														label='Video Url'
														variant='bordered'
														placeholder='kldjl'
														required
														value={item.videoUrl}
														onChange={(e: any) => {
															const updatedData = [...courseContentData];
															updatedData[index].videoUrl = e.target.value;
															setCourseContentData(updatedData);
														}}
													/>
													{/* <Input
														labelPlacement='outside'
														type='number'
														label='Video Length  (in minutes)'
														variant='bordered'
														placeholder='20'
														required
														value={item.videoLength}
														onChange={(e) => {
															const updatedData = [...courseContentData];
															updatedData[index].videoLength = e.target.value;
															setCourseContentData(updatedData);
														}}
													/> */}
													<label
													// className={styles.label}
													>
														Video Length (in minutes)
													</label>
													<input
														type='number'
														placeholder='20'
														// className={`${styles.input}`}
														className='border-2 rounded-2xl h-12 p-3  bg-transparent'
														value={item.videoLength}
														onChange={(e) => {
															const updatedData = [...courseContentData];
															updatedData[index].videoLength = e.target.value;
															setCourseContentData(updatedData);
														}}
													/>

													<Textarea
														variant='bordered'
														label='Course Description'
														labelPlacement='outside'
														required
														placeholder='Write something amazing...'
														className='col-span-12 md:col-span-6 mb-6 md:mb-0'
														value={item.description}
														onChange={(e: any) => {
															const updatedData = [...courseContentData];
															updatedData[index].description = e.target.value;
															setCourseContentData(updatedData);
														}}
													/>
												</div>

												{item?.links.map((link: any, linkIndex: number) => (
													<>
														<div className='flex justify-between my-10'>
															<label>Link {linkIndex + 1}</label>
															<DeleteRoundedIcon
																className={`${
																	linkIndex === 0
																		? "cursor-no-drop"
																		: "cursor-pointer"
																} `}
																onClick={() =>
																	linkIndex === 0
																		? null
																		: handleRemoveLink(index, linkIndex)
																}
															/>
														</div>

														<div className='gap-3'>
															<Input
																labelPlacement='outside'
																type='text'
																label='Source Code '
																variant='bordered'
																placeholder='Source Code... {Link Title}'
																required
																className='cursor-no-drop my-10 '
																value={link.title}
																onChange={(e: any) => {
																	const updatedData = [...courseContentData];
																	updatedData[index].links[linkIndex].title =
																		e.target.value;
																	setCourseContentData(updatedData);
																}}
															/>
															<Input
																labelPlacement='outside'
																type='text'
																label='Source Code  URL '
																variant='bordered'
																placeholder='Source Code... {Link URL}'
																required
																className='cursor-no-drop'
																value={link.url}
																onChange={(e: any) => {
																	const updatedData = [...courseContentData];
																	updatedData[index].links[linkIndex].url =
																		e.target.value;
																	setCourseContentData(updatedData);
																}}
															/>
														</div>
													</>
												))}

												<div className='flex justify-start cursor-pointer my-4 '>
													<Chip
														onClick={() => handleAddLink(index)}
														startContent={<AddLinkRoundedIcon />}
														variant='faded'
														color='primary'
													>
														Add link
													</Chip>
												</div>
											</>
										)}

										<Divider />

										{/*  add new content */}

										{index === courseContentData.length - 1 && (
											<div className='flex justify-start cursor-pointer my-4 '>
												<Chip
													onClick={(e: any) => newContentHandler(item)}
													startContent={<AddRoundedIcon />}
													size='lg'
													variant='shadow'
													color='primary'
												>
													Add New Content
												</Chip>
											</div>
										)}
									</div>
								</CardHeader>
							</Card>
						</>
					);
				})}

				<Divider className='my-4' />

				<br />
				<div
					className='flex justify-start cursor-pointer my-4 ml-2 '
					onClick={() => addNewSection()}
				>
					<Chip
						startContent={<AddRoundedIcon />}
						size='lg'
						variant='shadow'
						color='primary'
					>
						Add New Section
					</Chip>
				</div>
			</form>

			<Divider className='my-4' />
			<Divider className='my-4' />

			<div className='flex justify-between  mx-6'>
				<Button
					color='danger'
					variant='flat'
					className='px-8'
					onClick={handleBackClick}
				>
					Back
				</Button>
				<Button
					color='danger'
					variant='flat'
					className='px-8'
					onClick={handleNextClick}
				>
					Next
				</Button>
			</div>

			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000}
				onClose={handleCloseSnackbar}
				anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
			>
				<MuiAlert
					elevation={6}
					variant='filled'
					severity='error'
					onClose={handleCloseSnackbar}
				>
					{error}
				</MuiAlert>
			</Snackbar>
		</div>
	);
};

export default CourseContent;
