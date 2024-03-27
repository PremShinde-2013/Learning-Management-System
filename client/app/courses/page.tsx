"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layoutApi";
import Loader from "../components/Loader/Loader";
import Heading from "../utils/Heading";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Route/Footer";
import { Chip } from "@nextui-org/react";
type PageProps = {};

const CoursesContent = () => {
	const searchParams = useSearchParams();

	const search = searchParams?.get("title");

	const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});

	const { data: categoriesData } = useGetHeroDataQuery("Categories", {});

	const [courses, setCourses] = useState([]);

	const [category, setCategory] = useState("All");

	useEffect(() => {
		if (category === "All") {
			setCourses(data?.courses);
		}

		if (category !== "All") {
			setCourses(
				data?.courses.filter((item: any) => item.categories === category)
			);
		}

		if (search) {
			setCourses(
				data?.courses.filter((item: any) =>
					item.name.toLowerCase().includes(search.toLowerCase())
				)
			);
		}
	}, [data, category, search]);

	const categories = categoriesData?.layout.categories;

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className={` m-auto flex justify-center flex-col`}>
						<Heading
							title={"All courses - LearnifyPro"}
							description={"LearnifyPro is a programming community."}
							keywords={
								"programming community, coding skills, expert insights, collaboration, growth"
							}
						/>
						<br />
						<div className=' flex justify-center items-center flex-wrap gap-6'>
							<Chip
								className={`h-[35px] ${
									category === "All" ? "bg-purple-800" : "bg-purple-600"
								} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
								onClick={() => setCategory("All")}
							>
								All
							</Chip>

							{categories?.map((item: any, index: number) => (
								<div key={index}>
									<Chip
										className={`h-[35px] ${
											category === item.title
												? "bg-purple-800"
												: "bg-purple-600"
										} m-3 px-3 rounded-[30px] flex items-center justify-center font-Poppins cursor-pointer`}
										onClick={() => setCategory(item.title)}
									>
										{item.title}
									</Chip>
								</div>
							))}
						</div>

						{courses && courses.length === 0 && (
							<p className={` justify-center  flex items-center mt-20  `}>
								{search
									? "No courses found!"
									: "No courses found in this category. Please try another one!"}
							</p>
						)}
						<br />
						<br />
						<div className='grid grid-cols-1 gap-9 md:grid-cols-1 md:gap-7 lg:grid-cols-2 lg:gap-10  mb-12 border-0 mx-8'>
							{courses?.map((item: any, index: number) => (
								<CourseCard item={item} key={index} />
							))}
						</div>
					</div>

					<Footer />
				</>
			)}
		</div>
	);
};

const Page = ({}: PageProps) => {
	const [route, setRoute] = useState("Login");
	const [open, setOpen] = useState(false);

	return (
		<div>
			<Suspense fallback={<Loader />}>
				<CoursesContent />
				{/* <Footer /> */}
			</Suspense>
		</div>
	);
};

export default Page;
