import { redirect } from "next/navigation";
import userAuth from "./userAuth";
import React from "react";

interface ProtectedProps {
	children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {
	const isAuthenticated = userAuth();

	if (!isAuthenticated) {
		// Redirect if user is not authenticated
		redirect("/");
		// Return null or loading indicator while authentication is in progress
		return null; // You can also return a loading indicator if needed
	}

	return <>{children}</>;
}
