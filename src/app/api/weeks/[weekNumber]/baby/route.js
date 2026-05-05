import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

export async function GET(req, { params }) {
  try {
    const { weekNumber } = await params;
    const cookie = req.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/weeks/${weekNumber}/baby`, {
      headers: {
        ...(cookie && { cookie }),
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      {
        message: "Не вдалося завантажити дані дитини",
      },
      {
        status: 500,
      }
    );
  }
}
