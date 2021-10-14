const mongoose = require("mongoose");

const favoritesSchema = mongoose.Schema(
  {
    activity: { type: String },
    category: { type: String },
    isDone: { type: Boolean },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorites", favoritesSchema);
