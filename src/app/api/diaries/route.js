<<<<<<< HEAD
import { NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

export async function GET(request) {
  try {
    const authorization = request.headers.get("authorization");

    const response = await fetch(`${BACKEND_URL}/api/diaries`, {
      method: "GET",
      headers: {
        ...(authorization && { authorization }),
      },
      cache: "no-store",
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const authorization = request.headers.get("authorization");
    const body = await request.json();

    const response = await fetch(`${BACKEND_URL}/api/diaries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authorization && { authorization }),
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
=======
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const authorization = request.headers.get("authorization");

  const response = await fetch(`${BACKEND_URL}/api/diaries/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(authorization && { authorization }),
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const authorization = request.headers.get("authorization");

  const response = await fetch(`${BACKEND_URL}/api/diaries/${id}`, {
    method: "DELETE",
    headers: {
      ...(authorization && { authorization }),
    },
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
>>>>>>> 65cc8a8 (feat: add ConfirmationModal and connect to DiaryEntryDetails)
}