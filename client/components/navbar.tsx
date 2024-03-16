"use client";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Kbd } from "@nextui-org/kbd";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	GithubIcon,
	DiscordIcon,
	HeartFilledIcon,
	SearchIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import { FC, useEffect, useState } from "react";
import SignupModal from "./Auth/signin";
import Authentication from "./Auth/authentication";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import {
	useLogOutQuery,
	useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { avatar } from "@nextui-org/theme";

type Props = {};

const Navbar: FC<Props> = () => {
	const pathname = usePathname();
	const [showAuthentication, setShowAuthentication] = useState(false);
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");

	const { user } = useSelector((state: any) => state.auth);
	const { data } = useSession();
	const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

	const [logout, setLogout] = useState(false);
	const {} = useLogOutQuery(undefined, {
		skip: !logout ? true : false,
	});

	const handleOpenSnackbar = (message: any) => {
		setSnackbarMessage(message);
		setOpenSnackbar(true);
	};

	useEffect(() => {
		if (!user) {
			if (data) {
				socialAuth({
					email: data?.user?.email,
					name: data?.user?.name,
					avatar: data?.user?.image,
				});
				// handleOpenSnackbar("Welcome! You have successfully logged in.");
			}
		}
		if (data === null) {
			if (isSuccess) {
				console.log("Logging successful");
				handleOpenSnackbar("Welcome! You have successfully logged in.");
			}
		}
		if (data === null) {
			setLogout(true);
		}
	}, [data, user]);

	const searchInput = (
		<Input
			aria-label='Search'
			classNames={{
				inputWrapper: "bg-default-100",
				input: "text-sm",
			}}
			endContent={
				<Kbd className='hidden lg:inline-block' keys={["command"]}>
					K
				</Kbd>
			}
			labelPlacement='outside'
			placeholder='Search...'
			startContent={
				<SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
			}
			type='search'
		/>
	);
	const handleAvatarClick = () => {
		setShowAuthentication(true);
	};

	return (
		<>
			<NextUINavbar maxWidth='xl' position='sticky'>
				<NavbarBrand as='li' className='gap-3 max-w-fit'>
					<NextLink className='flex justify-start items-center gap-1' href='/'>
						<Logo />
						<p className='font-bold text-inherit'>LearnifyPro</p>
					</NextLink>
				</NavbarBrand>
				<NavbarContent
					className='hidden lg:flex gap-4 justify-start ml-2'
					justify='start'
				>
					{/* Navbar items */}
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<Link
								className={`link ${pathname === "/" ? "active" : ""}`}
								href={item.href}
								color={pathname === item.href ? "success" : "foreground"}
							>
								{item.label}
							</Link>
						</NavbarItem>
					))}
				</NavbarContent>

				{/* Navbar content */}
				<NavbarContent
					className='hidden sm:flex basis-1/5 sm:basis-full'
					justify='end'
				>
					{/* Other items */}
					<NavbarItem className='hidden sm:flex gap-2'>
						<Link
							isExternal
							href={siteConfig.links.twitter}
							aria-label='Twitter'
						>
							<TwitterIcon className='text-default-500' />
						</Link>
						<Link
							isExternal
							href={siteConfig.links.discord}
							aria-label='Discord'
						>
							<DiscordIcon className='text-default-500' />
						</Link>
						<Link isExternal href={siteConfig.links.github} aria-label='Github'>
							<GithubIcon className='text-default-500' />
						</Link>
						<ThemeSwitch />
					</NavbarItem>
					<NavbarItem className='hidden lg:flex'>{searchInput}</NavbarItem>
					<NavbarItem className='hidden md:flex'>
						<Button
							isExternal
							as={Link}
							className='text-sm font-normal text-default-600 bg-default-100'
							href={siteConfig.links.sponsor}
							startContent={<HeartFilledIcon className='text-danger' />}
							variant='flat'
						>
							Sponsor
						</Button>
					</NavbarItem>
					<NavbarItem className=' md:flex'>
						{/* Avatar with click event to toggle sign-in modal */}
						{user ? (
							<>
								<Link href='/profile'>
									<Avatar
										className=' lg:flex cursor-pointer'
										isBordered
										// height={40}
										radius='full'
										src={
											user.avatar
												? user.avatar.url
												: "https://img.freepik.com/free-photo/view-3d-man-holding-laptop_23-2150709818.jpg?t=st=1709596014~exp=1709599614~hmac=123a2af7e09c6c82b82801146d728478720e61efbadc943eafac84625951ac51&w=740"
										}
									/>
								</Link>
							</>
						) : (
							<Avatar
								className='hidden lg:flex cursor-pointer'
								isBordered
								radius='full'
								src='https://i.pravatar.cc/150?u=a04258114e29026708c'
								onClick={handleAvatarClick}
							/>
						)}
					</NavbarItem>
				</NavbarContent>

				{/* Navbar menu */}
				<NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
					<NavbarItem>
						{/* Avatar with click event to toggle sign-in modal */}
						{user ? (
							<>
								<Link href='/profile'>
									<Avatar
										className=' lg:flex cursor-pointer'
										isBordered
										// height={40}
										radius='full'
										src={
											user.avatar
												? user.avatar.url
												: "https://img.freepik.com/free-photo/view-3d-man-holding-laptop_23-2150709818.jpg?t=st=1709596014~exp=1709599614~hmac=123a2af7e09c6c82b82801146d728478720e61efbadc943eafac84625951ac51&w=740"
										}
									/>
								</Link>
							</>
						) : (
							<Avatar
								className='hidden lg:flex cursor-pointer'
								isBordered
								radius='full'
								src='https://i.pravatar.cc/150?u=a04258114e29026708c'
								onClick={handleAvatarClick}
							/>
						)}
					</NavbarItem>
					<ThemeSwitch />
					<NavbarMenuToggle />
				</NavbarContent>

				<NavbarMenu>
					{searchInput}
					<div className='mx-4 mt-2 flex flex-col gap-2'>
						{siteConfig.navMenuItems.map((item, index) => (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									className={`link ${pathname === item.href ? "active" : ""}`}
									color={
										index === siteConfig.navMenuItems.length - 1
											? "danger"
											: pathname === item.href
											? "success"
											: "foreground"
									}
									href={item.href}
									size='lg'
								>
									{item.label}
								</Link>
							</NavbarMenuItem>
						))}
					</div>
				</NavbarMenu>
			</NextUINavbar>
			{showAuthentication && (
				<Authentication onClose={() => setShowAuthentication(false)} />
			)}
			<Snackbar
				open={openSnackbar}
				autoHideDuration={6000} // Adjust the duration as needed
				onClose={() => setOpenSnackbar(false)}
			>
				<MuiAlert
					elevation={6}
					variant='filled'
					onClose={() => setOpenSnackbar(false)}
					severity='success' // Change severity to 'error' or 'warning' as needed
				>
					{snackbarMessage}
				</MuiAlert>
			</Snackbar>
		</>
	);
};

export default Navbar;
