import { useQuery } from "@tanstack/react-query";
import { getRecipeById } from "../services/getRecipeById";

export function useRecipe(id) {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getRecipeById(id),
  });
}
