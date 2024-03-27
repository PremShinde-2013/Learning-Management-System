/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { FC } from "react";
import Protected from "../hooks/useProtected";
import Navbar from "../components/navbar";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import Heading from "../utils/Heading";

type Props = {};

const page: FC<Props> = (props) => {
	const { user } = useSelector((state: any) => state.auth);

	return (
		<div>
			<Protected>
				<Heading
					title={`${user?.name} Profile - LearnifyPro`}
					description='Explore coding courses and tutorials tailored for your learning needs at LearnifyPro. Enhance your skills with expert-led programming courses.'
					keywords='coding courses, programming tutorials, web development, software engineering, computer science, programming languages, coding bootcamp'
				/>
				<div>
					<Profile user={user} />
				</div>
			</Protected>
		</div>
	);
};

export default page;
