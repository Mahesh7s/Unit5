const express = require("express");
const router = express.Router();
const { addMember, getBorrowedBooks } = require("../controllers/memberController");

router.post("/add-member", addMember);
router.get("/member-borrowed-books/:memberId", getBorrowedBooks);

module.exports = router;
