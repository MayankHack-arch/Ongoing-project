import express from 'express';
import { config } from 'dotenv';
import { dbConnection } from './Database/dbConnection.js';
import { authenticateToken } from './middleware/auth.middleware.js';
import cookieParser from 'cookie-parser';
import userRouter from './routes/user.route.js';

config({path:"./config/config.env"});

const app=express();

app.use(express.json())
app.use(cookieParser())
app.use("/api/user", userRouter)

app.get("/",authenticateToken,(req, res)=>{
    res.send("hello")
})

dbConnection();

export default app;