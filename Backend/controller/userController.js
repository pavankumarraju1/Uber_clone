import userModel from "../model/userModel.js";
import { createUser } from "../Services/userService.js";

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
    return next;
}
 
export {
    registerController
}