import User from "../models/User.js";
import { genToken } from "../utils/genToken.js";
import expressAsyncHandler from "express-async-handler";
//@desc Register user
//@path /api/v1/users/register
//@access public

export const registerUser=expressAsyncHandler(async (req,res)=>{
        const {fullName,email,password}=req.body;
        const existingUser=await User.findOne({email:email})
        if(existingUser){
            // return res.json({
            //     message:"user exists already please login"
            // })

            //OR

            //next(new Error("User exists already, please login"))

            // OR

            throw new Error("User exists already, please login")
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
    
})

//@desc login user
//@path /api/v1/users/login
//@access public

export const loginUser=expressAsyncHandler(async (req,res)=>{
        const {email,password}=req.body;
        const existingUser=await User.findOne({email:email})
        if(!existingUser ||(!(await existingUser.verifyPwd(password,existingUser.password)))){
            // return res.json({
            //     message:"user name or password do not match"
            // })

            //or

            throw new Error("user name or password do not match")

        }
       const token=await genToken(existingUser._id)
        res.status(201).json({
            status:"success",
            message:"user logged in successfully",
            token,
            existingUser
        })
    
})

export const getProfile=(req,res)=>{
    res.send("hello this is profile page");
}

export const updateShippingAddress=expressAsyncHandler(async (req,res)=>{
    
   const shippingAddress={
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        address:req.body.address,
        postalCode:req.body.postalCode,
        state:req.body.state,
        country:req.body.country,
        phone:req.body.phone
    }
    const updatedUser=await User.findByIdAndUpdate(req.userId,{shippingAddress:shippingAddress,hasShippingAddress:true},{new:true});
    res.status(201).json({
        status:"success",
        message:"user updated",
        updatedUser
    })
})