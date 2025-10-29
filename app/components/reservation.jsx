"use client";
import React, { useState } from "react";
import Calendar from "../../components/calendar";
import Toast from "../../components/toast";

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
    console.log("Reservation created:", { ...formData, date: selectedDate });
    setToast({
      visible: true,
      message: `Reservation confirmed for ${formData.name || "N/A"} (ID: ${
        formData.studentId || "N/A"
      }) on ${selectedDate || "N/A"}`,
      type: "success",
    });
  };

  return (
    <main>
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
