import dotenv from "dotenv"
dotenv.config();
import express from "express"
import userRouter from "../routes/userRoutes.js";
import { dbConnection } from "../config/dbConfig.js";
import productRouter from "../routes/productRoutes.js";
//app instance
let app=express();

dbConnection();

//middlewares to process the json data
app.use(express.json());

app.use("/api/v1/users",userRouter);

app.use("/api/v1/products",productRouter);

//not found route
app.all("*",(req,res)=>{
res.status(404).json({
    message:`path ${req.originalUrl} not found`
})
})

export default app;