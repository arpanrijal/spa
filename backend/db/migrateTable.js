import dotenv from 'dotenv/config'
import db from "./db.js"

const insertColumn = async () =>{
    try {
        await db.execute(`ALTER TABLE users ADD COLUMN token varchar(255) default null;`)
        console.log("Column 'token' added successfully (or already exists).");
    } catch (error) {
        console.error("Error adding column 'token':", error);
    } finally{
        await db.end()
    }
}
insertColumn();