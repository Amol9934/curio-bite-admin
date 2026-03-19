import { NextResponse } from "next/server";

// Hardcoded credentials — change these to your own
const CREDENTIALS = {
  email: "admin@gmail.com",
  password: "123456",
};

// login
export async function POST(request) {
  const { email, password } = await request.json();

  if (email === CREDENTIALS.email && password === CREDENTIALS.password) {
    const response = NextResponse.json({ success: true, message: "Login successful" });

    // Set secure cookie (valid for 7 days)
    response.cookies.set("cb_auth", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: "Invalid email or password" },
    { status: 401 }
  );
}

// DELETE /api/auth  → logout
export async function DELETE() {
  const response = NextResponse.json({ success: true, message: "Logged out" });

  // Clear the auth cookie
  response.cookies.set("cb_auth", "", {
    httpOnly: true,
    maxAge: 0,
    path: "/",
  });

  return response;
}