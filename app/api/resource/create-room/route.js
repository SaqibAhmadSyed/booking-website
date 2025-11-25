import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { db } from "../../../lib/db.js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

//Default daily schedule from 8:00–20:00
function buildSchedule() {
    const schedule = {};
}
    for (let hour = 8; hour < 20; hour++) {
        const h = hour.toString().padStart(2, "0");
        const label = `${h}:00`;
        schedule[label] = "available";// A room is available by default
    return schedule;
}
//Manages the schedule data
export async function GET(request, { params }) {
    try {
        const { id } = params;
        const { searchParams } = new URL(request.url);
        const date = searchParams.get("date");
        const currentUserId = searchParams.get("userId");

        if (!id || !date) {
            return NextResponse.json(
                { error: "room id and date are required" },
                { status: 400 }
            );
        }
        const schedule = buildSchedule();

        // Load hourly blocks
        const blocks = await db.roomBlock.findMany({
            where: {
                roomId: id, date,
            },
        });

        const bookings = await db.booking.findMany({
            where: {
                roomId: id, date,
            },
        });

        // mark blocked slots
        for (const block of blocks) {
            // assume block.startTime / endTime are like "08:00", "12:00"
            const startHour = parseInt(block.startTime.split(":")[0], 10);
            const endHour = parseInt(block.endTime.split(":")[0], 10);

            for (let hour = startHour; hour < endHour && hour < 20; hour++) {
                if (hour >= 8) {
                    const slot = `${hour.toString().padStart(2, "0")}:00`;
                    schedule[slot] = "blocked";
                }
            }
        }
        // mark reserved / yourbooking depending on if user has booked the room
        for (const booking of bookings) {
            const startHour = parseInt(booking.startTime.split(":")[0], 10);
            const endHour = parseInt(booking.endTime.split(":")[0], 10);

            for (let hour = startHour; hour < endHour && hour < 20; hour++) {
                if (hour >= 8) {
                    const slot = `${hour.toString().padStart(2, "0")}:00`;
                    if (schedule[slot] === "blocked") continue;
                    if (currentUserId && booking.userId === currentUserId) {
                        schedule[slot] = "yourbooking";
                    } else {
                        schedule[slot] = "reserved";
                    }
                }
            }
        }

        return NextResponse.json(
            { success: true, schedule },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error building schedule:", error);
        return NextResponse.json(
            { error: "Failed to build room schedule", details: error.message },
            { status: 500 }
        );
    }
}


//Creates a room
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, location, capacity, type, amenities, description, image } = body;

    let imageUrl = image || null; // Use a separate variable

    // Upload image to Supabase Storage if provided
    if (image) {
      // Convert base64 to buffer
      const base64Data = image.split(",")[1];
      const mimeType = image.split(";")[0].split(":")[1];
      const buffer = Buffer.from(base64Data, "base64");

      // Generate unique filename
      const fileExt = mimeType.split("/")[1];
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `rooms/${fileName}`;

      // Upload to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("rooms")
        .upload(filePath, buffer, {
          contentType: mimeType,
          upsert: false,
        });

      if (uploadError) {
        console.error("Upload error:", uploadError);
        return NextResponse.json(
          { error: "Failed to upload image" },
          { status: 500 }
        );
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("rooms")
        .getPublicUrl(filePath);

      imageUrl = urlData.publicUrl; // Assign to imageUrl
    }

    // Save to database using Prisma
    const room = await db.resource.create({
      data: {
        name,
        location,
        capacity,
        type,
        amenities,
        description: description || "no description",
        image: imageUrl,
          schedule: buildSchedule(),
      },
    });

    return NextResponse.json(
      { success: true, room },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding room:", error);
    return NextResponse.json(
      { error: "Failed to add room", details: error.message },
      { status: 500 }
    );
  }
}
