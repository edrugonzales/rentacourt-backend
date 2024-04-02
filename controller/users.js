'use strict'

const jwt = require("jsonwebtoken"); // to generate signed token
const jwt_decode = require('jwt-decode')
const User = require("../models/Users");
const mongoose = require("mongoose");
const crypto = require("crypto");
const maxAge = 3 * 24 * 60 * 60;
const create_token = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: maxAge });
};
let result

var controllers = {
  sign_in: async function (req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .json({ success: false, msg: `Missing email or password field!` });
      return;
    }

    try {
      const user = await User.findOne({ email }).lean().exec();
      if (!user) {
        res.status(400).json({ success: false, msg: `Invalid credentials!` });
        return;
      }
      else {
        let encryptPassword = crypto
          .createHmac("sha1", user.salt)
          .update(password)
          .digest("hex");

        console.log(encryptPassword)
        if (encryptPassword !== user.hashed_password) {

          res.status(400).json({ success: false, msg: `Invalid credentials!` });
          return;
        }
        else {
          
          const objectId = user._id;
          const stringRepresentation = objectId.toString();
          console.log(stringRepresentation)
          const token = create_token(stringRepresentation);
          res.cookie("jwt", token, { expire: new Date() + 9999 });
          return res.json({ token, ...user});
        }
      }
    } catch (err) {
      res.status(400).json({ success: false, msg: err });
    }
  },
  sign_up: async function (req, res) {
    let { email, name, phone, password } = req.body;

    if (!email || !name || !phone || !password)
      return res.status(400).json({
        success: false,
        msg: "Please provide fields",
      });

    const now = new Date();
    let code = null;


    const user = await User.find({ email: email }).lean().exec();
    if (user.length !== 0)
      return res.status(400).json({
        success: false,
        msg: "Email already exists",
      });

    try {
      let _params = {
        Name: name,
        email: email,
        phone: phone,
        createdAt: now.toISOString(),
        password: password,
      };

      let new_user = new User(_params);
      try {
        let result = await User.create(new_user);
        if (!result) {
          res.status(400).json({
            success: false,
            msg: "Unable to sign up",
          });
        }
        const token = jwt.sign({ id: result._id }, process.env.JWT_SECRET);
        let response = {
          ...result._doc,
          isVerified: true,
          isOnBoarded: true,
          token,
        };

        res.json(response);
      } catch (err) {
        await logError(err, "Auth", req.body, null, "POST");
        res.status(400).json({
          success: false,
          msg: "Unable to sign up",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(400).json({
        success: false,
        msg: "Unable to sign up",
      });
    }
  },
}

module.exports = controllers
