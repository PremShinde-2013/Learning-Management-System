import React, { useEffect, useRef, useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	Input,
	Link,
} from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useActivationMutation } from "@/redux/features/auth/authApi";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography"; // Import Typography component

interface Props {
	onClose: () => void;
	toggleSignInModal: () => void; // Add toggleSignInModal prop
}

const VerificationModal: React.FC<Props> = ({
	onClose,
	toggleSignInModal,
}: Props) => {
	const inputRef1 = useRef<HTMLInputElement>(null);
	const inputRef2 = useRef<HTMLInputElement>(null);
	const inputRef3 = useRef<HTMLInputElement>(null);
	const inputRef4 = useRef<HTMLInputElement>(null);

	const { token } = useSelector((state: any) => state.auth);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");
	const [snackbarType, setSnackbarType] = useState<"success" | "error">(
		"success"
	);

	const [activation, { isSuccess, error }] = useActivationMutation();

	useEffect(() => {
		inputRef1?.current?.focus();
	}, []);

	useEffect(() => {
		if (isSuccess) {
			setSnackbarMessage("Account activated");
			setSnackbarType("success");
			setSnackbarOpen(true);
		} else if (error) {
			if ("data" in error) {
				const errorData = error as any;
				setSnackbarMessage(errorData.data.message);
			} else {
				setSnackbarMessage("An error occurred");
			}
			setSnackbarType("error");
			setSnackbarOpen(true);
		}
	}, [isSuccess, error]);

	const validationSchema = Yup.object().shape({
		digit1: Yup.string().matches(/^\d$/, "Enter a digit").required("Required"),
		digit2: Yup.string().matches(/^\d$/, "Enter a digit").required("Required"),
		digit3: Yup.string().matches(/^\d$/, "Enter a digit").required("Required"),
		digit4: Yup.string().matches(/^\d$/, "Enter a digit").required("Required"),
	});

	const handleVerificationSubmit = async (
		values: any,
		{ setSubmitting }: any
	) => {
		console.log("Form submitted:", values);
		setSubmitting(false);
		onClose();
		const verificationNumber = Object.values(values).join("");

		if (verificationNumber.length !== 4) {
			return;
		}

		try {
			await activation({
				activation_token: token,
				activation_code: verificationNumber,
			});
		} catch (error) {
			console.error("Error activating account:", error);
		}
	};

	return (
		<>
			<Modal isOpen={true} onClose={onClose} placement='top-center'>
				<ModalContent>
					<ModalHeader className='flex justify-center'>
						Verify your account
					</ModalHeader>
					<ModalBody>
						<div className='flex justify-center '>
							<Image
								width={120}
								height={120}
								alt='Verified Image'
								src='https://cdn-icons-png.freepik.com/256/10629/10629607.png?ga=GA1.1.1637687762.1708967549&'
							/>
						</div>
						<Formik
							initialValues={{
								digit1: "",
								digit2: "",
								digit3: "",
								digit4: "",
							}}
							validationSchema={validationSchema}
							onSubmit={handleVerificationSubmit}
						>
							{({ isSubmitting }) => (
								<Form>
									<div className='flex flex-row justify-center gap-2'>
										{[inputRef1, inputRef2, inputRef3, inputRef4].map(
											(inputRef, index) => (
												<Field key={index} name={`digit${index + 1}`}>
													{({ field, meta }: any) => (
														<Input
															{...field}
															ref={inputRef}
															label=''
															className='border-2 border-purple-200 text-center rounded-2xl'
															error={meta.touched && meta.error}
															placeholder={(index + 1).toString()}
															maxLength={1}
															onInput={(
																e: React.FormEvent<HTMLInputElement>
															) => {
																if (
																	e.currentTarget.value.length === 1 &&
																	index < 3 &&
																	inputRef.current
																) {
																	inputRef.current.focus();
																}
															}}
														/>
													)}
												</Field>
											)
										)}
									</div>
									<div className='flex justify-center mt-5'>
										<Button
											className='w-96'
											color='primary'
											variant='flat'
											type='submit'
											disabled={isSubmitting}
										>
											Verify
										</Button>
									</div>
									<ModalFooter />
									<div className='flex justify-center gap-4 my-5'>
										<h1>Go back to Sign-in ? </h1>
										<Link
											className='cursor-pointer'
											onClick={toggleSignInModal}
										>
											Sign-in
										</Link>{" "}
									</div>
								</Form>
							)}
						</Formik>
					</ModalBody>
				</ModalContent>

				<Snackbar
					open={snackbarOpen}
					onClose={() => {
						setSnackbarOpen(false);
					}}
					autoHideDuration={6000}
					anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
				>
					{/* Wrap the Typography component inside Snackbar */}
					<Typography variant='body1'>{snackbarMessage}</Typography>
				</Snackbar>
			</Modal>
		</>
	);
};

export default VerificationModal;
