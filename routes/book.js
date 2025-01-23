const express = require("express");
const router = express.Router();
const { bookValidator } = require("../validations/validation.js");
const booksController = require("../controllers/booksController");

router.get("/", booksController.getAllBooks);
router.post("/", bookValidator, booksController.createBook);
router.put("/:id", bookValidator, booksController.updateBook);
router.delete("/:id", booksController.deleteBook);

module.exports = router;
