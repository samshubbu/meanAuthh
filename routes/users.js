const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../config/database");
const accessList = require("../models/accesslist");

//REGISTER
router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    role: req.body.roles
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: "Failed to register user" });
    } else {
      res.json({ success: true, msg: "Successfully registered" });
    }
  });
});

//AUTHENTICATE
router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.send({ success: false, msg: "User not Found" });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.cookie("__tn", token);
        res.status(200).send({
          success: true,
          token: token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.send({ success: false, msg: "Wrong Password" });
      }
    });
  });
});

// ADMIN
router.post("/admin", (req, res) => {
      res.json({ success: true, msg: "Hello You Are Admin" });
  });

// SALES
router.get("/sales", (req, res) => {
      res.json({ success: true, msg: "Hello You Are Sales Authorized" });
});

// ACCOUNTS
router.get("/accounts", (req, res) => {
      res.json({ success: true, msg: "Hello You Are Accounts Authorized" });
});

module.exports = router;
