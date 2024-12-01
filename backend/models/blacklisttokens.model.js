const mongoose=require("mongoose");

const blackListTokenSchema=new mongoose.Schema({
    token:{
        type:String,
        unique:true
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400
    }
})

const BlackList=mongoose.model("BlackList",blackListTokenSchema)

module.exports=BlackList;