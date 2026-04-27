import { NextResponse } from "next/server";

const BACKEND_URL = "http://localhost:3000";

export async function GET(request, { params }) {
  try {
    const { weekNumber } = await params;

    const response = await fetch(`${BACKEND_URL}/api/diaries?week=${weekNumber}`, {
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}