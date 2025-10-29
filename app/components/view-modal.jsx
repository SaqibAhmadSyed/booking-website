"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function ViewModal({ room, onClose }) {
  if (!room) return null;

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-5 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5">
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
              className="px-5 py-2.5 bg-red-800 text-white rounded-lg hover:bg-red-700 focus:outline-none font-medium transition"
            >
                <Link href="/user/reservation">Book Now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
