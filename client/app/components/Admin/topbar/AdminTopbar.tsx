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
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import { useSelector } from "react-redux";
import DashboardCustomizeRoundedIcon from "@mui/icons-material/DashboardCustomizeRounded";
import TableViewRoundedIcon from "@mui/icons-material/TableViewRounded";
import SourceRoundedIcon from "@mui/icons-material/SourceRounded";
import MovieFilterRoundedIcon from "@mui/icons-material/MovieFilterRounded";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import DashboardHero from "./DashboardHero";
type Props = {};

const TopBarAdmin: FC<Props> = () => {
	const { user } = useSelector((state: any) => state.auth);
	const [logout, setLogout] = useState(false);
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
						key='Dashboard'
						title={
							<div className='flex items-center space-x-2'>
								<DashboardCustomizeRoundedIcon />

								<span>Dashboard</span>
							</div>
						}
					>
						<DashboardHero />
					</Tab>
					<Tab
						key='Data'
						title={
							<div className='flex items-center space-x-2'>
								<TableViewRoundedIcon />
								<span>Data</span>
							</div>
						}
					></Tab>
					<Tab
						key='Content'
						title={
							<div className='flex items-center space-x-2'>
								<SourceRoundedIcon />
								<span>Content</span>
							</div>
						}
					>
						<div className='flex justify-center'>
							<Card className=' md:min-w-[1000px] flex'>
								<CardHeader className='flex justify-around md:gap-36  gap-6 '>
									<div>
										<Button>
											<Link href='/admin/create-course'>
												<a className='  text-blue-500'>Create Course</a>
											</Link>
										</Button>
									</div>
									<div>
										<Button>Live Courses</Button>
									</div>
								</CardHeader>

								<Divider />
							</Card>
						</div>
					</Tab>

					<Tab
						key='customization'
						title={
							<div className='flex items-center space-x-2'>
								<MovieFilterRoundedIcon />
								<span>Customization </span>
							</div>
						}
					></Tab>
					<Tab
						key='controllers'
						title={
							<div className='flex items-center space-x-2'>
								<ManageAccountsRoundedIcon />
								<span>Controllers </span>
							</div>
						}
					></Tab>
					<Tab
						key='analytics'
						title={
							<div className='flex items-center space-x-2'>
								<AnalyticsRoundedIcon />
								<span>Analytics </span>
							</div>
						}
					></Tab>
				</Tabs>
			</div>
		</>
	);
};

export default TopBarAdmin;
