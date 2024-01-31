import express from "express";
import { loginUser,registerUser } from "../controllers/userControllers.js";
//router instance
const userRouter=express.Router()

//    /api/v1/users/register
userRouter.post("/register",registerUser)
//    /api/v1/users/login
userRouter.post("/login",loginUser)

export default userRouter;
