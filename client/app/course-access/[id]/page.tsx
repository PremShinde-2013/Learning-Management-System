"use client";

import { useEffect } from "react";
import { redirect } from "next/navigation";
import CourseContent from "@/app/components/Course/CourseContent";
import Loader from "@/app/components/Loader/Loader";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

type PageProps = {
	params: any;
};

const Page = ({ params }: PageProps) => {
	const id = params.id;

	const { isLoading, error, data, refetch } = useLoadUserQuery(undefined, {});

	useEffect(() => {
		if (data && !error) {
			const isAdmin = data.user?.role === "admin";

			const isPurchased = data.user.courses.find(
				(item: any) => item._id === id
			);

			if (!isPurchased && !isAdmin) {
				redirect("/");
			}
			return;
		}

		if (error) {
			redirect("/");
		}
	}, [data, error, id]);

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					<CourseContent id={id} user={data.user} />
				</div>
			)}
		</>
	);
};

export default Page;
