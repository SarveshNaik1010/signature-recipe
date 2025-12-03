import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginInUser, isLoggingIn } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();

    if (username === "" || password === "") {
      return toast.error("Username or Password cannot be empty!");
    }

    loginInUser({ username, password });
  }

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-white px-4">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-[#0F3D2E] mb-6 text-center">
          Login
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              placeholder="username"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              placeholder="••••••••"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#4CAF50] text-white font-medium rounded-lg 
                       hover:bg-[#43A047] transition-colors"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <a
            href="/signup"
            className="text-[#4CAF50] font-medium hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
