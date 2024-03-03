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

interface Props {}
// export default function Home() {
const Home: FC<Props> = (props) => {
	return (
		<>
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
						src='https://images.unsplash.com/photo-1708374580439-553f21a95345?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEzfEpwZzZLaWRsLUhrfHxlbnwwfHx8fHw%3D'
					/>
				</section>
				<section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
					<div className='inline-block max-w-lg text-center justify-center'>
						<h1 className={title()}>Make&nbsp;</h1>
						<h1 className={title({ color: "violet" })}>beautiful&nbsp;</h1>
						<br />
						<h1 className={title()}>
							websites regardless of your design experience.
						</h1>
						<h2 className={subtitle({ class: "mt-4" })}>
							Beautiful, fast and modern React UI library.
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

			<SparklesPreview />
		</>
	);
};

export default Home;
