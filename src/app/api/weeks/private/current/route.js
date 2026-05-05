import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

export async function GET() {
  try {
    const cookieStore = request.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/weeks/private/current`, {
      headers: {
        ...(cookie && { cookie }),
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Не вдалося завантажити дані поточного тижня вагітності",
      },
      {
        status: 500,
      }
    );
  }
}
