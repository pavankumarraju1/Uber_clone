import userModel from "../model/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import blacklistModel from "../model/blackListToken.js";

const authenticateUser = async(req,res,next)=>{

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message: "Unauthorized,issues in token"});
 
    const isblacklisted = await blacklistModel.findOne({token});
    if(isblacklisted){
        return res.status(401).json({message: "Unauthorized"});
    }

    try{
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await userModel.findById(decoded._id);
        if(!user) return res.status(404).json({message: "User not found"});
        req.user = user; 
        return next(); 
    }
    catch(err){ 
        return res.status(401).json({ message:"unauthorized,issues in token"});
    }
}

export default authenticateUser;