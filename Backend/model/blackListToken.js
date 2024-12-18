import mongoose from "mongoose";
const {Schema,model} = mongoose;

const blackListTokenSchema = new Schema({
    token: {type: String, required: true,unique:true},
    createdAt:{
        type:Date,
        default:Date.now,
        expiresIn:'24h'
    }
});

const blacklistModel = model('blackListToken',blackListTokenSchema);

export default blacklistModel;