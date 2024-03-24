import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Select } from "@mui/material";
import DeleteRounded from "@mui/icons-material/DeleteRounded";
import { Button } from "@nextui-org/button";
import { ThemeSwitch, ThemeSwitchProps } from "@/components/theme-switch";
import toast from "react-hot-toast";

import { useTheme } from "next-themes";
import {
	useDeleteUserMutation,
	useGetAllUsersQuery,
	useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import Link from "next/link";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { Divider, Input, SelectItem, useDisclosure } from "@nextui-org/react";

type AllCoursesProps = {
	isTeam?: boolean;
};

import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
} from "@nextui-org/react";
import { MailIcon } from "../../icons";
import { MailRounded } from "@mui/icons-material";
import { on } from "events";

const AllUsers = ({ isTeam }: AllCoursesProps) => {
	const { theme, setTheme } = useTheme(); // Use useTheme hook to access theme state and setter
	const {
		isOpen: isNewMemberModalOpen,
		onOpenChange: onNewMemberModalOpenChange,
	} = useDisclosure();
	const {
		isOpen: isDeleteUserModalOpen,
		onOpenChange: onDeleteUserModalOpenChange,
	} = useDisclosure();

	const [active, setActive] = useState(false);

	const [email, setEmail] = useState("");

	const [role, setRole] = useState("admin");
	const [userId, setUserId] = useState("");
	const [updateUserRole, { error: updateError, isSuccess }] =
		useUpdateUserRoleMutation();

	const { isLoading, data, refetch } = useGetAllUsersQuery(
		{},
		{ refetchOnMountOrArgChange: true }
	);

	const columns = [
		{ field: "id", headerName: "ID", flex: 0.3 },
		{ field: "name", headerName: "Name", flex: 0.5 },
		{ field: "email", headerName: "Email", flex: 0.5 },
		{ field: "role", headerName: "Role", flex: 0.5 },
		{ field: "courses", headerName: "Purchased Courses", flex: 0.5 },
		{ field: "created_at", headerName: "Joined At", flex: 0.5 },
		{
			field: " ",
			headerName: "Delete",
			flex: 0.2,
			renderCell: (params: any) => {
				return (
					<Button
						isIconOnly
						variant='faded'
						color='danger'
						onClick={() => {
							onDeleteUserModalOpenChange();
							setUserId(params.row.id);
						}}
					>
						<DeleteRounded />
					</Button>
				);
			},
		},
		{
			field: "  ",
			headerName: "Email",
			flex: 0.2,
			renderCell: (params: any) => {
				return (
					<a href={`mailto:${params.row.email}`}>
						<Button isIconOnly variant='faded' color='primary'>
							<MailRounded />
						</Button>
					</a>
				);
			},
		},
	];

	const rows: any = [];

	const toggleTheme = () => {
		// Toggle between light and dark themes
		setTheme(theme === "light" ? "dark" : "light");
	};

	if (isTeam) {
		const newData = data?.users.filter((item: any) => item.role === "admin");

		newData?.forEach((item: any) => {
			rows.push({
				id: item._id,
				name: item.name,
				email: item.email,
				role: item.role,
				courses: item.courses.length,
				created_at: format(item.createdAt),
			});
		});
	} else {
		data?.users.forEach((item: any) => {
			rows.push({
				id: item._id,
				name: item.name,
				email: item.email,
				role: item.role,
				courses: item.courses.length,
				created_at: format(item.createdAt),
			});
		});
	}
	const [courseId, setCourseId] = useState("");

	const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
		useDeleteUserMutation({});

	const handleSubmit = async () => {
		await updateUserRole({ email, role });
	};

	const handleDelete = async () => {
		await deleteUser(userId);
	};

	useEffect(() => {
		if (updateError && "data" in updateError) {
			const errorMessage = updateError as any;
			toast.error(errorMessage.data.message);
		}

		if (isSuccess) {
			refetch();
			toast.success("User role updated successfully");
			// setActive(false);
			onNewMemberModalOpenChange();
		}

		if (deleteSuccess) {
			refetch();
			toast.success("Delete user successfully!");
			// setOpen(false);
			// onOpenChange();
			onDeleteUserModalOpenChange();
			// onNewMemberModalOpenChange();
		}

		if (deleteError && "data" in deleteError) {
			const errorMessage = deleteError as any;
			toast.error(errorMessage.data.message);
		}
	}, [updateError, isSuccess, deleteSuccess, deleteError, refetch]);

	return (
		<div>
			{isLoading ? (
				<Loader />
			) : (
				<Box m='20px'>
					{isTeam && (
						<div className='w-full flex justify-end'>
							<Button
								variant='flat'
								color='danger'
								onClick={() => onNewMemberModalOpenChange()}
							>
								Add New Member
							</Button>
						</div>
					)}{" "}
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
					<Modal
						isOpen={isNewMemberModalOpen}
						onClose={onNewMemberModalOpenChange}
					>
						<ModalContent>
							<ModalHeader className='flex flex-col gap-1'>
								Add New Member
							</ModalHeader>
							<ModalBody>
								<div className='mt-4'>
									<Input
										type='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										placeholder='Enter email...'
									/>

									<select
										className='my-4'
										name=''
										id=''
										onChange={(e: any) => setRole(e.target.value)}
									>
										<option value='admin'>Admin</option>
										<option value='user'>User</option>
									</select>
									<Divider />
								</div>
							</ModalBody>
							<ModalFooter>
								<Button
									color='primary'
									variant='flat'
									onClick={onNewMemberModalOpenChange}
								>
									Cancel
								</Button>
								<Button color='primary' onClick={handleSubmit}>
									Submit
								</Button>
							</ModalFooter>
						</ModalContent>
					</Modal>
					<Modal
						isOpen={isDeleteUserModalOpen}
						onClose={onDeleteUserModalOpenChange}
					>
						<ModalContent>
							<ModalHeader className='flex flex-col gap-1'>
								Delete User
							</ModalHeader>
							<ModalBody>
								<p>Are you sure you want to delete this user?</p>
							</ModalBody>
							<ModalFooter>
								<Button
									color='primary'
									variant='flat'
									onClick={onDeleteUserModalOpenChange}
								>
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

export default AllUsers;
