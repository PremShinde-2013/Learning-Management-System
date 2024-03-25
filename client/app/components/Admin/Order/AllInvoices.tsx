import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useTheme } from "next-themes";
import { format } from "timeago.js";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import Loader from "../../Loader/Loader";
import { useGetAllOrdersQuery } from "@/redux/features/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { MailIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { MailRounded } from "@mui/icons-material";

type AllInvoicesProps = {
	isDashboard?: boolean;
};

const AllInvoices = ({ isDashboard }: AllInvoicesProps) => {
	const { theme, setTheme } = useTheme();

	const { isLoading, data } = useGetAllOrdersQuery({});

	const { data: usersData } = useGetAllUsersQuery({});

	const { data: coursesData } = useGetAllCoursesQuery({});

	const [orderData, setOrderData] = useState<any>([]);

	useEffect(() => {
		if (data) {
			const temp = data.orders.map((item: any) => {
				const user = usersData?.users.find(
					(user: any) => user._id === item.userId
				);

				const course = coursesData?.courses.find(
					(course: any) => course._id === item.courseId
				);

				return {
					...item,
					userName: user?.name,
					userEmail: user?.email,
					title: course?.name,
					price: `€${course?.price}`,
				};
			});

			setOrderData(temp);
		}
	}, [data, usersData, coursesData]);

	const columns: any = [
		{ field: "id", headerName: "ID", flex: 0.3 },
		{ field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
		...(isDashboard
			? []
			: [
					{ field: "userEmail", headerName: "Email", flex: 1 },
					{ field: "title", headerName: "Course Title", flex: 1 },
			  ]),
		{ field: "price", headerName: "Price", flex: 0.5 },
		...(isDashboard
			? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
			: [
					{
						field: " ",
						headerName: "Email",
						flex: 0.2,
						renderCell: (params: any) => {
							return (
								<a href={`mailto:${params.row.userEmail}`}>
									<Button isIconOnly variant='faded' color='primary'>
										<MailRounded />
									</Button>
								</a>
							);
						},
					},
			  ]),
	];

	const rows: any = [];

	orderData?.forEach((item: any) => {
		rows.push({
			id: item._id,
			userName: item.userName,
			userEmail: item.userEmail,
			title: item.title,
			price: item.price,
			created_at: format(item.createdAt),
		});
	});

	return (
		<div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
			{isLoading ? (
				<Loader />
			) : (
				<Box m={isDashboard ? "0" : "40px"}>
					<Box
						m={isDashboard ? "0" : "40px 0 0 0"}
						height={isDashboard ? "35vh" : "90vh"}
						overflow={"hidden"}
						sx={{
							// Update styles based on the current theme
							"& .MuiDataGrid-root .MuiDataGrid-columnHeader:not(.MuiDataGrid-columnHeader--sorted) .MuiDataGrid-sortIcon":
								{
									fill: theme === "dark" ? "#fff" : "#000",
								},
							"& .MuiDataGrid-columnHeaderTitle": {
								color: theme === "dark" ? "#000" : "#000",
								borderBottom:
									theme === "dark"
										? "1px solid #ffffff30!important"
										: "1px solid #ccc!important",
							},
							"& .MuiDataGrid-root": {
								border:
									theme === "dark"
										? "1px solid #ffffff30!important"
										: "1px solid #ccc!important",
								outline:
									theme === "dark"
										? "1px solid #ffffff30!important"
										: "1px solid #ccc!important",
							},
							"& .MuiDataGrid-row": {
								color: theme === "dark" ? "#fff" : "#000",
								borderBottom:
									theme === "dark"
										? "1px solid #ffffff30!important"
										: "1px solid #ccc!important",
							},
							"& .MuiDataGrid-columnHeaders": {
								backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
								borderBottom: "none",
								color: theme === "dark" ? "#fff" : "#000",
							},
							"& .MuiDataGrid-virtualScroller": {
								backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
							},
							"& .MuiDataGrid-footerContainer": {
								color: theme === "dark" ? "#fff" : "#000",
								borderTop: "none",
								backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
							},
							"& .MuiCheckbox-root": {
								color:
									theme === "dark" ? "#b7ebde !important" : "#000 !important",
							},
							"& .MuiDataGrid-toolbarContainer .MuiButton-text": {
								color: "#fff !important",
							},
						}}
					>
						<DataGrid
							checkboxSelection={isDashboard ? false : true}
							rows={rows}
							columns={columns}
							// components={
							// 	isDashboard
							// 		? {}
							// 		: ({ Toolbar: GridToolbar } as DataGridComponents)
							// }
						/>
					</Box>
				</Box>
			)}
		</div>
	);
};

export default AllInvoices;
