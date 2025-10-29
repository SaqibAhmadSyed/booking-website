"use client";
import React, { useState } from "react";
import Image from "next/image";

export default function RoomList() {
  const [selectedDate, setSelectedDate] = useState("Tuesday, October 14th, 2025");
  const [facilityType, setFacilityType] = useState("labs");

  const rooms = [
    {
      id: 1,
      name: "Lab10",
      image: "/Lab10.jpg",
      capacity: 8,
      location: "Rutherford Science Hub",
      schedule: ["unavailable", "unavailable", "unavailable", "unavailable", "unavailable", "available", "available", "available", "available", "available", "unavailable", "unavailable", "unavailable"]
    },
    {
      id: 2,
      name: "Lab11",
      image: "/Images/Lab11.jpg",
      capacity: 8,
      location: "Rutherford Science Hub",
      schedule: ["available", "available", "available", "available", "available", "available", "available", "unavailable", "unavailable", "unavailable", "available", "available", "available"]
    },
    {
      id: 3,
      name: "Lab12",
      image: "/Images/Lab12.jpg",
      capacity: 15,
      location: "Rutherford Science Hub",
      schedule: ["available", "available", "available", "available", "available", "available", "available", "unavailable", "unavailable", "unavailable", "booked", "booked", "booked"]
    }
  ];

  const timeSlots = ["8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"];

  const handlePreviousDate = () => {
    // Handle previous date logic
    console.log("Previous date");
  };

  const handleNextDate = () => {
    // Handle next date logic
    console.log("Next date");
  };

  return (
    <main className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Reserve a Resource</h1>
        <p className="text-gray-600 mt-1">
          Select a facility and time slot to make your booking
        </p>
      </div>

      {/* Facility Type Selector */}
      <div className="mb-6">
        <label htmlFor="facilityType" className="block text-sm font-medium text-gray-700 mb-2">
          Type of Facility
        </label>
        <select
          id="facilityType"
          value={facilityType}
          onChange={(e) => setFacilityType(e.target.value)}
          className="w-full md:w-64 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
        >
          <option value="labs">Labs</option>
          <option value="studyrooms">Study Rooms</option>
          <option value="sports">Sports Equipment</option>
        </select>
      </div>

      {/* Date Selector */}
      <div className="flex items-center justify-center gap-4 mb-8 bg-white rounded-lg shadow p-4">
        <button
          onClick={handlePreviousDate}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-bold"
        >
          &lt;
        </button>
        <p className="text-lg font-semibold text-gray-900 min-w-[280px] text-center">
          {selectedDate}
        </p>
        <button
          onClick={handleNextDate}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-bold"
        >
          &gt;
        </button>
      </div>

      {/* Rooms and Schedule Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <div className="flex">
            {/* Left Column - Room Info */}
            <div className="flex-shrink-0 border-r border-gray-200">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Room</h3>
              </div>
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="border-b border-gray-200 p-4 flex items-center gap-4 bg-white hover:bg-gray-50 transition"
                  style={{ minHeight: "120px" }}
                >
                  <Image
                    src={room.image}
                    alt={room.name}
                    width={100}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900 text-lg mb-1">
                      {room.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      <strong>Capacity:</strong> {room.capacity} students
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Location:</strong> {room.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column - Schedule Grid */}
            <div className="flex-1 overflow-x-auto">
              {/* Time Headers */}
              <div className="flex bg-gray-100 border-b border-gray-200">
                {timeSlots.map((time, index) => (
                  <div
                    key={index}
                    className="flex-1 min-w-[70px] px-3 py-3 text-center font-semibold text-gray-900 text-sm border-l border-gray-200"
                  >
                    {time}
                  </div>
                ))}
              </div>

              {/* Schedule Rows */}
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="flex border-b border-gray-200"
                  style={{ minHeight: "120px" }}
                >
                  {room.schedule.map((status, index) => (
                    <div
                      key={index}
                      className={`flex-1 min-w-[70px] border-l border-gray-200 cursor-pointer transition ${
                        status === "available"
                          ? "bg-green-100 hover:bg-green-200"
                          : status === "unavailable"
                          ? "bg-red-100"
                          : "bg-blue-200"
                      }`}
                      onClick={() => {
                        if (status === "available") {
                          console.log(`Book ${room.name} at ${timeSlots[index]}`);
                        }
                      }}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap gap-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-100 border border-gray-300 rounded"></div>
          <span className="text-sm text-gray-700">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-100 border border-gray-300 rounded"></div>
          <span className="text-sm text-gray-700">Unavailable</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-200 border border-gray-300 rounded"></div>
          <span className="text-sm text-gray-700">Your Booking</span>
        </div>
      </div>
    </main>
  );
}