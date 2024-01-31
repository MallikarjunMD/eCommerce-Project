import mongoose from "mongoose";


export const dbConnection=async ()=>{
    try{
               let db=await mongoose.connect(process.env.MONGO_LOCALURL)
        console.log(`db connected on ${db.connection.host}`);
    }
    catch (error){
        console.log(error.message);
    }
}