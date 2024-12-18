const captainModel=require("../models/captain.model");
const userModel=require("../models/user.model");
const blackListTokens=require("../models/blacklisttokens.model")
const jwt=require("jsonwebtoken")

module.exports.authUser=async(req,res,next)=>{
    // console.log("auth")
    const token=req.headers.authorization?.split(' ')[1];
    // console.log(token)
    const blackListed=await blackListTokens.findOne({token})

if(blackListed){
   return  res.status(401).json({message:"unathorized acces token expired"})
}

    if(!token){
        // console.log("no token in headers")
        return res.status(200).json({message:"unauthorized access"});
    }
     
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await userModel.findById(decoded._id);
        req.user=user;
        // console.log(user);
       return  next();
    }
    catch(err){
        // console.log(err);
        return res.status(401).json({message:'unauthorized access'});
    }

    
}

module.exports.authCaptain=async(req,res,next)=>{
    const token=req.cookies.token||req.headers.authorization?.split(' ')[1];
    const blackListed=await blackListTokens.findOne({token})

if(blackListed){
   return  res.status(401).json({message:"unathorized acces token expired"})
}

    if(!token){
        return res.status(200).json({message:"unauthorized access no token"});
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded)
        const captain=await captainModel.findById(decoded._id);
        console.log(captain)
        req.captain=captain;
        // console.log(user);
       return  next();
    }
    catch(err){
        return res.status(401).json({message:'unauthorized access error'});
    }

}