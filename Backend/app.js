import 'dotenv/config'
import express from 'express'
import cors from 'cors'


const app = express();


app.use(cors());
   
app.get('/',(req,res)=>{
    res.send("hi");
})

app.listen(process.env.PORT_NUMBER,()=>{
    console.log(`Server is running on port ${process.env.PORT_NUMBER}`);
})