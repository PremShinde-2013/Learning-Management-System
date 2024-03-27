import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "timeago.js";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

import Image from "next/image";
import DoneAllRoundedIcon from "@mui/icons-material/DoneAllRounded";
import CourseContentList from "./CourseContentList";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { subtitle, title } from "@/components/primitives";
import { Button } from "@nextui-org/button";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "@/app/Payment/CheckOutForm";

type CourseDetailsProps = {
	data: any;
	stripePromise: any;
	clientSecret: string;
	setRoute: any;
	setOpen: any;
};

const CourseDetails = ({
	data,
	stripePromise,
	clientSecret,
	setRoute,
	setOpen: openAuthModal,
}: CourseDetailsProps) => {
	const { data: userData, refetch } = useLoadUserQuery(undefined, {});

	const [user, setUser] = useState<any>();

	const [open, setOpen] = useState(false);

	useEffect(() => {
		setUser(userData?.user);
	}, [userData]);

	const dicountPercentenge =
		((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

	const discountPercentengePrice = dicountPercentenge.toFixed(0);

	const isPurchased = user?.courses?.find((item: any) => item._id === data._id);

	const isAdmin = user?.role === "admin";

	const handleOrder = (e: any) => {
		if (user) {
			setOpen(true);
		} else {
			setRoute("Login");
			openAuthModal(true);
		}
	};

	return (
		<div>
			<div className='w-[100%] md:w-[100%] m-auto py-5'>
				<div className='w-full flex flex-col-reverse md:flex-row'>
					<div className='w-full 800px:w-[65%] 800px:pr-5'>
						<h1 className={title({ color: "violet" })}>{data.name}</h1>
						<div className='flex items-center justify-between pt-3 pr-6'>
							<div className='flex items-center'>
								<Ratings rating={data.ratings} />
								<h5 className={subtitle()}> {data.reviews?.length} Reviews</h5>
							</div>
							<div className='flex items-center'>
								<h5 className={subtitle()}>{data.purchased} Students</h5>
							</div>
						</div>

						<br />
						<h1 className='lg:text-3xl  text-2xl font-semibold'>
							What you will learn from this course?
						</h1>
						<div>
							{data.benefits?.map((item: any, index: number) => (
								<div
									className='w-full flex md:items-center py-4 pr-4'
									key={index}
								>
									<div className='w-[15px] mr-1'>
										<DoneAllRoundedIcon />
									</div>
									<p className='lg:text-xl  text-xl ml-2'>{item.title}</p>
								</div>
							))}
							<br />
							<br />
						</div>
						<h1 className='lg:text-3xl  text-2xl font-semibold '>
							What are the prerequisites for starting this course?
						</h1>
						{data.prerequisites?.map((item: any, index: number) => (
							<div
								className='w-full flex md:items-center py-4 pr-4'
								key={index}
							>
								<div className='w-[15px] mr-1'>
									<DoneAllRoundedIcon className='text-black dark:text-white' />
								</div>
								<p className='lg:text-xl  text-xl ml-2'>{item.title}</p>
							</div>
						))}
						<br />
						<br />
						<div>
							<h1 className='lg:text-3xl  text-2xl font-semibold'>
								Course Overview
							</h1>
							<CourseContentList data={data?.courseData} isDemo={true} />
						</div>
						<br />
						<br />
						<div className='w-full'>
							<h1 className='lg:text-3xl  text-2xl  font-semibold'>
								Course Details
							</h1>
							<p className='lg:text-xl  text-xl pr-4 mt-12'>
								{data.description}
							</p>
						</div>
						<br />
						<br />
						<div className='w-full'>
							<div className='md:flex items-center gap-2'>
								<Ratings rating={data?.ratings} />
								<div className='mb-2 800px:mb-[unset]' />
								<h5 className='text-[25px] font-Poppins text-black dark:text-white'>
									{Number.isInteger(data?.ratings)
										? data?.ratings.toFixed(1)
										: data?.ratings.toFixed(2)}{" "}
									Course Rating • {data?.reviews?.length} Reviews
								</h5>
							</div>
							<br />
							{(data?.reviews && [...data.reviews].reverse()).map(
								(item: any, index: number) => (
									<div className='w-full pb-4' key={index}>
										<div className='flex'>
											<div className='w-[50px] h-[50px]'>
												<Image
													src={
														item.user.avatar
															? item.user.avatar.url
															: "https://res.cloudinary.com/kouroshrstn/image/upload/v1707293133/Avatars/avatar_dwjgxo.png"
													}
													width={50}
													height={50}
													alt=''
													className='w-[50px] h-[50px] rounded-full object-cover'
												/>
											</div>
											<div className='hidden 800px:block pl-2'>
												<div className='flex items-center'>
													<h5 className='text-[18px] pr-2 text-black dark:text-white'>
														{item.user.name}
													</h5>
													<Ratings rating={item.rating} />
												</div>
												<p className='text-black dark:text-white'>
													{item.comment}
												</p>
												<small className='text-[#000000d1] dark:text-[#ffffff83]'>
													{format(item.createdAt)} •
												</small>
											</div>
											<div className='pl-2 flex 800px:hidden items-center'>
												<h5 className='text-[18px] pr-2 text-black dark:text-white'>
													{item.user.name}
												</h5>
												<Ratings rating={item.rating} />
											</div>
										</div>
										{item.commentReplies.map((i: any, index: number) => (
											<div className='w-full flex 800px:ml-16 my-5' key={index}>
												<div className='w-[50px] h-[50px]'>
													<Image
														src={
															i.user.avatar
																? i.user.avatar.url
																: "https://res.cloudinary.com/kouroshrstn/image/upload/v1707293133/Avatars/avatar_dwjgxo.png"
														}
														width={50}
														height={50}
														alt=''
														className='w-[50px] h-[50px] rounded-full object-cover'
													/>
												</div>
												<div className='pl-2'>
													<div className='flex items-center'>
														<h5 className='text-[20px]'>{i.user.name}</h5>{" "}
														<VerifiedRoundedIcon className='text-[#0095F6] ml-2 text-[20px]' />
													</div>
													<p>{i.comment}</p>
													<small className='text-[#ffffff83]'>
														{format(i.createdAt)} •
													</small>
												</div>
											</div>
										))}
									</div>
								)
							)}
						</div>
					</div>
					<div className='w-full md:w-[55%] relative'>
						<div className='sticky top-[100px] left-0 z-50 w-full'>
							<CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
							<div className='flex items-center'>
								<h1 className='pt-5 lg:text-3xl  text-2xl font-semibold'>
									{data.price === 0 ? "Free" : `${data.price}₹`}
								</h1>
								<h5 className='pl-3  mt-2 line-through opacity-80 lg:text-2xl  text-xl font-normal'>
									{data.estimatedPrice}₹
								</h5>

								<h4 className='pl-5 pt-4 lg:text-2xl  text-xl font-semibold'>
									{discountPercentengePrice}% Off
								</h4>
							</div>
							<div className='flex items-center'>
								{isPurchased || isAdmin ? (
									<Button
										variant='flat'
										color='danger'
										className={`  my-3 cursor-pointer]`}
									>
										<Link
											className={`  cursor-pointer `}
											href={`/course-access/${data._id}`}
										>
											Enter to Course
										</Link>
									</Button>
								) : (
									<Button
										variant='flat'
										color='danger'
										className={`  my-3 cursor-pointer]`}
										onClick={handleOrder}
									>
										Buy Now {data.price}₹
									</Button>
								)}
							</div>
							<br />
							<p className='pb-1 text-black dark:text-white'>
								• Source code included
							</p>
							<p className='pb-1 text-black dark:text-white'>
								• Full lifetime access
							</p>
							<p className='pb-1 text-black dark:text-white'>
								• Certificate of completion
							</p>
							<p className='pb-3 800px:pb-1 text-black dark:text-white'>
								• Premium Support
							</p>
						</div>
					</div>
				</div>
			</div>
			<>
				{open && (
					<div className='w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center'>
						<div className='w-[500px] min-h-[500px] bg-white rounded-xl shadow p-4'>
							<div className='w-full flex justify-end'>
								<CloseRoundedIcon
									className='text-black cursor-pointer'
									onClick={() => setOpen(false)}
								/>
							</div>
							<div className='w-full'>
								{stripePromise && clientSecret && (
									<Elements stripe={stripePromise} options={{ clientSecret }}>
										<CheckOutForm
											setOpen={setOpen}
											data={data}
											user={user}
											refetch={refetch}
										/>
									</Elements>
								)}
							</div>
						</div>
					</div>
				)}
			</>
		</div>
	);
};

export default CourseDetails;
