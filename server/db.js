const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "..", ".env") });
const mongoose = require("mongoose");

const dbName = process.env.MONGO_DB;
const dbUsername = process.env.MONGO_USER;
const dbPassword = process.env.MONGO_PASSWORD;

const dbURI = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.nfe5cu1.mongodb.net/${dbName}`;

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
