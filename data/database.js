const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectDB = async (callback) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    callback(null, mongoose.connection);
  } catch (err) {
    console.error(err.message);
    callback(err);
  }
};

const getDatabase = () => {
  if (!mongoose.connection.readyState) {
    throw new Error("Database is not initialized");
  }
  return mongoose.connection;
};

module.exports = {
  connectDB,
  getDatabase,
};
