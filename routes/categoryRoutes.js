import express from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryControllers.js";


//router instance
const categoryRouter=express.Router()

categoryRouter.post("/",isLoggedIn,createCategory)

categoryRouter.get("/",getCategories)

categoryRouter.get("/:id",getCategory)

categoryRouter.put("/:id",isLoggedIn,updateCategory)

categoryRouter.delete("/:id",isLoggedIn,deleteCategory)

export default categoryRouter;

