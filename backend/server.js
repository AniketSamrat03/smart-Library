import express from 'express'
import dotenv from 'dotenv'
import router from './routes/routes.js'
import './config/db.js'
import cors from "cors";
// your frontend

const app = express()
dotenv.config()
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.urlencoded({extended:true}))
app.use('/api',router)
const PORT = process.env.PORT ;
app.listen(PORT,()=>{
    console.log(`Server is running on  PORT ${PORT}`)
})