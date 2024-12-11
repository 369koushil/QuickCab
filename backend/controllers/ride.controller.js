const { validationResult } = require('express-validator');
const rideService=require('../services/ride.service')
const mapService=require('../services/map.service');
const rideModel=require('../models/ride.model')

module.exports.createRide=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({errors:Array()})
    }

    const {userId,pickup,destination,vehicleType}=req.body;

    try{
        const ride=await rideService.createRide({user:req.user._id,pickup,destination,vehicleType});
        res.status(200).json(ride);
 
    }catch(err){
        return res.status(404).json({err})
    }
}


module.exports.getFareController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pickup, destination } = req.query;

    try {
        const fare = await rideService.getFare(pickup, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({msg:"hello", message: err.message });
    }
}