"use client";
import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";

const Sidebar = () => {
	const [isCollapsed, setIsCollapsed] = useState(false);
	const [selected, setSelected] = useState("Dashboard");

	return (
		<Box className='flex'>
			<ProSidebar collapsed={isCollapsed}>
				<Menu iconShape='square'>
					{/* LOGO AND MENU ICON */}
					<MenuItem
						onClick={() => setIsCollapsed(!isCollapsed)}
						icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
						className='mb-5'
					>
						{!isCollapsed && (
							<Box className='flex justify-between items-center ml-5'>
								<Typography variant='h3' className='text-white'>
									ADMINIS
								</Typography>
								<IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
									<MenuOutlinedIcon />
								</IconButton>
							</Box>
						)}
					</MenuItem>

					{!isCollapsed && (
						<Box className='mb-8'>
							<Box className='flex justify-center items-center'>
								<img
									alt='profile-user'
									width='100'
									height='100'
									src={`../../assets/user.png`}
									style={{ cursor: "pointer", borderRadius: "50%" }}
								/>
							</Box>
							<Box className='text-center'>
								<Typography variant='h2' className='text-white font-bold mt-4'>
									Ed Roh
								</Typography>
								<Typography variant='h5' className='text-green-500'>
									VP Fancy Admin
								</Typography>
							</Box>
						</Box>
					)}

					<Box className={isCollapsed ? undefined : "pl-10"}>
						<MenuItem className='hover:text-blue-500'>
							<Link href='/' passHref>
								<Typography>
									<HomeOutlinedIcon />
									{!isCollapsed && <span className='ml-2'>Dashboard</span>}
								</Typography>
							</Link>
						</MenuItem>

						<Typography variant='h6' className='text-gray-300 mt-5'>
							Data
						</Typography>
						<MenuItem className='hover:text-blue-500'>
							<Link href='/team' passHref>
								<Typography>
									<PeopleOutlinedIcon />
									{!isCollapsed && <span className='ml-2'>Manage Team</span>}
								</Typography>
							</Link>
						</MenuItem>
						<MenuItem className='hover:text-blue-500'>
							<Link href='/contacts' passHref>
								<Typography>
									<ContactsOutlinedIcon />
									{!isCollapsed && (
										<span className='ml-2'>Contacts Information</span>
									)}
								</Typography>
							</Link>
						</MenuItem>
						<MenuItem className='hover:text-blue-500'>
							<Link href='/invoices' passHref>
								<Typography>
									<ReceiptOutlinedIcon />
									{!isCollapsed && (
										<span className='ml-2'>Invoices Balances</span>
									)}
								</Typography>
							</Link>
						</MenuItem>

						<Typography variant='h6' className='text-gray-300 mt-5'>
							Pages
						</Typography>
						<MenuItem className='hover:text-blue-500'>
							<Link href='/form' passHref>
								<Typography>
									<PersonOutlinedIcon />
									{!isCollapsed && <span className='ml-2'>Profile Form</span>}
								</Typography>
							</Link>
						</MenuItem>
						<MenuItem className='hover:text-blue-500'>
							<Link href='/calendar' passHref>
								<Typography>
									<CalendarTodayOutlinedIcon />
									{!isCollapsed && <span className='ml-2'>Calendar</span>}
								</Typography>
							</Link>
						</MenuItem>
						<MenuItem className='hover:text-blue-500'>
							<Link href='/faq' passHref>
								<Typography>
									<HelpOutlineOutlinedIcon />
									{!isCollapsed && <span className='ml-2'>FAQ Page</span>}
								</Typography>
							</Link>
						</MenuItem>

						<Typography variant='h6' className='text-gray-300 mt-5'>
							Charts
						</Typography>
						<MenuItem className='hover:text-blue-500'>
							<Link href='/bar' passHref>
								<Typography>
									<BarChartOutlinedIcon />
									{!isCollapsed && <span className='ml-2'>Bar Chart</span>}
								</Typography>
							</Link>
						</MenuItem>
						<MenuItem className='hover:text-blue-500'>
							<Link href='/pie' passHref>
								<Typography>
									<PieChartOutlineOutlinedIcon />
									{!isCollapsed && <span className='ml-2'>Pie Chart</span>}
								</Typography>
							</Link>
						</MenuItem>
						<MenuItem className='hover:text-blue-500'>
							<Link href='/line' passHref>
								<Typography>
									<TimelineOutlinedIcon />
									{!isCollapsed && <span className='ml-2'>Line Chart</span>}
								</Typography>
							</Link>
						</MenuItem>
						<MenuItem className='hover:text-blue-500'>
							<Link href='/geography' passHref>
								<Typography>
									<MapOutlinedIcon />
									{!isCollapsed && (
										<span className='ml-2'>Geography Chart</span>
									)}
								</Typography>
							</Link>
						</MenuItem>
					</Box>
				</Menu>
			</ProSidebar>
		</Box>
	);
};

export default Sidebar;
