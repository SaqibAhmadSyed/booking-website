"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "../../components/modal";

export default function RoomListPage() {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showModal, setShowModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [rooms, searchTerm, filterType, filterLocation, sortBy]);

  const fetchRooms = async () => {
    try {
      const res = await fetch("/api/resource/get-all-rooms");
      if (res.ok) {
        const data = await res.json();
        setRooms(data.rooms || []);
      } else {
        console.error("Failed to fetch rooms");
      }
    } catch (err) {
      console.error("Error fetching rooms:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...rooms];

    if (searchTerm) {
      filtered = filtered.filter(
        (room) =>
          room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterType !== "all") {
      filtered = filtered.filter((room) => room.type === filterType);
    }

    if (filterLocation !== "all") {
      filtered = filtered.filter((room) => room.location === filterLocation);
    }

    filtered.sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "capacity") return b.capacity - a.capacity;
      if (sortBy === "location") return a.location.localeCompare(b.location);
      return 0;
    });

    setFilteredRooms(filtered);
  };
  const handleDelete = (room) => {
    setSelectedRoom(room);
    setShowModal(true);
  };

  const confirmDelete = async (room) => {
    try {
      const res = await fetch(`/api/resource/delete-room`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: room.id }),
      });

      if (res.ok) {
        setRooms((prev) => prev.filter((r) => r.id !== room.id));
      } else {
        alert("Failed to delete room");
      }
    } catch (err) {
      console.error("Error deleting room:", err);
    } finally {
      setShowModal(false);
    }
  };

  const uniqueTypes = [...new Set(rooms.map((r) => r.type))];
  const uniqueLocations = [...new Set(rooms.map((r) => r.location))];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"></div>
      </div>
    );
  }

  return (
    <main className="h-screen flex flex-col p-6 bg-gray-50 overflow-hidden">
      {/* Header - Fixed */}
      <div className="mb-6 flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Room Management</h1>
          <p className="text-gray-600 mt-1">
            View and manage all rooms and facilities
          </p>
        </div>
        <Link
          href="/admin/add-room"
          className="px-6 py-3 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-md"
        >
          + Add New Room
        </Link>
      </div>

      {/* Filters and Search - Fixed */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex-shrink-0">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Room Type
            </label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800"
            >
              <option value="all">All Types</option>
              {uniqueTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800"
            >
              <option value="all">All Locations</option>
              {uniqueLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("name")}
              className={`px-3 py-1 rounded-md text-sm ${
                sortBy === "name"
                  ? "bg-red-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Name
            </button>
            <button
              onClick={() => setSortBy("capacity")}
              className={`px-3 py-1 rounded-md text-sm ${
                sortBy === "capacity"
                  ? "bg-red-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Capacity
            </button>
            <button
              onClick={() => setSortBy("location")}
              className={`px-3 py-1 rounded-md text-sm ${
                sortBy === "location"
                  ? "bg-red-800 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Location
            </button>
          </div>
          <span className="ml-auto text-sm text-gray-600">
            {filteredRooms.length} of {rooms.length} rooms
          </span>
        </div>
      </div>

      {/* Scrollable Room Cards Section */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 overflow-hidden flex flex-col">
        {filteredRooms.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <svg
                className="mx-auto h-16 w-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No rooms found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or add a new room to get started.
              </p>
            </div>
          </div>
        ) : (
          <div
            className="overflow-y-auto pr-2"
            style={{ maxHeight: "calc(100vh - 400px)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <RoomCard key={room.id} room={room} onDelete={handleDelete} />
              ))}
            </div>
          </div>
        )}
      </div>
              {showModal && (
          <Modal
            booking={selectedRoom}
            message={`Delete room "${selectedRoom?.name}"?`}
            icon="danger"
            iconColor="text-red-600"
            onConfirm={confirmDelete}
            onClose={() => setShowModal(false)}
          />
        )}
    </main>
  );
}

function RoomCard({ room, onDelete }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-gray-50 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition border border-gray-200">
      <div className="relative h-48 bg-gradient-to-br from-red-400 to-red-600">
        {room.image ? (
          <Image
            src={room.image}
            alt={room.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-6xl font-bold text-white opacity-50">
              {getInitials(room.name)}
            </span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold text-gray-700 border-slate-500 border">
          {room.type}
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{room.name}</h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {room.location}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Capacity: {room.capacity}
          </div>
        </div>

        {room.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {room.description}
          </p>
        )}

        {room.amenities && room.amenities.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {room.amenities.slice(0, 3).map((amenity, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                >
                  {amenity}
                </span>
              ))}
              {room.amenities.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                  +{room.amenities.length - 3}
                </span>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-4 border-t border-gray-200">
          <Link
            href={`/admin/edit-room/${room.id}`}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-200 transition text-center"
          >
            Edit
          </Link>
          <button
            onClick={() => onDelete(room)}
            className="flex-1 px-4 py-2 bg-red-100 text-red-700 text-sm font-semibol
             rounded-lg hover:bg-red-200 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
