import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";
import { useGetOrdersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import Loader from "../../Loader/Loader";
import { Card } from "@nextui-org/react";

type OrdersAnalyticsProps = {
	isDashboard?: boolean;
};

export default function OrdersAnalytics({ isDashboard }: OrdersAnalyticsProps) {
	const { data, isLoading } = useGetOrdersAnalyticsQuery({});

	const analyticsData: any = [];

	data?.orders.last12Months.forEach((item: any) => {
		analyticsData.push({ name: item.name, Count: item.count });
	});

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<Card className='mt-6 '>
					<div className={isDashboard ? "h-[30vh]" : "h-screen"}>
						<div
							className={isDashboard ? "mt-[0px] pl-[40px] mb-2" : "mt-[50px]"}
						>
							<h1
								className={`${
									isDashboard && "!text-[20px]"
								} px-5 sm:text-3xl text-lg`}
							>
								Orders Analytics
							</h1>
							{!isDashboard && (
								<p className={`px-5 sm:text-2xl text-base`}>
									Last 12 months analytics data{" "}
								</p>
							)}
						</div>
						<div
							className={`w-full ${
								isDashboard ? "h-full" : "h-[90%]"
							} flex items-center justify-center`}
						>
							<ResponsiveContainer
								width={isDashboard ? "100%" : "90%"}
								height={isDashboard ? "100%" : "50%"}
							>
								<LineChart
									width={500}
									height={300}
									data={analyticsData}
									margin={{
										top: 5,
										right: 30,
										left: 20,
										bottom: 5,
									}}
								>
									<CartesianGrid strokeDasharray='3 3' />
									<XAxis dataKey='name' />
									<YAxis />
									<Tooltip />
									{!isDashboard && <Legend />}
									<Line type='monotone' dataKey='Count' stroke='#82ca9d' />
								</LineChart>
							</ResponsiveContainer>
						</div>
					</div>
				</Card>
			)}
		</>
	);
}
