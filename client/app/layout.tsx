"use client";
import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar";
import { Link } from "@nextui-org/link";
import socketIO from "socket.io-client";

import clsx from "clsx";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import { useEffect } from "react";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });
// export const metadata: Metadata = {
// 	title: {
// 		default: siteConfig.name,
// 		template: `%s - ${siteConfig.name}`,
// 	},
// 	description: siteConfig.description,
// 	themeColor: [
// 		{ media: "(prefers-color-scheme: light)", color: "white" },
// 		{ media: "(prefers-color-scheme: dark)", color: "black" },
// 	],
// 	icons: {
// 		icon: "/favicon.ico",
// 		shortcut: "/favicon-16x16.png",
// 		apple: "/apple-touch-icon.png",
// 	},
// };

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' suppressHydrationWarning={true}>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
					<SessionProvider>
						<div className='relative flex flex-col h-screen'>
							<Navbar />
							<main className='container mx-auto max-w-7xl pt-16 px-6 flex-grow'>
								<Custom>{children}</Custom>
							</main>
							<footer className='w-full flex items-center justify-center py-3'>
								<Link
									isExternal
									className='flex items-center gap-1 text-current'
									href='https://nextui-docs-v2.vercel.app?utm_source=next-app-template'
									title='nextui.org homepage'
								>
									<span className='text-default-600'>Powered by</span>
									<p className='text-primary'>NextUI</p>
								</Link>
							</footer>
						</div>
						<Toaster position='top-center' reverseOrder={false} />
					</SessionProvider>
				</Providers>
			</body>
		</html>
	);
}

type CustomProps = {
	children: React.ReactNode;
};

const Custom = ({ children }: CustomProps) => {
	const { isLoading } = useLoadUserQuery({});

	useEffect(() => {
		socketId.on("connection", () => {});
	}, []);

	return <div>{isLoading ? <Loader /> : <div>{children}</div>}</div>;
};
