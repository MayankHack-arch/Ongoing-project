import { User } from "../models/user.model.js";
import argon2 from "argon2";
import { generateToken } from "../utility/tokenUtil.js";
import crypto from 'crypto';
import { sendVerificationEmail } from "../utility/email.util.js";

export const register= async(req, res, next)=>{
    const {firstName, lastName, email, password} = req.body;
    if(!firstName || !lastName || !email || !password ){
       return res.status(401).json({error :"please fill full form"})
    }
    let user = await User.findOne({email});
    if(user){
        return res.status(409).json({error:`user already registered`})
    }
    const hashedPassword = await argon2.hash(password)
    const verificationToken = crypto.randomBytes(32).toString('hex');
    user = await User.create({firstName, lastName, email, password: hashedPassword, verificationToken, isVerified: false})
    const verificationLink = `http://${process.env.IP}:4001/api/user/verify-email?token=${verificationToken}`;
    console.log(`verification link : ${verificationLink}`)
    await sendVerificationEmail(email, verificationToken);
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ message: `User registered successfully`});
};

export const verifyEmail = async(req, res) => {
    const { token } = req.query;
    const decodedToken = decodeURIComponent(token);
    console.log(`Token received for verification: ${decodedToken}`);
    if(!token){
        console.log("No user found with the provided token");
        return res.status(400).json({ error: "Invalid or expired token" });
    }
    try {
        const user = await User.findOne({ verificationToken: decodedToken });
        console.log(`User found: ${user ? user._id : 'No user found'}`);

        if (!user) {
            console.log("No user found with the provided token");
            return res.status(400).json({ error: "Invalid or expired token" });
        }

        user.isVerified = true;
        user.verificationToken = null; // Set token to null
        await user.save();
        
        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Error occurred during verification:", error);
        return res.status(500).json({ error: `Error occurred during verification: ${error.message}` });
    }
};


export const login = async(req, res, next)=>{
    const {email, password} = req.body;
    if(!email || !password){
        return res.status(400).json({ error: "Please fill the full form" });
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({ error: "Invalid credentials" });
    }
    // const isPasswordMatched = await user.comparePassword(password);
    const isPasswordCorrect = await argon2.verify(user.password, password);
    if(!isPasswordCorrect){
        return res.send("invalid username or password");
    }
    if(!user.isVerified){
        return res.status(403).json({error: "user not verified"})
    }
    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ message: "User logged in"});
}

export const changePassword = async (req, res)=>{
    const {email, password, newPassword}= req.body;
    if(!email || !password || !newPassword){
        return res.status(400).json({ error: "Please fill the full form" });
    }
    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({ error: "Invalid credentials" });
        }
        const isPasswordCorrect = await argon2.verify(user.password, password);
        if(!isPasswordCorrect){
            return res.send("invalid username or password");
        }
        const hashedNewPassword = await argon2.hash(newPassword);
        user.password = hashedNewPassword;
        await user.save();
        res.status(200).json({message:"password changed successfully"})
    }catch(error){
        console.error("error occured during password change", error)
        return res.status(500).json({ error: `Error occurred during password change: ${error.message}` });
    }
}