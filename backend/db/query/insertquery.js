import db from '../db.js'
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const createUser = async ({ email, password, username }) => {
    let userId;
    let hashPassword;
    let userToken;
    try {
        const response = await checkUserExistance({ email })
        if (response.success) {
            return { sucess: false, message: 'User already exist', details: response }
        }
        hashPassword = await hashing({ password })
        userId = await insertData({ email, hashPassword, username })
        // console.log('createUser - userId:', userId)
        userToken = await createToken({ userId, email })
        // console.log('createUser - token created:', userToken)
        return { success: true, token: userToken.token, user: { id: userId, email, username } };
    } catch (error) {
        console.error('Error in createUser:', error);
        return { success: false, message: 'Failed to create user', error: error }
    }
}

const createToken = async ({ userId, email }) => {
    try {
        const userToken = jwt.sign({ _id: userId, email: email }, process.env.jwtSecretToken, { expiresIn: '24h' })
        return ({ success: true, message: 'Token created sucessfully', token: userToken })
    } catch (error) {
        return ({ success: false, message: 'JWT generation error', error: error })
    }
}

const checkUserExistance = async ({ email }) => {
    // console.log({email}, "checkuserexistance");
    try {
        const [response] = await db.execute(`SELECT email from users where email=?`, [email])
        if (response.length > 0) {
            // console.error({userStatus: true, message: 'user alresdy exist'})
            // throw new Error({userStatus: true, message: 'user alresdy exist'})
            return { success: true, message: 'user alresdy exist' }
        }
        return { success: false, message: 'Either email or password is incorrect' }
    } catch (error) {
        console.error('\nError while checking user in DB:', error);
        return { userStatus: false, message: 'Something went wrong while checking User in DB', error: error }
    }
}

const insertData = async ({ email, hashPassword, username }) => {
    try {
        const [result] = await db.execute(`INSERT INTO users (email, password, username) values (?, ?, ?)`, [email, hashPassword, username])
        let userId = result.insertId
        // console.log('insertData - New user ID:', userId)
        return userId
    } catch (error) {
        console.error("\nError while creating user in Database ", error);
        throw error
        // return { userStatus: false, message: 'Something went wrong while creating User in DB', error: error }

    }
}

const hashing = async ({ password }) => {
    try {
        let hashPassword = await bcrypt.hash(password, 10);
        return hashPassword
    } catch (error) {
        console.error('\nError while hashing password:', error);
        return { userStatus: false, message: 'Error while hashing password', error: error }

    }
}


export { createUser, checkUserExistance, hashing, createToken }