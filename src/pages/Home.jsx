import { Link } from "react-router-dom";
import { useGetRecipes } from "../hooks/useGetRecipes";

export default function Home() {
  const { recipes, isLoading } = useGetRecipes();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="text-gray-600 text-lg">Loading recipes...</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* Header */}
      <h1 className="text-3xl font-semibold text-[#0F3D2E] mb-6">
        Explore Recipes
      </h1>

      {/* No Recipes */}
      {recipes?.length === 0 && (
        <p classb pName="text-center text-gray-600 text-lg">
          No recipes found. Add your first one!
        </p>
      )}

      {/* Recipe Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes?.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

/* ------------------ CARD COMPONENT ------------------ */

function RecipeCard({ recipe }) {
  return (
    <div className="rounded-xl border border-gray-200 shadow-sm bg-white overflow-hidden hover:shadow-md transition-shadow">

      {/* Image */}
      <div className="w-full h-44 bg-gray-100">
        <img
          src={recipe.photo_url}
          alt={recipe.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">

        <h2 className="text-xl font-semibold text-[#0F3D2E] line-clamp-2">
          {recipe.name}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-2">
          {recipe.description}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-sm text-gray-700">
            ⏱ {recipe.time_to_cook} mins
          </span>

          <span
            className={`text-xs px-2 py-1 rounded-full ${
              recipe.is_veg ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
            }`}
          >
            {recipe.is_veg ? "Veg" : "Non-Veg"}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
          <span>👤 {recipe?.user?.username || "Unknown"}</span>
          <span>❤️ {recipe.like_count}</span>
        </div>

        {/* Details Button */}
        <Link
          to={`/recipe/${recipe.id}`}
          className="mt-4 w-full text-center py-2 rounded-lg bg-[#4CAF50] text-white font-medium hover:bg-[#43A047] transition"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}
