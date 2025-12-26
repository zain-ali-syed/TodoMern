require("dotenv").config();

const express = require("express");
const app = express();
const connectDB = require("./db");
const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/users");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/auth");
const cors = require("cors");

app.use(
  cors({
    origin: process.env.CLIENT_URL, // your React dev server or FE container
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

//Public User Routes
app.use("/api/users", userRoutes);

//Todo Protected Routes
app.use("/api/todos", requireAuth, todoRoutes);

async function startServer() {
  const port = process.env.PORT || 8080;
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
