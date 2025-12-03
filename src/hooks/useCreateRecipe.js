import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createRecipe } from "../services/createRecipe";
import { useGetUser } from "./useGetUser";

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  const user = JSON.parse(useGetUser());

  const { mutate: addRecipe, isLoading: isCreating } = useMutation({
    mutationFn: ({ newRecipe }) => {
      if (!user)
        throw new Error(`Please login or signup to upload a new recipe`);
      return createRecipe(newRecipe, user.id);
    },

    onSuccess: (data) => {
      toast.success("Recipe created successfully!");
      console.log("Created:", data);

      // Optional: refresh recipe list if you have one
      queryClient.invalidateQueries(["recipes"]);
    },

    onError: (error) => {
      console.error(error);
      toast.error(error.message || "Failed to create recipe");
    },
  });

  return { addRecipe, isCreating };
}
