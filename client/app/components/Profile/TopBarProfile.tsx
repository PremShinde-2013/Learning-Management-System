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
import React, { FC, useState } from "react";
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
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";

type Props = {
	user: any;
	active: number;
	setActive: (active: number) => void;
	avatar: string | null;
	logOutHandler: any;
};

const TopBarProfile: FC<Props> = ({
	user,
	active,
	setActive,
	avatar,
	logOutHandler,
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [isVisible, setIsVisible] = React.useState(false);
	const [name, setName] = useState(user && user.name);

	const toggleVisibility = () => setIsVisible(!isVisible);

	const imageHandler = () => {};
	const handleSubmit = () => {};

	return (
		<>
			<div className='flex w-full  flex-col '>
				<Tabs
					aria-label='Options'
					color='primary'
					variant='bordered'
					className='justify-center'
				>
					<Tab
						key='avatar'
						title={
							<div className='flex items-center space-x-2'>
								<Avatar
									src={
										user.avatar || avatar
											? user.avatar.url || avatar
											: "https://img.freepik.com/free-photo/view-3d-man-holding-laptop_23-2150709818.jpg?t=st=1709596014~exp=1709599614~hmac=123a2af7e09c6c82b82801146d728478720e61efbadc943eafac84625951ac51&w=740"
									}
									alt=''
									size='sm'
								/>

								<span>My Account</span>
							</div>
						}
					>
						<ProfileInfo
							user={user}
							avatar={avatar}
							active={active}
							setActive={setActive}
							logOutHandler={logOutHandler}
						/>
					</Tab>
					<Tab
						key='password'
						title={
							<div className='flex items-center space-x-2'>
								<LockRoundedIcon />
								<span>Change Password</span>
							</div>
						}
					>
						<ChangePassword
							user={user}
							avatar={avatar}
							active={active}
							setActive={setActive}
						/>
					</Tab>
					<Tab
						key='courses'
						title={
							<div className='flex items-center space-x-2'>
								<VideoIcon />
								<span>Enrolled courses</span>
							</div>
						}
					>
						<div>hii</div>
					</Tab>
					{user.role === "admin" && (
						<Tab
							key='admin'
							title={
								<div className='flex items-center space-x-2'>
									<AdminPanelSettingsRoundedIcon />
									<span>Admin Dashboard</span>
								</div>
							}
							href={"/admin"}
						>
							{/* <div>hii</div> */}
						</Tab>
					)}

					<Tab
						key='logout'
						title={
							<div className='flex items-center space-x-2'>
								<ExitToAppRoundedIcon />
								<span>Logout </span>
							</div>
						}
					>
						<div className='flex justify-center'>
							<Card className=' md:min-w-[1000px] flex'>
								<CardHeader className='flex gap-3 justify-center'>
									<div>
										<Button onClick={() => logOutHandler()}>Logout</Button>
									</div>
								</CardHeader>

								<Divider />
							</Card>
						</div>
					</Tab>
				</Tabs>
			</div>
		</>
	);
};

export default TopBarProfile;
