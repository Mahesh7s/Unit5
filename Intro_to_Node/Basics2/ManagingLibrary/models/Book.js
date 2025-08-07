const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  author: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["available", "borrowed"],
    required: true,
    default: "available",
  },
  borrowers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre hook: Before borrowing, validate status
bookSchema.pre("save", function (next) {
  if (this.isModified("borrowers") && this.borrowers.length > 0) {
    this.status = "borrowed";
  } else if (this.borrowers.length === 0) {
    this.status = "available";
  }
  next();
});

module.exports = mongoose.model("Book", bookSchema);
