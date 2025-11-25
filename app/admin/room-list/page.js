"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RoomListPage() {
  const router = useRouter();
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Booking form state
  const [bookingData, setBookingData] = useState({
    date: "",
    name: "",
    studentId: "",
    capacity: "",
    startTime: "",
    endTime: "",
    purpose: "",
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  useEffect(() => {
    applyFilters();
    setCurrentPage(1);
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

  const handleView = (room) => {
    setSelectedRoom(room);
    setShowViewModal(true);
    setShowBookingForm(false);
  };

  const handleDelete = (room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`/api/resource/delete-room`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedRoom.id }),
      });

      if (res.ok) {
        setRooms((prev) => prev.filter((r) => r.id !== selectedRoom.id));
        setShowDeleteModal(false);
      } else {
        alert("Failed to delete room");
      }
    } catch (err) {
      console.error("Error deleting room:", err);
      alert("Error deleting room");
    }
  };

  const handleBookingInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = async () => {
    // Validation
    if (
      !bookingData.date ||
      !bookingData.name ||
      !bookingData.studentId ||
      !bookingData.capacity ||
      !bookingData.startTime ||
      !bookingData.endTime ||
      !bookingData.purpose
    ) {
      alert("Please fill in all fields");
      return;
    }
    
    // Reset form
    setBookingData({
      date: "",
      name: "",
      studentId: "",
      capacity: "",
      startTime: "",
      endTime: "",
      purpose: "",
    });
    setShowViewModal(false);
    setShowBookingForm(false);
  };

  const closeViewModal = () => {
    setShowViewModal(false);
    setShowBookingForm(false);
    setSelectedRoom(null);
    setBookingData({
      date: "",
      name: "",
      studentId: "",
      capacity: "",
      startTime: "",
      endTime: "",
      purpose: "",
    });
  };

  const uniqueTypes = [...new Set(rooms.map((r) => r.type))];
  const uniqueLocations = [...new Set(rooms.map((r) => r.location))];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800"></div>
      </div>
    );
  }

  return (
    <main className="h-screen flex flex-col p-6 bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Room List</h1>
          <p className="text-gray-600 mt-1">
            View all available rooms and manage their details.
          </p>
        </div>
        <button className="px-6 py-3 bg-red-800 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-md">
          Add New Room
        </button>
      </div>

      {/* Filters and Search */}
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
                  {type}
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

        <div className="mt-4 flex items-center justify-between gap-4">
          {/* Left side: Sort buttons and room count */}
          <div className="flex items-center gap-4">
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
            <span className="text-sm text-gray-600">
              {filteredRooms.length} of {rooms.length} rooms
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div
        className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col"
        style={{ maxHeight: "calc(100vh - 420px)" }}
      >
        <div className="overflow-y-auto flex-1">
          <table className="min-w-full">
            <thead className="bg-red-800 text-white sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Capacity
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentRooms.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-8 text-center text-gray-500"
                  >
                    No rooms found. Try adjusting your filters.
                  </td>
                </tr>
              ) : (
                currentRooms.map((room) => (
                  <tr key={room.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {room.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {room.location}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                        {room.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {room.capacity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                      {room.description}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleView(room)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition"
                        >
                          View
                        </button>
                        <button
                          onClick={() =>
                            router.push(`/admin/edit-room/${room.id}`)
                          }
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => handleDelete(room)}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <svg
                className="w-6 h-6 text-red-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 text-center">
              Delete Room
            </h3>
            <p className="text-gray-600 mb-6 text-center">
              Are you sure you want to delete "{selectedRoom?.name}"? This
              action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View/Booking Modal */}
      {showViewModal && selectedRoom && (
        <div
          className="fixed inset-0 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={closeViewModal}
        >
          <div
            className={`bg-white rounded-2xl shadow-2xl w-full transition-all duration-300 ${
              showBookingForm ? "max-w-5xl" : "max-w-3xl"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[90vh] overflow-y-auto">
              {!showBookingForm ? (
                // Room Details View
                <div className="p-8">
                  {/* Close Button */}
                  <button
                    onClick={closeViewModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                  >
                    <svg
                      className="w-6 h-6"
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
                  </button>

                  {/* Room Image */}
                  {selectedRoom.image && (
                    <div className="mb-6 w-full h-80 relative overflow-hidden rounded-xl">
                      <img
                        src={selectedRoom.image}
                        alt={selectedRoom.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Room Title */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {selectedRoom.name}
                  </h2>
                  <p className="text-gray-500 mb-6">{selectedRoom.location}</p>

                  {/* Room Quick Info */}
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-lg  font-bold text-gray-900">
                        Capacity
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedRoom.capacity}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        Type
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedRoom.type}
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        Location
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedRoom.location}
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  {selectedRoom.description && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        About This Room
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {selectedRoom.description}
                      </p>
                    </div>
                  )}

                  {/* Amenities */}
                  {selectedRoom.amenities &&
                    selectedRoom.amenities.length > 0 && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          Amenities
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {selectedRoom.amenities.map((amenity, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2 text-gray-700"
                            >
                              <svg
                                className="w-5 h-5 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              <span>{amenity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-6 border-t">
                    <button
                      onClick={closeViewModal}
                      className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                // Booking Form View
                <div className="p-8">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">
                        Book {selectedRoom.name}
                      </h2>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedRoom.location} • Capacity:{" "}
                        {selectedRoom.capacity}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowBookingForm(false)}
                      className="text-gray-400 hover:text-gray-600 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Date */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="date"
                          name="date"
                          value={bookingData.date}
                          onChange={handleBookingInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent text-sm"
                        />
                      </div>

                      {/* Number of People */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of People{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="number"
                          name="capacity"
                          value={bookingData.capacity}
                          onChange={handleBookingInputChange}
                          min="1"
                          max={selectedRoom.capacity}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent text-sm"
                          placeholder={`Max ${selectedRoom.capacity} people`}
                        />
                      </div>

                      {/* Full Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={bookingData.name}
                          onChange={handleBookingInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent text-sm"
                          placeholder="Enter your full name"
                        />
                      </div>

                      {/* Student ID */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Student ID <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="text"
                          name="studentId"
                          value={bookingData.studentId}
                          onChange={handleBookingInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent text-sm"
                          placeholder="Enter your student ID"
                        />
                      </div>

                      {/* Start Time */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Time <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="time"
                          name="startTime"
                          value={bookingData.startTime}
                          onChange={handleBookingInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent text-sm"
                        />
                      </div>

                      {/* End Time */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Time <span className="text-red-600">*</span>
                        </label>
                        <input
                          type="time"
                          name="endTime"
                          value={bookingData.endTime}
                          onChange={handleBookingInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>

                    {/* Purpose */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Purpose of Booking{" "}
                        <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        name="purpose"
                        value={bookingData.purpose}
                        onChange={handleBookingInputChange}
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-800 focus:border-transparent resize-none text-sm"
                        placeholder="Please describe the purpose of your booking..."
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-3 pt-3">
                      <button
                        onClick={() => setShowBookingForm(false)}
                        className="flex-1 px-5 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium text-sm"
                      >
                        Back
                      </button>
                      <button
                        onClick={handleBookingSubmit}
                        className="flex-1 px-5 py-2.5 bg-red-800 text-white rounded-lg hover:bg-red-700 transition font-medium text-sm"
                      >
                        Confirm Booking
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
