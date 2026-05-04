import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

export async function GET(request) {
  try {
    const cookie = request.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/tasks`, {
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
      { message: "Помилка отримання завдань" },
      { status: 500 }
    );
  }
};

export async function POST(request) {
  try {
    const cookie = request.headers.get("cookie");
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/tasks`, {
      method: "POST",
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
      { message: "Помилка створення завдання" },
      { status: 500 }
    );
  }
};