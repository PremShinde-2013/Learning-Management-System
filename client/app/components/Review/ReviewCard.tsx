import Image from "next/image";
import Ratings from "@/app/utils/Ratings";
import { Avatar, Card } from "@nextui-org/react";

type ReviewCard = {
	item: any;
};

const ReviewCard = (props: ReviewCard) => {
	return (
		<Card className='w-full h-max pb-4     rounded-lg p-3 '>
			<div className='flex w-full'>
				<Avatar
					src={props.item.avatar}
					isBordered
					alt=''
					className='w-[50px] h-[50px] rounded-full object-cover'
				/>

				<div className='800px:flex justify-between w-full hidden'>
					<div className='pl-4'>
						<h5 className='text-[20px] '>{props.item.name}</h5>

						<h6 className='text-[16px] '>{props.item.profession}</h6>
					</div>

					<Ratings rating={5} />
				</div>

				<div className='800px:hidden justify-between w-full flex flex-col'>
					<div className='pl-4'>
						<h5 className='text-[20px] text-black dark:text-white'>
							{props.item.name}
						</h5>

						<h6 className='text-[16px] '>{props.item.profession}</h6>
					</div>

					<Ratings rating={5} />
				</div>
			</div>

			<p
				className='pt-2 px-2 
      
      '
			>
				{props.item.comment}
			</p>
		</Card>
	);
};

export default ReviewCard;
