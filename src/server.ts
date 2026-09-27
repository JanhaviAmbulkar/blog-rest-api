import express from "express";
import dotenv from "dotenv";
import commentRoutes from "./routes/comment.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Blog REST API is running",
  });
});

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});