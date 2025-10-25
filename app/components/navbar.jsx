'use client'
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <>
      {/* Top navbar (starts after the left sidebar) */}
      <header className="fixed left-50 right-0 top-0 h-16 bg-white border-b border-gray-200 z-40 flex items-center px-4">
        <div className="flex items-center">
          {/* <Image src="/logo.png" alt="Logo" width={32} height={32} /> */}
        </div>

        <div className="ml-auto flex">
          {/* account menu */}
          <div className="relative group">
            <button className="flex items-center gap-2 px-3 py-1 rounded-md hover:bg-gray-100">
              <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm text-gray-700">A</span>
              <span className="text-sm text-gray-700 font-medium">Account</span>
              <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className="absolute right-0.5 top-full w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 invisible opacity-0 translate-y-1 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150 ease-out">
              <div className="py-1 flex flex-col">
                <Link href="#" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg m-1">Profile</Link>
                <Link href="#" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg m-1">Settings</Link>
                <Link href="#" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg m-1">Logout</Link>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Left sidebar */}
      <aside className="fixed inset-y-0 left-0 w-56 bg-white flex flex-col pt-0">
        <div className="flex items-center h-16 px-4 border-b border-gray-100">
          {/* <Image src="/logo.png" alt="Logo" width={40} height={40} /> */}
          <span className="ml-3 font-semibold text-lg text-gray-800">Meme Bunker</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4 mt-0">
          <ul className="space-y-3">
            <li>
              <Link href="#" className="flex items-center px-3 py-3 rounded-md text-gray-800 transition duration-100 ease-in-out hover:bg-gray-100 font-medium">
                Dashboard
              </Link>
            </li>

            <li className="relative group">
              <a className="flex items-center justify-between px-3 py-3 rounded-md text-gray-800 transition duration-100 ease-in-out hover:bg-gray-100 cursor-pointer font-medium">
                <span>Manage Resources</span>
                <svg className="w-4 h-4 transform transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <div className="absolute left-0 top-full w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-20 invisible opacity-0 translate-y-1 pointer-events-none group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-150 ease-out">
                <div className="py-1 flex flex-col">
                  <Link href="#" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg m-1">Create</Link>
                  <Link href="#" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg m-1">Edit</Link>
                  <Link href="#" className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg m-1">Delete</Link>
                </div>
              </div>
            </li>

            <li>
              <Link href="#" className="flex items-center px-3 py-3 rounded-md text-gray-800 transition duration-100 ease-in-out hover:bg-gray-100 font-medium">
                Manage Bookings
              </Link>
            </li>

            <li>
              <Link href="#" className="flex items-center px-3 py-3 rounded-md text-gray-800 transition duration-100 ease-in-out hover:bg-gray-100 font-medium">
                Set Availability
              </Link>
            </li>
            
            <li>
              <Link href="#" className="flex items-center px-3 py-3 rounded-md text-gray-800 transition duration-100 ease-in-out hover:bg-gray-100 font-medium">
                Reports/Statistics
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

