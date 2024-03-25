"use client";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import TopBarAdmin from "@/app/components/Admin/topbar/AdminTopbar";

import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";

import OrdersAnalytics from "@/app/components/Admin/Analytics/OrdersAnalytics";
import Sidebar from "@/app/components/Admin/Sidebar/AdminSidebar";

type Props = {};

const page = ({ params }: any) => {
	const id = params?.id;

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
						<OrdersAnalytics />
					</div>
				</div>
			</AdminProtected>
		</div>
	);
};

export default page;
