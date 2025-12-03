import { supabase } from "../supabase/supabaseClient";

export async function getRecipes() {
  const { data, error } = await supabase.from("recipe").select(`
      *,
      user:user (
        id,
        username
      )
    `);

  console.log(error, data);

  if (error) throw error;

  console.log(data);

  return data;
}
