import dotenv from "dotenv"
dotenv.config();
import express from "express"
import { dbConnection } from "../config/dbConfig.js";

//app instance
let app=express();

dbConnection();

app.get("/",()=>{
    res.send("eapparel")
})

export default app;