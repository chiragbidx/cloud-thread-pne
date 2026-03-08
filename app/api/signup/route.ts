import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db/client";
import { users } from "../../../lib/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password, firstName, lastName } = body;

    if (
      !email ||
      !password ||
      !firstName ||
      !lastName ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      typeof firstName !== "string" ||
      typeof lastName !== "string"
    ) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Normalize and check for existing user
    const normalizedEmail = email.trim().toLowerCase();
    const existing = await db.select().from(users).where(eq(users.email, normalizedEmail));
    if (existing.length > 0) {
      return NextResponse.json({ error: "User with this email already exists." }, { status: 409 });
    }

    // Hash password (bcryptjs, safe for webcontainer)
    const hashed = await bcrypt.hash(password, 10);

    // Insert user
    const [created] = await db
      .insert(users)
      .values({
        email: normalizedEmail,
        passwordHash: hashed,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
      })
      .returning();

    return NextResponse.json({ success: true, userId: created.id }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Registration failed." },
      { status: 400 }
    );
  }
}