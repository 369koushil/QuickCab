const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller")
router.post("/register", [
    body('email').isEmail().withMessage('invalid'),
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name must be 3 char'),
    body('password').isLength({ min: 6 }).withMessage("password must be 6 char length")
], userController.registerUser)

router.post("/login",[
    body('email').isEmail().withMessage('invalid'),
    body('password').isLength({ min: 6 }).withMessage("password must be 6 char length")
],userController.userLogin);
module.exports = router;
