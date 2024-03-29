"use client";
import AllCourses from "@/app/components/Admin/AllCourses";
import Sidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
/* eslint-disable react-hooks/rules-of-hooks */
import AdminTopbar from "@/app/components/Admin/topbar/AdminTopbar";
import DashboardHero from "@/app/components/Admin/topbar/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import { Avatar } from "@nextui-org/avatar";
import { user } from "@nextui-org/theme";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};
const Page: FC<Props> = () => {
	const { user } = useSelector((state: any) => state.auth);

	const [active, setActive] = useState(1);
	const [avatar, setAvatar] = useState(null);

	return (
		<div>
			<AdminProtected>
				<Heading
					title={"LearnifyPro - Admin"}
					description='Explore coding courses and tutorials tailored for your learning needs at LearnifyPro. Enhance your skills with expert-led programming courses.'
					keywords='coding courses, programming tutorials, web development, software engineering, computer science, programming languages, coding bootcamp'
				/>

				<div className='flex h-screen'>
					<div className='1500px:w-[16%] w-1/5'>
						<Sidebar />
					</div>
					<div className='w-[85%]'>
						<DashboardHero />
						<AllCourses />
					</div>
				</div>
			</AdminProtected>
		</div>
	);
};

export default Page;
