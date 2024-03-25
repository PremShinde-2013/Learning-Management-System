import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import { useGetUsersAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import Loader from "../../Loader/Loader";
import { Card } from "@nextui-org/react";

type UserAnalyticsProps = {
	isDashboard?: boolean;
};

const UserAnalytics = ({ isDashboard }: UserAnalyticsProps) => {
	const { data, isLoading } = useGetUsersAnalyticsQuery({});

	const analyticsData: any = [];

	data?.users.last12Months.forEach((item: any) => {
		analyticsData.push({ name: item.month, count: item.count });
	});

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<Card className='mt-6 '>
					<div
						className={`${
							isDashboard
								? "mt-[50px] dark:bg-[#111C43] shadow-sm pb-5 rounded-sm"
								: "mt-[50px]"
						}`}
					>
						<div className={`${isDashboard ? "!ml-8 mb-5" : ""}`}>
							<h1
								className={` ${
									isDashboard && "!text-[20px]"
								} px-5 sm:text-3xl text-lg`}
							>
								Users Analytics
							</h1>
							{!isDashboard && (
								<p className='px-5 sm:text-2xl text-base'>
									Last 12 months analytics data{" "}
								</p>
							)}
						</div>

						<div
							className={`w-full ${
								isDashboard ? "h-[30vh]" : "h-screen"
							} flex items-center justify-center`}
						>
							<ResponsiveContainer
								width={isDashboard ? "100%" : "90%"}
								height={!isDashboard ? "50%" : "100%"}
							>
								<AreaChart
									data={analyticsData}
									margin={{
										top: 20,
										right: 30,
										left: 0,
										bottom: 0,
									}}
								>
									<XAxis dataKey='name' />
									<YAxis />
									<Tooltip />
									<Area
										type='monotone'
										dataKey='count'
										stroke='#4d62d9'
										fill='#4d62d9'
									/>
								</AreaChart>
							</ResponsiveContainer>
						</div>
					</div>
				</Card>
			)}
		</>
	);
};

export default UserAnalytics;
