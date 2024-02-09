import express from "express";

import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from "../controllers/brandControllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

let brandRouter = express.Router();

brandRouter.post("/", isLoggedIn, createBrand);
brandRouter.get("/", getBrands);
brandRouter.get("/:id", getBrand);
brandRouter.put("/:id", isLoggedIn, updateBrand);
brandRouter.delete("/:id", isLoggedIn, deleteBrand);

export default brandRouter;
