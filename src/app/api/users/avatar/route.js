import { NextResponse } from "next/server";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";

export async function PATCH(req) {
  try {
    const formData = await req.formData();
    const cookie = req.headers.get("cookie");

    const response = await fetch(`${BACKEND_URL}/users/avatar`, {
    method: "PATCH",
    headers: {
      ...(cookie && { cookie }),
    },
    body: formData,
  });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      {
        message: "Не вдалося оновити фото профілю.",
      },
      {
        status: 500,
      }
    );
  }
}
