import { supabase } from "../supabase/supabaseClient";

export async function createRecipe(newRecipe, userId) {
  let photo_url = null;

  if (newRecipe.photo) {
    const file = newRecipe.photo;
    const ext = file.name.split(".").pop();
    const fileName = `${userId}_${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("dish-images")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data: urlData } = await supabase.storage
      .from("dish-images")
      .getPublicUrl(fileName);

    photo_url = urlData.publicUrl;
  }

  const payload = {
    ...newRecipe,
    user_id: userId,
    photo_url,
    like_count: 0,
  };

  // Remove fields that should NOT be inserted manually
  delete payload.photo;
  delete payload.id;

  const { data, error } = await supabase
    .from("recipe")
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
}
