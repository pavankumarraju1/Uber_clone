import userModel from "../model/userModel.js";

const createUser = async({firstName,lastName,email,password})=>{
    if (!firstName || !lastName || !email || !password){
        throw new Error("all fields are required");
    }
    const user = await userModel.create({fullName:{firstName,lastName},email,password});
    return user;
}

export {createUser};