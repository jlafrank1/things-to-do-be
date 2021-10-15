const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const { createUserToken, requireToken } = require("../middleware/auth");
const router = express.Router();

// controller
// REGISTER
// POST /auth/register
const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    const pwStore = req.body.password;

    req.body.password = passwordHash;

    const newUser = await User.create(req.body);
    if (newUser) {
      req.body.password = pwStore;
      const authenticatedUserToken = createUserToken(req, newUser);
      res.status(201).json({
        user: newUser,
        isLoggedIn: true,
        token: authenticatedUserToken,
      });
    } else {
      res.status(400).json({ error: "Something went wrong" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// LOG IN
// POST /auth/login
const login = async (req, res) => {
  // res.send("post login");
  try {
    const loggingUser = req.body.email;
    // console.log("backend, login function, req.body.email > ", loggingUser)
    const foundUser = await User.findOne({ email: loggingUser });
    // console.log("backend, login function, email > ", foundUser)
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
router.get("/logout", requireToken, async (req, res, next) => {
  try {
    const currentUser = req.user.username;
    delete req.user;
    res.status(200).json({
      message: `${currentUser} currently logged in`,
      isLoggedIn: false,
      token: "",
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// routing
router.post("/register", register);
router.post("/login", login);

module.exports = router;
