// Import express and types
import express, { Router } from "express";
import {
	activateUser,
	getUserInfo,
	loginUser,
	logoutUser,
	registrationUser,
	socialAuth,
	updateAccessToken,
} from "../controllers/user.controller";
import { authorizeRoles, isAuthenticated } from "../middelware/auth";

// Create an express router
const userRouter: Router = express.Router();

// Define routes
userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/refresh", updateAccessToken);
userRouter.get("/me", isAuthenticated, getUserInfo);
userRouter.get("/social-auth", socialAuth);

// Export the router
export default userRouter;
