import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

import connection from './db/db.js';
import userRouter from './routes/userRoutes.js';


const app = express();  

connection(); 

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use('/user',userRouter);
   


app.listen(process.env.PORT_NUMBER,()=>{
    console.log(`Server is running on port ${process.env.PORT_NUMBER}`);
})