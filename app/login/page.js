"use client";

import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError("Please fill in all fields.");
            return;
        }

        setError("");
        console.log("Logging in with:", email, password);

        //Backend call
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="bg-white shadow-md rounded-xl p-8 w-80">
                <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
                    Log In
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition-colors"
                    >
                        Iniciar sesión
                    </button>
                </form>

                <p className="text-sm text-gray-600 text-center mt-4">
                    ¿No tienes cuenta?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline"
                    >
                        Regístrate
                    </a>
                </p>
            </div>
        </div>
    );
}
