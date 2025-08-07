const Book = require("../models/Book");
const Member = require("../models/Member");

// Add Book
exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Borrow Book
exports.borrowBook = async (req, res) => {
  const { bookId, memberId } = req.body;
  try {
    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);

    if (!book || !member) return res.status(404).json({ message: "Book or Member not found" });
    if (book.status === "borrowed") return res.status(400).json({ message: "Book already borrowed" });

    if (!book.borrowers.includes(memberId)) book.borrowers.push(memberId);
    if (!member.borrowedBooks.includes(bookId)) member.borrowedBooks.push(bookId);

    await book.save();
    await member.save();

    res.json({ message: "Book borrowed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Return Book
exports.returnBook = async (req, res) => {
  const { bookId, memberId } = req.body;
  try {
    const book = await Book.findById(bookId);
    const member = await Member.findById(memberId);

    if (!book || !member) return res.status(404).json({ message: "Book or Member not found" });

    book.borrowers = book.borrowers.filter(id => id.toString() !== memberId);
    member.borrowedBooks = member.borrowedBooks.filter(id => id.toString() !== bookId);

    await book.save();
    await member.save();

    res.json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Book Borrowers
exports.getBookBorrowers = async (req, res) => {
  try {
    const book = await Book.findById(req.params.bookId).populate("borrowers");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true });
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    await Member.updateMany(
      { borrowedBooks: book._id },
      { $pull: { borrowedBooks: book._id } }
    );

    res.json({ message: "Book deleted and removed from member records" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
