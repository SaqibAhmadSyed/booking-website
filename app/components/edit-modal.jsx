import React from "react";

/**
 * Edit booking modal component - View and edit booking details
 * Features:
 * - Display booking information in modal format
 * - Read-only view of booking details
 * - Close functionality
 * - Responsive modal design
 * - Used in admin bookings management
 */
export default function ViewBookingModal({
  booking = null,
  isOpen = false,
  onClose = () => {},
}) {
  if (!isOpen || !booking) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative p-4 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative bg-white rounded-lg shadow-sm">
          <div className="flex items-center justify-between p-4 border-b rounded-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
          </div>

          <div className="p-4">
            <div className="mb-4">
              <p><strong>Name:</strong> {booking.name}</p>
              <p><strong>Capacity:</strong> {booking.capacity}</p>
              <p><strong>Type:</strong> {booking.type}</p>
              <p><strong>Date:</strong> {booking.date}</p>
              <p><strong>Time:</strong> {booking.time}</p>
              <p><strong>Location:</strong> {booking.location}</p>
            </div>

            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 transition ease-in-out duration-100 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none focus:ring-0"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
