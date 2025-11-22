import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth.js";
import { db } from "../../../lib/db.js";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { firstName, lastName, email, imageUrl } = body;

    // Build update data using your DB field names
    const updateData = {};

    if (firstName !== undefined) updateData.first_name = firstName;
    if (lastName !== undefined) updateData.last_name = lastName;
    if (email !== undefined) updateData.email = email;
    if (imageUrl !== undefined) updateData.image = imageUrl;

    const updatedUser = await db.user.update({
      where: { email: session.user.email },
      data: updateData,
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        image: true,
      },
    });

    return NextResponse.json({
      user: {
        id: updatedUser.id,
        firstName: updatedUser.first_name,
        lastName: updatedUser.last_name,
        email: updatedUser.email,
        profileImage: updatedUser.image,
      },
    });
  } catch (err) {
    console.error("Profile update error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
