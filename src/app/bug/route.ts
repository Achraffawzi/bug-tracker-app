import { NextRequest, NextResponse } from "next/server";
import { createBug, getBugsWithPagination } from "@/services/bug";

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
    // Parse the query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10); // Default to page 1
    const pageSize = parseInt(searchParams.get("pageSize") || "10", 10); // Default to 10 items per page

    // Validate pagination parameters
    if (page <= 0 || pageSize <= 0) {
      return NextResponse.json(
        { message: "Page and pageSize must be positive integers." },
        { status: 400 }
      );
    }

    // Retrieve the cookie for organization ID
    const cookie = request.cookies.get("decoded-token-values");
    if (!cookie) {
      return NextResponse.json(
        { message: "Authentication cookie is missing." },
        { status: 401 }
      );
    }

    const organizationId = JSON.parse(cookie.value).userId;

    // Fetch paginated bugs
    const { bugs, total } = await getBugsWithPagination(
      organizationId,
      page,
      pageSize
    );

    return NextResponse.json(
      {
        result: bugs,
        pagination: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
