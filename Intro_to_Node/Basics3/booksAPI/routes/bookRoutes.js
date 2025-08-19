// src/routes/bookRoutes.js
const express = require("express");
const Book = require("../models/bookModel");
const auth = require("../middleware/auth");
const getBooksCache = require("../middleware/cache");
const redis = require("../config/redis");

const router = express.Router();

// GET /books
router.get("/", auth, getBooksCache, async (req, res) => {
  const books = await Book.find({ userId: req.user.userId });
  await redis.set(`books:${req.user.userId}`, JSON.stringify(books), "EX", 60);
  res.json(books);
});

// POST /books
router.post("/", auth, async (req, res) => {
  const book = await Book.create({ ...req.body, userId: req.user.userId });
  await redis.del(`books:${req.user.userId}`);
  res.status(201).json(book);
});
// src/routes/bookRoutes.js
router.post("/bulk", auth, async (req, res) => {
  const userId = req.user.userId;
  const books = req.body.books;
  const key = `bulk_books:${userId}`;
  
  await redis.rpush(key, JSON.stringify(books)); // push array as string
  res.json({ message: "Books will be added later." });
});
