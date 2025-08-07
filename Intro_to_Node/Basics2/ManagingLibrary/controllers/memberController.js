const Member = require("../models/Member");
const Book = require("../models/Book");

// Add Member
exports.addMember = async (req, res) => {
  try {
    const member = await Member.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Member Borrowed Books
exports.getBorrowedBooks = async (req, res) => {
  try {
    const member = await Member.findById(req.params.memberId).populate("borrowedBooks");
    if (!member) return res.status(404).json({ message: "Member not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
