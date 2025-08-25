const mongoose = require("mongoose");

const episodeSchema = new mongoose.Schema(
  {
    podcastId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Podcast",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String },
    audioUrl: { type: String, required: true },
    publicId: { type: String, required: true },
    duration: { type: Number, required: true }, // in minutes
    plays: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Episode = mongoose.model("Episode", episodeSchema);
module.exports = Episode;
