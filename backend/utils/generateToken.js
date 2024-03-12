import jwt from 'jsonwebtoken';

const generateTokenAndSetCookie = (userId,res) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{
        expiresIn: "15d",
    });

    res.cookie("jwt",token,{
        maxAge: 15 * 24  * 60 * 60 * 1000, //  15 days in milliseconds
        httpOnly: true, // Prevents XSS/cross-site scripting Attacks
        sameSite:"strict", // Protect against CSRF attacks
        secure: process.env.NODE_ENV !== "development" // Only send this cookie if the connection is HTTPS
    });
};
export default generateTokenAndSetCookie; 