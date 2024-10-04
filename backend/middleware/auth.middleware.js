import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import {promisify} from "util";

const verifyToken=promisify(jwt.verify);

export const authenticateToken = async (req, res, next)=>{
    const token = req.cookies?.token;
    if(!token){
        console.log("no token provided")
        return res.sendStatus(401)
    }
    try {
        const decoded = await verifyToken(token, process.env.JWT_SECRET);
        
        // Check if the user exists
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.sendStatus(401); // User no longer exists, so unauthorized
        }

        req.user = user;
        next();
    } catch (err) {
        console.log("Token verification failed", err.message);
        return res.sendStatus(403);
    }
}