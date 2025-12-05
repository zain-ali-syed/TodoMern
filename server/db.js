const mongoose = require("mongoose");

const databaseName = "TodoDB";
const dbURI = `mongodb+srv://chelnov63:3wM7Uz0e1usB8QLy@cluster0.nfe5cu1.mongodb.net/${databaseName}`;

async function connectDB() {
  try {
    await mongoose.connect(dbURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // optional: stop server on error
  }
}

module.exports = connectDB;
