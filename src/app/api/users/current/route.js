import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

export async function GET(request) {
  try {
    const cookie = request.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/users/current`, {
      method: "GET",
      headers: {
        ...(cookie && { cookie }),
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Помилка отримання користувача" },
      { status: 500 }
    );
  }
}
