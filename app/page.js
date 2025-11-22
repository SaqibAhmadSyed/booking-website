"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect logged-in users
  useEffect(() => {
    if (status === "authenticated") {
      const redirectPath = session.user.role === "admin" ? "/admin" : "/user";
      router.replace(redirectPath);
    }
  }, [status, session, router]);

  //TODO: Improve loading state design
  if (status === "loading" || session) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
      return;
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 text-black font-roboto text-[15px] font-normal">
      <div className="flex flex-col items-center justify-center bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col items-center">
            <Image
              src="/img/UniversityLogo.png"
              alt="logo"
              width={200}
              height={200}
              className="mb-2"
            />
          </div>

          <div className="text-center text-xl font-bold">
            Concordia Booking System
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold">Email:</label>
            <input
              id="email"
              type="email"
              className="border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">Password:</label>
            <input
              id="password"
              type="password"
              className="border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-red-900 text-white text-lg rounded-md px-6 py-2 transition-transform ease-in-out duration-200 hover:scale-105 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>

          <p className="text-sm text-center">
            Don&apos;t have an account yet?{" "}
            <Link href="/signup" className="text-blue-600 underline">Create one!</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
