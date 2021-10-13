const mongoose = require("mongoose");

const favoritesSchema = mongoose.Schema(
  {
    activity: { type: String },
    category: { type: String },
    isDone: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorites", favoritesSchema);
