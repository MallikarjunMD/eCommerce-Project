import express from "express"
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/productControllers.js";

//router instance
const productRouter=express.Router()

productRouter.post("/",isLoggedIn,createProduct)

productRouter.get("/",getProducts)

productRouter.get("/:id",getProduct)

productRouter.put("/:id",updateProduct)

productRouter.delete("/:id",deleteProduct)

export default productRouter;

