import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { db } from "../../../lib/db.js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, name, location, capacity, type, amenities, description, image } = body;

    if (!id) {
      return NextResponse.json({ error: "Room ID is required" }, { status: 400 });
    }

    // Get current room data
    const currentRoom = await db.resource.findUnique({
      where: { id },
      select: { image: true },
    });

    if (!currentRoom) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    let imageUrl = image;

    // If new image is provided (base64), upload it
    if (image && image.startsWith("data:")) {
      // Delete old image if exists
      if (currentRoom.image) {
        try {
          const url = new URL(currentRoom.image);
          const pathParts = url.pathname.split("/");
          const bucketIndex = pathParts.indexOf("rooms");
          
          if (bucketIndex !== -1) {
            const oldFilePath = pathParts.slice(bucketIndex + 1).join("/");
            
            if (oldFilePath) {
              const { error: deleteError } = await supabase.storage
                .from("rooms")
                .remove([oldFilePath]);

              if (deleteError) {
                console.warn("Failed to delete old image:", deleteError);
              } else {
                console.log("Successfully deleted old image:", oldFilePath);
              }
            }
          }
        } catch (parseError) {
          console.warn("Failed to parse old image URL:", parseError);
        }
      }

      // Upload new image
      const base64Data = image.split(",")[1];
      const mimeType = image.split(";")[0].split(":")[1];
      const buffer = Buffer.from(base64Data, "base64");

      const fileExt = mimeType.split("/")[1];
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `rooms/${fileName}`;

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

      const { data: urlData } = supabase.storage
        .from("rooms")
        .getPublicUrl(filePath);

      imageUrl = urlData.publicUrl;
    }

    // Update room in database
    const updatedRoom = await db.resource.update({
      where: { id },
      data: {
        name,
        location,
        capacity,
        type,
        amenities,
        description: description || null,
        image: imageUrl,
      },
    });

    return NextResponse.json(
      { success: true, room: updatedRoom },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json(
      { error: "Failed to update room", details: error.message },
      { status: 500 }
    );
  }
}