"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };





  useEffect(() => {
    const storedToken = localStorage.getItem("adminToken")
    if (storedToken)
      router.push("/admin/campaigns")
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form?.username || !form?.password) {
      toast.error("Please enter both username and password.");
      return;
    }

    console.log("Username:", form.username);
    console.log("Password:", form.password);

    try {
      const response = await fetch("http://82.29.153.135:5000/admin-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: form.username, password: form.password }),
      });

      let data;
      try {
        data = await response.json(); // Might fail if the backend doesn't return valid JSON
      } catch (jsonError) {
        data = { message: "Invalid server response" }; // Fallback error message
      }

      if (!response.ok) {
        throw new Error(data.message || "Login failed. Please try again.");
      }

      localStorage.setItem("adminToken", data.token);

      toast.success("Login successful!", {
        theme: "dark",
      });

      await router.push("/admin/campaigns");
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.", {
        theme: "dark",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-gray-900">
        <div className="relative bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-white/20">
          <h2 className="text-3xl font-bold text-white text-center">Admin Login</h2>
          <p className="text-sm text-gray-300 text-center mt-2">Sign in to manage the system</p>

          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500 transition"
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition duration-300"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>



          <div className="absolute inset-x-0 -bottom-6 flex justify-center">
            <div className="h-2 w-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
          </div>
        </div>
      </div>

    </>
  );
}
