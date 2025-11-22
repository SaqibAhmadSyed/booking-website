import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth.js";
import { db } from "../../../lib/db.js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        image: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Convert DB snake_case → camelCase for frontend
    return NextResponse.json({
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        profileImage: user.image,
      },
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
