const express = require("express");
const app = express();
const { connectDB } = require("./data/database");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  next();
});

app.use("/", require("./routes"));

// Connect to MongoDB
connectDB((err) => {
  if (err) {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
