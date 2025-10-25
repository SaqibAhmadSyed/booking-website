"use client";
import React, { useState } from "react";

export default function AdminDashboard() {
  const [currentDate] = useState(new Date());

  // Sample data
  const activeBookings = [
    {
      id: 1,
      room: "Conference Room A",
      client: "John Doe",
      time: "09:00 - 11:00",
      status: "In Progress",
    },
    {
      id: 2,
      room: "Meeting Room 3",
      client: "Jane Smith",
      time: "10:30 - 12:00",
      status: "In Progress",
    },
    {
      id: 3,
      room: "Board Room",
      client: "Acme Corp",
      time: "14:00 - 16:00",
      status: "Upcoming",
    },
  ];

  const pendingRequests = [
    {
      id: 1,
      room: "Conference Room B",
      client: "Sarah Wilson",
      time: "Tomorrow 10:00",
      requested: "2h ago",
    },
    {
      id: 2,
      room: "Training Room",
      client: "Mike Johnson",
      time: "Tomorrow 14:00",
      requested: "5h ago",
    },
  ];

  const blockedResources = [
    {
      id: 1,
      room: "Conference Room C",
      reason: "Maintenance",
      until: "Oct 24",
    },
    { id: 2, room: "Meeting Room 5", reason: "Renovation", until: "Oct 30" },
  ];

  const stats = {
    roomsBookedToday: 8,
    totalBookings: 12,
    peakTime: "4:00PM - 5:00PM",
    availableRooms: 100,
  };

  return (
    <main className="p-6 h-[calc(100vh-4rem)] overflow-hidden flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of your bookings and resources
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Rooms Booked Today
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.roomsBookedToday}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Bookings
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.totalBookings}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Peak Booking Time
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.peakTime}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Available Rooms
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {stats.availableRooms}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 7V5a2 2 0 012-2h14a2 2 0 012 2v2M3 7h18M3 7v12a2 2 0 002 2h14a2 2 0 002-2V7M9 21V9m6 12V9"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid - Fills remaining space */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0 pb-10">
        {/* Active Bookings */}
        <div className="bg-white rounded-lg shadow flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Active Bookings
            </h2>
          </div>
          <div className="p-5 overflow-y-auto flex-1">
            <div className="space-y-3">
              {activeBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm truncate">
                      {booking.room}
                    </h3>
                    <p className="text-xs text-gray-600 truncate">
                      {booking.client}
                    </p>
                  </div>
                  <div className="text-right ml-3">
                    <p className="text-xs font-medium text-gray-900">
                      {booking.time}
                    </p>
                    <span
                      className={`inline-block px-2 py-0.5 text-xs font-medium rounded mt-1 ${
                        booking.status === "In Progress"
                          ? "bg-green-100 text-green-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Requests */}
        <div className="bg-white rounded-lg shadow flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Pending Requests
              </h2>
              <span className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {pendingRequests.length}
              </span>
            </div>
          </div>
          <div className="p-5 overflow-y-auto flex-1">
            <div className="space-y-3">
              {pendingRequests.map((request) => (
                <div
                  key={request.id}
                  className="p-3 border border-orange-200 rounded-lg bg-orange-50"
                >
                  <h3 className="font-semibold text-gray-900 text-sm">
                    {request.room}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{request.client}</p>
                  <p className="text-xs text-gray-500 mt-1">{request.time}</p>
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 px-2 py-1.5 bg-green-600 text-white text-xs font-medium rounded hover:bg-green-700">
                      Approve
                    </button>
                    <button className="flex-1 px-2 py-1.5 bg-red-600 text-white text-xs font-medium rounded hover:bg-red-700">
                      Decline
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Requested {request.requested}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blocked Resources */}
        <div className="bg-white rounded-lg shadow flex flex-col overflow-hidden">
          <div className="px-5 py-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Blocked Resources
              </h2>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {blockedResources.length}
              </span>
            </div>
          </div>
          <div className="p-5 overflow-y-auto flex-1">
            <div className="space-y-3">
              {blockedResources.map((resource) => (
                <div
                  key={resource.id}
                  className="p-3 border border-red-200 rounded-lg bg-red-50"
                >
                  <div className="flex items-start gap-2">
                    <div className="w-8 h-8 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-sm">
                        {resource.room}
                      </h3>
                      <p className="text-xs text-gray-600 mt-1">
                        {resource.reason}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Until: {resource.until}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
