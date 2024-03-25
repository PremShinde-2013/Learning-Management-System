"use client";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import Sidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import TopBarAdmin from "@/app/components/Admin/topbar/AdminTopbar";
import CreateCourse from "@/app/components/Admin/topbar/Course/CreateCourse";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";

type Props = {};

const page = (props: Props) => {
	return (
		<div>
			<AdminProtected>
				<Heading
					title='LearnifyPro - Admin'
					description='Explore coding courses and tutorials tailored for your learning needs at LearnifyPro. Enhance your skills with expert-led programming courses.'
					keywords='coding courses, programming tutorials, web development, software engineering, computer science, programming languages, coding bootcamp'
				/>

				<div className='flex'>
					<div className='1500px:w-[16%] w-1/5'>
						<Sidebar />
					</div>
					<div className='w-[85%]'>
						<DashboardHeader />
						<CreateCourse />
					</div>
				</div>
			</AdminProtected>
		</div>
	);
};

export default page;
