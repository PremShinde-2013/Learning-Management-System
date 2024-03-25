"use client";
import EditCourse from "@/app/components/Admin/Course/EditCourse";
import EditFaq from "@/app/components/Admin/Customization/EditFaq";
import DashboardHeader from "@/app/components/Admin/DashboardHeader";
import TopBarAdmin from "@/app/components/Admin/topbar/AdminTopbar";
import CreateCourse from "@/app/components/Admin/topbar/Course/CreateCourse";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import React from "react";
import EditCategories from "../../components/Admin/Customization/EditCategories";

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

				<TopBarAdmin />
				<DashboardHeader />
				<EditCategories />
			</AdminProtected>
		</div>
	);
};

export default page;
