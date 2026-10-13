import express from "express";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "To-Do API is running",
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Error middleware should be last
app.use(errorMiddleware);

export default app;