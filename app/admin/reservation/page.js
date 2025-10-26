"use client";
import React, { useState } from "react";
import Calendar from "../../components/calendar";
import Toast from "../../components/toast";

export default function Reservation() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    capacity: "",
    type: "",
    startTime: "",
    endTime: ""
  });

  // Toast state (now rendered by component)
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success", // 'success' | 'error' | 'info'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Reservation created:", { ...formData, date: selectedDate });
    // show toast via component
    setToast({
      visible: true,
      message: `Reservation confirmed for ${formData.name || "N/A"} on ${selectedDate || "N/A"}`,
      type: "success",
    });
    // optionally reset form
    // setFormData({ name: "", location: "", capacity: "", type: "", startTime: "", endTime: "" });
  };

  return (
    <main>
      <div className="p-6 overflow-auto mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Set a Reservation</h1>
        <p className="text-gray-600 mt-1">Create a new reservation</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar Section */}
          <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

          {/* Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Reservation Details</h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-gray-900"
                  placeholder="Enter your name"
                />
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-gray-900"
                >
                  <option value="">Select a location</option>
                  <option value="H">Henry F. Hall Building (H)</option>
                  <option value="LB">J.W. McConnell Building (LB)</option>
                  <option value="JMSB">John Molson School of Business (JMSB)</option>
                  <option value="GN">Grey Nuns Building (GN)</option>
                  <option value="FB">Faubourg Building (FB)</option>
                </select>
              </div>

              {/* Room/Sport Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Room/Sport Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-gray-900"
                >
                  <option value="">Select type</option>
                  <optgroup label="Rooms">
                    <option value="conference">Conference Room</option>
                    <option value="meeting">Meeting Room</option>
                    <option value="training">Training Room</option>
                    <option value="boardroom">Board Room</option>
                  </optgroup>
                  <optgroup label="Sports">
                    <option value="basketball">Basketball Court</option>
                    <option value="tennis">Tennis Court</option>
                    <option value="gym">Gym</option>
                    <option value="pool">Swimming Pool</option>
                  </optgroup>
                </select>
              </div>

              {/* Capacity */}
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity (Number of People)
                </label>
                <input
                  type="number"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  min="1"
                  max="100"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-gray-900"
                  placeholder="Enter number of people"
                />
              </div>

              {/* Time Selection */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-2">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-gray-900"
                  />
                </div>
                <div>
                  <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-2">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none text-gray-900"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-red-800 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition shadow-md hover:shadow-lg"
              >
                Submit Reservation
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Toast (now a reusable component) */}
      <Toast
        visible={toast.visible}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast((s) => ({ ...s, visible: false }))}
      />
    </main>
  );
}
