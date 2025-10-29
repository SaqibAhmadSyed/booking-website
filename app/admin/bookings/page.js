"use client";
import Modal from "../../components/modal";
import EditModal from "../../components/edit-modal";
import React, { useState } from "react";

/**
 * Admin bookings management page - Manage all room bookings
 * Features:
 * - Comprehensive bookings table with search and filter
 * - Booking status management (approve, reject, edit, delete)
 * - Confirmation modals for destructive actions
 * - Edit modal for booking modifications
 * - Real-time status updates and visual indicators
 */
export default function Bookings() {
  const [activeBooking, setActiveBooking] = useState(null);
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    message: "",
    icon: "info",
    iconColor: "text-gray-800",
    action: null,
  });
  const [editBooking, setEditBooking] = useState(null);

  // bookings array
  const bookings = [
    {
      id: "#704040",
      name: "LB-200",
      location: "Loyola Campus",
      capacity: 6,
      type: "Study Room - 1",
      date: "2025-10-27",
      time: "09:00 – 11:00",
      status: "rejected",
    },
    {
      id: "#702100",
      name: "Study Room - 5",
      location: "SGW Campus",
      capacity: 12,
      type: "Basketball",
      date: "2025-10-27",
      time: "13:00 – 15:00",
      status: "approved",
    },
    {
      id: "#702345",
      name: "Study Room - 13",
      location: "Loyola Campus",
      capacity: 8,
      type: "Yoga Studio",
      date: "2025-10-28",
      time: "10:00 – 12:00",
      status: "pending",
    },
    {
      id: "#702402",
      name: "Study Room - 3",
      location: "SGW Campus",
      capacity: 20,
      type: "Computer Lab",
      date: "2025-10-28",
      time: "09:00 – 11:00",
      status: "approved",
    },
    {
      id: "#702540",
      name: "Study Room - 5",
      location: "SGW Campus",
      capacity: 10,
      type: "Swimming",
      date: "2025-10-29",
      time: "08:00 – 10:00",
      status: "pending",
    },
    {
      id: "#702630",
      name: "Study Room - 6",
      location: "Loyola Campus",
      capacity: 15,
      type: "Conference Room",
      date: "2025-10-29",
      time: "15:00 – 17:00",
      status: "approved",
    },
    {
      id: "#702810",
      name: "MB-12.201",
      location: "SGW Campus",
      capacity: 25,
      type: "Lecture Hall",
      date: "2025-10-30",
      time: "12:00 – 14:00",
      status: "rejected",
    },
    {
      id: "#702950",
      name: "GYM-Track",
      location: "Loyola Campus",
      capacity: 18,
      type: "Track & Field",
      date: "2025-10-31",
      time: "16:00 – 18:00",
      status: "pending",
    },
    {
      id: "#703001",
      name: "LB-101",
      location: "Loyola Campus",
      capacity: 4,
      type: "Study Room - 2",
      date: "2025-11-01",
      time: "09:30 – 11:00",
      status: "approved",
    },
    {
      id: "#703102",
      name: "Studio A",
      location: "SGW Campus",
      capacity: 14,
      type: "Dance Studio",
      date: "2025-11-01",
      time: "11:00 – 12:30",
      status: "pending",
    },
  ];

  const openModal = (booking, action, message, icon, iconColor) => {
    setActiveBooking(booking);
    setModalConfig({
      isOpen: true,
      message,
      icon,
      iconColor,
      action,
    });
  };

  const closeModal = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
    setActiveBooking(null);
  };

  const handleConfirm = (booking) => {
    if (modalConfig.action) {
      modalConfig.action(booking);
    }
    closeModal();
  };

  return (
    <div className="p-6">
      <div className="mb-2">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Manage Bookings</h1>
          <p className="text-gray-600 mt-1">
            Review and manage all room and sport bookings
          </p>
        </div>
        <section className="flex flex-row items-center justify-between mb-6">
          <input
            type="text"
            id="searchInput"
            placeholder="Search by Room or Sport..."
            className="border border-gray-300 rounded-md px-3 py-1 w-1/2 focus:outline-none bg-white"
          />
          <select
            id="filterSelect"
            className="border border-gray-300 rounded-md px-3 py-1.5 w-1/4 focus:outline-none bg-white"
          >
            <option value="all">All</option>
            <option value="room">Room</option>
            <option value="sport">Sport</option>
          </select>
        </section>
      </div>

      {/* Table */}
      <section className="overflow-x-auto rounded-md border border-slate-400 shadow-sm">
        <table className="min-w-full text-sm border-collapse">
          <thead className="bg-red-200">
            <tr>
              {[
                "Booking ID",
                "Name",
                "Location",
                "Capacity",
                "Sport / Room",
                "Date",
                "Time",
                "Status",
                "Actions",
              ].map((header) => (
                <th
                  key={header}
                  className="px-3 py-1.5 text-left border-b border-gray-200 font-semibold"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <td className="px-3 py-1.5">{booking.id}</td>
                <td className="px-3 py-1.5">{booking.name}</td>
                <td className="px-3 py-1.5">{booking.location}</td>
                <td className="px-3 py-1.5">{booking.capacity}</td>
                <td className="px-3 py-1.5">{booking.type}</td>
                <td className="px-3 py-1.5">{booking.date}</td>
                <td className="px-3 py-1.5">{booking.time}</td>
                <td className="px-3 py-1.5">
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium ${
                      booking.status === "approved"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() +
                      booking.status.slice(1)}
                  </span>
                </td>

                <td className="px-2 py-1.5 space-x-2">
                  <button className="px-2 py-1 text-sm bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                    Approve
                  </button>

                  <button
                    className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded-md hover:bg-red-200"
                    onClick={() =>
                      openModal(
                        booking,
                        (b) => console.log("reject", b),
                        `Are you sure you want to reject booking ${booking.id}?`,
                        "danger",
                        "text-red-600"
                      )
                    }
                  >
                    Reject
                  </button>

                  <button
                    className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                    onClick={() => setEditBooking(booking)}
                  >
                    Edit
                  </button>

                  <button
                    className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    onClick={() =>
                      openModal(
                        booking,
                        (b) => console.log("delete", b),
                        `Are you sure you want to delete booking ${booking.id}? This action cannot be undone.`,
                        "danger",
                        "text-red-600"
                      )
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Confirmation Modal */}
      {modalConfig.isOpen && (
        <Modal
          booking={activeBooking}
          message={modalConfig.message}
          icon={modalConfig.icon}
          iconColor={modalConfig.iconColor}
          onConfirm={handleConfirm}
          onClose={closeModal}
        />
      )}

      {/* Edit Modal */}
      <EditModal
        booking={editBooking}
        isOpen={!!editBooking}
        onClose={() => setEditBooking(null)}
        onSubmit={(updated) => {
          console.log("Updated booking:", updated);
          setEditBooking(null);
        }}
      />
    </div>
  );
}
