import express from "express";

import {
  createBrand,
  deleteBrand,
  getBrand,
  getBrands,
  updateBrand,
} from "../controllers/brandControllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";

let brandRouter = express.Router();

brandRouter.post("/", isLoggedIn,isAdmin, createBrand);
brandRouter.get("/", getBrands);
brandRouter.get("/:id", getBrand);
brandRouter.put("/:id", isLoggedIn,isAdmin, updateBrand);
brandRouter.delete("/:id", isLoggedIn,isAdmin, deleteBrand);

export default brandRouter;
