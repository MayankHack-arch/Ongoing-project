import jwt from "jsonwebtoken";

export const generateToken = (user)=>{
    const token = jwt.sign({id: user.id, username: user.firstName, email: user.email}, process.env.JWT_SECRET,{expiresIn: 60*60*24})
    return token;
}
