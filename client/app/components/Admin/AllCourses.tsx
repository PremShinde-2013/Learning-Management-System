import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import { Button } from "@nextui-org/button";
import { ThemeSwitch, ThemeSwitchProps } from "@/components/theme-switch";
import { useTheme } from "next-themes";
import {
	useDeleteCourseMutation,
	useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import Link from "next/link";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Loader from "../Loader/Loader";
import { format } from "timeago.js";
import { useDisclosure } from "@nextui-org/react";
import toast from "react-hot-toast";

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "@nextui-org/react";

const AllCourses = () => {
	const { theme, setTheme } = useTheme(); // Use useTheme hook to access theme state and setter
	const { isOpen, onOpenChange } = useDisclosure(); // Changed to destructured variables

	const columns = [
		{ field: "id", headerName: "ID", flex: 0.5 },
		{ field: "title", headerName: "Course Title", flex: 1 },
		{ field: "ratings", headerName: "Rating", flex: 0.5 },
		{ field: "purchased", headerName: "Purchased", flex: 0.5 },
		{ field: "created_at", headerName: "Created At", flex: 0.5 },
		{
			field: "  ",
			headerName: "Edit",
			flex: 0.2,
			renderCell: (params: any) => {
				return (
					<Link href={`/admin/edit-course/${params.row.id}`}>
						<div className='flex justify-start align-middle mt-2'>
							<Button
								isIconOnly
								color='success'
								variant='faded'
								aria-label='Take a photo'
							>
								<EditRoundedIcon />
							</Button>
						</div>

						{/* <EditRoundedIcon className='dark:text-white text-black' /> */}
					</Link>
				);
			},
		},
		{
			field: "",
			headerName: "Delete",
			flex: 0.5,
			renderCell: (params: any) => {
				return (
					<div className='flex justify-start align-middle mt-2'>
						<Button
							isIconOnly
							color='danger'
							variant='faded'
							aria-label='Delete'
							onClick={() => {
								onOpenChange(); // Open the modal

								setCourseId(params.row.id);
							}}
						>
							<DeleteRounded />
						</Button>
					</div>
				);
			},
		},
	];
	//   const {isOpen, onOpen, onOpenChange} = useDisclosure();

	const toggleTheme = () => {
		// Toggle between light and dark themes
		setTheme(theme === "light" ? "dark" : "light");
	};

	const [courseId, setCourseId] = useState("");

	const { isLoading, data, refetch } = useGetAllCoursesQuery(
		{},
		{ refetchOnMountOrArgChange: true }
	);

	const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

	const rows: any = [];
	{
		data?.courses.forEach((item: any) => {
			rows.push({
				id: item._id,
				title: item.name,
				ratings: item.ratings,
				purchased: item.purchased,
				created_at: format(item.createdAt),
			});
		});
	}

	useEffect(() => {
		if (isSuccess) {
			onOpenChange();
			refetch();
			toast.success("Course Deleted Successfully");
		}
		if (error && "data" in error) {
			const errorMessage = error as any;
			toast.error(errorMessage.data.message);
		}
	}, [isSuccess, error, refetch]);

	const handleDelete = async () => {
		await deleteCourse(courseId);
	};

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<Box m='20px'>
					<ThemeSwitch toggleTheme={toggleTheme} />{" "}
					<Box
						m='40px 0 0 0'
						height='80vh'
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
						<DataGrid checkboxSelection rows={rows} columns={columns} />
					</Box>
					<Modal isOpen={isOpen} onClose={onOpenChange}>
						<ModalContent>
							<ModalHeader className='flex flex-col gap-1'>
								Delete Course
							</ModalHeader>
							<ModalBody>
								<p>Are you sure you want to delete this course?</p>
							</ModalBody>
							<ModalFooter>
								<Button color='primary' variant='flat' onClick={onOpenChange}>
									Cancel
								</Button>
								<Button color='primary' onClick={handleDelete}>
									Delete
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
				</Box>
			)}
		</div>
	);
};

export default AllCourses;
