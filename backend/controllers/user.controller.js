const userModel = require("../models/user.model.");
const userService = require("../services/user.service")
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.errors.array() });
    }
    console.log(req.body);
    const { fullname, email, password } = req.body;
    const hashPassword = await userModel.hashpassword(password);
    const user = await userService.createUser({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password: hashPassword
    })

    const token = user.generateAuthToken();
    res.status(200).json({ token, user })
}

module.exports.userLogin=async function(req,res,next){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.errors.array() });
    }
const {email,password}=req.body;
    const user=await userModel.findOne({email}).select("+password");
    
    if(!user){
    return res.status(401).json({msg:"invalid email"});
    }

    const match=await user.comparepassword(password);
    console.log(match);
    if(!match){
return res.status(401).json({msg:"invalid password"});
    }
    const token=user.generateAuthToken(); 
    return res.status(200).json({user,token})
}