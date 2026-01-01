import { validationResult } from "express-validator";
import { createUser, checkUserExistance, createToken } from "../db/query/insertquery.js"
import { setToken, delToken } from '../db/query/set_del_Token.js'
import bcrypt from "bcrypt"
import db from '../db/db.js'

// import jwt from "jsonwebtoken"

const userRegister = async (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    const { email, password } = req.body
    // console.log(email, typeof(email))
    // console.log(password, typeof(password))
    const username = email.split('@')[0] + email.split('@')[1][0].toUpperCase()
    // console.log(username)
    try {
        const response = await createUser({ email, password, username })
        if (response.success !== true) {
            return res.status(400).json({ success: false, message: "Account creation failed" })
        }
        const spa_token = response.token
        try {
            await setToken({ spa_token, email })
        } catch (error) {
            console.log("\ntoken error: ", error)
            return res.status(400).json({ success: false, message: "Token set failed", error: error })
        }
        res.cookie('token_spa', spa_token, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 24 * 60 * 60 * 1000 })
        return res.status(201).json({ success: true, message: "Account created sucessfully", userData: { username: username, email: email }, token_spa: spa_token })
    } catch (error) {
        console.log("\ncontroller response error: ", error)
        return res.status(500).json({ success: true, message: "Account creation failed", error: error })
    }
}

const userLogin = async (req, res, next) => {
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array() })
    }
    const { email, password } = req.body
    // console.log({email, password}, "userlogin");

    try {
        const userExistStatus = await checkUserExistance({ email })
        if (!userExistStatus.success) {
            return res.status(500).json({ success: false, message: 'Either email or password is incorrect', userdstat: userExistStatus })
        }
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Either email or password is incorrect', error: error })
    }
    try {
        const [result] = await db.execute(`SELECT id, email, password, username FROM users WHERE email = ?`, [email]);
        const hashStatus = await bcrypt.compare(password, result[0].password);
        if (!hashStatus) {
            return res.status(401).json({ success: false, message: "Either Email or Password is wrong" })
        }
        const tokenStatus = await createToken({ userId: result[0].id, email })
        if (!tokenStatus.success) {
            return res.status(500).json({ success: false, message: 'Error occur during token creation', error: tokenStatus })
        }
        const spa_token = tokenStatus.token
        try {
            await setToken({ spa_token, email })
        } catch (error) {
            return res.status(500).json({ success: false, message: "Token set failed", error: error })
        }
        await res.cookie('token_spa', spa_token, { httpOnly: true, sameSite: 'lax', secure: false, maxAge: 24 * 60 * 60 * 1000 })
        return res.status(200).json({ success: true, message: "Login Sucessfull", userData: { username: result[0].username, email: email }, token_spa: spa_token })
    } catch (error) {
        return res.status(500).json({ success: false, message: "Login failed", error: error })
    }
}

const getUser = async (req, res) => {
    const { _id } = req.user
    try {
        const [result] = await db.execute(`SELECT email, username FROM users WHERE id = ?`, [_id])
        if (result.length > 0) {
            return res.status(200).json({ success: true, user: result[0] })
        }
        return res.status(404).json({ success: false, message: "Either Email or Password is Incorrect" })
    } catch (error) {
        console.error("Error in Token checking: ", error)
        return res.status(500).json({ success: false, error })
    }
}

const logOutUser = async (req, res) => {
    const { _id } = req.user
    const responseTKN = await delToken({ _id })
    if (responseTKN.success === true) {
        await res.clearCookie('token_spa');
        return res.status(200).json({ success: true, message: "Log out sucessfully" })
    }
    return res.status(500).json({ success: false, message: "Something went wrong during logout" })
}

export { userRegister, userLogin, getUser, logOutUser };

// response of const[result] in userLogin
// result from userlogin hai:  [
//   {
//     id: 29,
//     email: 'arpan@arpan.com',
//     password: '$2b$10$ZjgsNbqo8zXxF.wcLmh7juSAOZ3ZKtTRAkmz53jdOzSaGc7O0NRLq',
//     username: 'arpan'
//   }