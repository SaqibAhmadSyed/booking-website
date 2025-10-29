"use client";
import React, { useState } from "react";
import ViewModal from "@/app/components/view-modal";

const rooms = [
    {
      id: 1,
      img: "/img/Room101.jpg",
      name: "Conference Room A",
      location: "Henry F. Hall",
      type: "Conference",
      capacity: 20,
      description:
        "Spacious room with projector and whiteboard, perfect for team meetings and presentations.",
      amenities: [
        "Projector",
        "Whiteboard",
        "Wi-Fi",
        "Air Conditioning",
        "Video Conferencing",
        "Sound System",
      ],
      availability: "Mon-Fri: 8am - 8pm",
      roomNumber: "H-201",
      equipment: [
        "75-inch Smart TV",
        "Wireless Presentation",
        "Conference Phone",
        "Flipchart",
      ],
      bookingPolicy: "Minimum 2 hours, advance booking required",
      contact: "ext. 1234",
      dateBooked: "2025-10-07",
    },
    {
      id: 2,
      img: "/img/Room102.png",
      name: "Study Room B",
      location: "J.W. McConnell",
      type: "Study Room",
      capacity: 6,
      description:
        "Quiet study room with individual desks, ideal for focused group study sessions.",
      amenities: [
        "Wi-Fi",
        "Power Outlets",
        "Ergonomic Chairs",
        "Individual Study Lamps",
        "Whiteboard",
      ],
      availability: "Mon-Sun: 9am - 10pm",
      roomNumber: "J-301",
      equipment: ["6 Individual Desks", "2 Whiteboards", "Study Materials"],
      bookingPolicy: "First come, first served",
      contact: "ext. 5678",
      dateBooked: "2025-11-01",
    },
    {
      id: 3,
      img: "/img/BBCourt.jpg",
      name: "Basketball Court",
      location: "Grey Nuns",
      type: "Sports Facility",
      capacity: 50,
      description:
        "Indoor basketball court with full equipment, perfect for sports activities and fitness classes.",
      amenities: [
        "Basketball Court",
        "Dumbbells",
        "Treadmills",
        "Locker Rooms",
        "Shower Facilities",
        "Water Fountain",
      ],
      availability: "Mon-Sun: 6am - 10pm",
      roomNumber: "G-101",
      equipment: [
        "Basketball Hoops",
        "Exercise Mats",
        "Weight Racks",
        "Cardio Machines",
      ],
      bookingPolicy: "Student ID required, 1-hour maximum per session",
      contact: "ext. 9012",
      dateBooked: "	2025-11-04",
    },
    {
      id: 4,
      img: "/img/Room215.jpeg",
      name: "Computer Lab 215",
      location: "Engineering Building",
      type: "Computer Lab",
      capacity: 30,
      description:
        "Modern computer lab with high-performance workstations and specialized software for engineering students.",
      amenities: [
        "High-Speed Wi-Fi",
        "Dual Monitors",
        "Engineering Software",
        "Air Conditioning",
        "Power Outlets",
      ],
      availability: "Mon-Fri: 7am - 10pm, Sat-Sun: 9am - 6pm",
      roomNumber: "E-215",
      equipment: ["30 Workstations", "3D Printers", "Laser Cutters", "Projector"],
      bookingPolicy: "Student ID required, advance booking recommended",
      contact: "ext. 3456",
      dateBooked: "2025-10-28",
    },
    {
      id: 5,
      img: "/img/Lab10.jpg",
      name: "Chemistry Lab 10",
      location: "Science Building",
      type: "Laboratory",
      capacity: 24,
      description:
        "Fully equipped chemistry laboratory with modern safety equipment and analytical instruments.",
      amenities: [
        "Fume Hoods",
        "Safety Equipment",
        "Analytical Instruments",
        "Chemical Storage",
        "Emergency Showers",
      ],
      availability: "Mon-Fri: 8am - 6pm",
      roomNumber: "S-110",
      equipment: ["Spectrophotometer", "pH Meters", "Microscopes", "Centrifuge"],
      bookingPolicy: "Instructor supervision required, safety training mandatory",
      contact: "ext. 7890",
      dateBooked: "2025-11-04",
    },
    {
      id: 6,
      img: "/img/Lab11.jpg",
      name: "Physics Lab 11",
      location: "Science Building",
      type: "Laboratory",
      capacity: 20,
      description:
        "Advanced physics laboratory with precision measurement equipment and experimental setups.",
      amenities: [
        "Precision Instruments",
        "Oscilloscopes",
        "Power Supplies",
        "Measurement Tools",
        "Safety Equipment",
      ],
      availability: "Mon-Fri: 9am - 5pm",
      roomNumber: "S-211",
      equipment: [
        "Oscilloscopes",
        "Function Generators",
        "Multimeters",
        "Optical Benches",
      ],
      bookingPolicy: "Instructor supervision required, advance booking essential",
      contact: "ext. 7891",
      dateBooked: "	2025-11-06",
    },
    {
      id: 7,
      img: "/img/Lab12.jpg",
      name: "Biology Lab 12",
      location: "Science Building",
      type: "Laboratory",
      capacity: 28,
      description:
        "Modern biology laboratory with advanced microscopes and specimen preparation facilities.",
      amenities: [
        "Advanced Microscopes",
        "Specimen Storage",
        "Incubators",
        "Safety Equipment",
        "Sterile Work Areas",
      ],
      availability: "Mon-Fri: 8am - 7pm",
      roomNumber: "S-312",
      equipment: [
        "Compound Microscopes",
        "Stereo Microscopes",
        "Incubators",
        "Centrifuges",
      ],
      bookingPolicy:
        "Instructor supervision required, safety protocols mandatory",
      contact: "ext. 7892",
      dateBooked: "2025-10-15",
    },
    {
      id: 8,
      img: "/img/YogaRoom.jpg",
      name: "Yoga Studio",
      location: "Student Center",
      type: "Fitness Studio",
      capacity: 25,
      description:
        "Peaceful yoga studio with natural lighting, mirrors, and all necessary equipment for yoga practice.",
      amenities: [
        "Yoga Mats",
        "Mirrors",
        "Natural Lighting",
        "Sound System",
        "Storage Lockers",
      ],
      availability: "Mon-Sun: 6am - 10pm",
      roomNumber: "SC-101",
      equipment: ["Yoga Mats", "Blocks", "Straps", "Bolsters", "Blankets"],
      bookingPolicy: "First come, first served, bring your own mat if preferred",
      contact: "ext. 2345",
      dateBooked: "2025-10-19",
    },
    {
      id: 9,
      img: "/img/TennisSet.jpg",
      name: "Tennis Court",
      location: "Sports Complex",
      type: "Sports Facility",
      capacity: 4,
      description:
        "Outdoor tennis court with professional surface and lighting for evening play.",
      amenities: [
        "Professional Surface",
        "Evening Lighting",
        "Net Equipment",
        "Seating Area",
        "Water Fountain",
      ],
      availability: "Mon-Sun: 6am - 10pm",
      roomNumber: "SC-TC1",
      equipment: ["Tennis Nets", "Racket Storage", "Ball Machine", "Scoreboard"],
      bookingPolicy: "Equipment rental available, advance booking recommended",
      contact: "ext. 4567",
      dateBooked: "2025-11-02",
    },
  ];
  
  

export default function History() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  return (
    <main className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        Find a Room to Book Now
      </h1>

      <div className="overflow-x-auto rounded-lg">
        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
          <thead className="bg-red-800 text-white">
            <tr>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                Name
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                Location
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                Type
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                Capacity
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                Date Booked
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                Date Booked
              </th>
              <th className="px-4 py-2 text-left border-b border-gray-300">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 border-b border-gray-200">
                  {room.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {room.location}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {room.type}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {room.capacity}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  {room.dateBooked}
                </td>
                <td className="px-4 py-2 border-b border-gray-200">
                  <button
                    onClick={() => setSelectedRoom(room)}
                    className="px-4 py-2 bg-red-800 text-white rounded-lg transition ease-in-out duration-100 hover:bg-red-700"
                  >
                    View More
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <ViewModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
    </main>
  );
}
