const router = require("express").Router();
const { borrowerValidator } = require("../validations/validation.js");
const borrowerController = require("../controllers/borrowerController");

router.get("/", borrowerController.getAllBorrowers);
router.post("/", borrowerValidator, borrowerController.createBorrower);
router.put("/:id", borrowerValidator, borrowerController.updateBorrower);
router.delete("/:id", borrowerController.deleteBorrower);

module.exports = router;
