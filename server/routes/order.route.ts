import express from "express";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";
import {
  createOrder,
  getAllOrdersAdmin,
  newPayment,
  sendStripePublishableKey,
} from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuthenticated, createOrder);

orderRouter.get(
  "/get-all-orders-admin",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllOrdersAdmin
);

orderRouter.get("/payment/stripepublishablekey", sendStripePublishableKey);

orderRouter.post("/payment", isAuthenticated, newPayment);

export default orderRouter;
