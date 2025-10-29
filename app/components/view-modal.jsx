"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Calendar from "./calendar";
import Toast from "./toast";

/**
 * View modal component - Room details and booking interface
 * Features:
 * - Room information display with images and amenities
 * - Integrated booking form with calendar
 * - Two-view system: room details and reservation form
 * - Form validation and submission handling
 * - Success notifications and auto-close functionality
 * - Responsive modal sizing based on content
 */
export default function ViewModal({ room, onClose }) {
  const [showReservation, setShowReservation] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    capacity: "",
    type: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation created:", { ...formData, date: selectedDate, room: room.name });
    setToast({
      visible: true,
      message: `Reservation confirmed for ${formData.name || "N/A"} (ID: ${
        formData.studentId || "N/A"
      }) for ${room.name} on ${selectedDate || "N/A"}`,
      type: "success",
    });
    // Reset form and close reservation after successful submission
    setTimeout(() => {
      setShowReservation(false);
      setFormData({
        name: "",
        studentId: "",
        capacity: "",
        type: "",
        startTime: "",
        endTime: "",
        purpose: "",
      });
      setSelectedDate(null);
    }, 2000);
  };

  if (!room) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className={`relative w-full mx-5 bg-white rounded-lg shadow-lg ${
          showReservation ? "max-w-6xl" : "max-w-md"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
          {!showReservation ? (
            // Room Details View
            <>
              {/* Room Image */}
              <div className="mb-4 w-full h-48 relative overflow-hidden rounded-lg">
                <Image
                  src={room.img}
                  alt={room.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Room Title */}
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">
                {room.name}
              </h2>

              {/* Room Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Location:</span>
                  <span className="text-gray-900">{room.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Type:</span>
                  <span className="text-gray-900">{room.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Capacity:</span>
                  <span className="text-gray-900">{room.capacity} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Room #:</span>
                  <span className="text-gray-900">{room.roomNumber}</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {room.description}
              </p>

              {/* Amenities */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Amenities:
                </h3>
                <div className="flex flex-wrap gap-1">
                  {room.amenities.slice(0, 4).map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                    >
                      {amenity}
                    </span>
                  ))}
                  {room.amenities.length > 4 && (
                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                      +{room.amenities.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  Availability:
                </h3>
                <p className="text-sm text-gray-700">{room.availability}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-white bg-gray-600 border rounded-lg hover:bg-gray-500 focus:outline-none font-medium transition"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => setShowReservation(true)}
                  className="px-5 py-2.5 bg-red-800 text-white rounded-lg hover:bg-red-700 focus:outline-none font-medium transition"
                >
                  Book Now
                </button>
              </div>
            </>
          ) : (
            // Reservation Form View
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Book {room.name}
                </h2>
                <button
                  onClick={() => setShowReservation(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Calendar Section */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Select Date
                  </h3>
                  <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                </div>

                {/* Form Section */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Reservation Details
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:outline-none text-gray-900"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    {/* Student ID */}
                    <div>
                      <label
                        htmlFor="studentId"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        Student ID
                      </label>
                      <input
                        type="text"
                        id="studentId"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:outline-none text-gray-900"
                        placeholder="Enter your student ID"
                        required
                      />
                    </div>

                    {/* Capacity */}
                    <div>
                      <label
                        htmlFor="capacity"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        Number of People
                      </label>
                      <input
                        type="number"
                        id="capacity"
                        name="capacity"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        min="1"
                        max={room.capacity}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:outline-none text-gray-900"
                        placeholder="Enter number of people"
                        required
                      />
                    </div>

                    {/* Time Selection */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="startTime"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          Start Time
                        </label>
                        <input
                          type="time"
                          id="startTime"
                          name="startTime"
                          value={formData.startTime}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:outline-none text-gray-900"
                          required
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="endTime"
                          className="block text-xs font-medium text-gray-700 mb-1"
                        >
                          End Time
                        </label>
                        <input
                          type="time"
                          id="endTime"
                          name="endTime"
                          value={formData.endTime}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:outline-none text-gray-900"
                          required
                        />
                      </div>
                    </div>

                    {/* Purpose */}
                    <div>
                      <label
                        htmlFor="purpose"
                        className="block text-xs font-medium text-gray-700 mb-1"
                      >
                        Purpose
                      </label>
                      <input
                        type="text"
                        id="purpose"
                        name="purpose"
                        value={formData.purpose}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:outline-none text-gray-900"
                        placeholder="Enter purpose of booking"
                        required
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full mt-6 bg-red-800 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition text-sm"
                    >
                      Submit Reservation
                    </button>
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toast Notification */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((s) => ({ ...s, visible: false }))}
      />
    </div>
  );
}
