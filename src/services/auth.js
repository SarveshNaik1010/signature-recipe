import { supabase } from "../supabase/supabaseClient";

export async function signup(username, password) {
  const { data, error } = await supabase
    .from("user")
    .insert({ username, password })
    .select()
    .single();

  if (error?.code === "23505")
    throw new Error(`Name '${username} is already taken!'`);

  return data;
}

export async function login(username, password) {
  // 1. Fetch the user with matching username
  const { data: user, error } = await supabase
    .from("user")
    .select("*")
    .eq("username", username)
    .single();

  // 2. If user not found
  if (error || !user) {
    throw new Error("Username or password is incorrect");
  }

  // 3. Check password match
  if (password !== user.password) {
    throw new Error("Username or password is incorrect");
  }

  return user;
}
