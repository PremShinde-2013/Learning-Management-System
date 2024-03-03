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
import { FC, useState } from "react";
import SignupModal from "./Auth/signin";
import Authentication from "./Auth/authentication";

type Props = {};

const Navbar: FC<Props> = () => {
	const pathname = usePathname();
	const [showAuthentication, setShowAuthentication] = useState(false);

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
				{/* Navbar content here */}
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
					<NavbarItem className='hidden md:flex'>
						{/* Avatar with click event to toggle sign-in modal */}
						<Avatar
							className='hidden lg:flex cursor-pointer'
							isBordered
							radius='full'
							src='https://i.pravatar.cc/150?u=a04258114e29026708c'
							onClick={handleAvatarClick}
						/>
					</NavbarItem>
				</NavbarContent>

				{/* Navbar menu */}
				<NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
					{/* <Link isExternal href={siteConfig.links.github} aria-label='Github'>
						<GithubIcon className='text-default-500' />
					</Link> */}
					<Avatar
						className='  cursor-pointer'
						isBordered
						radius='full'
						src='https://i.pravatar.cc/150?u=a04258114e29026708c'
						onClick={handleAvatarClick}
					/>
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
		</>
	);
};

export default Navbar;
