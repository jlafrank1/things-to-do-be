const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// controller
// REGISTER
// POST /auth/register
const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);
    req.body.password = passwordHash;
    console.log("req body password > ", req.body.password);

    const newUser = await User.create(req.body);
    console.log("new user > ", newUser);

    res.status(201).json({
      currentUser: newUser,
      isLoggedIn: true,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
  res.send("post register");
};

// LOG IN
// POST /auth/login
const login = async (req, res) => {
  res.send("post login");
};

// LOG OUT
// GET /auth/logout

// routing
router.post("/register", register);
router.post("/login", login);

module.exports = router;
