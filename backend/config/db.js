import mongoose from "mongoose"
import dotenv from 'dotenv'
dotenv.config()
mongoose.connect(process.env.MONGO_URI,{
    dbName:process.env.DB_NAME,
    useNewUrlParser:true,
    useUnifiedTopology:true,

    
})
.then(()=>{
    console.log('mongodb connected')
})
.catch((err)=>console.log(err.message))

mongoose.connection.on('connected',()=>{
    console.log('mongoose connected to db',process.env.DB_NAME)
})
mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})
mongoose.connection.on('disconnecting',()=>{
    console.log('mongoose connection is disconnected')
})

process.on('SIGINT',async()=>{
    await mongoose.connection.close()
    process.exit(0)
})