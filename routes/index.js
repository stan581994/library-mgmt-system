const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //#swagger.tags = ['Hello World']
  res.send("Hello World!");
});

router.use("/", require("./swagger"));

router.use("/books", require("./book"));

router.use("/borrowers", require("./borrower"));

module.exports = router;
