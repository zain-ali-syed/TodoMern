const express = require("express");
const router = express.Router();

const { getTodos, addTodo, deleteTodo, completeTodo } = require("../../controllers/todos");

//In /todos route
router.get("/", getTodos);
router.post("/", addTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/complete", completeTodo);

module.exports = router;
