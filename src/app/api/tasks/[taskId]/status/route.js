import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

export async function PATCH(request, { params }) {
  try {
    const { taskId } = params;
    const body = await request.json();
    const cookie = request.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/tasks/${taskId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(cookie && { cookie }),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Не вдалося оновити статус завдання" },
      { status: 500 }
    );
  }
}
