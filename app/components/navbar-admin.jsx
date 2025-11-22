"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

/**
 * Admin navigation component - Sidebar navigation for admin interface
 * Features:
 * - Fixed sidebar with university logo
 * - Navigation menu for admin functions
 * - Account dropdown with profile and logout
 * - Responsive design with proper z-indexing
 * - Hover effects and smooth transitions
 */
export default function Navbar() {
  const { data: session } = useSession();
  return (
    <>
      {/* ✅ Top navbar (fixed) */}
      <header className="fixed top-0 left-44 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center px-4">
        <div className="flex items-center font-bold text-2xl">
          <span className="bg-gradient-to-r from-red-800 to-red-700 bg-clip-text text-transparent">
            Concordia Booking System
          </span>
        </div>

        <div className="ml-auto flex">
          {/* Account menu */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700">
                {session?.user?.name
                  ? `${session.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}`
                  : ""}
              </span>
              <span className="text-sm text-gray-700 font-medium">Account</span>
              <svg
                className="w-4 h-4 transform transition-transform group-hover:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <div className="absolute top-full w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20 invisible opacity-0 translate-y-1 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150 ease-out">
              <div className="py-1 flex flex-col">
                <Link
                  href="/admin/profile"
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg m-1"
                >
                  Profile
                </Link>

              <button
                onClick={() => signOut({ callbackUrl: `${window.location.origin}/` })}
                className="inline-flex px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg m-1"
              >
                Logout
              </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Fixed left sidebar (full height, non-scrolling) */}
      <aside className="fixed top-0 left-0 h-screen w-45 bg-white flex flex-col z-50">
        <div className="flex items-center justify-center h-16 border-b border-gray-100">
          <Image
            src="/UniversityLogo.png"
            alt="logo"
            width={170}
            height={200}
            priority
          />
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-3">
            {[
              { name: "Dashboard", path: "/admin" },
              { name: "Manage Bookings", path: "/admin/bookings" },
              { name: "Add New Room", path: "/admin/add-room" },
              { name: "Reports/Statistics", path: "/admin/reports" },
            ].map((item) => (
              <li key={item.name}>
                <Link
                  href={item.path}
                  className="flex items-center px-3 py-3 rounded-md text-gray-800 transition duration-100 ease-in-out hover:bg-gray-100 font-medium"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}
