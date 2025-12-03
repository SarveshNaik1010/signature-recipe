import { useParams } from "react-router-dom";
import { useRecipe } from "../hooks/useRecipe";

export default function RecipeDetails() {
  const { id } = useParams();
  const { data: recipe, isLoading } = useRecipe(id);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-600 text-lg">Loading recipe...</p>
      </div>
    );

  if (!recipe)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-600 text-lg">Recipe not found.</p>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Recipe Title */}
      <h1 className="text-3xl font-bold text-[#0F3D2E] mb-2">{recipe.name}</h1>

      {/* Sub Info */}
      <div className="text-gray-600 flex gap-4 mb-4">
        <span>👤 {recipe.user?.username || "Unknown"}</span>
        <span>⏱ {recipe.time_to_cook} mins</span>
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            recipe.is_veg
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {recipe.is_veg ? "Veg" : "Non-Veg"}
        </span>
      </div>

      {/* Image */}
      <div className="w-full h-72 rounded-xl overflow-hidden shadow-sm mb-6">
        <img
          src={recipe.photo_url}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Description */}
      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        {recipe.description}
      </p>

      {/* Ingredients */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#0F3D2E] mb-2">
          Ingredients
        </h2>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          {recipe.ingredients?.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-[#0F3D2E] mb-2">Steps</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2">
          {recipe.steps?.map((step, idx) => (
            <li key={idx}>{step}</li>
          ))}
        </ol>
      </div>

      {/* Likes */}
      <div className="text-gray-700 mt-4">
        ❤️ <span className="font-semibold">{recipe.like_count}</span> likes
      </div>
    </div>
  );
}
