import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/db";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const bookings = await prisma.booking.findMany({
            where: { user_id: session.user.id },
            orderBy: { date: "desc" },
            include: {
                resource: true,
            },
        });

        // Normalizamos los datos para que encajen con "room" del frontend
        const formatted = bookings.map((b) => ({
            id: b.id.toString(),
            name: b.resource.name,
            location: b.resource.location,
            type: b.resource.type,
            capacity: b.resource.capacity,
            img: b.resource.image,
            roomNumber: b.resource.location + " / ID: " + b.resource_id, // temporal
            amenities: b.resource.amenities,
            dateBooked: b.date.toISOString().split("T")[0],
            startTime: b.start_time.toISOString().split("T")[1].slice(0, 5),
            endTime: b.end_time.toISOString().split("T")[1].slice(0, 5),
            description: b.resource.description,
            availability: "Based on booking",
            bookingStatus: b.status,
            purpose: b.purpose,
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Error getting user bookings:", error);
        return NextResponse.json(
            { message: "Server error" },
            { status: 500 }
        );
    }
}
