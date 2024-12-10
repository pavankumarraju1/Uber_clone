import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
const{Schema,model} = mongoose;

const captainSchema = new Schema({
    fullName: {
        firstName:{
            type:String,
            required:true,
            minlength:[3,'minimum 3 characters requires'],
        },
        lastName:{
            type:String,
        }
    },

    email: {type: String, required: true, unique: true},
    password: {type: String, required: true,select:false},
    soketId:{
        type:String,
    },

    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },

    vehicle:{
        color:{
            type:String, 
            required:true,  
        },
        plateNumber:{
            type:String,
            required:true,
            minlength:[3,'minimum 3 characters requires']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'capacity must be atleast one']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','bike','auto'],
        }
    },

    location:{
        lat:{
            type:Number,
        },
        log:{
            type:Number,
        }
    }
})

captainSchema.methods.generateToken = function(){
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY,{expiresIn:'24h'});
    return token;
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

const captainModel = model('captainData',captainSchema);

export  default captainModel; 