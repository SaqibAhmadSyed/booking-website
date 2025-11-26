"use client";
import React, { useState } from "react";
import Image from "next/image";
import ViewModal from "../../components/view-modal";

/**
 * Room list page - Browse and book available rooms/facilities
 * Features:
 * - Facility type filtering (labs, study rooms, sports)
 * - Interactive schedule grid with time slots
 * - Room details with images and capacity information
 * - Clickable room names to open detailed view modal
 * - Date navigation and availability status indicators
 * - Color-coded availability legend
 */
export default function RoomList() {
  const [selectedDate, setSelectedDate] = useState(new Date(2025,10,14))
  const [facilityType, setFacilityType] = useState("labs");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const baseRooms = [
    { id: 1, type: "labs", name: "Lab10", image: "/img/Lab10.jpg", capacity: 8, location: "Rutherford Science Hub", schedule: ["unavailable","unavailable","unavailable","unavailable","unavailable","available","available","available","available","available","unavailable","unavailable","unavailable"] },
    { id: 2, type: "labs", name: "Lab11", image: "/img/Lab11.jpg", capacity: 8, location: "Rutherford Science Hub", schedule: ["available","available","available","available","available","available","available","unavailable","unavailable","unavailable","available","available","available"] },
    { id: 3, type: "studyrooms", name: "Study Room A", image: "/img/room101.jpg", capacity: 4, location: "SGW Library", schedule: ["available","available","booked","available","available","available","unavailable","available","available","available","available","available","available"] },
    { id: 4, type: "studyrooms", name: "Study Room B", image: "/img/room102.png", capacity: 6, location: "Loyola Library", schedule: ["available","unavailable","available","available","available","available","available","available","booked","available","available","available","available"] },
    { id: 5, type: "sports", name: "Basketball Court", image: "/img/BBCourt.jpg", capacity: 12, location: "Sports Complex", schedule: ["available","available","available","available","booked","booked","available","available","available","available","available","available","available"] },
    { id: 6, type: "sports", name: "Tennis Court", image: "/img/TennisSet.jpg", capacity: 4, location: "Sports Complex", schedule: ["unavailable","available","available","available","available","available","available","booked","available","available","available","available","available"] }
  ];

  // Duplicate data for demos/extras (We will change those later)
  const rooms = [
    ...baseRooms,
    ...baseRooms.map(r => ({ ...r, id: r.id + 10, name: r.name + " Demo" })),
    ...baseRooms.map(r => ({ ...r, id: r.id + 20, name: r.name + " Extra" }))
  ];

  const timeSlots = ["8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00"];


    // Color of each of the room's statuses
    const STATUS_LABELS = {
        available: "Available",
        reserved: "Reserved (someone else)",
        yourbooking: "Your booking",
        blocked: "Blocked / Unavailable",
    };

    const STATUS_CLASSES = {
        available: "bg-green-100 border-green-300",
        reserved: "bg-yellow-100 border-yellow-300",
        yourbooking: "bg-blue-200 border-blue-400",
        blocked: "bg-red-100 border-red-300",
    };

    const getStatusClass = (status) =>
        STATUS_CLASSES[status] || "bg-gray-100 border-gray-300";

    const handlePreviousDate = () => {
        setSelectedDate((prev) => {
            const d = new Date(prev);
            d.setDate(d.getDate() - 1);
            return d;
        });
    };

    const handleNextDate = () => {
        setSelectedDate((prev) => {
            const d = new Date(prev);
            d.setDate(d.getDate() + 1);
            return d;
        });
    };
  
  const handleRoomClick = (room) => {
    // Transform room data to match ViewModal expectations
    const modalRoom = {
      ...room,
      img: room.image,
      roomNumber: room.id,
      description: `A ${room.type === 'labs' ? 'laboratory' : room.type === 'studyrooms' ? 'study room' : 'sports facility'} with capacity for ${room.capacity} people.`,
      amenities: room.type === 'labs' ? ['Computers', 'Projector', 'Whiteboard', 'Lab Equipment'] :
                 room.type === 'studyrooms' ? ['Tables', 'Chairs', 'Whiteboard', 'WiFi'] :
                 ['Equipment', 'Changing Room', 'Storage', 'Safety Equipment'],
      availability: 'Available for booking during selected time slots'
    };
    setSelectedRoom(modalRoom);
    setIsModalOpen(true);
  };

  const filteredRooms = rooms.filter(room => room.type === facilityType);

  return (
    <main className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Reserve a Resource</h1>
        <p className="text-gray-600 mt-1">Select a facility and time slot to make your booking</p>
      </div>
      
      {/* Dropdown */}
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
        <button onClick={handlePreviousDate} className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-bold">&lt;</button>
        <p className="text-lg font-semibold text-gray-900 min-w-[280px] text-center">{selectedDate}</p>
        <button onClick={handleNextDate} className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 transition text-gray-700 font-bold">&gt;</button>
      </div>

      {/* Rooms Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <div className="flex">
            {/* Left Column - Room Info */}
            <div className="flex-shrink-0 border-r border-gray-200">
              <div className="bg-gray-100 px-4 py-3 border-b border-gray-200"><h3 className="font-semibold text-gray-900">Room</h3></div>
              {filteredRooms.map(room => (
                <div key={room.id} className="border-b border-gray-200 p-4 flex items-center gap-4 bg-white hover:bg-gray-50 transition" style={{ minHeight: "120px" }}>
                  <Image src={room.image} alt={room.name} width={50} height={50} className="rounded-lg object-cover" />
                  <div>
                    <h4 
                      className="font-semibold text-gray-900 text-lg mb-1 cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => handleRoomClick(room)}
                    >
                      {room.name}
                    </h4>
                    <p className="text-sm text-gray-600"><strong>Capacity:</strong> {room.capacity} students</p>
                    <p className="text-sm text-gray-600"><strong>Location:</strong> {room.location}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Schedule Grid */}
            <div className="flex-1 overflow-x-auto">
              <div className="flex bg-gray-100 border-b border-gray-200">
                {timeSlots.map((time, index) => (
                  <div key={index} className="flex-1 min-w-[70px] px-3 py-3 text-center font-semibold text-gray-900 text-sm border-l border-gray-200">{time}</div>
                ))}
              </div>
              {filteredRooms.map(room => (
                <div key={room.id} className="flex border-b border-gray-200" style={{ minHeight: "120px" }}>
                  {room.schedule.map((status, index) => (
                    <div
                      key={index}
                      className={`flex-1 min-w-[70px] border-l cursor-pointer transition border-gray-200 ${getStatusClass(status)}`}
                      onClick={() => {
                          if (status === "available") {
                              window.location.href = `/user/reservation?roomId=${room.id}&time=${timeSlots[index]}`;
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
        <div className="mt-6 flex flex-wrap gap-4 justify-center">
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
                <div key={key} className="flex items-center gap-2">
                    <div
                        className={`w-8 h-8 rounded border ${getStatusClass(key)}`}
                    ></div>
                    <span className="text-sm text-gray-700">{label}</span>
                </div>
            ))}
        </div>

      {/* ViewModal */}
      {isModalOpen && (
        <ViewModal 
          room={selectedRoom} 
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRoom(null);
          }} 
        />
      )}
    </main>
  );

}
