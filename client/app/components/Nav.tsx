"use client";
import React from 'react';
import { Navbar, NavbarBrand, NavbarMenuToggle, NavbarMenuItem, NavbarMenu, NavbarContent, NavbarItem, Link, Button, Input, Avatar } from "@nextui-org/react";


import { Kbd } from "@nextui-org/kbd";
import { AvatarGroup, AvatarIcon } from "@nextui-org/avatar";

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
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";

import { Logo } from "@/components/icons";
import { FC, useEffect, useState } from "react";
import SignupModal from "./Auth/signin";
import Authentication from "../components/Auth/authentication";
// import Authentication from "./Auth/authentication";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";
import {
    useLogOutQuery,
    useSocialAuthMutation,
} from "@/redux/features/auth/authApi";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { avatar } from "@nextui-org/theme";
import Loader from "./Loader/Loader";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { title } from '@/components/primitives';
type Props = {};

const Nav = (props: Props) => {


    const [isMenuOpen, setIsMenuOpen] = React.useState(false);



    const pathname = usePathname();
    const [showAuthentication, setShowAuthentication] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const { theme, setTheme } = useTheme(); // Use useTheme hook to access theme state and setter

    const {
        data: userData,
        isLoading,
        refetch,
    } = useLoadUserQuery(undefined, {});

    const { user } = useSelector((state: any) => state.auth);
    const { data } = useSession();
    const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();

    const [logout, setLogout] = useState(false);
    const { } = useLogOutQuery(undefined, {
        skip: !logout ? true : false,
    });

    const handleOpenSnackbar = (message: any) => {
        setSnackbarMessage(message);
        setOpenSnackbar(true);
    };
    const toggleTheme = () => {
        // Toggle between light and dark themes
        setTheme(theme === "light" ? "dark" : "light");
    };
    useEffect(() => {
        if (isLoading) {
            return;
        }

        if (!userData && data) {
            socialAuth({
                email: data?.user?.email,
                name: data?.user?.name,
                avatar: data.user?.image,
            });
            refetch();
        }

        if (data === null && isSuccess) {
            handleOpenSnackbar("Welcome! You have successfully logged in.");
        }

        if (error && "data" in error) {
            const errorData = error as any;
            // toast.error(errorData.data.message);
            handleOpenSnackbar(errorData.data.message);
        }

        if (data === null && !isLoading && !userData) {
            setLogout(true);
        }
    }, [error, data, userData, isLoading, socialAuth, refetch, isSuccess]);

    const [search, setSearch] = useState("");

    const router = useRouter();

    const handleSearch = () => {
        if (search === "") {
            return;
        }
        router.push(`/courses?title=${search}`);
    };

    const searchInput = (
        <>
            <Input
                type='search'
                value={search}
                aria-label='Search'
                placeholder='Search Courses...'
                onChange={(e) => setSearch(e.target.value)}
                onClick={handleSearch}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm",
                }}
                endContent={
                    <Kbd
                        className='hidden lg:inline-block cursor-pointer'
                        keys={["enter"]}
                        onClick={handleSearch}
                    >
                        Submit
                    </Kbd>
                }
                labelPlacement='outside'
                startContent={
                    <SearchIcon className='text-base text-default-400 pointer-events-none flex-shrink-0' />
                }
            />
        </>
    );
    const handleAvatarClick = () => {
        setShowAuthentication(true);
    };

    const isActive = (path: string | null) => pathname === path;
    return (

        <>
            {isLoading ? (
                <Loader />
            ) : (

                <>

                    <Navbar

                        isBlurred

                        maxWidth='xl'
                        isMenuOpen={isMenuOpen}
                        onMenuOpenChange={setIsMenuOpen}

                    >
                        <NavbarContent className="sm:hidden" justify="start">
                            <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
                        </NavbarContent>
                        <NavbarContent className="sm:hidden  flex mr-32 " justify="center">
                            <NavbarBrand>
                                <NextLink
                                    className='flex justify-start items-center gap-1'

                                    href='/'
                                >
                                    <Logo />
                                    <p className={title({ color: "violet", size: "logo" })} >LearnifyPro</p>

                                </NextLink>

                            </NavbarBrand>
                        </NavbarContent>

                        <NavbarContent justify="start" className='hidden sm:flex'  >
                            <NavbarBrand as='li' className='lg:gap-3 sm:justify-center max-w-fit'>
                                <NextLink
                                    className='flex justify-start items-center gap-1'
                                    href='/'
                                >
                                    <Logo />
                                    <p className={title({ color: "violet", size: "logo" })} >LearnifyPro</p>
                                </NextLink>
                            </NavbarBrand>
                            <NavbarContent className=" sm:flex gap-3">
                                <NavbarItem isActive={isActive("/")}>
                                    <Link
                                        color={isActive("/") ? "primary" : "foreground"}
                                        className={isActive("/") ? title({ color: "violet", size: "vsm" }) : ""}
                                        href="/"
                                    >
                                        Home
                                    </Link>
                                </NavbarItem>
                                <NavbarItem isActive={isActive("/courses")}>
                                    <Link
                                        color={isActive("/courses") ? "primary" : "foreground"}
                                        className={isActive("/courses") ? title({ color: "violet", size: "vsm" }) : ""}
                                        href="/courses"
                                    >
                                        Courses
                                    </Link>
                                </NavbarItem>
                                <NavbarItem isActive={isActive("/about")}>
                                    <Link
                                        color={isActive("/about") ? "primary" : "foreground"}
                                        className={isActive("/about") ? title({ color: "violet", size: "vsm" }) : ""}
                                        href="/about"
                                    >

                                        About
                                    </Link>
                                </NavbarItem>
                                <NavbarItem isActive={isActive("/faq")}>
                                    <Link
                                        color={isActive("/faq") ? "primary" : "foreground"}
                                        className={isActive("/faq") ? title({ color: "violet", size: "vsm" }) : ""}
                                        href="/faq"
                                    >
                                        FAQ
                                    </Link>
                                </NavbarItem>
                            </NavbarContent>
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
                                    href={siteConfig.links.github}
                                    aria-label='Github'
                                >
                                    <GithubIcon className='text-default-500' />
                                </Link>
                            </NavbarItem>
                            <ThemeSwitch toggleTheme={toggleTheme} />

                            <NavbarItem className='hidden lg:flex'>{searchInput}</NavbarItem>

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
                                        className=' lg:flex cursor-pointer'
                                        isBordered
                                        radius='full'
                                        src='https://i.pravatar.cc/150?u=a04258114e29026708c'
                                        onClick={handleAvatarClick}
                                    />
                                )}
                            </NavbarItem>
                        </NavbarContent>

                        <NavbarMenu>
                            {searchInput}
                            <div className='mx-4 mt-2 flex flex-col gap-2'>
                                {siteConfig.navMenuItems.map((item, index) => (
                                    <NavbarMenuItem key={`${item}-${index}`}>
                                        <Link
                                            className={`link ${pathname === item.href ? "active" : ""
                                                }`}
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
                    </Navbar>
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

            )}</>
    );
};

export default Nav;