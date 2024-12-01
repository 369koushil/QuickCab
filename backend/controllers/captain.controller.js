const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.service");
const { validationResult } = require('express-validator');


module.exports.createCaptain=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(401).json({error:errors.array()})
    }
   const {fullname,email,password,vehicle}=req.body;
   const captain=await captainService.captainRegister(fullname,email,password,vehicle);

   const token = captain.generateAuthToken();
   res.cookie('token',token)
   return res.status(200).json({token,captain})
}

module.exports.loginCaptain=async(req,res,next)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty())return res.status(401).json({error:errors.array()});
    const {email,password}=req.body;

    const captain=await captainModel.findOne({email}).select("+password");
    if(!captain)return res.status(401).json({message:'invalid email or password'})

    const match=await captain.comparepassword(password);

    if(!match)return res.status(401).json({message:'invalid email or password'})

    const token=captain.generateAuthToken();
    res.cookie('token',token)
    return res.status(200).json({token,captain});
}

module.exports.captainProfileData=async(req,res)=>{
    const captain = req.captain;
    return res.status(200).json({captain});
}

module.exports.logoutCaptain=async(req,res)=>{
    const token=req.headers.authorization?.split(' ')[1]||req.cookies.token;
    captainService.blackListToken(token);
    res.clearCookie('token');
    return res.status(200).json({message:"logout successfully"})
}
