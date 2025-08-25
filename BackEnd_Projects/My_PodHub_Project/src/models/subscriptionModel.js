const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    podcastId: { type: mongoose.Schema.Types.ObjectId, ref: "Podcast", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  { timestamps: true }
);

// Unique index to prevent duplicate subscriptions
subscriptionSchema.index({ podcastId: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model("Subscription", subscriptionSchema);
