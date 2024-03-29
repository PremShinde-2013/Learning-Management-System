import { useEffect, useState } from "react";
import { useGetUsersAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import CourseCard from "../Course/CourseCard";
import { title } from "@/components/primitives";

type CoursesProps = {};

const Courses = ({}: CoursesProps) => {
	const { data, isLoading } = useGetUsersAllCoursesQuery({});

	const [courses, setCourses] = useState<any[]>([]);

	useEffect(() => {
		setCourses(data?.courses);
	}, [data]);

	return (
		<div>
			<div
				className={`w-[90%] 800px:w-[80%] m-auto  mt-44 flex justify-center flex-col`}
			>
				<h1 className={title({ class: "text-center " })}>
					Expand Your Career{" "}
					<span className={title({ color: "violet" })}>Opportunity</span>
					<br />
					Opportunity With Our Courses
				</h1>
				<br />
				<br />
				<div className='grid grid-cols-1 gap-[20px] md:grid-cols-1 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0'>
					{courses?.map((item: any, index: number) => (
						<CourseCard item={item} key={index} />
					))}
				</div>
			</div>
		</div>
	);
};

export default Courses;
