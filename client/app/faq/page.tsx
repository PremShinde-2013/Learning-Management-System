"use client";
import { title } from "@/components/primitives";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Heading from "../utils/Heading";
import { useSelector } from "react-redux";

export default function AboutPage() {
	const { user } = useSelector((state: any) => state.auth);

	const { data, isLoading } = useGetHeroDataQuery("FAQ", {});

	const [activeQuestion, setActiveQuestion] = useState(null);

	const [questions, setQuestions] = useState<any[]>([]);

	useEffect(() => {
		if (data) {
			setQuestions(data.layout?.faq);
		}
	}, [data]);

	const toggleQuestion = (id: any) => {
		setActiveQuestion(activeQuestion === id ? null : id);
	};
	return (
		<>
			<Heading
				title={`${user?.name} Profile - LearnifyPro`}
				description='Explore coding courses and tutorials tailored for your learning needs at LearnifyPro. Enhance your skills with expert-led programming courses.'
				keywords='coding courses, programming tutorials, web development, software engineering, computer science, programming languages, coding bootcamp'
			/>
			<div className={`m-auto flex justify-center flex-col mt-28 mb-20`}>
				<h1 className={title({ class: "text-center " })}>
					Frequently Asked
					<span className={title({ color: "violet" })}> Questions</span>
					<br />
				</h1>
			</div>

			<Accordion
				className='mb-28'
				defaultExpandedKeys={["1"]}
				variant='shadow'
				motionProps={{
					variants: {
						enter: {
							y: 0,
							opacity: 1,
							height: "auto",
							transition: {
								height: {
									type: "spring",
									stiffness: 500,
									damping: 30,
									duration: 1,
								},
								opacity: {
									easings: "ease",
									duration: 1,
								},
							},
						},
						exit: {
							y: -10,
							opacity: 0,
							height: 0,
							transition: {
								height: {
									easings: "ease",
									duration: 0.25,
								},
								opacity: {
									easings: "ease",
									duration: 0.3,
								},
							},
						},
					},
				}}
			>
				{questions?.map((q) => (
					<AccordionItem key={q.id} aria-label='Accordion 1' title={q.question}>
						<div className='flex'>{q.answer}</div>
					</AccordionItem>
				))}
			</Accordion>
		</>
	);
}
