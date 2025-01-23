const { body } = require("express-validator");

const bookValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isString()
    .withMessage("Title must be a string"),
  body("author")
    .notEmpty()
    .withMessage("Author is required")
    .isString()
    .withMessage("Author must be a string"),
  body("ISBN")
    .notEmpty()
    .withMessage("ISBN is required")
    .isString()
    .withMessage("ISBN must be a string"),
  body("genre")
    .notEmpty()
    .withMessage("Genre is required")
    .isString()
    .withMessage("Genre must be a string"),
  body("publishedYear")
    .notEmpty()
    .withMessage("Published year is required")
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage("Published year must be a valid year"),
  body("copiesAvailable")
    .notEmpty()
    .withMessage("Copies available is required")
    .isInt({ min: 0 })
    .withMessage("Copies available must be a non-negative integer"),
  body("copiesBorrowed")
    .optional()
    .isNumeric()
    .withMessage("Copies borrowed must be a number"),
];

const borrowerValidator = [
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email must be a valid email address"),
  body("phone")
    .notEmpty()
    .withMessage("Phone is required")
    .isString()
    .withMessage("Phone must be a string"),
  body("address")
    .notEmpty()
    .withMessage("Address is required")
    .isString()
    .withMessage("Address must be a string"),
  body("borrowedBooks")
    .notEmpty()
    .withMessage("borrowedBooks ID is required")
    .isString()
    .withMessage("borrowedBooks ID must be a string"),
];

module.exports = {
  bookValidator,
  borrowerValidator,
};
