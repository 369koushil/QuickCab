const captainModel = require("../models/captain.model")
const blackListTokens=require("../models/blacklisttokens.model")

module.exports.captainRegister=async(fullname,email,password,vehicle)=>{

    const hashPassword=await captainModel.hashpassword(password);
    const captain=await captainModel.create({
        fullname:{
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        },
        email,
        password: hashPassword,
        vehicle:{
            color:vehicle.color,
            vehicleType:vehicle.vehicleType,
            vehicleNo:vehicle.vehicleNo,
            vehicleCapacity:vehicle.vehicleCapacity
        }
    }
       )

       return captain;
}


module.exports.blackListToken=async (token)=>{
    await blackListTokens.create({token});
  }
