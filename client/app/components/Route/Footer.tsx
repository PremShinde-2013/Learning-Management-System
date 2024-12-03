"use client";

import * as React from "react";
import { useTheme } from "next-themes";



import { cn } from "@/lib/utils";
import GridPattern from "../ui/grid-pattern";
import LinkArrow from "../ui/linkArrow";

const Footer = () => {
	const { setTheme } = useTheme();

	return (

		<>
			<div className="relative  flex-col h-full w-full items-center justify-center overflow-hidden rounded-lg  bg-background p-20  mt-52">







				<footer className=" w-full md:flex overflow-y-hidden items-center justify-between gap-4 px-8 py-8 text-sm text-zinc-500 overflow-hidden text-center">
					<p>© 2024 LearnifyPro</p>
					<div className="flex gap-5 justify-around my-2">
						<a
							className="group/mail flex items-center"
							target="_blank"
							href="mailto:shindeprem102@gmail.com"
						>
							Contact
							<LinkArrow classname="group-hover/mail:opacity-100 opacity-0 transition hidden md:block" />
						</a>
						<a
							className="group/twit flex items-center"
							target="_blank"
							href="https://github.com/PremShinde-2013/BrainWave-AI"
						>
							Twitter{" "}
							<LinkArrow classname="group-hover/twit:opacity-100 opacity-0 transition hidden md:block" />
						</a>
						<a
							className="group/git flex items-center"
							target="_blank"
							href="https://github.com/PremShinde-2013/BrainWave-AI"
						>
							Github{" "}
							<LinkArrow classname="group-hover/git:opacity-100 opacity-0 transition hidden md:block" />
						</a>
					</div>
				</footer>


				<GridPattern
					width={20}
					height={20}
					x={-1}
					y={-1}
					className={cn(
						"[mask-image:linear-gradient(to_left_bottom,white,transparent,transparent)] ",
					)}
				/>
			</div>

		</>
	);
};

export default Footer;
