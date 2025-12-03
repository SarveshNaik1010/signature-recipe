import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../services/getRecipes";

export function useGetRecipes() {
  const {
    data: recipes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  return { recipes, isLoading, isError, error };
}
