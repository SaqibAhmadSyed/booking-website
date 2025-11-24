import { NextResponse } from "next/server";
import { db } from "../../../lib/db.js";

export async function GET(request) {
  try {
    const rooms = await db.resource.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json({ rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Failed to fetch rooms", details: error.message },
      { status: 500 }
    );
  }
}