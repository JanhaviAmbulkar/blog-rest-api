import { Router } from "express";

import {
  getComments,
  getComment,
  createCommentController,
  updateCommentController,
  patchCommentController,
  deleteCommentController,
} from "../controllers/comment.controller.js";

const router = Router();

// API #15 and #21
router.get("/", getComments);

// API #17
router.post("/", createCommentController);

// API #16
router.get("/:id", getComment);

// API #18
router.put("/:id", updateCommentController);

// API #19
router.patch("/:id", patchCommentController);

// API #20
router.delete("/:id", deleteCommentController);

export default router;