"use client";
import React, { FC } from "react";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import { Button, ButtonGroup } from "@nextui-org/react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

type Props = {
	activeStep: number;
	handleNext: () => void;
	handleBack: () => void;
	handleReset: () => void;
};

const CourseOptions: FC<Props> = ({
	activeStep,
	handleNext,
	handleBack,
	handleReset,
}) => {
	const options = [
		"Course Information",
		"Course Options",
		"Course Content",
		"Course Preview",
	];

	return (
		<Box sx={{ maxWidth: 400 }}>
			<Stepper activeStep={activeStep} orientation='vertical'>
				{options.map((step, index) => (
					<Step key={step}>
						<StepLabel
							optional={
								index === 2 ? (
									<Typography variant='caption'>Last step</Typography>
								) : null
							}
						>
							<Typography className='text-blue-600'>{step}</Typography>
						</StepLabel>
						<StepContent>
							{/* <Typography>{step}</Typography> */}
							<Box sx={{ mb: 2 }}>
								<div>
									<Button
										variant='flat'
										color='primary'
										onClick={handleNext}
										className='mt-1 mr-1'
									>
										{index === options.length - 1 ? "Finish" : "Continue"}
									</Button>
									<Button
										isDisabled={index === 0}
										onClick={handleBack}
										className='mt-1 mr-1'
									>
										Back
									</Button>
								</div>
							</Box>
						</StepContent>
					</Step>
				))}
			</Stepper>
			{activeStep === options.length && (
				<Paper square elevation={0} sx={{ p: 3 }}>
					<Typography>All steps completed - you&apos;re finished</Typography>
					<Button onClick={handleReset} className='mt-1 mr-1'>
						Reset
					</Button>
				</Paper>
			)}
		</Box>
	);
};

export default CourseOptions;
