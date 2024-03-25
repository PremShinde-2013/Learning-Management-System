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
import DashboardHeader from "../DashboardHeader";
import DashboardWidgets from "../Widgets/DashboardWidgets";

type Props = {
	isDashboard?: boolean;
};

const DashboardHero: FC<Props> = ({ isDashboard }: Props) => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<DashboardHeader open={open} setOpen={setOpen} />

			{isDashboard && <DashboardWidgets open={open} />}
		</>
	);
};

export default DashboardHero;
