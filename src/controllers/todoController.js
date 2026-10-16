import Todo from "../models/Todo.js";

const createTodo = async (req, res, next) => {
  const { title, description } = req.body;

  if (typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title must be a non-empty string",
    });
  }

  if (description !== undefined && typeof description !== "string") {
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
    const page = Number(req.query.page) || 1;
    const requestedLimit = Number(req.query.limit) || 10;
    const limit = Math.min(requestedLimit, 100);

    if (
      !Number.isInteger(page) ||
      !Number.isInteger(requestedLimit) ||
      page < 1 ||
      requestedLimit < 1
    ) {
      return res.status(400).json({
        success: false,
        message: "Page and limit must be positive integers",
      });
    }

    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const filter = {
      user: req.user,
    };

    if (search) {
      filter.title = {
        $regex: search,
        $options: "i",
      };
    }

    const totalTodos = await Todo.countDocuments({
      user: req.user,
    });

    const totalPages = Math.ceil(totalTodos / limit);

    const todos = await Todo.find({ user: req.user }).skip(skip).limit(limit);

    return res.status(200).json({
      success: true,
      count: todos.length,
      totalTodos,
      totalPages,
      currentPage: page,
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
