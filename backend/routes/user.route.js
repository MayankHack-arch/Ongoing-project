import express from "express";
import { login, register, verifyEmail } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.post("/login", login)
userRouter.post("/signup", register)
userRouter.get("/verify-email", verifyEmail)

export default userRouter;