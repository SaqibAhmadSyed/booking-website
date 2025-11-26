import { NextResponse } from "next/server";
import { prisma } from "../../lib/db";  // ajusta si ruta cambia
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const body = await request.json();
        const { resourceId, date, startTime, endTime, purpose } = body;

        if (!resourceId || !date || !startTime || !endTime) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const startDateTime = new Date(`${date}T${startTime}:00`);
        const endDateTime = new Date(`${date}T${endTime}:00`);

        if (endDateTime <= startDateTime) {
            return NextResponse.json({ error: "End time must be after start time" }, { status: 400 });
        }

        const conflict = await prisma.booking.findFirst({
            where: {
                resource_id: resourceId,
                AND: [
                    { start_time: { lt: endDateTime } },
                    { end_time: { gt: startDateTime } },
                ],
            },
        });

        if (conflict) {
            return NextResponse.json({ error: "Time slot already booked" }, { status: 409 });
        }

        const booking = await prisma.booking.create({
            data: {
                resource_id: resourceId,
                user_id: session.user.id,
                date: new Date(date),
                start_time: startDateTime,
                end_time: endDateTime,
                purpose,
                day_of_week: new Date(date).getDay(),
            },
        });

        return NextResponse.json(
            {
                message: "Booking created",
                booking: {
                    ...booking,
                    id: booking.id?.toString?.(),
                    user_id: booking.user_id?.toString?.(),
                    resource_id: booking.resource_id?.toString?.(),
                },
            },
            { status: 201 }
        );


    } catch (error) {
        console.error("Booking error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
