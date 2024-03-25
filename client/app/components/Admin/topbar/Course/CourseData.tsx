"use client";
import { AddCircleOutlineRounded } from "@mui/icons-material";
import { Button } from "@nextui-org/button";
import { Textarea } from "@nextui-org/input";
import AddBoxRoundedIcon from "@mui/icons-material/AddBoxRounded";
import {
	Card,
	CardHeader,
	CardBody,
	Divider,
	CardFooter,
	Input,
	Link,
} from "@nextui-org/react";
// import Link from "next/link";
import React, { FC, useState } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

type Props = {
	benefits: { title: string }[];
	setBenefits: (benefis: { title: string }[]) => void;
	prerequisites: { title: string }[];
	setPrerequisities: (prerequisites: { title: string }[]) => void;
	activeStep: number;
	setActiveStep: (active: number) => void;
};

const CourseData: FC<Props> = ({
	benefits,
	setBenefits,
	prerequisites,
	setPrerequisities,
	activeStep,
	setActiveStep,
}) => {
	const [error, setError] = useState("");
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const handleBenefitChanges = (index: number, value: any) => {
		const updatedBenefits = [...benefits];
		updatedBenefits[index].title = value;
		setBenefits(updatedBenefits);
	};
	const handlePrerequisitesChanges = (index: number, value: any) => {
		const updatedPrerequisites = [...prerequisites];
		updatedPrerequisites[index].title = value;
		setPrerequisities(updatedPrerequisites);
	};

	const handleAddBenefit = () => {
		setBenefits([...benefits, { title: "" }]);
	};
	const handleAddPrerequisites = () => {
		setPrerequisities([...prerequisites, { title: "" }]);
	};

	const validateFields = () => {
		for (const benefit of benefits) {
			if (!benefit.title.trim()) {
				setError("Please fill in all fields.");
				return false;
			}
		}
		for (const prerequisite of prerequisites) {
			if (!prerequisite.title.trim()) {
				setError("Please fill in all fields.");
				return false;
			}
		}
		return true;
	};

	const handleNextClick = () => {
		if (validateFields()) {
			// Proceed to the next step
			setActiveStep(activeStep + 1);
		} else {
			setOpenSnackbar(true); // Display snackbar if validation fails
		}
	};
	const handleBackClick = () => {
		setActiveStep(activeStep - 1);
	};

	const handleCloseSnackbar = () => {
		setOpenSnackbar(false);
	};

	return (
		<form>
			<Card className='md:min-w-[750px]'>
				<CardHeader className='flex gap-3'>
					<label className='my-4'>
						What are benefits for students in this course?
					</label>
				</CardHeader>
				<CardBody className='gap-3'>
					{benefits.map((benefits: any, index: number) => (
						<Input
							key={index}
							type='text'
							variant='bordered'
							required
							value={benefits.title}
							placeholder='You will lbe able to learn  FUll stack Lms Platform'
							onChange={(e: any) => handleBenefitChanges(index, e.target.value)}
						/>
					))}
					<AddBoxRoundedIcon
						className='cursor-pointer'
						onClick={handleAddBenefit}
					/>
				</CardBody>

				<CardHeader className='flex gap-3'>
					<label className='my-4'>
						What are prerequisites for starting this course?
					</label>
				</CardHeader>
				<CardBody className='gap-3'>
					{prerequisites.map((prerequisites: any, index: number) => (
						<Input
							key={index}
							type='text'
							variant='bordered'
							required
							value={prerequisites.title}
							placeholder='You will lbe able to learn  FUll stack Lms Platform'
							onChange={(e: any) =>
								handlePrerequisitesChanges(index, e.target.value)
							}
						/>
					))}
					<AddBoxRoundedIcon
						className='cursor-pointer'
						onClick={handleAddPrerequisites}
					/>
				</CardBody>

				<Divider className='my-5' />

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
				<CardFooter>
					<Link
						isExternal
						showAnchorIcon
						href='https://github.com/PremShinde-2013'
					>
						Visit source code on GitHub.
					</Link>
				</CardFooter>
			</Card>
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
		</form>
	);
};

export default CourseData;
