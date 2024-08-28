import e from "express";
import authRoute from './Routes/authRoutes.js'
import userRoute from './Routes/userRoutes.js'
import dotenv from 'dotenv'
import mongoose from "mongoose";
import cors from 'cors'
import { json } from "express";

const app=e();
dotenv.config();
app.use(cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(json());
app.use('/auth',authRoute)
app.use('/user',userRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT,async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to db")
    }catch(e){
        console.log("error in mongo connect ",e)
        return;
    }
    console.log("server running on port ",PORT);
})


