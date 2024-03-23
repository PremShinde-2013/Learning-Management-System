"use client";
import React from "react";
import { Spinner } from "@nextui-org/react";

type Props = {};

const Loader = (props: Props) => {
	return (
		<div className='flex justify-center items-center h-screen'>
			<Spinner color='success' size='lg' />
		</div>
	);
};

export default Loader;
