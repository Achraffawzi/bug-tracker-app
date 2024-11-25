import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decodeJwt, verifyAccessToken, verifyToken } from "./lib/auth";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  /**
   * check if body exist
   * check if cookie exist
   * verify token
   * decode token
   * extract organizationId from token
   * send response
   */

  const token = request.cookies.get("access-token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const decodedToken = await verifyToken(token, process.env.JWT_SECRET_KEY!);

  if (!decodedToken.isOrganization) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const response = NextResponse.next();

  (await cookies()).set("decoded-token-values", JSON.stringify(decodedToken));

  // response.cookies.set("decoded-token-values", { ...decodedToken });

  return response;

  // const headers = new Headers(request.headers);
  // const accessToken = request.cookies.get("access-token")?.value;
  // const decodedToken = await verifyToken(
  //   accessToken!,
  //   process.env.JWT_SECRET_KEY || "kjlKJKSJQLD89QSDKJ"
  // );
  // console.log("deecodeed: " + decodedToken);
  // const response = NextResponse.next();
  // if (decodedToken) {
  //   headers.set("decoded-token", decodeJwt(decodedToken)!);
  // }
  // return response;
  // return NextResponse.next(decodedToken);
  // return NextResponse.json({ end: true });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/organization/invite", "/bug"],
};
