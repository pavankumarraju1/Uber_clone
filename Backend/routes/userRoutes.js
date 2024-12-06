import express from 'express'
import {body} from 'express-validator';

import { registerController } from '../controller/userController.js';

const userRouter = express.Router();


userRouter.post('/register',[
    body('name').isLength({min:3}).withMessage('Name must be at least 3 characters'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({min:3}).withMessage('Password must be at least 8 characters')
],registerController)


export default userRouter;