import authMiddleware from "../middleware/authMiddleware.js";
import { createTodo, getTodo,  getTodoById ,updateTodo ,  deleteTodo} from "../controllers/todoController.js";
import express from "express";


const router = express.Router();

router.post("/", authMiddleware, createTodo);
router.get("/", authMiddleware, getTodo);
router.get("/:id", authMiddleware, getTodoById);
router.patch("/:id", authMiddleware, updateTodo);
router.delete("/:id", authMiddleware, deleteTodo);

export default router;