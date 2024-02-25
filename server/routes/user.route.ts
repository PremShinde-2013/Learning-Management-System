// Import express and types
import express, { Router } from "express";
import {
	activateUser,
	deleteUser,
	getAllUsers,
	getUserInfo,
	loginUser,
	logoutUser,
	registrationUser,
	socialAuth,
	updateAccessToken,
	updatePassword,
	updateProfilePicture,
	updateUserInfo,
	updateUserRole,
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
userRouter.put("/update-user-info", isAuthenticated, updateUserInfo);
userRouter.put("/update-user-password", isAuthenticated, updatePassword);
userRouter.put("/update-user-avatar", isAuthenticated, updateProfilePicture);

userRouter.get(
	"/get-users",
	isAuthenticated,
	authorizeRoles("admin"),
	getAllUsers
);

userRouter.put(
	"/update-user-role",
	isAuthenticated,
	authorizeRoles("admin"),
	updateUserRole
);

userRouter.delete(
	"/delete-user/:id",
	isAuthenticated,
	authorizeRoles("admin"),
	deleteUser
);

// Export the router
export default userRouter;
