import mysql from 'mysql2/promise'
import dotenv from 'dotenv/config'

const db = await mysql.createConnection({
    host: `${process.env.dbHost}`,
    user: `${process.env.dbUser_}`,
    password: `${process.env.dbUser_ps}`,
    database: `${process.env.dbName}`
});
export default db