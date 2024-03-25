import React from "react";
import {
	BarChart,
	Bar,
	ResponsiveContainer,
	XAxis,
	Label,
	YAxis,
	LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { Card } from "@nextui-org/react";

type CourseAnalyticsProps = {};

const CourseAnalytics = ({}: CourseAnalyticsProps) => {
	const { data, isLoading } = useGetCoursesAnalyticsQuery({});

	const analyticsData: any = [];

	data?.courses.last12Months.forEach((item: any) => {
		analyticsData.push({ name: item.month, uv: item.count });
	});

	const minValue = 0;

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<Card className='mt-6 '>
					<div className='h-screen'>
						<div className='mt-[50px] mx-6'>
							<h1 className='px-5 sm:text-3xl text-lg'>Courses Analytics</h1>
							<p className='px-5 sm:text-2xl text-base'>
								Last 12 months analytics data{" "}
							</p>
						</div>

						<div className='w-full h-[90%] flex items-center justify-center'>
							<ResponsiveContainer width='90%' height='50%'>
								<BarChart width={150} height={300} data={analyticsData}>
									<XAxis dataKey='name'>
										<Label offset={0} position='insideBottom' />
									</XAxis>
									<YAxis domain={[minValue, "auto"]} />
									<Bar dataKey='uv' fill='#3faf82'>
										<LabelList dataKey='uv' position='top' />
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</div>
				</Card>
			)}
		</>
	);
};

export default CourseAnalytics;
