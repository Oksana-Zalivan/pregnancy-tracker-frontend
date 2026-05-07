import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

export async function GET(req, { params }) {
  try {
    // ВАЖЛИВО: У Next.js 15 params треба чекати через await
    const resolvedParams = await params;
    const weekNumber = resolvedParams.weekNumber;
    
    const cookie = req.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/weeks/${weekNumber}/mom-body`, {
      headers: {
        ...(cookie && { cookie }),
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Не вдалося завантажити дані мами" },
      { status: 500 }
    );
  }
}