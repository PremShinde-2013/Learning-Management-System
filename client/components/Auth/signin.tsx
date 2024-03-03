import React, { useState } from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Input,
	Button,
	Link,
	Checkbox,
} from "@nextui-org/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { MailIcon } from "../icons";
import VerificationModal from "./verification";

interface Props {
	onClose: () => void;
	toggleSignUpModal: () => void;
}

const validationSchema = Yup.object().shape({
	email: Yup.string().email("Invalid email address").required("Required"),
	password: Yup.string().required("Required"),
});

const SignInModal: React.FC<Props> = ({ onClose, toggleSignUpModal }) => {
	const [visible, setVisible] = useState(false);
	// const [showVerificationModal, setShowVerificationModal] = useState(false);

	const handleSubmit = (values: any, { setSubmitting }: any) => {
		console.log("Form submitted:", values);
		setSubmitting(false);
		// setShowVerificationModal(true);
	};

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const closeModals = () => {
		// setShowVerificationModal(false);
		onClose();
	};

	return (
		<>
			<Modal isOpen={true} onClose={closeModals} placement='top-center'>
				<ModalContent>
					<ModalHeader className='flex flex-col gap-1'>Sign in</ModalHeader>
					<ModalBody>
						<Formik
							initialValues={{ email: "", password: "" }}
							validationSchema={validationSchema}
							onSubmit={handleSubmit}
						>
							{({ isSubmitting }) => (
								<Form>
									<Field name='email'>
										{({ field }: any) => (
											<div className='mt-4'>
												<Input
													{...field}
													endContent={
														<MailIcon className='text-2xl  pointer-events-none flex-shrink-0' />
													}
													label='Email'
													placeholder='Enter your email'
													variant='bordered'
												/>
												<ErrorMessage name='email' component='div' />
											</div>
										)}
									</Field>
									<Field name='password'>
										{({ field }: any) => (
											<div className='mt-4'>
												<Input
													{...field}
													endContent={
														<div onClick={toggleVisibility}>
															{visible ? (
																<VisibilityRoundedIcon />
															) : (
																<VisibilityOffRoundedIcon />
															)}
														</div>
													}
													label='Password'
													placeholder='Enter your password'
													type={visible ? "text" : "password"}
													variant='bordered'
												/>
												<ErrorMessage name='password' component='div' />
											</div>
										)}
									</Field>
									<div className='flex py-2 px-1 justify-between'>
										<Checkbox
											classNames={{ label: "text-small" }}
											onClick={toggleVisibility}
										>
											Show Password
										</Checkbox>
										<Link color='primary' href='#' size='sm'>
											Forgot password?
										</Link>
									</div>
									<Button
										className='mt-6'
										color='primary'
										variant='shadow'
										type='submit'
										disabled={isSubmitting}
									>
										Sign in
									</Button>
								</Form>
							)}
						</Formik>
						<div className='flex py-2 px-1 justify-center gap-4'>
							<h1> or join us with</h1>
						</div>
						<div className='flex py-2 px-1 justify-center gap-4'>
							{/* Add icons for Google and GitHub */}
							<GoogleIcon />
							<GitHubIcon />
						</div>
						<div className='flex py-2 px-1 justify-center gap-4'>
							<h1>Don&apos;t have an account?</h1>
							<Link className='cursor-pointer' onClick={toggleSignUpModal}>
								Sign up
							</Link>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button color='danger' variant='flat' onClick={closeModals}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			{/* {showVerificationModal && <VerificationModal onClose={closeModals} />} */}
		</>
	);
};

export default SignInModal;
