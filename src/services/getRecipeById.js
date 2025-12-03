import { supabase } from "../supabase/supabaseClient";

export async function getRecipeById(id) {
  const { data, error } = await supabase
    .from("recipe")
    .select("*, user:user ( id, username )")
    .eq("id", id)
    .single();

  console.log(error);

  if (error) throw error;
  return data;
}
