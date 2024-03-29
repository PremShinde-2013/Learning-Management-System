"use client";
import {
	Avatar,
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Checkbox,
	Divider,
	Input,
	Link,
	Tab,
	Tabs,
	useDisclosure,
	Image,
} from "@nextui-org/react";
import React, { FC, useEffect, useState } from "react";
import {
	EyeFilledIcon,
	EyeSlashFilledIcon,
	VideoIcon,
} from "@/components/icons";
import { GalleryIcon } from "@/components/icons";
import { MusicIcon } from "@/components/icons";
import FaceRoundedIcon from "@mui/icons-material/FaceRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import CameraEnhanceRoundedIcon from "@mui/icons-material/CameraEnhanceRounded";

import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signIn } from "next-auth/react";
import { Typography } from "@mui/material";

import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { Snackbar, Alert } from "@mui/material";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import toast from "react-hot-toast";
type Props = {
	user: any;
	active: number;
	setActive: (active: number) => void;
	avatar: string | null;
};

const ChangePassword: FC<Props> = ({ user, active, setActive, avatar }) => {
	const [successMessage, setSuccessMessage] = useState<string>("");
	const [errorMessage, setErrorMessage] = useState<string>("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

	const passwordChangeHandler = async (e: any) => {
		e.preventDefault();
		if (newPassword !== confirmPassword) {
			setErrorMessage("Passwords do not match");

			// console.log("password not match");
		} else {
			await updatePassword({ oldPassword, newPassword });
		}
	};
	useEffect(() => {
		if (isSuccess) {
			// console.log("password change successfully");
			// setSuccessMessage("Password changed successfully");
			toast.success("Password changed successfully");
		}
		if (error) {
			if ("data" in error) {
				const errorData = error as any;
				// console.log(errorData.data.message);
				// setErrorMessage(errorData.data.message);
				toast.error(errorData.data.message);
			}
		}
	}, [isSuccess, error]);
	return (
		<div className='flex justify-center'>
			<Card className=' md:min-w-[1000px] flex'>
				<CardHeader className='flex gap-3 justify-center'>
					<div>
						<Typography> Change Password</Typography>
					</div>
				</CardHeader>

				<Divider />
				<CardBody className=' flex items-center '>
					<form onSubmit={passwordChangeHandler}>
						<div className='flex flex-col gap-5'>
							<Input
								type='password'
								variant='flat'
								label='Old password'
								placeholder='Enter your old password'
								className=' md:w-96   '
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
							/>
							<Input
								type='password'
								variant='flat'
								label='New Password'
								placeholder='Enter your new password'
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								className=' md:w-96 '
							/>
							<Input
								type='password'
								variant='flat'
								label='Confirm Password'
								placeholder='Enter your confirm password
'
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								className=' md:w-96 '
							/>

							<Button
								color='primary'
								variant='flat'
								className=' md:w-96 '
								type='submit'
							>
								Update
							</Button>
						</div>
					</form>
				</CardBody>
				<Divider />
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
		</div>
	);
};

export default ChangePassword;
