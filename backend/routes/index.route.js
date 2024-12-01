const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");

const captainRoute = require("./captain.route");

router.use("/user", userRoute);
router.use("/captain", captainRoute);
module.exports = router;