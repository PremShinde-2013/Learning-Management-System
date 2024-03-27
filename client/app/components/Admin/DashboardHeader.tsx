/* eslint-disable react/jsx-key */
"use client";
import { Button } from "@nextui-org/button";
import {
	Dropdown,
	DropdownTrigger,
	Badge,
	DropdownMenu,
	DropdownItem,
	Divider,
} from "@nextui-org/react";
import React, { FC, useCallback, useEffect, useState } from "react";
import socketIO from "socket.io-client";

import NotificationIcon from "@/components/icons";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Typography } from "@mui/material";
import {
	useGetAllNotificationsQuery,
	useUpdateNotificationStatusMutation,
} from "@/redux/features/notifications/notificationsApi";
import { format } from "timeago.js";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
	open?: boolean;
	setOpen?: any;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
	const { data, refetch } = useGetAllNotificationsQuery(undefined, {
		refetchOnMountOrArgChange: true,
	});

	const [updateNotificationStatus, { isSuccess }] =
		useUpdateNotificationStatusMutation();

	const [notifications, setNotifications] = useState<any>([]);

	const [audio] = useState<any>(
		typeof window !== "undefined" &&
			new Audio(
				"https://res.cloudinary.com/dwglmyvi3/video/upload/v1711552482/notification/hey_-it_s-me_-goku_-made-with-Voicemod_ow0b1v.mp3"
			)
	);

	const playNotificationSound = useCallback(() => {
		audio.play();
	}, [audio]);

	useEffect(() => {
		if (data) {
			setNotifications(
				data.notifications.filter((item: any) => item.status === "unread")
			);
		}

		if (isSuccess) {
			refetch();
		}

		audio.load();
	}, [data, isSuccess, audio, refetch]);

	useEffect(() => {
		socketId.on("newNotification", (data) => {
			refetch();
			playNotificationSound();
		});
	}, [playNotificationSound, refetch]);

	const handleNotificationStatusChange = async (id: string) => {
		await updateNotificationStatus(id);
	};

	return (
		<div className='flex justify-end gap-4'>
			<Dropdown placement='bottom-end'>
				<DropdownTrigger>
					{/* <Avatar
						isBordered
						as='button'
						className='transition-transform'
						src='https://i.pravatar.cc/150?u=a042581f4e29026704d'
					/> */}
					<Badge
						content={notifications && notifications.length}
						shape='circle'
						color='danger'
						className='cursor-pointer'
					>
						<Button
							radius='full'
							isIconOnly
							aria-label='more than 99 notifications'
							variant='light'
						>
							<NotificationIcon size={24} />
						</Button>
					</Badge>
				</DropdownTrigger>

				<DropdownMenu
					aria-label='Profile Actions'
					variant='flat'
					className='md:w-80 h-96 overflow-y-auto w-48' // Set a fixed height with overflow-y auto
				>
					<DropdownItem className='h-14 gap-2' isReadOnly>
						<p className='font-semibold p-3 flex justify-center'>
							Notifications
						</p>
						<Divider />
					</DropdownItem>
					{/* Iterate over notifications and render each as a DropdownItem */}
					{notifications.map((item: any) => (
						<DropdownItem key={item._id} isReadOnly>
							<div className='flex flex-col md:items-center md:justify-between gap-1 md:gap-1'>
								<div className='md:flex-grow flex-row whitespace-normal justify-between'>
									<Typography>{item.title}</Typography>
								</div>
								<div className='md:flex-grow md:text-center whitespace-normal'>
									<div className='text-wrap'>{item.message}</div>
								</div>
								<div className='flex flex-row gap-9'>
									<Typography>{format(item.createdAt)}</Typography>
									<DoneAllIcon
										onClick={() => handleNotificationStatusChange(item._id)}
									/>
								</div>
								<Divider className='my-2' />
							</div>
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};

export default DashboardHeader;
