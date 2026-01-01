import express, { urlencoded } from "express"
const app = express()
import dotenv from 'dotenv/config'
import startDbServer from "./db/dbInit.js"
import dashboard from './routes/dashboard.route.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true 
}))
app.use(cookieParser())
app.use(express.json())
app.use(urlencoded({extended: true}))

const startservers = async ()=>{
    try{
        await startDbServer();
    } catch(err){
        console.error("Error in DB occure", err)
        return
    }
    app.use('/',dashboard)
    app.listen(3000,()=>{
        console.log(`\nServer is running at: http://localhost:3000`)
    })
}
startservers();