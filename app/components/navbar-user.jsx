"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

/**
 * User navigation component - Top navigation bar for user interface
 * Features:
 * - Fixed top navigation with university logo
 * - Navigation links for user functions
 * - Account dropdown with profile and logout
 * - Responsive design with proper spacing
 * - Hover effects and smooth transitions
 */
export default function Navbar() {
  const { data: session } = useSession();
  console.log(session.user.image)
  return (
    <>
      {/* ✅ Top navbar (fixed) */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center px-6">
        <div className="flex items-center font-bold text-2xl">
          <div className="">
            <Image
              src="/img/UniversityLogo.png"
              alt="logo"
              width={170}
              height={200}
              priority
            />
          </div>
        </div>

        {/* ✅ Navigation links in top navbar */}
        <nav className="ml-10 flex space-x-4">
          {[
            { name: "Home", path: "/user" },
            { name: "View Rooms", path: "/user/room-list" },
            { name: "Booking History", path: "/user/history" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="px-3 py-2 rounded-md text-gray-800 font-medium hover:bg-gray-100 transition duration-100"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Account menu */}
        <div className="ml-auto relative group">
          <button className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span className="text-sm text-gray-700 font-bold">
                    {session?.user?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </span>
                )}
              </div>
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

          <div className="absolute top-full right-0 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-20 invisible opacity-0 translate-y-1 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150 ease-out">
            <div className="py-1 flex flex-col">
              <Link
                href="/user/profile"
                className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg m-1"
              >
                Profile
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="inline-flex px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg m-1"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ✅ Spacer to prevent content from being hidden behind fixed navbar */}
      <div className="h-16" />
    </>
  );
}
