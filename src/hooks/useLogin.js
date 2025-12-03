import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: loginInUser, isLoading: isLoggingIn } = useMutation({
    mutationFn: ({ username, password }) => login(username, password),
    onSuccess: (data) => {
      console.log(data);
      toast.success(`User ${data.username} logged successfully`);
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  return { loginInUser, isLoggingIn };
}
