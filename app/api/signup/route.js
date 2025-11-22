import bcrypt from "bcryptjs";
import { prisma } from "../../lib/db.js";

export async function POST(req) {
  try {
    const form = await req.formData();
    const email = String(form.get("email") || "").trim();
    const firstName = String(form.get("firstName") || "").trim();
    const lastName = String(form.get("lastName") || "").trim();
    const studentIdRaw = String(form.get("studentId") || "").trim();
    const password = String(form.get("password") || "");
    const repeatPassword = String(form.get("repeatPassword") || "");

    // basic validation
    if (!email || !password || !repeatPassword) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400, headers: { "content-type": "application/json" } });
    }

    if (password !== repeatPassword) {
      return new Response(JSON.stringify({ error: "Passwords do not match" }), { status: 400, headers: { "content-type": "application/json" } });
    }

    if (studentIdRaw && !/^\d{8}$/.test(studentIdRaw)) {
      return new Response(JSON.stringify({ error: "Student ID must be 8 digits" }), { status: 400, headers: { "content-type": "application/json" } });
    }

    // check existing by email
    const existingByEmail = await prisma.user.findUnique({ where: { email } });
    if (existingByEmail) {
      return new Response(JSON.stringify({ error: "Email already in use" }), { status: 409, headers: { "content-type": "application/json" } });
    }

    // prepare create payload
    const hashed = await bcrypt.hash(password, 10); //encrypt password
    const createData = {
      email,
      password: hashed,
      first_name: firstName || null,
      last_name: lastName || null,
      name: firstName || lastName ? `${firstName} ${lastName}`.trim() : null,
    };

    if (studentIdRaw) {
      createData.student_id = BigInt(studentIdRaw);
      // ensure unique student ID
      const existingByStudentId = await prisma.user.findUnique({ where: { student_id: createData.student_id } });
      if (existingByStudentId) {
        return new Response(JSON.stringify({ error: "Student ID already in use" }), { status: 409, headers: { "content-type": "application/json" } });
      }
    }

    // create user
    await prisma.user.create({ data: createData });

    return new Response(JSON.stringify({ ok: true }), { status: 201, headers: { "content-type": "application/json" } });
  } catch (err) {
    console.error("Signup route error:", err);
    if (err?.code === "P2002") {
      return new Response(JSON.stringify({ error: "Duplicate value" }), { status: 409, headers: { "content-type": "application/json" } });
    }
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500, headers: { "content-type": "application/json" } });
  }
}
