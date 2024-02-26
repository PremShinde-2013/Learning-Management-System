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
import FaceIcon from "@mui/icons-material/Face";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	Checkbox,
} from "@nextui-org/react";
import { MailIcon } from "./icons";
import { LockIcon } from "./icons";

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
import { ModalFooter } from "@nextui-org/react";
import { useState } from "react";

export const Navbar = () => {
	const pathname = usePathname();

	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [visible, setVisible] = useState(false);
	const [password, setPassword] = useState("");
	const toggleVisibility = () => {
		setVisible(!visible);
	};

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
					<Button onPress={onOpen} color='default' className='bg-transparent'>
						<Avatar
							className='hidden lg:flex'
							isBordered
							radius='full'
							src='https://i.pravatar.cc/150?u=a04258114e29026708c'
						/>{" "}
					</Button>
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
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									endContent={
										<FaceIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Name'
									placeholder='Enter your name'
									variant='bordered'
								/>
								<Input
									autoFocus
									endContent={
										<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Email'
									placeholder='Enter your email'
									variant='bordered'
								/>
								<Input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									endContent={
										visible ? (
											<VisibilityRoundedIcon
												className='text-2xl text-default-400 pointer-events-none flex-shrink-0'
												onClick={toggleVisibility}
											/>
										) : (
											<VisibilityOffRoundedIcon
												className='text-2xl text-default-400 pointer-events-none flex-shrink-0'
												onClick={toggleVisibility}
											/>
										)
									}
									label='Password'
									placeholder='Enter your password'
									type={visible ? "text" : "password"}
									variant='bordered'
								/>
								<div className='flex py-2 px-1 justify-between'>
									<Checkbox
										classNames={{
											label: "text-small",
										}}
										onClick={toggleVisibility}
									>
										Show Password
									</Checkbox>
									<Link color='primary' href='#' size='sm'>
										Forgot password?
									</Link>
								</div>
								<Button color='primary' variant='shadow' onPress={onClose}>
									Sign in
								</Button>
								<div className='flex py-2 px-1 justify-center gap-4'>
									<h1> or join us with</h1>
								</div>

								<div className='flex py-2 px-1 justify-center gap-4'>
									<GoogleIcon />
									<GitHubIcon />
								</div>
								<div className='flex py-2 px-1 justify-center gap-4'>
									<h1>Already have an account?</h1>
									<Link onClick={onOpen}>Sign in</Link>
								</div>
							</ModalBody>

							<ModalFooter>
								<Button color='danger' variant='flat' onPress={onClose}>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'>Sign in</ModalHeader>
							<ModalBody>
								<Input
									autoFocus
									endContent={
										<FaceIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Name'
									placeholder='Enter your name'
									variant='bordered'
								/>
								<Input
									autoFocus
									endContent={
										<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />
									}
									label='Email'
									placeholder='Enter your email'
									variant='bordered'
								/>
								<Input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									endContent={
										visible ? (
											<VisibilityRoundedIcon
												className='text-2xl text-default-400 pointer-events-none flex-shrink-0'
												onClick={toggleVisibility}
											/>
										) : (
											<VisibilityOffRoundedIcon
												className='text-2xl text-default-400 pointer-events-none flex-shrink-0'
												onClick={toggleVisibility}
											/>
										)
									}
									label='Password'
									placeholder='Enter your password'
									type={visible ? "text" : "password"}
									variant='bordered'
								/>
								<div className='flex py-2 px-1 justify-between'>
									<Checkbox
										classNames={{
											label: "text-small",
										}}
										onClick={toggleVisibility}
									>
										Show Password
									</Checkbox>
									<Link color='primary' href='#' size='sm'>
										Forgot password?
									</Link>
								</div>
								<Button color='primary' variant='shadow' onPress={onClose}>
									Sign in
								</Button>
								<div className='flex py-2 px-1 justify-center gap-4'>
									<h1> or join us with</h1>
								</div>

								<div className='flex py-2 px-1 justify-center gap-4'>
									<GoogleIcon />
									<GitHubIcon />
								</div>
								<div className='flex py-2 px-1 justify-center gap-4'>
									<h1>Already have an account?</h1>
									<Link href='/'>Sign in</Link>
								</div>
							</ModalBody>

							<ModalFooter>
								<Button color='danger' variant='flat' onPress={onClose}>
									Close
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</NextUINavbar>
	);
};
