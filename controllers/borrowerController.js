const mongodb = require("../data/database");
const { validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");

const getAllBorrowers = async (req, res) => {
  //#swagger.tags = ['Borrowers']
  const result = await mongodb
    .getDatabase()
    .db()
    .collection("borrowers")
    .find();
  result.toArray().then((borrower) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(borrower);
  });
};

const createBorrower = async (req, res) => {
  //#swagger.tags = ['Borrowers']
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newBorrower = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    borrowedBooks: req.body.borrowedBooks,
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection("borrowers")
    .insertOne(newBorrower);

  if (result.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while creating the borrower");
  }
};

const updateBorrower = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //#swagger.tags = ['Borrowers']
  const borrowerId = ObjectId.createFromHexString(req.params.id);
  const updateBorrower = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    borrowedBooks: req.body.borrowedBooks,
  };

  const result = await mongodb
    .getDatabase()
    .db()
    .collection("borrowers")
    .updateOne({ _id: borrowerId }, { $set: updateBorrower });

  if (result.modifiedCount == 1) {
    res.status(200).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while updating the borrower");
  }
};

const deleteBorrower = async (req, res) => {
  //#swagger.tags = ['Borrowers']
  const borrowerId = ObjectId.createFromHexString(req.params.id);

  const result = await mongodb
    .getDatabase()
    .db()
    .collection("borrowers")
    .deleteOne({ _id: borrowerId });

  if (result.deletedCount == 1) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(result.error || "An error occurred while deleting the borrower");
  }
};

module.exports = {
  getAllBorrowers,
  createBorrower,
  updateBorrower,
  deleteBorrower,
};
