const mongoose = require("mongoose");

const podcastSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    coverImageUrl: { type: String, default: "" }
    // Episodes are not stored here; handled in Episode collection
  },
  { timestamps: true }
);

module.exports = mongoose.model("Podcast", podcastSchema);
