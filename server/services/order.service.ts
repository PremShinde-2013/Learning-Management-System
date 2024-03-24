import { NextFunction, Response } from "express";
import { catchAsyncErrors } from "../middelware/catchAsyncErrors";
import OrderModel from "../models/order.Model";

// create new order

export const newOrder = catchAsyncErrors(async (data: any, res: Response) => {
	const order = await OrderModel.create(data);

	res.status(201).json({
		success: true,
		order,
	});
});

// get all users

export const getAllOrdersService = async (res: Response) => {
	const orders = await OrderModel.find().sort({ createdAt: -1 });

	res.status(201).json({
		success: true,
		orders,
	});
};
