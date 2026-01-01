import express from 'express'
const router = express.Router()
import {body} from 'express-validator'
import {authUserMiddleware} from '../middlewares/auth.middleware.js'
// import userController from "../controller/user.controller"
import { userRegister, userLogin, getUser, logOutUser } from "../controller/user.controller.js";

router.post('/login',
    [
        body('email').isEmail().withMessage("Invalid Email").trim(),
        body('password').isLength({min: 8}).withMessage("Password atleast 8 character long").trim()
    ],userLogin)

router.post('/register', 
    [
        body('email').isEmail().withMessage("Invalid Email").trim(),
        body('password').isLength({min: 8}).withMessage("Password atleast 8 character long").trim()
    ],userRegister)

router.get("/me", authUserMiddleware, getUser)  
router.get('/logout', authUserMiddleware, logOutUser)  

export default router