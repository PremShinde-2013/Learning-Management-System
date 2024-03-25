import React from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
	useEditLayoutMutation,
	useGetHeroDataQuery,
} from "@/redux/features/layout/layoutApi";
import Loader from "../../Loader/Loader";
import {
	Accordion,
	AccordionItem,
	Button,
	Card,
	Divider,
	Input,
} from "@nextui-org/react";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { AddCircleOutlineRounded, DeleteRounded } from "@mui/icons-material";

type Props = {};

const EditFaq = (props: Props) => {
	const { data, isLoading } = useGetHeroDataQuery("FAQ", {
		refetchOnMountOrArgChange: true,
	});
	const [editLayout, { isSuccess: layoutSuccess, error }] =
		useEditLayoutMutation();

	const [questions, setQuestions] = useState<any[]>([]);

	useEffect(() => {
		if (data) {
			setQuestions(data.layout.faq);
		}
		if (layoutSuccess) {
			toast.success("FAQ updated successfully");
		}

		if (error && "data" in error) {
			const errorData = error as any;
			toast.error(errorData?.data?.message);
		}
	}, [data, layoutSuccess, error]);

	const toggleQuestion = (id: any) => {
		setQuestions((prevQuestions) =>
			prevQuestions.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
		);
	};

	const handleQuestionChange = (id: any, value: string) => {
		setQuestions((prevQuestions) =>
			prevQuestions.map((q) => (q._id === id ? { ...q, question: value } : q))
		);
	};

	const handleAnswerChange = (id: any, value: string) => {
		setQuestions((prevQuestions) =>
			prevQuestions.map((q) => (q._id === id ? { ...q, answer: value } : q))
		);
	};

	const newFaqHandler = () => {
		setQuestions([
			...questions,
			{
				question: "",
				answer: "",
			},
		]);
	};

	const areQuestionsUnchanged = (
		originalQuestions: any[],
		newQuestions: any[]
	) => {
		return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
	};

	const isAnyQuestionEmpty = (questions: any[]) => {
		return questions.some((q) => q.question === "" || q.answer === "");
	};

	const handleEdit = async () => {
		if (
			!areQuestionsUnchanged(data.layout.faq, questions) &&
			!isAnyQuestionEmpty(questions)
		) {
			await editLayout({
				type: "FAQ",
				faq: questions,
			});
		}
	};

	const defaultContent =
		"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit inventore distinctio expedita eum illum recusandae facere temporibus accusamus quis, blanditiis quam aliquam quo animi nesciunt eveniet quia at explicabo! Sint.";
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<Card className='mt-12'>
					<div className='mt-6 mx-6'>
						<dl className='space-y-8'>
							{questions.map((q: any) => (
								<div
									key={q._id}
									className={`${
										q._id !== questions[0]?._id && "border-t"
									} border-gray-200 pt-6`}
								>
									<dt className='text-lg'>
										<button
											className='flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none'
											onClick={() => toggleQuestion(q._id)}
										>
											<Input
												variant='flat'
												label='Question❓'
												labelPlacement={"inside"}
												value={q.question}
												onChange={(e: any) =>
													handleQuestionChange(q._id, e.target.value)
												}
												placeholder={"Add your question..."}
											/>

											<span
												className='ml-6 mt-4
                                            flex items-center flex-shrink-0'
											>
												{q.active ? (
													<RemoveRoundedIcon className='h-6 w-6' />
												) : (
													<AddRoundedIcon className='h-6 w-6' />
												)}
											</span>
										</button>
									</dt>
									{q.active && (
										<dd className='mt-2 pr-12 flex '>
											<Input
												variant='flat'
												label='Answer🤓'
												labelPlacement={"inside"}
												value={q.answer}
												onChange={(e: any) =>
													handleAnswerChange(q._id, e.target.value)
												}
												placeholder={"Add your answer..."}
											/>
											<span
												className='ml-6
                                            items-center flex flex-shrink-0'
											>
												<DeleteRounded
													className='

                                                    text-[18px] cursor-pointer'
													onClick={() => {
														setQuestions((prevQuestions) =>
															prevQuestions.filter((item) => item._id !== q._id)
														);
													}}
												/>
											</span>
										</dd>
									)}
								</div>
							))}
						</dl>

						<Divider className='my-10' />

						<AddCircleOutlineRounded
							className=' mb-6 cursor-pointer'
							onClick={newFaqHandler}
						/>
					</div>

					<div className='flex justify-end my-4 mx-6 '>
						<Button
							className={`
              ${
								areQuestionsUnchanged(data.layout.faq, questions) ||
								isAnyQuestionEmpty(questions)
									? "!cursor-not-allowed"
									: "!cursor-pointer "
							}
              `}
							variant='flat'
							color='primary'
							onClick={
								areQuestionsUnchanged(data.layout.faq, questions) ||
								isAnyQuestionEmpty(questions)
									? () => null
									: handleEdit
							}
						>
							Save
						</Button>
					</div>
				</Card>
			)}
		</>
	);
};

export default EditFaq;
