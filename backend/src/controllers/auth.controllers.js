import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const {fullName, email, password} = req.body;

    try{
        //CHECKS IF ALL FEILDS ARE FILLED
        if(!fullName||!email||!password){
            return res.status(400).json({message:"All Feilds Are Requied"});
        }

        //CHECKS FOR PASSWORD LENGTH
        if(password.length < 6){
            return res.status(400).json({message:"Password Must Atleast be 6 Characters"});
        }

        //CHECK IF EMAIL IS VALID
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({message:"Please Enter A Valid Email"})
        }

        //CHECK FOR NEW USER
        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).json({message:"Email Already Exists"})
        }

        //HASHING PASSWORD
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        
        const newUser = new User({
            fullName,
            email,
            password : hashedPassword
        })

        if (newUser){
            generateToken(newUser._id, res);
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilePic
            })

        } else {
            res.status(400).json({message : "Invalid User"})
        }

    }

    catch(error){
        console.log("Error in Signup Controller", error)
        res.status(500).json({message : "Internal Server Error"})
    }

}