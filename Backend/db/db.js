import mongoose from "mongoose";

function connection(){
    mongoose.connect(process.env.db_url).catch(err=>console.log(err)).then(()=>console.log("db connected"));
}

export default connection;