const express = require("express");
const router = express.Router();

const userRoute = require("./user.route");

const captainRoute = require("./captain.route");

router.use("/users", userRoute);
router.use("/captains", captainRoute);
module.exports = router;