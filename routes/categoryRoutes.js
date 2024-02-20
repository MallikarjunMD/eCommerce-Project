import express from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createCategory, deleteCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryControllers.js";
import categoryUpload from "../config/categoryUpload.js";
import isAdmin from "../middlewares/isAdmin.js";


//router instance
const categoryRouter=express.Router()

categoryRouter.post("/",isLoggedIn,isAdmin,categoryUpload.single('image'),createCategory)

categoryRouter.get("/",getCategories)

categoryRouter.get("/:id",getCategory)

categoryRouter.put("/:id",isLoggedIn,isAdmin,updateCategory)

categoryRouter.delete("/:id",isLoggedIn,isAdmin,deleteCategory)

export default categoryRouter;

