"use client";
import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";

interface CombinedProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: CombinedProvidersProps) {
	const router = useRouter();

	return (
		<Provider store={store}>
			<SessionProvider>
				<NextUIProvider navigate={router.push}>
					<NextThemesProvider {...themeProps}>
						<Custom>{children}</Custom>
					</NextThemesProvider>
				</NextUIProvider>
			</SessionProvider>
		</Provider>
	);
}

const Custom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isLoading } = useLoadUserQuery({});
	return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};
