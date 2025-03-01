"use client";
import { useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { useRouter } from "next/navigation";
export default function Signup() {
const router=useRouter()
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
  useEffect(() => {
    const storedCfToken = localStorage.getItem("cfToken")
    if (storedCfToken)
        router.push("/")
    setIsLoggedIn(true)
}, [])

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });



  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      setMessage({ text: "All fields are required!", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://82.29.153.135:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }



      if (response.ok) {
        setIsLoggedIn(true)
        localStorage.setItem("cfToken", data.token);
        localStorage.setItem('cfUser', JSON.stringify(data.user));
        setFormData({
          name: "",
          email: "",
          password: "",

        });
        router.push("/");
        setMessage({ text: "Account created successfully!", type: "success" });
        setFormData({ name: "", email: "", password: "" });
      }



    } catch (error) {
      setLoading(false);
      setMessage({ text: error.message, type: "error" });
    }
  };

  return (
    <div className="flex items-center py-40 justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg text-gray-700 rounded-lg p-8">

        {/* Top Link */}
        <p className="text-center text-gray-600 mb-6">
          Have an account?{" "}
          <a href="/login" className="text-blue-500 font-semibold hover:underline">
            Log in
          </a>
        </p>

        {/* Signup Form */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Create Account</h2>

        {message.text && (
          <p className={`text-center p-2 mb-4 rounded ${message.type === "error" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
}
