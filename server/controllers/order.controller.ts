import { NextFunction, Request, Response } from "express";
import path from "path";
import ejs from "ejs";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { IOrder } from "../models/order.model";
import UserModel from "../models/user.model";
import CourseModel, { ICourse } from "../models/course.model";
import { getAllOrdersService, newOrder } from "../services/order.service";
import sendMail from "../utils/sendMail";
import NotificationModel from "../models/notification.model";
import { redis } from "../utils/redis";

require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const createOrder = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId, payment_info } = req.body as IOrder;

      if (payment_info && "id" in payment_info) {
        const paymentIntentId = payment_info.id;
        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentIntentId
        );

        if (paymentIntent.status !== "succeeded") {
          return next(new ErrorHandler("Payment not authorized!", 400));
        }
      }

      const isAdmin = req.user?.role === "admin";

      const user = await UserModel.findById(req.user?._id);

      const courseExistInUser = user?.courses.some(
        (course: any) => course._id.toString() === courseId.toString()
      );

      if (courseExistInUser) {
        return next(
          new ErrorHandler("User have already purchased this course!", 400)
        );
      }

      if (isAdmin) {
        return next(
          new ErrorHandler("You are an Admin. You cannot order", 404)
        );
      }

      const course: ICourse | null = await CourseModel.findById(courseId);

      if (!course) {
        return next(new ErrorHandler("Course not found!", 404));
      }

      const data: any = {
        courseId: course._id,
        userId: user?._id,
        payment_info,
      };

      const mailData = {
        order: {
          _id: course._id.toString().slice(0, 6),
          name: course.name,
          price: course.price,
          date: new Date().toLocaleString("default", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        },
      };

      const html = await ejs.renderFile(
        path.join(__dirname, "../mails/order-confirmation.ejs"),
        { order: mailData }
      );

      try {
        if (user) {
          await sendMail({
            email: user.email,
            subject: "Order Confirmation",
            template: "order-confirmation.ejs",
            data: mailData,
          });
        }
      } catch (error: any) {
        return next(new ErrorHandler(error.message, 500));
      }

      user?.courses.push(course?._id);

      await redis.set(req.user?._id, JSON.stringify(user), "EX", 604800);

      await user?.save();

      await NotificationModel.create({
        user: user?._id,
        title: "New Order",
        message: `You have a new order from ${course?.name}`,
      });

      course.purchased = course.purchased + 1;

      await course.save();

      newOrder(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getAllOrdersAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await getAllOrdersService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const sendStripePublishableKey = CatchAsyncError(
  async (req: Request, res: Response) => {
    res.status(200).json({
      publishablekey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  }
);

export const newPayment = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "EUR",
        metadata: {
          company: "E-Learning",
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      res.status(201).json({
        success: true,
        client_secret: myPayment.client_secret,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
