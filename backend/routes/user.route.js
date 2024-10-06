import express from "express";
import { changePassword, login, register, verifyEmail } from "../controller/user.controller.js";
import { authenticateToken } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/login", login)
userRouter.post("/signup", register)
userRouter.get("/verify-email", verifyEmail)
userRouter.post("/update-password",authenticateToken, changePassword)

export default userRouter;