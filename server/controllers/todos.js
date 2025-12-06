const TodoModel = require("../models/todos");
const HTTP = require("../utils/httpStatusCodes");

const getTodos = async (req, res) => {
  try {
    const todos = await TodoModel.find({ user: req.user.id });
    res.status(HTTP.OK.code).json(todos);
  } catch (err) {
    res.status(HTTP.SERVER_ERROR.code).json({
      success: false,
      message: "Failed to get todos",
      error: err.message,
    });
  }
};

const addTodo = async (req, res) => {
  try {
    const todo = await TodoModel.create({ ...req.body, user: req.user.id });
    res.status(HTTP.CREATED.code).json(todo);
  } catch (err) {
    res.status(HTTP.SERVER_ERROR.code).json({
      success: false,
      message: "Failed to create todo",
      error: err.message,
    });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const userId = req.user.id; // from JWT middleware
    const todoId = req.params.id;

    //also check ownership at the same time
    const deletedTodo = await TodoModel.findOneAndDelete({
      _id: todoId,
      user: userId,
    });

    if (!deletedTodo) {
      return res.status(HTTP.NOT_FOUND.code).json({
        success: false,
        message: "Todo not deleted or not yours to delete",
      });
    }

    res.status(HTTP.OK.code).json({ success: true, message: "Task deleted" });
  } catch (err) {
    res.status(HTTP.SERVER_ERROR.code).json({
      success: false,
      message: "Failed to delete todo",
      error: err.message,
    });
  }
};

const completeTodo = async (req, res) => {
  try {
    const updatedTodo = await TodoModel.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { completed: true },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(HTTP.NOT_FOUND.code).json({
        success: false,
        message: "Todo not found or not yours",
      });
    }

    res.status(HTTP.OK.code).json({
      success: true,
      message: "Task completed",
      todo: updatedTodo,
    });
  } catch (err) {
    res
      .status(HTTP.SERVER_ERROR.code)
      .json({ success: false, message: "Server error", error: err.message });
  }
};

module.exports = { getTodos, addTodo, deleteTodo, completeTodo };
