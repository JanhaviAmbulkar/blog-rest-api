import { supabase } from "../db/supabase.js";

export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .order("id");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getUserById = async (id: number) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const createUser = async (userData: {
  name: string;
  username: string;
  email: string;
  phone?: string;
  website?: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .insert([userData])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const updateUser = async (
  id: number,
  userData: {
    name: string;
    username: string;
    email: string;
    phone?: string;
    website?: string;
  }
) => {
  const { data, error } = await supabase
    .from("users")
    .update(userData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const patchUser = async (
  id: number,
  userData: Partial<{
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
  }>
) => {
  const { data, error } = await supabase
    .from("users")
    .update(userData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const deleteUser = async (id: number) => {
  const { data, error } = await supabase
    .from("users")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getUserPosts = async (userId: number) => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("user_id", userId)
    .order("id");

  if (error) {
    throw new Error(error.message);
  }

  return data;
};