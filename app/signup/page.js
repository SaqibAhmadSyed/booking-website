"use client";
import Image from "next/image";
import Link from "next/link";

export default function signup() {

  return (
    <main className="min-h-screen bg-slate-100 grid grid-cols-3 place-items-center text-black font-roboto text-[15px] font-normal">
      <div
        id="login-box"
        className="col-start-2 flex flex-col items-center justify-center bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <Image src="/UniversityLogo.png" alt="logo" width={500} height={500} />
          </div>
          <div className="flex flex-col gap-2 text-center text-3xl font-bold py-8">
            Create a new account
          </div>

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

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold">
              Repeat Password:
            </label>
            <input
              id="password"
              type="password"
              className="border border-gray-400 rounded-md p-2 w-full"
            />
          </div>

          <div className="flex justify-between mt-2">
            <button
              type="button"
              className="bg-red-800 text-white text-lg rounded-md px-8 py-2 transition ease-in-out duration-200 hover:bg-red-900 hover:scale-110"
            >
              <Link href={"/user/home"}>Create Account</Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
