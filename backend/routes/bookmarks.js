const express = require("express");
const router = express.Router();
const Bookmark = require("../models/Bookmark");
const auth = require("../middleware/auth");

// Add bookmark
router.post("/add", auth, async (req, res) => {
  try {
    const bookmark = new Bookmark({
      ...req.body,
      userId: req.user.id
    });
    await bookmark.save();
    res.json(bookmark);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user-specific bookmarks
router.get("/", auth, async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ userId: req.user.id });
    res.json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete bookmark
router.delete("/:id", auth, async (req, res) => {
  try {
    const bookmark = await Bookmark.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!bookmark) return res.status(404).json({ msg: "Bookmark not found" });
    res.json({ msg: "Bookmark removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
