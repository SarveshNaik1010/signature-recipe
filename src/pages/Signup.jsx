import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import toast from "react-hot-toast";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { createUser, isCreating } = useSignup();

  function handleSubmit(e) {
    e.preventDefault();

    if (username === "" || password === "") {
      return toast.error("Username or Password cannot be empty!");
    }

    createUser({ username, password });
  }

  return (
    <div className="min-h-[calc(100vh-70px)] flex items-center justify-center px-4 bg-white">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-[#0F3D2E] mb-6 text-center">
          Create an Account
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-700">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-[#4CAF50]"
              placeholder="Enter username"
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

          {/* Signup Button */}
          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#4CAF50] text-white font-medium rounded-lg 
                       hover:bg-[#43A047] transition-colors"
          >
            Sign Up
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-[#4CAF50] font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
