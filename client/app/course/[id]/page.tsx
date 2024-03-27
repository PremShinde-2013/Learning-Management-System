"use client";

import CourseDetailsPage from "@/app/components/Course/CourseDetailsPage";

type PageProps = {
	params: any;
};

const Page = ({ params }: PageProps) => {
	return (
		<div>
			<CourseDetailsPage id={params.id} />
		</div>
	);
};

export default Page;
