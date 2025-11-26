"use client";
import React, {useEffect, useState} from "react";
import Calendar from "../../components/calendar";
import Toast from "../../components/toast";
import {useSearchParams} from "next/navigation";


/**
 * Reservation page - Create new room bookings
 * Features:
 * - Interactive calendar for date selection
 * - Form for booking details (name, student ID, capacity, time, purpose)
 * - Form validation and submission
 * - Success notification with toast messages
 * - Two-column layout with calendar and form
 */
export default function Reservation() {

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
    const searchParams = useSearchParams();
    const selectedRoomId = searchParams.get("roomId");
    const selectedTime = searchParams.get("time");

  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

    useEffect(() => {
        if (selectedTime) {
            setFormData((prev) => ({ ...prev, startTime: selectedTime }));
        }
    }, [selectedTime]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedDate) {
            return setToast({
                visible: true,
                message: "Please select a date first.",
                type: "error",
            });
        }

        try {
            const response = await fetch("/api/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    resourceId: selectedRoomId || "TEMP_RESOURCE_ID",
                    date: selectedDate ? selectedDate.toISOString().split("T")[0] : null,
                    startTime: formData.startTime,
                    endTime: formData.endTime,
                    purpose: formData.purpose,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || "Failed to create reservation");

            setToast({ visible: true, message: "Reservation successful!", type: "success" });

        } catch (err) {
            setToast({ visible: true, message: err.message, type: "error" });
        }
    };


    return (
    <main className="pb-32">
      <div className="p-6 overflow-auto mb-2">
        <h1 className="text-3xl font-bold text-gray-900">Set a Reservation</h1>
        <p className="text-gray-600 mt-1">Create a new reservation</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-6">
          {/* Calendar Section */}
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

          {/* Form Section */}
          <div className="bg-white rounded-lg shadow p-4 text-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Reservation Details
            </h2>

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
                />
              </div>

              {/* Capacity */}
              <div>
                <label
                  htmlFor="capacity"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  Capacity
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  min="1"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-red-500 focus:outline-none text-gray-900"
                  placeholder="Enter number of people"
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
                  />
                </div>
              </div>
              {/* purpose */}
              <div>
                <label
                  htmlFor="studentId"
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
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-8 bg-red-800 text-white py-2 rounded-md font-semibold hover:bg-red-700 transition text-sm"
              >
                Submit Reservation
              </button>
            </form>
          </div>
        </div>
      </div>

      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((s) => ({ ...s, visible: false }))}
      />
    </main>
  );
}
