import { useState } from "react";
import { useGetCourseContentQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import CourseContentMedia from "./CourseContentMedia";
import CourseContentList from "./CourseContentList";

type CourseContentProps = {
	id: string;
	user: any;
};

const CourseContent = ({ id, user }: CourseContentProps) => {
	const {
		data: contentData,
		isLoading,
		refetch,
	} = useGetCourseContentQuery(id, { refetchOnMountOrArgChange: true });

	const [open, setOpen] = useState(false);

	const [route, setRoute] = useState("Login");

	const data = contentData?.content;

	const [activeVideo, setActiveVideo] = useState(0);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<>
					<div className='w-full grid sm:grid-cols-10'>
						<Heading
							title={data[activeVideo]?.title}
							description='anything'
							keywords={data[activeVideo]?.tags}
						/>
						<div className='col-span-7 mr-8'>
							<CourseContentMedia
								data={data}
								id={id}
								activeVideo={activeVideo}
								setActiveVideo={setActiveVideo}
								user={user}
								refetch={refetch}
							/>
						</div>
						<div className='hidden sm:block sm:col-span-3  '>
							<CourseContentList
								setActiveVideo={setActiveVideo}
								data={data}
								activeVideo={activeVideo}
							/>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default CourseContent;
