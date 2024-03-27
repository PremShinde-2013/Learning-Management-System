import { title } from "@/components/primitives";
import { TextGenerateEffect } from "../components/ui/text-generate-effect";

const words = `	Welcome to LearnifyPro, where learning meets innovation and
							excellence in the world of education!
							<br />
							<br />
							My name is Prem Shinde, and I&apos;m thrilled to introduce you to
							our cutting-edge platform designed to revolutionize how you learn
							and grow as a programmer.
							<br />
							<br />
							As a passionate third-year Computer Science Engineering student,
							I&apos;ve experienced firsthand the exhilarating journey of diving
							into the world of coding. However, I also understand the
							challenges and hurdles that learners face along the way.
							That&apos;s why I envisioned LearnifyPro – to provide aspiring
							programmers like you with the tools, resources, and support needed
							to thrive in the ever-evolving tech industry.
							<br />
							<br /> At LearnifyPro, we&apos;re not just another e-learning
							platform – we&apos;re your partners in success. Whether
							you&apos;re a beginner taking your first steps into coding or a
							seasoned developer aiming to master advanced concepts, we&apos;ve
							got you covered.
							<br />
							<br />
							Our platform offers a diverse range of courses meticulously
							crafted by industry experts, covering everything from fundamental
							programming principles to cutting-edge technologies. Each course
							is designed to be engaging, practical, and accessible, ensuring
							that you gain the skills and knowledge required to excel in your
							career.
							<br />
							<br /> But LearnifyPro is more than just a collection of courses –
							it&apos;s a vibrant community of learners, mentors, and
							enthusiasts passionate about technology. Our forums, discussion
							boards, and live sessions provide you with opportunities to
							connect, collaborate, and learn from like-minded individuals who
							share your passion for coding.
							<br />
							<br />
							Whether you&apos;re exploring new programming languages, honing
							your problem-solving skills, or preparing for technical
							interviews, LearnifyPro is your ultimate learning companion. With
							our intuitive platform, personalized learning paths, and
							interactive learning resources, you&apos;ll be well-equipped to
							tackle any coding challenge that comes your way.
							<br />
							<br />
							Join the LearnifyPro family today and embark on a transformative
							learning journey that will elevate your skills, expand your
							opportunities, and empower you to achieve your goals. Together,
							let&apos;s unlock your full potential and pave the way for a
							brighter future in the world of programming.
							<br />
							<br />
							Are you ready to redefine your learning experience? Take the first
							step with LearnifyPro – where knowledge meets innovation, and
							success knows no bounds.
							<br />
							<br />
							See you inside!`;

export default function AboutPage() {
	return (
		<div className='h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center mt-28'>
			<div className='absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]'></div>
			<p className='text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8'>
				<div className='text-black dark:text-white'>
					<br />
					<h1 className={` text-5xl font-semibold`}>
						What is{" "}
						<span className={title({ color: "violet" })}>LearnifyPro?</span>
					</h1>

					<br />
					<div className='w-[95%] 800px:w-[85%] m-auto'>
						<p className='text-base font-normal'>
							Welcome to LearnifyPro, where learning meets innovation and
							excellence in the world of education!
							<br />
							<br />
							My name is Prem Shinde, and I&apos;m thrilled to introduce you to
							our cutting-edge platform designed to revolutionize how you learn
							and grow as a programmer.
							<br />
							<br />
							As a passionate third-year Computer Science Engineering student,
							I&apos;ve experienced firsthand the exhilarating journey of diving
							into the world of coding. However, I also understand the
							challenges and hurdles that learners face along the way.
							That&apos;s why I envisioned LearnifyPro – to provide aspiring
							programmers like you with the tools, resources, and support needed
							to thrive in the ever-evolving tech industry.
							<br />
							<br /> At LearnifyPro, we&apos;re not just another e-learning
							platform – we&apos;re your partners in success. Whether
							you&apos;re a beginner taking your first steps into coding or a
							seasoned developer aiming to master advanced concepts, we&apos;ve
							got you covered.
							<br />
							<br />
							Our platform offers a diverse range of courses meticulously
							crafted by industry experts, covering everything from fundamental
							programming principles to cutting-edge technologies. Each course
							is designed to be engaging, practical, and accessible, ensuring
							that you gain the skills and knowledge required to excel in your
							career.
							<br />
							<br /> But LearnifyPro is more than just a collection of courses –
							it&apos;s a vibrant community of learners, mentors, and
							enthusiasts passionate about technology. Our forums, discussion
							boards, and live sessions provide you with opportunities to
							connect, collaborate, and learn from like-minded individuals who
							share your passion for coding.
							<br />
							<br />
							Whether you&apos;re exploring new programming languages, honing
							your problem-solving skills, or preparing for technical
							interviews, LearnifyPro is your ultimate learning companion. With
							our intuitive platform, personalized learning paths, and
							interactive learning resources, you&apos;ll be well-equipped to
							tackle any coding challenge that comes your way.
							<br />
							<br />
							Join the LearnifyPro family today and embark on a transformative
							learning journey that will elevate your skills, expand your
							opportunities, and empower you to achieve your goals. Together,
							let&apos;s unlock your full potential and pave the way for a
							brighter future in the world of programming.
							<br />
							<br />
							Are you ready to redefine your learning experience? Take the first
							step with LearnifyPro – where knowledge meets innovation, and
							success knows no bounds.
							<br />
							<br />
							See you inside!
						</p>
						<br />
						<span className='text-[22px]'>Prem Shinde</span>
						<h5 className='text-[18px] font-Poppins'>
							Founder and CEO of LearnifyPro
						</h5>
						<br />
						<br />
						<br />
					</div>
				</div>
			</p>
		</div>
	);
}
