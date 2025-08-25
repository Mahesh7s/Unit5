const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }, // plain string at model level; hashing in controller
    role: { type: String, enum: ["listener", "creator", "admin"], default: "listener" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
