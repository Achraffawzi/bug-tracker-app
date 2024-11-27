import { NextRequest, NextResponse } from "next/server";
import { createBug, getBugs } from "@/services/bug";

export async function POST(request: NextRequest) {
  /**
   * check if the request body is empty
   * check required fields
   * create bug
   * save bug to db
   * send response
   */

  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json(
        { body: "Request body is empty" },
        { status: 400 }
      );
    }

    const { title, description, priority, labels, assignees, dueDate } = body;

    if (!title || !description || !priority) {
      return NextResponse.json(
        { body: "Title, description and Priority are required" },
        { status: 400 }
      );
    }

    const cookie = request.cookies.get("decoded-token-values");
    const organizationId = JSON.parse(cookie?.value).userId!;

    await createBug({
      title,
      description,
      priority,
      labels: labels || [],
      organizationId,
      assignees: assignees || [],
      dueDate: dueDate || null,
    });

    return NextResponse.json(
      { result: "bug created successfully" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ body: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookie = request.cookies.get("decoded-token-values");
    const organizationId = JSON.parse(cookie?.value).userId!;

    const bugs = await getBugs(organizationId);

    return NextResponse.json({ result: bugs }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ body: error.message }, { status: 500 });
  }
}
