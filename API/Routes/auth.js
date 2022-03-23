require("dotenv").config({ path: "../config.env" });
const router = require('express').Router();
const User = require('../Models/User');
const Cryptojs = require('crypto-js');
const ErrorResponse = require('../Utils/errorResponse');
const sendEmail = require('../Utils/emailSend');
const crypto = require('crypto');
const { createToken } = require("../Utils/JWTaccess")



//! REGISTER
router.post("/register", async (req, res, next) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: Cryptojs.AES.encrypt( req.body.password, process.env.PASS_SEC ).toString(),
    });

    try {
        const hashedPassword = Cryptojs.AES.decrypt(
            newUser.password,
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(Cryptojs.enc.Utf8);

        if (originalPassword.length < 6) {return next(new ErrorResponse("Password is too short", 401));}

        const savedUser = await newUser.save();

        res.status(200).json(savedUser)
    } catch (error) {
        next(error);
    }
});

//! LOGIN
router.post("/login", async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });

        if(!user) {return next(new ErrorResponse("Please write your correct username", 401));}

        const hashedPassword = Cryptojs.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const originalPassword = hashedPassword.toString(Cryptojs.enc.Utf8);

        if(originalPassword !== req.body.password) {return next(new ErrorResponse("Please write your right password", 401));}
        let id = user._id;
        let isAdmin = user.isAdmin;

        const accessToken = createToken(id, isAdmin);

        const { password, ...others } = user._doc;

        res.status(200).json({ ...others, accessToken });
    } catch (error) {
        console.log(error);
    }
});

//! FORGOT_PASSWORD
router.post("/forgotpassword", async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if(!user) {
            return next(new ErrorResponse("Email could not be sent", 404));
        };

        const resetToken = user.getResetPasswordToken();

        await user.save();

        const resetURL = `http://localhost:3000/passwordreset/${resetToken}`;

        const message = `
           <h1>You have requested a password reset</h1>
           <p>Please use this link to reset your password</p>
           <a href = ${resetURL} clicktracking = off>CLICK HERE</a>
        `;

        try {
            await sendEmail({
                to: user.email,
                subject: "Password reset request",
                text: message
            });

            res.status(200).json({ success: true, data: "Email sent" });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save();

            return next(new ErrorResponse("Email could not be sent", 500));
        }
    } catch (error) {
        next(error);
    }
});

//! RESET_PASSWORD
router.put("/resetpassword/:resetToken", async (req, res, next) => {
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");
    
    try {
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if(!user) {
            return next(new ErrorResponse("Invalid Reset Token", 400));
        };

        user.password = Cryptojs.AES.encrypt( req.body.password, process.env.PASS_SEC ).toString();
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(201).json({
            success: true,
            data: "Password Reset Success"
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;