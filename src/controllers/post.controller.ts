import type { Request, Response } from "express";

import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  patchPost,
  deletePost,
  getPostComments,
} from "../services/post.service.js";

// API #8
export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch {
    res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
};

// API #9
export const getPost = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const post = await getPostById(id);

    res.status(200).json({
      id: post.id,
      userId: post.user_id,
      title: post.title,
      body: post.body,
    });
  } catch {
    res.status(404).json({
      message: "Post not found",
    });
  }
};

// API #10
export const createPostController = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId, title, body } = req.body;

    if (!userId || !title || !body) {
      return res.status(400).json({
        message: "userId, title and body are required",
      });
    }

    const post = await createPost({
      user_id: Number(userId),
      title,
      body,
    });

    res.status(201).json({
      id: post.id,
      userId: post.user_id,
      title: post.title,
      body: post.body,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create post",
      error: error instanceof Error
        ? error.message
        : String(error),
    });
  }
};

// API #11
export const updatePostController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { userId, title, body } = req.body;

    if (!userId || !title || !body) {
      return res.status(400).json({
        message: "userId, title and body are required",
      });
    }

    const post = await updatePost(id, {
      user_id: Number(userId),
      title,
      body,
    });

    res.status(200).json({
      id: post.id,
      userId: post.user_id,
      title: post.title,
      body: post.body,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update post",
      error: error instanceof Error
        ? error.message
        : String(error),
    });
  }
};

// API #12
export const patchPostController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { userId, title, body } = req.body;

    const updateData: {
      user_id?: number;
      title?: string;
      body?: string;
    } = {};

    if (userId !== undefined) {
      updateData.user_id = Number(userId);
    }

    if (title !== undefined) {
      updateData.title = title;
    }

    if (body !== undefined) {
      updateData.body = body;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "At least one field is required",
      });
    }

    const post = await patchPost(id, updateData);

    res.status(200).json({
      id: post.id,
      userId: post.user_id,
      title: post.title,
      body: post.body,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update post",
      error: error instanceof Error
        ? error.message
        : String(error),
    });
  }
};

// API #13
export const deletePostController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await deletePost(id);

    res.status(200).json({
      message: "Post deleted successfully",
    });
  } catch {
    res.status(404).json({
      message: "Post not found",
    });
  }
};

// API #14
export const getPostCommentsController = async (
  req: Request,
  res: Response
) => {
  try {
    const postId = Number(req.params.id);

    const comments = await getPostComments(postId);

    res.status(200).json(comments);
  } catch {
    res.status(500).json({
      message: "Failed to fetch post comments",
    });
  }
};