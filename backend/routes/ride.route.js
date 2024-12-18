const express=require('express');
const router=express.Router();
const {body,query}=require("express-validator");
const authmiddleware=require("../middlewares/auth.middleware")
const rideController=require('../controllers/ride.controller')

router.post('/create',
    authmiddleware.authUser,
    body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn([ 'auto', 'car', 'moto' ]).withMessage('Invalid vehicle type'),
    rideController.createRide
)

router.get('/get-fare',
    authmiddleware.authUser,
    query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    rideController.getFareController
)


router.post('/confirm',authmiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('invalid rider id required'),
    rideController.confirmRide
)

router.post('/start-ride',authmiddleware.authCaptain,
    query('rideId').isMongoId().withMessage('invalid rider id required'),
    query('otp').isString().isLength({min:6,max:6}).withMessage('invalid otp'),
    rideController.startRide
)


router.post('/end-ride',authmiddleware.authCaptain,
    body('rideId').isMongoId().withMessage('invalid rider id required'),
    rideController.endRide
)


module.exports=router;