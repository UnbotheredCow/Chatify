import jwt from 'jsonwebtoken';

export const generateToken = (userID, res) => {

    const { JWT_SECRET, NODE_ENV } = process.env;
    if(!JWT_SECRET){
        throw new Error("JWT is not Configured");
    }
    const token = jwt.sign({userID : userID},JWT_SECRET,{
        expiresIn:"7d",
    });

    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000, // 7 DAYS IN MILISECONDS
        httpOnly: true, // XSS ATTACK PREVENTION
        sameSite: "strict", // CSRF ATTACK PREVENTION
        secure: process.env.NODE_ENV == "DEVELOPMENT" ? false : true
    });

    return token;
}