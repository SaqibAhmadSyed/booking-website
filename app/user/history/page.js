"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import ViewModal from "../../components/view-modal";

export default function History() {
    const { data: session } = useSession();
    const [bookings, setBookings] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        if (!session?.user?.id) return;

        async function loadBookings() {
            try {
                const res = await fetch("/api/booking/user");
                const data = await res.json();
                if (Array.isArray(data)) setBookings(data);
            } catch (err) {
                console.error("Error fetching bookings:", err);
            }
        }

        loadBookings();
    }, [session]);

    if (!session) return <p className="p-6">Loading session...</p>;

    return (
        <main className="p-6 bg-slate-50 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                Your Booking History
            </h1>

            {bookings.length === 0 ? (
                <p className="text-center text-gray-600">No bookings found.</p>
            ) : (
                <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-300 overflow-hidden">
                        <thead className="bg-red-800 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Location</th>
                            <th className="px-4 py-2 text-left">Booked Date</th>
                            <th className="px-4 py-2 text-left">Time</th>
                            <th className="px-4 py-2 text-left">Status</th>
                            <th className="px-4 py-2 text-left"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookings.map((room) => (
                            <tr key={room.id} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b">{room.name}</td>
                                <td className="px-4 py-2 border-b">{room.location}</td>
                                <td className="px-4 py-2 border-b">{room.dateBooked}</td>
                                <td className="px-4 py-2 border-b">
                                    {room.startTime} - {room.endTime}
                                </td>
                                <td
                                    className={`px-4 py-2 border-b font-semibold 
                      ${room.bookingStatus === "approved" ? "text-green-600" :
                                        room.bookingStatus === "pending" ? "text-yellow-600" :
                                            "text-red-600"}
                    `}
                                >
                                    {room.bookingStatus}
                                </td>
                                <td className="px-4 py-2 border-b">
                                    <button
                                        onClick={() => setSelectedRoom(room)}
                                        className="px-4 py-2 bg-red-800 text-white rounded-lg hover:bg-red-700"
                                    >
                                        View More
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}

            <ViewModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
        </main>
    );
}
