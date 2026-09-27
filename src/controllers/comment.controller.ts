import type { Request, Response } from "express";

import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  patchComment,
  deleteComment,
  getCommentsByPostId,
} from "../services/comment.service.js";

// API #15
export const getComments = async (req: Request, res: Response) => {
  try {
    const postId = req.query.postId;

    if (postId !== undefined) {
      const comments = await getCommentsByPostId(Number(postId));
      return res.status(200).json(comments);
    }

    const comments = await getAllComments();

    res.status(200).json(comments);
  } catch {
    res.status(500).json({
      message: "Failed to fetch comments",
    });
  }
};

// API #16
export const getComment = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const comment = await getCommentById(id);

    res.status(200).json({
      id: comment.id,
      postId: comment.post_id,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    });
  } catch {
    res.status(404).json({
      message: "Comment not found",
    });
  }
};

// API #17
export const createCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const { postId, name, email, body } = req.body;

    if (!postId || !name || !email || !body) {
      return res.status(400).json({
        message: "postId, name, email and body are required",
      });
    }

    const comment = await createComment({
      post_id: Number(postId),
      name,
      email,
      body,
    });

    res.status(201).json({
      id: comment.id,
      postId: comment.post_id,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create comment",
      error: error instanceof Error
        ? error.message
        : String(error),
    });
  }
};

// API #18
export const updateCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { postId, name, email, body } = req.body;

    if (!postId || !name || !email || !body) {
      return res.status(400).json({
        message: "postId, name, email and body are required",
      });
    }

    const comment = await updateComment(id, {
      post_id: Number(postId),
      name,
      email,
      body,
    });

    res.status(200).json({
      id: comment.id,
      postId: comment.post_id,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update comment",
      error: error instanceof Error
        ? error.message
        : String(error),
    });
  }
};

// API #19
export const patchCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { postId, name, email, body } = req.body;

    const updateData: {
      post_id?: number;
      name?: string;
      email?: string;
      body?: string;
    } = {};

    if (postId !== undefined) {
      updateData.post_id = Number(postId);
    }

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (body !== undefined) updateData.body = body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        message: "At least one field is required",
      });
    }

    const comment = await patchComment(id, updateData);

    res.status(200).json({
      id: comment.id,
      postId: comment.post_id,
      name: comment.name,
      email: comment.email,
      body: comment.body,
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update comment",
      error: error instanceof Error
        ? error.message
        : String(error),
    });
  }
};

// API #20
export const deleteCommentController = async (
  req: Request,
  res: Response
) => {
  try {
    const id = Number(req.params.id);

    await deleteComment(id);

    res.status(200).json({
      message: "Comment deleted successfully",
    });
  } catch {
    res.status(404).json({
      message: "Comment not found",
    });
  }
};