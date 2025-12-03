import { useForm, useFieldArray } from "react-hook-form";
import { useState } from "react";
import { useCreateRecipe } from "../hooks/useCreateRecipe";

export default function AddRecipe() {
  const [photoPreview, setPhotoPreview] = useState(null);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "Signature Special Maggi",
      description:
        "A delicious, custom-made masala Maggi recipe with butter, veggies and my secret twist.",
      time_to_cook: "12",
      cuisine: "Indian",
      is_veg: true,
      ingredients: [
        { value: "1 packet Maggi" },
        { value: "1 tbsp butter" },
        { value: "Chopped vegetables" },
      ],
      steps: [
        { value: "Boil 1.5 cups of water in a pan." },
        { value: "Add chopped vegetables and cook for 2 minutes." },
        { value: "Break the Maggi cake and add it to the pan." },
        { value: "Mix in the tastemaker masala and butter." },
        { value: "Stir well and cook until thick and creamy." },
      ],
      photo: null,
    },
  });

  const {
    fields: ingredientFields,
    append: addIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  const {
    fields: stepFields,
    append: addStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "steps",
  });

  const { addRecipe, isCreating } = useCreateRecipe();

  const handlePhoto = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("photo", e.target.files);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      description: data.description,
      time_to_cook: Number(data.time_to_cook),
      cuisine: data.cuisine,
      is_veg: data.is_veg,
      ingredients: data.ingredients.map((i) => i.value),
      steps: data.steps.map((s) => s.value),
      photo: data.photo?.[0] || null,
    };

    addRecipe({ newRecipe: payload });
  };
  return (
    <div className="min-h-[calc(100vh-70px)] flex items-start justify-center px-4 py-8">
      <div className="w-full max-w-2xl bg-white border rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-[#0F3D2E] mb-4 text-center">
          Add New Recipe
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="text-sm text-gray-700">Recipe Name</label>
            <input
              {...register("name")}
              className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#4CAF50]"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-sm text-gray-700">Description</label>
            <textarea
              {...register("description")}
              rows="3"
              className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#4CAF50]"
            />
          </div>

          {/* time + cuisine + isVeg */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-sm text-gray-700">Time (mins)</label>
              <input
                type="number"
                {...register("time_to_cook")}
                className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>

            <div>
              <label className="text-sm text-gray-700">Cuisine</label>
              <input
                {...register("cuisine")}
                className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#4CAF50]"
              />
            </div>

            <div className="flex items-end gap-2">
              <input type="checkbox" {...register("is_veg")} />
              <label className="text-sm text-gray-700">Veg</label>
            </div>
          </div>

          {/* INGREDIENTS */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-700">Ingredients</label>
              <button
                type="button"
                onClick={() => addIngredient({ value: "" })}
                className="text-[#4CAF50] text-sm font-medium"
              >
                + Add
              </button>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              {ingredientFields.map((field, idx) => (
                <div key={field.id} className="flex gap-2">
                  <input
                    {...register(`ingredients.${idx}.value`)}
                    className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#4CAF50]"
                    placeholder={`Ingredient ${idx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeIngredient(idx)}
                    className="text-red-500 text-sm px-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* STEPS */}
          <div>
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-700">Steps</label>
              <button
                type="button"
                onClick={() => addStep({ value: "" })}
                className="text-[#4CAF50] text-sm font-medium"
              >
                + Add
              </button>
            </div>

            <div className="flex flex-col gap-2 mt-2">
              {stepFields.map((field, idx) => (
                <div key={field.id} className="flex gap-2">
                  <textarea
                    {...register(`steps.${idx}.value`)}
                    rows="2"
                    className="flex-1 px-3 py-2 border rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#4CAF50]"
                    placeholder={`Step ${idx + 1}`}
                  />
                  <button
                    type="button"
                    onClick={() => removeStep(idx)}
                    className="text-red-500 text-sm px-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* PHOTO */}
          <div>
            <label className="text-sm text-gray-700">Recipe Photo</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];

                if (file) {
                  // update RHF state
                  setValue("photo", e.target.files, { shouldValidate: true });

                  // update preview
                  setPhotoPreview(URL.createObjectURL(file));
                }
              }}
              className="w-full px-3 py-2 mt-1 border rounded-lg bg-gray-50"
            />

            {photoPreview && (
              <img
                src={photoPreview}
                className="w-36 h-24 mt-2 rounded-lg object-cover border"
                alt="preview"
              />
            )}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-2 bg-[#4CAF50] text-white font-medium rounded-lg hover:bg-[#43A047] transition"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
}
