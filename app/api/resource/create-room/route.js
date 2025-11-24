import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { db } from "../../../lib/db.js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

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

      imageUrl = urlData.publicUrl; // ✅ assign to imageUrl
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
