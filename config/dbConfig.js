import expressAsyncHandler from "express-async-handler";
import mongoose from "mongoose";


export const dbConnection=expressAsyncHandler(async ()=>{
    
               let db=await mongoose.connect(process.env.MONGO_LOCALURL)
        console.log(`db connected on ${db.connection.host}`);
    
    
})