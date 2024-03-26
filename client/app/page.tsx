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

			<div
				className='container mx-auto  
			flex lg:flex-row flex-col justify-evenly'
			>
				<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10 '>
					<Image
						isZoomed
						width={240}
						height={240}
						alt='NextUI Fruit Image with Zoom'
						src={data?.layout?.banner?.image?.url}
					/>
				</section>
				<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
					<div className='inline-block max-w-md text-center justify-center '>
						<h1 className={title({ color: "violet" })}>
							{data?.layout?.banner?.title}
						</h1>
						{/* <h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
						<br />
						<h1 className={title()}>
							websites regardless of your design experience.
						</h1> */}
						<h2 className={subtitle({ class: "mt-4" })}>
							{data?.layout?.banner?.subtitle}
						</h2>
					</div>

					<div className='flex gap-3'>
						<Link
							isExternal
							href={siteConfig.links.docs}
							className={buttonStyles({
								color: "primary",
								radius: "full",
								variant: "shadow",
							})}
						>
							Documentation
						</Link>
						<Link
							isExternal
							className={buttonStyles({ variant: "bordered", radius: "full" })}
							href={siteConfig.links.github}
						>
							<GithubIcon size={20} />
							GitHub
						</Link>
					</div>

					<div className='mt-8'>
						<Snippet hideSymbol hideCopyButton variant='flat'>
							<span>
								Get started by editing <Code color='primary'>app/page.tsx</Code>
							</span>
						</Snippet>
					</div>
				</section>
			</div>

			{/* <SparklesPreview /> */}

			{/* <Courses /> */}
			<Reviews />
			<FAQ />
			<Footer />
		</>
	);
};

export default Home;
