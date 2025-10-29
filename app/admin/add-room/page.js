"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function AddRoom() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Room added");
  };

  return (
    <main className="p-6 flex flex-col items-center">
      {/* Header */}
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Add New Room</h1>
        <p className="text-gray-600 text-sm">
          Create a new room or facility for booking
        </p>
      </div>

      {/* Card */}
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-md p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Left: Image Upload */}
          <div className="flex flex-col items-center mt-6">
            <div className="w-48 h-48 border-2 border-dashed border-gray-300 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center mb-3">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Room preview"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="text-center">
                  <svg
                    className="mx-auto h-10 w-10 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="mt-2 text-xs text-gray-500">No image uploaded</p>
                </div>
              )}
            </div>

            <label
              htmlFor="room-image"
              className="px-3 py-1.5 bg-red-800 text-white rounded-md hover:bg-red-700 cursor-pointer transition text-sm"
            >
              Upload Image
            </label>
            <input
              id="room-image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <p className="text-xs text-gray-500 mt-2 text-center leading-tight">
              JPG, PNG, or GIF (max 5MB)
              <br />
              Recommended: 800×600px
            </p>
          </div>

          {/* Right: Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Room Name */}
            <div>
              <label
                htmlFor="roomName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Room Name
              </label>
              <input
                type="text"
                id="roomName"
                placeholder="e.g., Conference Room A"
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                required
              />
            </div>

            {/* Location & Capacity */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <select
                  id="location"
                  required
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="">Select</option>
                  <option value="H">Henry F. Hall (H)</option>
                  <option value="LB">J.W. McConnell (LB)</option>
                  <option value="JMSB">John Molson (JMSB)</option>
                  <option value="GN">Grey Nuns (GN)</option>
                  <option value="FB">Faubourg (FB)</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="capacity"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  min="1"
                  max="200"
                  placeholder=""
                  className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
                  required
                />
              </div>
            </div>

            {/* Room Type */}
            <div>
              <label
                htmlFor="roomType"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Room Type
              </label>
              <select
                id="roomType"
                required
                className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="">Select type</option>
                <optgroup label="Meeting Spaces">
                  <option value="conference">Conference Room</option>
                  <option value="meeting">Meeting Room</option>
                </optgroup>
                <optgroup label="Study Spaces">
                  <option value="study">Study Room</option>
                  <option value="lab">Computer Lab</option>
                </optgroup>
                <optgroup label="Sports Facilities">
                  <option value="gym">Gym</option>
                  <option value="basketball">Basketball Court</option>
                </optgroup>
                <optgroup label="Other">
                  <option value="auditorium">Auditorium</option>
                  <option value="lecture">Lecture Hall</option>
                </optgroup>
              </select>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                placeholder="Add room details..."
                className="w-full px-3 py-5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 resize-none text-sm"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-2 pt-2 border-gray-200 mt-3">
              <button
                type="button"
                className="px-4 py-1.5 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-red-800 text-white rounded-md hover:bg-red-700 text-sm shadow-sm"
              >
                Add Room
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
