import Todo from "../models/Todo.js";

const createTodo = async (req, res, next) => {
  const { title, description } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
        success: false,
        message: "Title must be a non-empty string",
    });
}

if (
    description !== undefined &&
    typeof description !== "string"
) {
    return res.status(400).json({
        success: false,
        message: "Description must be a string",
    });
}
  try {
    const todo = await Todo.create({
      title,
      description,
      user: req.user,
    });

    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      todo,
    });
  } catch (error) {
    next(error);
  }
};

const getTodo = async (req, res, next) => {
  try {
    const todos = await Todo.find({ user: req.user });

    return res.status(200).json({
      success: true,
      count: todos.length,
      todos,
    });
  } catch (error) {
    next(error);
  }
};

const getTodoById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({
      _id: id,
      user: req.user,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      todo,
    });
  } catch (error) {
    next(error);
  }
};

const updateTodo = async (req, res, next) => {
  const { id } = req.params;

  const { title, description, completed } = req.body;

  const updateData = {};
  if (title !== undefined) {
    if (typeof title !== "string" || title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title must be a non-empty string",
      });
    }

    updateData.title = title;
  }

  if (description !== undefined) {
    if (typeof description !== "string") {
      return res.status(400).json({
        success: false,
        message: "Description must be a string",
      });
    }

    updateData.description = description;
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Completed must be true or false",
      });
    }

    updateData.completed = completed;
  }

  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one field is required to update",
    });
  }

  
  try {
    const todo = await Todo.findOneAndUpdate(
      {
        _id: id,
        user: req.user,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo updated successfully",
      todo,
    });
  } catch (error) {
    next(error);
  }
};

const deleteTodo = async (req, res, next) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOneAndDelete({
      _id: id,
      user: req.user,
    });

    if (!todo) {
      return res.status(404).json({
        success: false,
        message: "Todo not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { createTodo, getTodo, getTodoById, updateTodo, deleteTodo };
