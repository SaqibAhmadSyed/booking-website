"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Home page component - Landing page with login form
 * Features:
 * - Role selection (Student/Admin)
 * - Login form with email, student ID, and password
 * - Remember me functionality
 * - Navigation to appropriate dashboard based on role
 */
export default function Home() {
  const [role, setRole] = useState("student");
  const router = useRouter();

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 text-black font-roboto text-[15px] font-normal">
      <div
        id="login-box"
        className="flex flex-col items-center justify-center bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex flex-col gap-4 w-full">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <Image
              src="/UniversityLogo.png"
              alt="logo"
              width={200}
              height={200}
              className="mb-2"
            />
          </div>

          {/* Title */}
          <div className="text-center text-xl font-bold">
            Concordia Booking System
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold">
              Email:
            </label>
            <input
              id="email"
              type="email"
              className="border border-gray-400 rounded-md p-2 w-full"
            />
          </div>

          {/* Student ID */}
          <div className="flex flex-col gap-2">
            <label htmlFor="studentID" className="font-semibold">
              Student ID:
            </label>
            <input
              id="studentID"
              type="text"
              className="border border-gray-400 rounded-md p-2 w-full"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              Password:
            </label>
            <input
              id="password"
              type="password"
              className="border border-gray-400 rounded-md p-2 w-full"
            />
          </div>

          {/* Role Select */}
          <div id="user-admin" className="flex flex-col gap-2">
            <label htmlFor="admin-login" className="font-semibold">
              Log in as:
            </label>
            <select
              id="admin-login"
              name="admin-login"
              className="border border-gray-400 rounded-md p-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Remember Me */}
          <div id="remember-me-button" className="flex items-center gap-2">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me" className="text-sm">
              Remember me next time
            </label>
          </div>

          {/* Sign In Button */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => router.push(role === "admin" ? "/admin" : "/user")}
              className="bg-red-900 text-white text-lg rounded-md px-6 py-2 transition-transform ease-in-out duration-200 hover:scale-105"
            >
              Sign In
            </button>
          </div>

          {/* Signup Link */}
          <p className="text-sm text-center">
            Don&apos;t have an account yet?{" "}
            <a href="signup" className="text-blue-600 underline">
              Create one!
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
