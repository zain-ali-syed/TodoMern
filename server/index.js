const express = require("express");
const app = express();
const connectDB = require("./db");
const todoRoutes = require("./routes/todos");
const userRoutes = require("./routes/users");
const cookieParser = require("cookie-parser");
const { requireAuth } = require("./middleware/auth");
const cors = require("cors");

require("dotenv").config();

app.use(
  cors({
    origin: "http://localhost:5173",
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
  const port = process.env.PORT || 3000;
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();
