import Link from "next/link";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { title } from "@/components/primitives";

type FooterProps = {};

const words = `	Welcome to LearnifyPro, where learning meets innovation and
							excellence in the world of education!
						
							My name is Prem Shinde, and I'm thrilled to introduce you to
							our cutting-edge platform designed to revolutionize how you learn
							and grow as a programmer.
						
							As a passionate third-year Computer Science Engineering student,
							I've experienced firsthand the exhilarating journey of diving
							into the world of coding. However, I also understand the
							challenges and hurdles that learners face along the way.
							That's why I envisioned LearnifyPro – to provide aspiring
							programmers like you with the tools, resources, and support needed
							to thrive in the ever-evolving tech industry.
						 At LearnifyPro, we're not just another e-learning
							platform – we're your partners in success. Whether
							you're a beginner taking your first steps into coding or a
							seasoned developer aiming to master advanced concepts, we've
							got you covered.
						
							Our platform offers a diverse range of courses meticulously
							crafted by industry experts, covering everything from fundamental
							programming principles to cutting-edge technologies. Each course
							is designed to be engaging, practical, and accessible, ensuring
							that you gain the skills and knowledge required to excel in your
							career.
						 But LearnifyPro is more than just a collection of courses –
							it's a vibrant community of learners, mentors, and
							enthusiasts passionate about technology. Our forums, discussion
							boards, and live sessions provide you with opportunities to
							connect, collaborate, and learn from like-minded individuals who
							share your passion for coding.
						
							Whether you're exploring new programming languages, honing
							your problem-solving skills, or preparing for technical
							interviews, LearnifyPro is your ultimate learning companion. With
							our intuitive platform, personalized learning paths, and
							interactive learning resources, you'll be well-equipped to
							tackle any coding challenge that comes your way.
						
							Join the LearnifyPro family today and embark on a transformative
							learning journey that will elevate your skills, expand your
							opportunities, and empower you to achieve your goals. Together,
							let's unlock your full potential and pave the way for a
							brighter future in the world of programming.
						
							Are you ready to redefine your learning experience? Take the first
							step with LearnifyPro – where knowledge meets innovation, and
							success knows no bounds.
						
							See you inside!`;

const About = ({}: FooterProps) => {
	return (
		<div className=' '>
			<br />
			<h1 className={` text-5xl font-semibold`}>
				What is <span className={title({ color: "violet" })}>LearnifyPro?</span>
			</h1>

			<br />
			<div className='w-[95%] md:w-[85%] m-auto '>
				<p className=''>
					<TextGenerateEffect words={words} className='  font-light  mb-20' />
				</p>
				<br />
				<span className='text-[22px]'>Prem Shinde</span>
				<h5 className='text-[18px] '>Founder and CEO of LearnifyPro</h5>
				<br />
				<br />
				<br />
			</div>
		</div>
	);
};

export default About;
