const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    episodeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Episode",
      required: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    isApproved: {
      type: Boolean,
      default: true // Change to false if you want moderation by default
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
