import  jwt  from "jsonwebtoken"
import User from "../models/User.js"

export const isLoggedIn=async (req,res,next)=>{
    const token=req.headers?.authorization?.split(" ")[1]
    if(!token){
        return res.json({
            message:"please login"
        })
    }
    const decodedToken=await jwt.verify(token,process.env.SECRET_STRING)
    const user=await User.findById(decodedToken?.id)
    if(!user){
        return res.json({
            message:"user doesn't exist"
        })
    }
    req.userId=user?._id
    next()
}