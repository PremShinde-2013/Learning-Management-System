import { Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import CourseModel from "../models/course.model";
import { redis } from "../utils/redis";

export const createCourse = CatchAsyncError(
  async (data: any, res: Response) => {
    const course = await CourseModel.create(data);

    try {
      await redis.set(
        course._id.toString(),
        JSON.stringify(course),
        "EX",
        604800
      );
    } catch (redisError) {
      console.error("Redis Error:", redisError);
    }
    res.status(201).json({
      success: true,
      course,
    });
  }
);

export const getAllCoursesService = async (res: Response) => {
  const courses = await CourseModel.find().sort({ createdAt: -1 });

  res.status(201).json({
    success: true,
    courses,
  });
};
