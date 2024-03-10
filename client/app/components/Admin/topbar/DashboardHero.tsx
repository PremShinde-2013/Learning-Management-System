"use client";

import React, { FC, useEffect, useState } from "react";

import {
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Avatar,
	User,
	Badge,
	Button,
	Divider,
} from "@nextui-org/react";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import NotificationIcon from "@/components/icons";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { Typography } from "@mui/material";

type Props = {};

const DashboardHero: FC<Props> = () => {
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
						content='99+'
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
					className='md:w-80'
				>
					<DropdownItem className='h-14  gap-2' isReadOnly>
						<p className='font-semibold p-3 flex justify-center'>
							Notifications
						</p>
						<Divider />
					</DropdownItem>
					<DropdownItem isReadOnly>
						<div className='flex flex-col md:items-center md:justify-between gap-1 md:gap-1'>
							<div
								className='md:flex-grow 
							flex-row whitespace-normal justify-between'
							>
								<Typography>New Question Received</Typography>
							</div>
							<div className='md:flex-grow md:text-center whitespace-normal'>
								<div className='text-wrap'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Deserunt dolorem numquam amet, magnam doloribus voluptate?
								</div>
							</div>
							<div className='flex flex-row gap-9'>
								<Typography>5 days ago</Typography>
								<DoneAllIcon />
							</div>
							<Divider className='my-2' />
						</div>
					</DropdownItem>
					<DropdownItem isReadOnly>
						<div className='flex flex-col md:items-center md:justify-between gap-1 md:gap-1'>
							<div
								className='md:flex-grow 
							flex-row whitespace-normal justify-between'
							>
								<Typography>New Question Received</Typography>
							</div>
							<div className='md:flex-grow md:text-center whitespace-normal'>
								<div className='text-wrap'>
									Lorem ipsum dolor sit amet consectetur adipisicing elit.
									Deserunt dolorem numquam amet, magnam doloribus voluptate?
								</div>
							</div>
							<div className='flex flex-row gap-9'>
								<Typography>5 days ago</Typography>
								<DoneAllIcon />
							</div>
						</div>
						<Divider className='my-2' />
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};

export default DashboardHero;
