require("dotenv").config();
const express =require("express");
const cors=require("cors")
const app=express();
const db=require("./db/db")
const port=process.env.PORT;
const userRoutes=require('./routes/index.route')
const cookieparser=require('cookie-parser')

db();
app.use(express.json());
app.use(cors());
app.use(cookieparser());

// app.get("/alive",(req,res)=>{
//     return res.status(200).json({msg:"alive"})
// })


app.use('/api/v1',userRoutes)
app.listen(port,()=>console.log(`running on port${port}`))