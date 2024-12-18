import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const {Schema,model} = mongoose;

const userSchema = new Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,'name should be atleast 3 characters']
        },
        lastName:{
            type:String,
        }
    },
    email:{type:String,unique:true,required:true},
    password:{type:String,required:true,minlength:[3,'minimum length is 3 characters'],select:false},
    socketId:{type:String} 
})
 

userSchema.methods.generateToken = function(){
    const token = jwt.sign({_id:this._id},process.env.SECRET_KEY,{expiresIn:'24h'});
    return token;
}

userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password);
}

const userModel = model("userData", userSchema);

export default userModel;