import { supabase } from "../db/supabase.js";

// API #15
export const getAllComments = async () => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .order("id");

  if (error) throw new Error(error.message);

  return data;
};

// API #16
export const getCommentById = async (id: number) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// API #17
export const createComment = async (commentData: {
  post_id: number;
  name: string;
  email: string;
  body: string;
}) => {
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("id")
    .eq("id", commentData.post_id)
    .single();

  if (postError || !post) {
    throw new Error("Post not found");
  }

  const { data, error } = await supabase
    .from("comments")
    .insert([commentData])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// API #18
export const updateComment = async (
  id: number,
  commentData: {
    post_id: number;
    name: string;
    email: string;
    body: string;
  }
) => {
  const { data: post, error: postError } = await supabase
    .from("posts")
    .select("id")
    .eq("id", commentData.post_id)
    .single();

  if (postError || !post) {
    throw new Error("Post not found");
  }

  const { data, error } = await supabase
    .from("comments")
    .update(commentData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// API #19
export const patchComment = async (
  id: number,
  commentData: Partial<{
    post_id: number;
    name: string;
    email: string;
    body: string;
  }>
) => {
  if (commentData.post_id !== undefined) {
    const { data: post, error: postError } = await supabase
      .from("posts")
      .select("id")
      .eq("id", commentData.post_id)
      .single();

    if (postError || !post) {
      throw new Error("Post not found");
    }
  }

  const { data, error } = await supabase
    .from("comments")
    .update(commentData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// API #20
export const deleteComment = async (id: number) => {
  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// API #21
export const getCommentsByPostId = async (postId: number) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("id");

  if (error) throw new Error(error.message);

  return data;
};