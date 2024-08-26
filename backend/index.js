import e from "express";
import authRoute from './Routes/authRoutes.js'
const app=e();


app.use('/auth',authRoute)