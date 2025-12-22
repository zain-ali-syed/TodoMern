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
    origin: "http://localhost:8080", // your React dev server or FE container
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "todo-server",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

//Public User Routes
app.use("/users", userRoutes);

//Todo Protected Routes
app.use("/todos", requireAuth, todoRoutes);

async function startServer() {
  const port = 3000;
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
