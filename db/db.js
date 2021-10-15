const mongoose = require("mongoose");

// How to connect to the database
// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/boredfavorites"
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/'+ `boredfavorites`

// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true, useUnifiedTopology: true })


// Error / Disconnection
mongoose.connection.on("error", (err) =>
  console.log(err.message + " is Mongod not running?")
);
mongoose.connection.on("disconnected", () => console.log("mongo disconnected"));



mongoose.connection.once("open", () => {
  console.log("connected to mongoose...");
});
