"use client";
import EditCourse from "@/app/components/Admin/Course/EditCourse";
import EditFaq from "@/app/components/Admin/Customization/EditFaq";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import Sidebar from "@/app/components/Admin/Sidebar/AdminSidebar";
import TopBarAdmin from "@/app/components/Admin/topbar/AdminTopbar";
import CreateCourse from "@/app/components/Admin/topbar/Course/CreateCourse";
import DashboardHero from "@/app/components/Admin/topbar/DashboardHero";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";

type Props = {};

const Page = ({ params }: any) => {
	const id = params?.id;

	return (
		<div>
			<AdminProtected>
				<Heading
					title='LearnifyPro - Admin'
					description='Explore coding courses and tutorials tailored for your learning needs at LearnifyPro. Enhance your skills with expert-led programming courses.'
					keywords='coding courses, programming tutorials, web development, software engineering, computer science, programming languages, coding bootcamp'
				/>

				<div className='flex min-h-screen'>
					<div className='1500px:w-[16%] w-1/5'>
						<Sidebar />
					</div>
					<div className='w-[85%]'>
						<DashboardHero />
						<EditFaq />
						<br />
					</div>
				</div>
			</AdminProtected>
		</div>
	);
};

export default Page;
