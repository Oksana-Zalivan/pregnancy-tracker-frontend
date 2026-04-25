import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export async function GET(request, { params }) {
  try {
    const { weekNumber } = params;

    const response = await fetch(`${BACKEND_URL}/api/diaries?week=${weekNumber}`, {
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}