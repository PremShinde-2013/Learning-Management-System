/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { FC, useState } from "react";
import Heading from "../utils/Heading";
import AdminTopbar from "../components/Admin/topbar/AdminTopbar";
import AdminProtected from "../hooks/adminProtected";
import { useSelector } from "react-redux";
import { Avatar } from "@nextui-org/avatar";
import DashboardHero from "../components/Admin/topbar/DashboardHero";
import Sidebar from "../components/Admin/Sidebar/AdminSidebar";

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

				{/* <AdminTopbar /> */}
				<div className='flex min-h-screen'>
					<div className='1500px:w-[16%] w-1/5'>
						<Sidebar />
					</div>
					<div className='w-[85%]'>
						<DashboardHero isDashboard={true} />
					</div>
				</div>
			</AdminProtected>
		</div>
	);
};

export default Page;
