"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function Profile() {
  const [imagePreview, setImagePreview] = useState(null);

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
              <svg
                className="w-10 h-10 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
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
            defaultValue="John Doe"
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
            defaultValue="john.doe@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-400 text-sm"
          />
        </div>

        {/* Phone input */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            defaultValue="+1 (514) 123-4567"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-400 text-sm"
          />
        </div>

        {/* Action buttons */}
        <div className="flex justify-end gap-2 pt-3">
          <button
            type="submit"
            className="px-4 py-2 font-semibold bg-red-800 hover:bg-red-700 text-white rounded-lg transition text-sm"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</main>
  );
}
