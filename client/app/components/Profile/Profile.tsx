"use client";
import React, { FC, useState } from "react";
import { BackgroundBeamsDemo } from "../BackgroundBeam";
import TopBarProfile from "./TopBarProfile";
import { useLogOutQuery } from "../../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

type Props = {
	user: any;
};

const Profile: FC<Props> = ({ user }) => {
	const [avatar, setAvatar] = useState(null);
	const [active, setActive] = useState(1);
	const [logout, setLogout] = useState(false);
	const {} = useLogOutQuery(undefined, {
		skip: !logout ? true : false,
	});
	// const logOutHandler = async () => {
	// 	setLogout(true);
	// 	await signOut();
	// 	redirect("/");
	// };
	return (
		<div>
			<h1>{user?.name}</h1>
			<div>
				<TopBarProfile
					user={user}
					avatar={avatar}
					active={active}
					setActive={setActive}
					// logOutHandler={logOutHandler}
				/>
			</div>
		</div>
	);
};

export default Profile;
