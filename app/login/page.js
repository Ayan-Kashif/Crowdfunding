'use client'

import { useState, useEffect } from "react";
import { useRouter,usePathname } from "next/navigation";
import { AuthContext } from "../AuthContext";
import { toast, ToastContainer } from 'react-toastify';
import { useContext } from "react";
export default function Login() {
    const router=useRouter()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setIsLoggedIn } = useContext(AuthContext)

    useEffect(() => {
        const storedCfToken = localStorage.getItem("cfToken")
        if (storedCfToken)
            router.push("/")
        setIsLoggedIn(true)
    }, [])
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await fetch("http://82.29.153.135:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();


            if (response.ok && data.token) {
                setIsLoggedIn(true);
                localStorage.setItem('cfToken', data.token)
                console.log(data)
                localStorage.setItem('cfUser', JSON.stringify(data.user));


                toast.success(data.message, {
                    theme: "dark",
                });


                router.push("/");
            } else {
                toast.error(data.message || "Login failed. Please try again.");
            }


        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="w-full max-w-md text-gray-700 bg-white shadow-lg rounded-lg p-8">
                    <p className="text-center text-gray-600 mb-6">
                        Don't have an account? {" "}
                        <a href="/register" className="text-blue-500 font-semibold hover:underline">
                            Sign up
                        </a>
                    </p>

                    <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Login</h2>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="Your Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
