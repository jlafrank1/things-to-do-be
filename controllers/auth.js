const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createUserToken } = require("../middleware/auth");

const router = express.Router();

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
    const { username, _id } = newUser;
    // const responseData = { username, _id };
    console.log("new user > ", newUser);

    res.status(201).json({
      currentUser: newUser,
      isLoggedIn: true,
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
  // res.send("post register");
};

// LOG IN
// POST /auth/login
const login = async (req, res) => {
  // res.send("post login");
  try {
    const loggingUser = req.body.username;
    const foundUser = await User.findOne({ username: loggingUser });
    const token = await createUserToken(req, foundUser);
    res.status(200).json({
      user: foundUser,
      isLoggedIn: true,
      token,
    });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

// LOG OUT
// GET /auth/logout

// routing
router.post("/register", register);
router.post("/login", login);

module.exports = router;
