const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");

const captainRoute = require("./captain.route");
const mapRoute=require("./map.route")
const rideRoute=require("./ride.route")

router.use("/users", userRoute);
router.use("/captains", captainRoute);
router.use('/maps',mapRoute);
router.use("/rides",rideRoute);
module.exports = router;