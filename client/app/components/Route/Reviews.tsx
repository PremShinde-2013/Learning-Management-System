// import { styles } from "@/app/styles/styles";
import Image from "next/image";
import React from "react";
import ReviewCard from "../Review/ReviewCard";
import { subtitle, title } from "@/components/primitives";

import { AnimatedTestimonials } from "../ui/animated-testimonials";


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

export const testimonials = [
	{
		quote:
			"I had the pleasure of exploring E-Learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience, as the website offers a comprehensive selection of courses that cater to different skill levels and interests. If you're looking to enhance your knowledge and skills in the tech industry, I highly recommend checking out E-Learning!",
		name: "Aditya Patil",
		designation: "Student at Pune University",
		src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		quote:
			"Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
		name: "Durga Deshmukh",
		designation: "Full Stack Developer at Mumbai",
		src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		quote:
			"Thanks for your amazing programming tutorial channel! Your teaching style is outstanding, and the quality of your tutorials is top-notch. Your ability to break down complex topics into manageable parts, and cover diverse programming languages and topics is truly impressive. The practical applications and real-world examples you incorporate reinforce the theoretical knowledge and provide valuable insights. Your engagement with the audience fosters a supportive learning environment. Thank you for your dedication, expertise, and passion for teaching programming, and keep up the fantastic work!",
		name: "Amit Joshi",
		designation: "Computer Systems Engineering Student at Nagpur",
		src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		quote:
			"I had the pleasure of exploring E-Learning, a website that provides an extensive range of courses on various tech-related topics. I was thoroughly impressed with my experience.",
		name: "Nitin Pawar",
		designation: "Junior Web Developer at Nashik",
		src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		quote:
			"Your content is very special. The thing I liked the most is that the videos are so long, which means they cover everything in detail. Anyone with beginner-level knowledge can complete an integrated project after watching the videos. Thank you very much. I'm very excited for the next videos. Keep doing this amazing work!",
		name: "Sachin Patil",
		designation: "Full Stack Web Developer at Pune",
		src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		quote:
			"Join E-Learning! E-Learning focuses on practical applications rather than just teaching the theory behind programming languages or frameworks. I took a lesson on creating a web marketplace using React JS, and it was very helpful in teaching me the different stages involved in creating a project from start to finish. Overall, I highly recommend E-Learning to anyone looking to improve their programming skills and build practical projects. E-Learning is a great resource that will help you take your skills to the next level.",
		name: "Vikram Sharma",
		designation: "Full Stack Web Developer at Mumbai",
		src: "https://images.unsplash.com/photo-1603707281027-aeaec3d0ecbc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];



const Reviews = ({ }: ReviewsProps) => {
	return (
		<>
			<div className="flex flex-col">

				<div className='800px:w-[50%] w-full pt-20'>
					<h3 className={title()}>
						Our Students Are{" "}
						<span className={title({ color: "violet" })}>Our Strength</span>{" "}
						<br /> See What They Say About Us
					</h3>
					<br />

				</div>
				<AnimatedTestimonials testimonials={testimonials} autoplay />
			</div>
		</>

		// </div>


	);
};

export default Reviews;
