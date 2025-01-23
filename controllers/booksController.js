const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const getAllBooks = async (req, res) => {
  //#swagger.tags = ['Books']
  const result = await mongodb.getDatabase().db().collection("books").find();
  result.toArray().then((book) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(book);
  });
};

const createBook = async (req, res) => {
  //#swagger.tags = ['Books']
  const newBook = {
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
    genre: req.body.genre,
    publishedYear: req.body.publishedYear,
    copiesAvailable: req.body.copiesAvailable,
    borrowedCount: req.body.borrowedCount,
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .insertOne(newBook);

  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while creating the contact");
  }
};

const updateBook = async (req, res) => {
  //#swagger.tags = ['Books']
  const bookId = ObjectId.createFromHexString(req.params.id);
  const updateBook = {
    title: req.body.title,
    author: req.body.author,
    ISBN: req.body.ISBN,
    genre: req.body.genre,
    publishedYear: req.body.publishedYear,
    copiesAvailable: req.body.copiesAvailable,
    borrowedCount: req.body.borrowedCount,
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .updateOne({ _id: bookId }, { $set: updateBook });

  if (result.modifiedCount == 1) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while updating the contact");
  }
};

const deleteBook = async (req, res) => {
  //#swagger.tags = ['Books']
  const bookId = ObjectId.createFromHexString(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("books")
    .deleteOne({ _id: bookId });

  if (result.deletedCount == 1) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while deleting the contact");
  }
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
};
