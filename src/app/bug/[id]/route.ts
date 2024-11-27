import { updateBug } from "@/services/bug";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  /**
   * check if the request body is empty
   * check required fields
   * update bug
   * save bug to db
   * send response
   */

  try {
    // const body = await request.json();
    const { id } = await params;

    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    const { title, description, priority, status, labels, assignees, dueDate } =
      body;

    const cookie = request.cookies.get("decoded-token-values");
    const organizationId = JSON.parse(cookie?.value).userId!;
    console.log("here");

    // Dynamically build the update payload
    const updatePayload: Record<string, any> = {};

    if (title !== undefined) updatePayload.title = title;
    if (description !== undefined) updatePayload.description = description;
    if (priority !== undefined) updatePayload.priority = priority;
    if (status !== undefined) updatePayload.status = status;
    if (labels !== undefined) updatePayload.labels = labels;
    if (assignees !== undefined) updatePayload.assignees = assignees;
    if (dueDate !== undefined) updatePayload.dueDate = dueDate;
    updatePayload.organizationId = organizationId;

    const updatedBug = await updateBug(id, updatePayload);

    return NextResponse.json({ result: updatedBug }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ body: error.message }, { status: 500 });
  }
}