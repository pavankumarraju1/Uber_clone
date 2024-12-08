import captainModel from "../model/CaptainModel.js";
import captainService from "../Services/captainService.js";
import { validationResult } from "express-validator";

import blacklistModel from "../model/blackListToken.js";

const registerController = async (req,res,next)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const{fullName,email,password,vehicle} = req.body;

    const isCaptainExists = await captainModel.findOne({email});
    if(isCaptainExists){
        return res.status(400).json({message: "Captain already exists"});
    }

    const hashedPassword = await captainModel.hashPassword(password);

    const captainData = await captainService({
        firstName:fullName.firstName,
        lastName:fullName.lastName,
        email,
        password:hashedPassword,
        color:vehicle.color,
        capacity:vehicle.capacity,
        vehicleType:vehicle.vehicleType,
        plateNumber:vehicle.plateNumber
    })
    const token = captainData.generateToken();
    return res.status(201).json({token,captainData});
}

const loginController = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email,password} = req.body;

    const user = await captainModel.findOne({email}).select('+password');

    if(!user){
        return res.status(404).json({message: "invalis email and password"});
    }

    const matchPassword = await user.comparePassword(password);
    if(!matchPassword){
        return res.status(404).json({message: "invalid email and password"});
    }

    const token = user.generateToken();
    res.cookie('token',token);

    res.status(200).json({token,user});
}

const profileController = async(req,res,next)=>{
    res.status(200).json(req.user);
}

const logoutController=async(req,res,next)=>{
    
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(!token){
            return res.status(401).json({message: "Unauthorized"});
        }
        const bToken = await blacklistModel.create({token});
        res.clearCookie('token');
        res.status(200).json({message: "logged out successfully"});
    // }
    // catch(err){
    //     next(err)
    // }
}

export{
    registerController, 
    loginController,
    profileController,
    logoutController
}