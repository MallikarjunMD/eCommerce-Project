import express from "express";
import { getProfile, loginUser, registerUser, updateShippingAddress } from "../controllers/userControllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

//router instance
const userRouter=express.Router()

//    /api/v1/users/register
userRouter.post("/register",registerUser)
//    /api/v1/users/login
userRouter.post("/login",loginUser)
//    /api/v1/users/profile
userRouter.get("/profile",isLoggedIn,getProfile)

userRouter.put("/update/shipping-address",isLoggedIn,updateShippingAddress)

export default userRouter;
