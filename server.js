// dependencies
const express = require("express");
const passport = require("passport");
const app = express();
require("./db/db");
const PORT = process.env.PORT || 9000;
require('dotenv').config()
const cors = require("cors");

// controllers
const authController = require("./controllers/auth");
const favoritesController = require("./controllers/favorites");

// Cors
const whitelist = [
  "http://localhost:3000",
  "https://damp-lake-03547.herokuapp.com/",
  "https://calm-falls-13073.herokuapp.com/"
];

const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("not allowed by CORS"));
    }
  },
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use(passport.initialize());

app.use("/auth", authController);
app.use("/favorites", favoritesController);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
