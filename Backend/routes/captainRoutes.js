import express from 'express';
import {body} from 'express-validator'

import {authenticateCaptain} from "../midlewares/authMiddleware.js";

import { registerController,loginController,profileController,logoutController } from '../controller/captainController.js';

const captainRouter = express.Router();


captainRouter.post('/register',[
    body('fullName.firstName').isLength({min:3}).withMessage('min length must be 3'),
    body('fullName.firstName').isString().withMessage('must be a string'),
    body('email').isEmail().withMessage('must follow email format'),
    body('password').isLength({min:3}).withMessage('min length must be 3'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('min length must be 3'),
    body('vehicle.plateNumber').isLength({ min: 3 }).withMessage('min length must be 3'),
    body('vehicle.capacity').isInt({ min: 1 }).withMessage('capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('invalid vehicle type')
],registerController);
 

captainRouter.post('/login',[
    body('email').isEmail().withMessage('must follow email format'),
    body('password').isLength({min:3}).withMessage('min length must be 3characters long')
],loginController)

captainRouter.get('/profile',authenticateCaptain,profileController)

captainRouter.get('/logout',logoutController)

export default captainRouter;  