import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();

    const response = await fetch(
      `${process.env.API_URL}/api/weeks/private/current`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      },
    );

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
      },
    );
  }
}
