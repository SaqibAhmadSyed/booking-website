import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { db } from "../../../lib/db.js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function DELETE(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json({ error: "Room ID is required" }, { status: 400 });
    }

    // Get room data to access image URL
    const room = await db.resource.findUnique({
      where: { id },
      select: { image: true },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    // Delete image from Supabase Storage if exists
    if (room.image) {
      try {
        const url = new URL(room.image);
        const pathParts = url.pathname.split("/");
        const bucketIndex = pathParts.indexOf("rooms");
        
        if (bucketIndex !== -1) {
          const filePath = pathParts.slice(bucketIndex + 1).join("/");
          
          if (filePath) {
            const { error: deleteError } = await supabase.storage
              .from("rooms")
              .remove([filePath]);

            if (deleteError) {
              console.warn("Failed to delete room image:", deleteError);
            } else {
              console.log("Successfully deleted room image:", filePath);
            }
          }
        }
      } catch (parseError) {
        console.warn("Failed to parse room image URL:", parseError);
      }
    }

    // Delete room from database
    await db.resource.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: "Room deleted successfully" });
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { error: "Failed to delete room", details: error.message },
      { status: 500 }
    );
  }
}