// filepath: /c:/Users/steven.tan.LTPHDIPF23JCE8/Documents/BYU/Webservices/week3-4-project/library-mgmt-system/controllers/borrowerController.js
const { validationResult } = require("express-validator");
const Borrower = require("../models/borrower");

const getAllBorrowers = async (req, res) => {
  //#swagger.tags = ['Borrowers']
  try {
    const borrowers = await Borrower.find();
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(borrowers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createBorrower = async (req, res) => {
  //#swagger.tags = ['Borrowers']
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const newBorrower = new Borrower({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    borrowedBooks: req.body.borrowedBooks,
  });

  try {
    const result = await newBorrower.save();
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBorrower = async (req, res) => {
  //#swagger.tags = ['Borrowers']
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const updateBorrower = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    borrowedBooks: req.body.borrowedBooks,
  };

  try {
    const result = await Borrower.findByIdAndUpdate(
      req.params.id,
      updateBorrower,
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ error: "Borrower not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteBorrower = async (req, res) => {
  //#swagger.tags = ['Borrowers']
  try {
    const result = await Borrower.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ error: "Borrower not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllBorrowers,
  createBorrower,
  updateBorrower,
  deleteBorrower,
};
