const express = require("express");
const router = express.Router();
const { bookValidator } = require("../validations/validation.js");
const booksController = require("../controllers/booksController");
const isAuthenticated = require("../middleware/authenticate.js");

router.get("/", booksController.getAllBooks);
router.post("/", isAuthenticated, bookValidator, booksController.createBook);
router.put("/:id", isAuthenticated, bookValidator, booksController.updateBook);
router.delete("/:id", isAuthenticated, booksController.deleteBook);

module.exports = router;
