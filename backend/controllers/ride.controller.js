const { validationResult } = require('express-validator');
const rideService=require('../services/ride.service')
const mapService=require('../services/map.service');
const rideModel=require('../models/ride.model');
const { sendMessageToSocketId } = require('../socket');

module.exports.createRide=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(404).json({errors:Array()})
    }

    const {userId,pickup,destination,vehicleType}=req.body;

    try{
        console.log("entered")
        console.log(req.user)
        const ride=await rideService.createRide({user:req.user._id,pickup,destination,vehicleType});
        // console.log(ride)
        res.status(200).json(ride);
         
        const location=await mapService.getAddressCoordinates(pickup)
        console.log(location.lat,location.lng)
        const captains=await mapService.getCaptainsInTheRadius(location.lat,location.lng,200)
        // console.log(captains)
 
       captains.forEach(e=>console.log(e))
        const rideWithUser=await rideModel.findOne({_id:ride._id}).populate('user')
        console.log(rideWithUser)
        ride.otp="";
        captains.map(c=>{
            sendMessageToSocketId(c.socketId,{
                event:'new-ride',
                data:rideWithUser
            })
        })

 
    }catch(err){
        console.log("erro here")
        console.log(err.message)
        return res.status(404).json({err:"err"})
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


module.exports.confirmRide=async(req,res)=>{
 const{rideId}=req.body;
   try{
    const ride = await rideService.confirmRide({ rideId, captain: req.captain });

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-confirmed',
        data: ride
    })

    return res.status(200).json(ride);
} catch (err) {

    console.log(err);
    return res.status(500).json({ message: err.message });
}
   }


module.exports.startRide=async(req,res)=>{
    
    const{rideId,otp}=req.body;

    try{
        const ride=await rideService.startRide({rideId,otp,captain:req.captain})

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-started',
            data: ride
        })
        return res.status(200).json(ride);
    }catch(err){
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
}



module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } s
}