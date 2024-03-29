import { redirect } from "next/navigation";
import userAuth from "./userAuth";
import { useSelector } from "react-redux";
import React from "react";

interface ProtectedProps {
	children: React.ReactNode;
}

export default function AdminProtected({ children }: ProtectedProps) {
	const { user } = useSelector((state: any) => state.auth);

	if (!user) {
		// Redirect if user is not authenticated
		redirect("/");
		// Return null or loading indicator while authentication is in progress
		return null; // You can also return a loading indicator if needed
	}

	const isAdmin = user?.role === "admin";
	return isAdmin ? <>{children}</> : redirect("/");
}
