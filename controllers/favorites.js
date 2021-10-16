const express = require("express");
const router = express.Router();
const Favorites = require("../models/favorites");
const { handleValidateOwnership, requireToken } = require("../middleware/auth");

// -- index--
router.get("/", async (req, res) => {
  try {
    const allFavorites = await Favorites.find()
      .populate("creator", "email")
      .exec();
    res.status(200).json(allFavorites);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- show --
router.get("/:id", requireToken, async (req, res) => {
  try {
    const oneFavorite = await Favorites.findById(req.params.id)
      .populate("creator")
      .exec();
    res.status(200).json(oneFavorite);
  } catch {
    res.status(400).json({ error: error.message });
  }
});

// -- create --
router.post("/", requireToken, async (req, res) => {
  try {
    const newFavorite = await Favorites.create(req.body);
    res.status(200).json(newFavorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- destroy --
router.delete("/:id", requireToken, async (req, res) => {
  try {
    // handleValidateOwnership(req, await Favorite.findById(req.params.id));
    const deletedFavorite = await Favorites.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedFavorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// -- update --
router.put("/:id", requireToken, async (req, res) => {
  try {
    handleValidateOwnership(req, await Favorite.findById(req.params.id));
    const updatedFavorite = await Favorites.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedFavorite);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
