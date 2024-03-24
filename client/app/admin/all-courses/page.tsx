"use client";
import AllCourses from "@/app/components/Admin/AllCourses";
/* eslint-disable react-hooks/rules-of-hooks */
import AdminTopbar from "@/app/components/Admin/topbar/AdminTopbar";
import AdminProtected from "@/app/hooks/adminProtected";
import Heading from "@/app/utils/Heading";
import { Avatar } from "@nextui-org/avatar";
import { user } from "@nextui-org/theme";
import React, { FC, useState } from "react";
import { useSelector } from "react-redux";

type Props = {};
const page: FC<Props> = () => {
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
				<div className='flex justify-center'>
					<div className='h-[15rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center'>
						{/* Radial gradient for the container to give a faded look */}
						<div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>

						<div className=' flex flex-col  md:mb-16  sm:mb-3'>
							<div className='flex justify-center'>
								<Avatar
									src={
										user.avatar
											? user.avatar.url
											: "https://img.freepik.com/free-photo/view-3d-man-holding-laptop_23-2150709818.jpg?t=st=1709596014~exp=1709599614~hmac=123a2af7e09c6c82b82801146d728478720e61efbadc943eafac84625951ac51&w=740"
									}
									alt=''
									size='lg'
									className='lg:w-32 lg:h-32 md:w-24 md:h-24'
								/>
							</div>
							<div className='flex justify-center flex-col'>
								<p className='text-xl sm:text-2xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500  py-1'>
									{user?.name}
								</p>
								<p className='text-xl sm:text-2xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500  py-1 flex justify-center capitalize'>
									* {user?.role}
								</p>
							</div>
						</div>
					</div>
				</div>
				<AdminTopbar />
				<AllCourses />
			</AdminProtected>
		</div>
	);
};

export default page;
