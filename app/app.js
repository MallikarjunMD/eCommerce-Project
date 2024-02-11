import dotenv from "dotenv"
dotenv.config();
import express from "express"
import userRouter from "../routes/userRoutes.js";
import { dbConnection } from "../config/dbConfig.js";
import productRouter from "../routes/productRoutes.js";
import { globalErrorHandler } from "../middlewares/globalErrorHandler.js";
import categoryRouter from "../routes/categoryRoutes.js";
import brandRouter from "../routes/brandRoutes.js";
import colorRouter from "../routes/colorRoutes.js";
import reviewRouter from "../routes/reviewRoutes.js";


//app instance
let app=express();

dbConnection();

//middlewares to process the json data
app.use(express.json());

app.use("/api/v1/users",userRouter);

app.use("/api/v1/products",productRouter);

app.use("/api/v1/categories",categoryRouter);

app.use("/api/v1/brands", brandRouter);

app.use("/api/v1/colors", colorRouter);

app.use("/api/v1/reviews", reviewRouter);

//not found route
app.all("*",(req,res,next)=>{
const err=new Error(`path ${req.originalUrl} not found`)
err.status=404
next(err)
})

//error handling middleware
app.use(globalErrorHandler)

export default app;