import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../services/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: createUser, isLoading: isCreating } = useMutation({
    mutationFn: ({ username, password }) => signup(username, password),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`User ${data.username} created successfully`);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { createUser, isCreating };
}
