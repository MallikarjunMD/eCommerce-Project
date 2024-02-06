import User from "../models/User.js";
import { genToken } from "../utils/genToken.js";
//@desc Register user
//@path /api/v1/users/register
//@access public

export const registerUser=async (req,res)=>{
    try {
        const {fullName,email,password}=req.body;
        const existingUser=await User.findOne({email:email})
        if(existingUser){
            return res.json({
                message:"user exists already please login"
            })
        }
        const user=await User.create({
            fullName,
            email,
            password
        })
        res.status(201).json({
            status:"success",
            message:"user registered",
            user
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

//@desc login user
//@path /api/v1/users/login
//@access public

export const loginUser=async (req,res)=>{
    try {
        const {email,password}=req.body;
        const existingUser=await User.findOne({email:email})
        if(!existingUser ||(!(await existingUser.verifyPwd(password,existingUser.password)))){
            return res.json({
                message:"user name or password do not match"
            })
        }
       const token=await genToken(existingUser._id)
        res.status(201).json({
            status:"success",
            message:"user logged in successfully",
            token,
            existingUser
        })
    } catch (error) {
        res.status(500).json({
            status:"fail",
            message:error.message
        })
    }
}

export const getProfile=(req,res)=>{
    res.send("hello this is profile page");
}