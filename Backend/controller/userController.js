import userModel from "../model/userModel.js";
import { createUser } from "../Services/userService.js";
import blacklistModel from "../model/blackListToken.js";

import { validationResult } from "express-validator";

const registerController = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {name,email,password} = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
        name, 
        email,
        password:hashedPassword
    });

    const token = user.generateToken();

    res.status(201).json({user,token});
}


const loginController = async (req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if(!user){
        return res.status(401).json({message: "invalid username and password"});
    }

    const ismatch = await user.comparePassword(password);
    if(!ismatch){
        return res.status(401).json({message: "invalid username and password"});
    }

    const token = user.generateToken();
    res.cookie('token',token);

    res.status(200).json({token,user});
}


const getUserProfile = async(req,res,next)=>{
    res.status(200).json(req.user);    
}

const logoutController = async(req,res,next)=>{
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(400).json({ message: "No token found to log out" });
        }
        const bToken = await blacklistModel.create({ token });
        console.log(bToken);
        res.clearCookie('token');
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        next(error);
    }
}

export {
    registerController,
    loginController,
    getUserProfile,
    logoutController
}