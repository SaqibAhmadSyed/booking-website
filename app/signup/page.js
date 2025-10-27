"use client";
import Image from "next/image";
import Link from "next/link";

export default function Signup() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100 text-black font-roboto text-[15px] font-normal">
      <div
        id="signup-box"
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
            Create a New Account
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

          {/* Repeat Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="repeat-password" className="font-semibold">
              Repeat Password:
            </label>
            <input
              id="repeat-password"
              type="password"
              className="border border-gray-400 rounded-md p-2 w-full"
            />
          </div>

          {/* Create Account Button */}
          <div className="flex justify-center">
            <Link
              href="/user/home"
              className="bg-red-900 text-white text-lg rounded-md px-6 py-2 transition-transform ease-in-out duration-200 hover:scale-105 text-center"
            >
              Create Account
            </Link>
          </div>

          {/* Back to Sign In */}
          <p className="text-sm text-center">
            Already have an account?{" "}
            <Link href="/" className="text-blue-600 underline">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
