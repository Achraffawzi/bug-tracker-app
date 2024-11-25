import {
  addOrganizationToUser,
  addUserToOrganization,
  getUserById,
} from "@/services/user";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  /**
   * check request body
   * check if user to be invited is not a member already
   * send response
   */

  try {
    const { userId } = await request.json();
    const cookie = request.cookies.get("decoded-token-values");
    // log the value of the cookie
    const organizationId = JSON.parse(cookie?.value).userId!;
    const isOrganization = JSON.parse(cookie?.value).isOrganization!;

    console.log(organizationId);
    console.log(isOrganization);

    if (!userId) {
      return NextResponse.json(
        "Please provide a user to be added to your organization",
        { status: 400 }
      );
    }

    if (!organizationId) {
      return NextResponse.json("Organization not found", { status: 404 });
    }

    if (!isOrganization) {
      return NextResponse.json("Unauthorized", { status: 401 });
    }

    const user = await getUserById(userId);

    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    // add user to org members array field
    await addUserToOrganization(organizationId, userId);
    await addOrganizationToUser(organizationId, userId);

    return NextResponse.json("User added to organization", { status: 200 });
  } catch (error) {
    return NextResponse.json(error.message, { status: 500 });
  }
}
