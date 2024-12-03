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
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Courses from "./components/Route/Courses";
import Reviews from "./components/Route/Reviews";
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Route/Footer";
import Hero from "./components/Route/Hero";
import { cn } from "@/lib/utils";
import AnimatedGridPattern from "./components/ui/animated-grid-pattern";
import GridPattern from "./components/ui/grid-pattern";
import DotPattern from "./components/ui/dot-pattern";
import { WorldMapDemo } from "./components/worldMap";

interface Props { }
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

			<div className=" flex-col flex w-auto     justify-center    bg-background  mb-24">
				<Hero />

				<AnimatedGridPattern
					numSquares={50}
					maxOpacity={0.1}
					duration={3}
					repeatDelay={2}
					className={cn(
						"[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] ",
						"inset-x-0 inset-y-[-50%] h-[400%] skew-y-12 ",
					)}
				/>
			</div>



			<div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg border-b-0  bg-background mb-24  ">
				<Courses />

				<GridPattern
					width={80}
					height={80}
					x={-1}
					y={-1}
					strokeDasharray={"8"}
					className={cn(
						"[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] ",
						"inset-x-0 inset-y-[-50%] h-[400%] ",
					)}
				/>

			</div>
			<div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-lg  border-b-0 bg-background  ">
				<Reviews />

				<DotPattern
					width={30}
					height={30}
					cx={1.5}
					cy={1.5}
					cr={1.5}
					className={cn(
						"[mask-image:linear-gradient(to_bottom,white,transparent,transparent)] ",
						"inset-x-0 inset-y-[-70%] h-[300%] ",

					)}
				/>
			</div>




			<div className="mt-24 mb-24">

				<WorldMapDemo />
			</div>
			<FAQ />
			<Footer />
		</>
	);
};

export default Home;
