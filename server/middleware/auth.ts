import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import { redis } from "../utils/redis";
import { updateAccessToken } from "../controllers/user.controller";

export const isAuthenticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;

    if (!access_token) {
      return next(
        new ErrorHandler("Please login to access this resource!", 400)
      );
    }

    const decoded = jwt.decode(access_token) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("Access Token is not valid!", 400));
    }

    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
      try {
        updateAccessToken(req, res, next);
      } catch (error) {
        return next(error);
      }
      return;
    }

    const user = await redis.get(decoded.id);

    if (!user) {
      return next(
        new ErrorHandler("Please login to access this resource!", 400)
      );
    }

    req.user = JSON.parse(user);

    next();
  }
);

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Roles: ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
