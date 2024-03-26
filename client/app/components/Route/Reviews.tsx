// import { styles } from "@/app/styles/styles";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";
import { subtitle, title } from "@/components/primitives";

type ReviewsProps = {};

export const reviews = [
	{
		name: "Aditya Patil",
		avatar: "https://randomuser.me/api/portraits/men/1.jpg",
		profession: "Student | Pune University",
		comment:
			"I had the pleasure of exploring E-Learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience, as the website offers a comprehensive selection of courses that cater to different skill levels and interests. If you're looking to enhance your knowledge and skills in the tech industry, I highly recommend checking out E-Learning!",
	},
	{
		name: "Rahul Deshmukh",
		avatar: "https://randomuser.me/api/portraits/men/2.jpg",
		profession: "Full stack developer | Mumbai",
		comment:
			"Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
	},
	{
		name: "Amit Joshi",
		avatar: "https://randomuser.me/api/portraits/men/3.jpg",
		profession: "Computer systems engineering student | Nagpur",
		comment:
			"Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
	},
	{
		name: "Nitin Pawar",
		avatar: "https://randomuser.me/api/portraits/men/4.jpg",
		profession: "Junior Web Developer | Nashik",
		comment:
			"I had the pleasure of exploring E-Learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience",
	},
	{
		name: "Sachin Patil",
		avatar: "https://randomuser.me/api/portraits/men/5.jpg",
		profession: "Full stack web developer | Pune",
		comment:
			"Your content is very special. The thing I liked the most is that the videos are so long, which means they cover everything in details. for that any person had beginner-level can complete an integrated project when he watches the videos. Thank you very much. Im very excited for the next videos Keep doing this amazing work",
	},
	{
		name: "Vikram Sharma",
		avatar: "https://randomuser.me/api/portraits/men/6.jpg",
		profession: "Full stack web developer | Mumbai",
		comment:
			"Join E-Learning! E-Learning focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend E-Learning to anyone looking to improve their programming skills and build practical projects. E-Learning is a great resource that will help you take your skills to the next level.",
	},
];

const Reviews = ({}: ReviewsProps) => {
	return (
		<div className='w-[90%] 800px:w-[85%] m-auto'>
			<div
				className='w-full lg:flex  sm:flex
                lg:flex-row

            items-center'
			>
				<div className='800px:w-[50%] w-full'>
					<Image
						src='https://res.cloudinary.com/kouroshrstn/image/upload/v1707293134/Avatars/business-img_o2xmaa.png'
						alt='business'
						width={700}
						height={700}
					/>
				</div>

				<div className='800px:w-[50%] w-full'>
					<h3 className={title()}>
						Our Students Are{" "}
						<span className={title({ color: "violet" })}>Our Strength</span>{" "}
						<br /> See What They Say About Us
					</h3>
					<br />
					<p className={subtitle()}>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque unde
						voluptatum dignissimos, nulla perferendis dolorem voluptate nemo
						possimus magni deleniti natus accusamus officiis quasi nihil
						commodi, praesentium quidem, quis doloribus?
					</p>
				</div>
				<br />
				<br />
			</div>

			<div
				className='grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-2 xl:gap-[35px] mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-20px]
			mt-16'
			>
				{reviews?.map((i, index) => (
					<ReviewCard item={i} key={index} />
				))}
			</div>
		</div>
	);
};

export default Reviews;
