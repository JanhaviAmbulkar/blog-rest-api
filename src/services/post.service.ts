import { supabase } from "../db/supabase.js";

// API #8 - GET all posts
export const getAllPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("id");

  if (error) throw new Error(error.message);

  return data;
};

// API #9 - GET post by ID
export const getPostById = async (id: number) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// API #10 - POST create post
export const createPost = async (postData: {
  user_id: number;
  title: string;
  body: string;
}) => {
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("id", postData.user_id)
    .single();

  if (userError || !user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("posts")
    .insert([postData])
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// API #11 - PUT update post
export const updatePost = async (
  id: number,
  postData: {
    user_id: number;
    title: string;
    body: string;
  }
) => {
  // Check user exists
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("id", postData.user_id)
    .single();

  if (userError || !user) {
    throw new Error("User not found");
  }

  // Check post exists
  const { data: existingPost, error: postError } = await supabase
    .from("posts")
    .select("id")
    .eq("id", id)
    .single();

  if (postError || !existingPost) {
    throw new Error("Post not found");
  }

  // Update post
  const { error } = await supabase
    .from("posts")
    .update(postData)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  // Fetch updated post
  const { data, error: fetchError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !data) {
    throw new Error("Failed to fetch updated post");
  }

  return data;
};

// API #12 - PATCH update post partially
export const patchPost = async (
  id: number,
  postData: Partial<{
    user_id: number;
    title: string;
    body: string;
  }>
) => {
  // Check post exists
  const { data: existingPost, error: postError } = await supabase
    .from("posts")
    .select("id")
    .eq("id", id)
    .single();

  if (postError || !existingPost) {
    throw new Error("Post not found");
  }

  // If user_id is being changed, check that user exists
  if (postData.user_id !== undefined) {
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", postData.user_id)
      .single();

    if (userError || !user) {
      throw new Error("User not found");
    }
  }

  // Update post
  const { error } = await supabase
    .from("posts")
    .update(postData)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  // Fetch updated post
  const { data, error: fetchError } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !data) {
    throw new Error("Failed to fetch updated post");
  }

  return data;
};

// API #13 - DELETE post
export const deletePost = async (id: number) => {
  const { data, error } = await supabase
    .from("posts")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
};

// API #14 - GET comments of a post
export const getPostComments = async (postId: number) => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("id");

  if (error) throw new Error(error.message);

  return data;
};