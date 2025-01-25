const Book = require("../models/book");
const mongoose = require("mongoose");
const { validationResult } = require("express-validator");

const getAllBooks = async (req, res) => {
  //#swagger.tags = ['Books']
  const books = await Book.find();
  res.setHeader("Content-Type", "application/json");
  res.status(200).send(books);
};

const createBook = async (req, res) => {
  //#swagger.tags = ['Books']
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newBook = new Book({
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
    genre: req.body.genre,
    publishedYear: req.body.publishedYear,
    copiesAvailable: req.body.copiesAvailable,
    borrowedCount: req.body.borrowedCount,
  });

  try {
    const result = await newBook.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBook = async (req, res) => {
  //#swagger.tags = ['Books']
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updateBook = {
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
    genre: req.body.genre,
    publishedYear: req.body.publishedYear,
    copiesAvailable: req.body.copiesAvailable,
    borrowedCount: req.body.borrowedCount,
  };

  try {
    const result = await Book.findByIdAndUpdate(req.params.id, updateBook, {
      new: true,
    });
    if (!result) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof mongoose.CastError) {
      return res.status(400).json({ error: "Invalid book ID" });
    }
    res.status(500).json({ error: err.message });
  }
};

const deleteBook = async (req, res) => {
  //#swagger.tags = ['Books']
  try {
    const result = await Book.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.status(200).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
};
