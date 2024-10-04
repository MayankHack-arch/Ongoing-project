import nodemailer from 'nodemailer';

export const sendVerificationEmail = async(email, verificationToken)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    })
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: email,
        html: `<p>Please verify your email by clicking this link: <a href="http://192.168.43.162:4001/api/user/verify-email?token=${verificationToken}">Verify Email</a></p>`,
    }
    console.log("verification email sent successfully")
    await transporter.sendMail(mailOptions);
}