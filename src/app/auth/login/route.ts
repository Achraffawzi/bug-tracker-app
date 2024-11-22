import { generateAccessToken, verifyPassword } from "@/lib/auth";
import { getUserByEmail } from "@/services/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  /**
   * check if body exists
   * check if email exist in db
   * check if password is correct
   * create a session
   * return response
   */
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response("Email and password are required", {
        status: 400,
      });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return new Response("Incorrect Email", { status: 404 });
    }

    if (!(await verifyPassword(password, user.password!))) {
      return new Response("Invalid password", { status: 401 });
    }

    (await cookies()).set(
      "access-token",
      generateAccessToken(user._id!.toString()),
      {
        secure: true,
        httpOnly: true,
        sameSite: "strict",
      }
    );

    return NextResponse.json({ loggedIn: true });
  } catch (e) {
    return NextResponse.json({ message: e.message }, { status: 500 });
  }
}
