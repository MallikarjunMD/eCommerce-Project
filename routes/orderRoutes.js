import express from "express";

import {
  createOrder, getOrder, getOrders, updateOrder
} from "../controllers/orderControllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

let orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createOrder);
orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrder);
orderRouter.put("/:id", isLoggedIn,isAdmin, updateOrder);

export default orderRouter;
