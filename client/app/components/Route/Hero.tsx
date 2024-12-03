"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../Loader/Loader";
import { Code, Image, Link, Snippet } from "@nextui-org/react";
import { subtitle, title } from "@/components/primitives";
import { siteConfig } from "@/config/site";
import { GithubIcon } from "../icons";
import { button as buttonStyles } from "@nextui-org/theme";

type HeroProps = {};

const Hero = ({ }: HeroProps) => {
	const [search, setSearch] = useState("");

	const router = useRouter();

	const { data, isLoading } = useGetHeroDataQuery("Banner", {});

	const handleSearch = () => {
		if (search === "") {
			return;
		}
		router.push(`/courses?title=${search}`);
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div
					className='container mx-auto   mt-0
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

						{/* <div className='flex gap-3'>
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
								className={buttonStyles({
									variant: "bordered",
									radius: "full",
								})}
								href={siteConfig.links.github}
							>
								<GithubIcon size={20} />
								GitHub
							</Link>
						</div> */}

						{/* <div className='mt-8'>
							<Snippet hideSymbol hideCopyButton variant='flat'>
								<span>
									Get started by editing{" "}
									<Code color='primary'>app/page.tsx</Code>
								</span>
							</Snippet>
						</div> */}
					</section>
				</div>
			)}
		</>
	);
};

export default Hero;
