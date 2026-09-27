import { Router } from "express";

import {
  getUsers,
  getUser,
  createUserController,
  updateUserController,
  patchUserController,
  deleteUserController,
  getUserPostsController,
} from "../controllers/user.controller.js";

const router = Router();

router.get("/", getUsers);
router.post("/", createUserController);

router.get("/:id/posts", getUserPostsController);

router.get("/:id", getUser);
router.put("/:id", updateUserController);
router.patch("/:id", patchUserController);
router.delete("/:id", deleteUserController);

export default router;