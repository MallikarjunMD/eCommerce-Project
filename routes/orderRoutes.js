import express from "express";

import {
  createOrder
} from "../controllers/orderControllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

let orderRouter = express.Router();

orderRouter.post("/", isLoggedIn, createOrder);

export default orderRouter;
