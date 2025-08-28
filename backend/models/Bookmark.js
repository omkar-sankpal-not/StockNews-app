// models/Bookmark.js
const mongoose = require("mongoose");

const BookmarkSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  image: String,
  source: String,
  publishedAt: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  }
});

module.exports = mongoose.model("Bookmark", BookmarkSchema);
