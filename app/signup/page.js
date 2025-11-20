"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Toast from "../components/toast";

/**
 * Signup page component - User registration form
 * Features:
 * - User registration with email, student ID, and password
 * - Password confirmation field
 * - Client-side validation
 * - Navigation back to login page
 * - University branding and styling
 */
export default function Signup() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        // Try to parse JSON error message
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          setError(data.error || "Something went wrong");
        } else {
          const text = await response.text();
          setError(text || "Something went wrong");
        }
        setLoading(false);
        return;
      }

      // Success - show toast then redirect to login
      setLoading(false);
      setToastMessage("Account created successfully! Please sign in.");
      setToastType("success");
      setToastVisible(true);
      router.push("/");
      // Close toast and redirect after a short delay
      setTimeout(() => {
        setToastVisible(false);
      }, 1800);
    } catch (err) {
      console.error("Signup error:", err);
      setError("Failed to create account. Please try again.");
      setLoading(false);
      // show error toast as well
      setToastMessage("Failed to create account. Please try again.");
      setToastType("error");
      setToastVisible(true);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 text-black font-roboto text-[15px] font-normal">
      
    {/* Loading Overlay */}
    {loading && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white p-5 rounded-lg shadow-lg text-lg font-semibold">
          Creating account...
        </div>
      </div>
    )}

      <div
        id="signup-box"
        className="flex flex-col items-center justify-center bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex flex-col gap-4 w-full">
          {/* Logo */}
          <div className="flex flex-col items-center">
            <Image
              src="/img/UniversityLogo.png"
              alt="logo"
              width={200}
              height={200}
              className="mb-2"
            />
          </div>

          {/* Title */}
          <div className="text-center text-xl font-bold">
            Create a New Account
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Email:</label>
              <input
                name="email"
                type="email"
                required
                className="border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* First Name */}
              <div className="flex flex-col gap-2">
                <label className="font-semibold">First Name:</label>
                <input
                  name="firstName"
                  type="text"
                  required
                  className="border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-900"
                />
              </div>

              {/* Last Name */}
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Last Name:</label>
                <input
                  name="lastName"
                  type="text"
                  required
                  className="border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-900"
                />
              </div>
            </div>

            {/* Student ID */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Student ID:</label>
              <input
                name="studentId"
                type="text"
                required
                maxLength={8}
                pattern="[0-9]{8}"
                placeholder="e.g. 40123456"
                className="border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <p className="text-xs text-gray-500">Must be 8 digits</p>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Password:</label>
              <input
                name="password"
                type="password"
                required
                minLength={6}
                className="border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-900"
              />
              <p className="text-xs text-gray-500">
                Must be at least 6 characters
              </p>
            </div>

            {/* Repeat Password */}
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Repeat Password:</label>
              <input
                name="repeatPassword"
                type="password"
                required
                minLength={6}
                className="border border-gray-400 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-red-900"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`bg-red-900 mx-20 mt-5 text-white text-lg rounded-md px-6 py-2 transition-transform ease-in-out duration-200 hover:scale-105 text-center ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Back to Sign In */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/" className="text-blue-600 underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>

      {/* Toast */}
      <Toast
        visible={toastVisible}
        message={toastMessage}
        type={toastType}
        duration={1800}
        onClose={() => setToastVisible(false)}
      />
    </main>
  );
}
