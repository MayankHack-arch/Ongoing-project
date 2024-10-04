import mongoose, { mongo } from 'mongoose';
import validator from 'validator';

const userSchema= new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        min: 3,
    },
    lastName:{
        type: String,
        required: true,
        min: 3,
    },
    email:{
        type: String,
        required: true,
        validate:[validator.isEmail, "enter valid email"]
    },
    password:{
        type: String,
        required: true,
        min: [8, "password must be atleast 8 chracters"],
        max:[16,"password must be shorterb than 16 characters"]
    },
   verificationToken:{
    type: String,
    required: false,
   },
   isVerified:{
    type: Boolean,
    default: false,
   }
})


export const User= mongoose.model("User", userSchema);