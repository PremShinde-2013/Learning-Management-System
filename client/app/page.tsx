"use client";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import { SparklesPreview } from "./components/sparkles";
import { Image } from "@nextui-org/react";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";
import Navbar from "./components/navbar";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Route/Footer";
import Hero from "./components/Route/Hero";

interface Props {}
// export default function Home() {
const Home: FC<Props> = (props) => {
	const { data, refetch } = useGetHeroDataQuery("Banner", {});

	return (
		<>
			<Heading
				title={"LearnifyPro"}
				description='Explore coding courses and tutorials tailored for your learning needs at LearnifyPro. Enhance your skills with expert-led programming courses.'
				keywords='coding courses, programming tutorials, web development, software engineering, computer science, programming languages, coding bootcamp'
			/>
			{/* <Navbar//> */}

			{/* <SparklesPreview /> */}

			<Hero />

			<Courses />
			<Reviews />
			<FAQ />
			<Footer />
		</>
	);
};

export default Home;
