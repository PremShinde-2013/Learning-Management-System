import Link from "next/link";
import Image from "next/image";
import Ratings from "@/app/utils/Ratings";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

type CourseCardProps = {
	item: any;
	isProfile?: boolean;
};

const CourseCard = ({ item, isProfile }: CourseCardProps) => {
	return (
		<>
			<Link
				href={isProfile ? `course-access/${item._id}` : `/course/${item._id}`}
			>
				<CardContainer className='inter-var'>
					<CardBody className='bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  '>
						<CardItem
							translateZ='50'
							className='text-xl font-bold text-neutral-600 dark:text-white'
						>
							{item.name}
						</CardItem>
						{/* <CardItem
							as='p'
							translateZ='60'
							className='text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300'
						>
							Hover over this card to unleash the power of CSS perspective
						</CardItem> */}
						<CardItem translateZ='100' className='w-full mt-4'>
							<Image
								src={item.thumbnail?.url}
								width={500}
								height={300}
								objectFit='contain'
								className='rounded w-full'
								alt=''
							/>
						</CardItem>
						<div className='flex justify-between items-center mt-20'>
							<Ratings rating={item.ratings} />

							<h5
								className={`text-black dark:text-[#fff] ${
									isProfile && "hidden 800px:inline"
								}`}
							>
								{item.purchased} Students
							</h5>
						</div>
						<div className='flex justify-between items-center mt-8'>
							<div className='flex'>
								<h3 className='text-black dark:text-[#fff]'>
									{item.price === 0 ? "Free" : `${item.price}₹`}
								</h3>
								<h5 className='pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff]'>
									{item.estimatedPrice}₹
								</h5>
							</div>
							<div className='flex items-center pb-3 pl-3'>
								{/* <AiOutlineUnorderedList size={20} fill='#fff' /> */}
								<h5 className='pl-2 text-black dark:text-[#fff]'>
									{item.courseData?.length} Lectures
								</h5>
							</div>
						</div>
					</CardBody>
				</CardContainer>
			</Link>
		</>
	);
};

export default CourseCard;
