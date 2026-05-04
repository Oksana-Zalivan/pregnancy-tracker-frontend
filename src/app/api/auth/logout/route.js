import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

export async function POST(request) {
  try {
    const response = await fetch(`${BACKEND_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    return new NextResponse(null, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Проблема з мережею або сервером. Спробуйте пізніше.",
      },
      { status: 500 },
    );
  }
}
