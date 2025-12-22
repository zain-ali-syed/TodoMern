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
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Public User Routes
app.use("/users", userRoutes);

//Todo Protected Routes
app.use("/todos", requireAuth, todoRoutes);

async function startServer() {
  const port = process.env.PORT_INTERNAL || 5000; // internal port for Nginx proxy
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
