const express = require("express");
const router = express.Router();
const {
  addBook,
  borrowBook,
  returnBook,
  getBookBorrowers,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

router.post("/add-book", addBook);
router.post("/borrow-book", borrowBook);
router.post("/return-book", returnBook);
router.get("/book-borrowers/:bookId", getBookBorrowers);
router.put("/update-book/:bookId", updateBook);
router.delete("/delete-book/:bookId", deleteBook);

module.exports = router;
