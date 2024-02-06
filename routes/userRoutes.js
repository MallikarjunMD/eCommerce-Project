import express from "express";
import { getProfile, loginUser, registerUser } from "../controllers/userControllers.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

//router instance
const userRouter=express.Router()

//    /api/v1/users/register
userRouter.post("/register",registerUser)
//    /api/v1/users/login
userRouter.post("/login",loginUser)
//    /api/v1/users/profile
userRouter.get("/profile",isLoggedIn,getProfile)

export default userRouter;
