import { IUser } from "./../models/user.model";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
