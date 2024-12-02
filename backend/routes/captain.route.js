const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const authmiddleware=require("../middlewares/auth.middleware")
const captainController = require("../controllers/captain.controller")

router.post("/register", [
    body('email').isEmail().withMessage('invalid'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be 3 char'),
    body('password').isLength({ min: 6 }).withMessage("password must be 6 char length"),
    body('vehicle.color').isLength({min:3}).withMessage('minimum 3 char color'),
    body('vehicle.vehicleNo').isLength({min:3}).withMessage('3 char plat no req'),
    body('vehicle.vehicleCapacity').isInt({min:1}).withMessage('min 1 capcity accpeted'),
    body('vehicle.vehicleType').isIn(['car','auto','motorcycle']).withMessage('invalid vechile type')
],captainController.createCaptain);

router.post("/login", [
    body('email').isEmail().withMessage('invalid'),
    body('password').isLength({ min: 6 }).withMessage("password must be 6 char length")
],captainController.loginCaptain);

router.get("/getcaptainprofile",authmiddleware.authCaptain,captainController.captainProfileData);
router.post('/logout',authmiddleware.authCaptain,captainController.logoutCaptain);

module.exports=router;