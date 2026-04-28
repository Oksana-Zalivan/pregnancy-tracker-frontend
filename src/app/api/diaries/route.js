import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export async function GET(request) {
  try {
    const authorization = request.headers.get("authorization");

    const response = await fetch(`${BACKEND_URL}/api/diaries`, {
      method: "GET",
      headers: {
        ...(authorization && { authorization }),
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}