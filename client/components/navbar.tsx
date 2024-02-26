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
import { link as linkStyles } from "@nextui-org/theme";

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

export const Navbar = () => {
	const pathname = usePathname();

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

	return (
		<NextUINavbar maxWidth='xl' position='sticky'>
			<NavbarContent className='basis-1/5 sm:basis-full' justify='start'>
				<NavbarBrand as='li' className='gap-3 max-w-fit'>
					<NextLink className='flex justify-start items-center gap-1' href='/'>
						<Logo />
						<p className='font-bold text-inherit'>LearnifyPro</p>
					</NextLink>
				</NavbarBrand>
				<ul className='hidden lg:flex gap-4 justify-start ml-2'>
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
				</ul>
			</NavbarContent>

			<NavbarContent
				className='hidden sm:flex basis-1/5 sm:basis-full'
				justify='end'
			>
				<NavbarItem className='hidden sm:flex gap-2'>
					<Link isExternal href={siteConfig.links.twitter} aria-label='Twitter'>
						<TwitterIcon className='text-default-500' />
					</Link>
					<Link isExternal href={siteConfig.links.discord} aria-label='Discord'>
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
					<Avatar
						className='hidden lg:flex'
						isBordered
						radius='full'
						src='https://i.pravatar.cc/150?u=a04258114e29026708c'
					/>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className='sm:hidden basis-1 pl-4' justify='end'>
				<Link isExternal href={siteConfig.links.github} aria-label='Github'>
					<GithubIcon className='text-default-500' />
				</Link>
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
									// index === 0
									// 	? "success"
									// 	:
									index === siteConfig.navMenuItems.length - 1
										? "danger"
										: pathname === item.href
										? "success" // Set color to green when active
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
	);
};
