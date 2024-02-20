import express from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productControllers.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";

//router instance
const productRouter=express.Router()

productRouter.post("/",isLoggedIn,isAdmin,upload.array('images'),createProduct)

productRouter.get("/",getProducts)

productRouter.get("/:id",getProduct)

productRouter.put("/:id",isLoggedIn,isAdmin,updateProduct)

productRouter.delete("/:id",isLoggedIn,isAdmin,deleteProduct)

export default productRouter;

