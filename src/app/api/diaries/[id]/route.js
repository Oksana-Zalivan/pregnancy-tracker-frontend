import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const cookie = request.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/diaries/${id}`, {
      method: "PATCH",
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
      { message: "Не вдалося оновити запис щоденника" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const cookie = request.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/diaries/${id}`, {
      method: "DELETE",
      headers: {
        ...(cookie && { cookie }),
      },
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { message: "Не вдалося видалити запис щоденника" },
      { status: 500 }
    );
  }
}
