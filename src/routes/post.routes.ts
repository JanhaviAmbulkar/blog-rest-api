import { Router } from "express";

import {
  getPosts,
  getPost,
  createPostController,
  updatePostController,
  patchPostController,
  deletePostController,
  getPostCommentsController,
} from "../controllers/post.controller.js";

const router = Router();

router.get("/", getPosts);
router.post("/", createPostController);

router.get("/:id/comments", getPostCommentsController);
router.get("/:id", getPost);

router.put("/:id", updatePostController);
router.patch("/:id", patchPostController);
router.delete("/:id", deletePostController);

export default router;