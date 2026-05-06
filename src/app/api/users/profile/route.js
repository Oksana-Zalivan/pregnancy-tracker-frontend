import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

export async function PATCH(req) {
  try {
    const body = await req.json();
    const cookie = req.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/users/profile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(cookie && { cookie }),
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Не вдалося оновити дані профілю.",
      },
      { status: 500 },
    );
  }
} 
