import type { Request, Response } from "express";

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  patchUser,
  deleteUser,
  getUserPosts,
} from "../services/user.service.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const user = await getUserById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: "User not found",
    });
  }
};

export const createUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const user = await createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: "Failed to create user",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

export const updateUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const user = await updateUser(id, req.body);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: "User not found",
    });
  }
};

export const patchUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    const user = await patchUser(id, req.body);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      message: "User not found",
    });
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await deleteUser(id);

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      message: "User not found",
    });
  }
};

export const getUserPostsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = Number(req.params.id);

    const posts = await getUserPosts(userId);

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({
      message: "User posts not found",
    });
  }
};