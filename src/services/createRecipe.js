import { supabase } from "../supabase/supabaseClient";

export async function createRecipe(newRecipe, userId) {
  let photo_url = null;

  // 1️⃣ If a photo exists, upload it first
  if (newRecipe.photo) {
    const file = newRecipe.photo;
    const ext = file.name.split(".").pop();
    const fileName = `${userId}_${Date.now()}.${ext}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("dish-images")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    // Get public URL
    const { data: urlData } = await supabase.storage
      .from("dish-images")
      .getPublicUrl(fileName);

    photo_url = urlData.publicUrl;
  }

  // 2️⃣ Build the final recipe payload
  const payload = {
    ...newRecipe,
    user_id: userId,
    photo_url, // use URL from storage
    like_count: 0, // default
  };

  // Remove the actual file before inserting into DB
  delete payload.photo;

  // 3️⃣ Insert into your recipe table
  const { data, error } = await supabase
    .from("recipe") // your correct table name
    .insert(payload)
    .select()
    .single();

  if (error) throw error;

  return data;
}
