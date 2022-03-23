require("dotenv").config({ path: "../config.env" });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const time = { timestamps: true };
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const UserSchema = new Schema({
    username: { 
        type: String, 
        required: [true, 'please enter your right username'],
        unique: true,
        default: null
    },
    email: {
        type: String,
        required: [true, 'please enter your right email'],
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: { 
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is 6 characters'],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    img: { type: String }
}, time);

UserSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
           .createHash("sha256")
           .update(resetToken)
           .digest("hex");
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
