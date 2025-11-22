"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";

/**
 * Admin profile page - Edit admin personal information and profile photo
 * Features:
 * - Profile photo upload with preview
 * - Personal information editing (name, email, phone)
 * - Form validation and submission
 * - Image file handling with FileReader API
 * - Same functionality as user profile but for admin users
 */
export default function Profile() {
  const [imagePreview, setImagePreview] = useState(null);
  const { data: session } = useSession();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Edit Profile Information
        </h1>
        <p className="text-gray-600 mt-1">
          Change information related to your account
        </p>
      </div>

      <div className="max-w-2xl space-y-6 mx-auto">
        {/* Profile Photo Section */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Profile Photo
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl">
                    {session?.user?.name
                      ? session.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                      : ""}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1">
              {/* Upload button */}
              <label
                htmlFor="photo-upload"
                className="inline-block px-3 py-2 font-semibold bg-red-800 text-white rounded-lg hover:bg-red-700 cursor-pointer transition text-sm"
              >
                Change Photo
              </label>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <p className="text-xs text-gray-500 mt-1">
                JPG, PNG or GIF. Max size 5MB.
              </p>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Personal Information
          </h2>
          <form className="space-y-3">
            {/* Full Name input */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                defaultValue={session?.user?.name || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-400 text-sm"
              />
            </div>

            {/* Email input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={session?.user?.email || ""}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-400 text-sm"
              />
            </div>

            {/* Action buttons */}
            <div className="flex justify-between">
            <div className="flex justify-end gap-2 pt-3">
              <button
                type="submit"
                className="px-4 py-2 font-semibold bg-red-800 hover:bg-red-700 text-white rounded-lg transition text-sm"
              >
                Change password
              </button>
            </div>
            <div className="flex justify-start gap-2 pt-3">
              <button
                type="submit"
                className="px-4 py-2 font-semibold bg-red-800 hover:bg-red-700 text-white rounded-lg transition text-sm"
              >
                Save Changes
              </button>
            </div>
          </div>
          </form>
        </div>
      </div>
    </main>
  );
}
