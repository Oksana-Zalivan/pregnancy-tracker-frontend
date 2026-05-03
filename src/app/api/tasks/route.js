import { NextResponse } from "next/server";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api",
});

const handleError = (error) => {
  return NextResponse.json(  
    {
      error: error.message,
      response: error.response?.data,
    },
    {
      status: error.response?.status || 500,
    }
  );
};

export async function GET() {
  try {
    const res = await api("/tasks");

    return NextResponse.json(res.data, {
      status: res.status ?? 200,
    });
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body || !body?.name || !body?.date) {
      return NextResponse.json(
        { error: "Дані невалідні або відсутні" },
        { status: 400 }
      );
    }

    const res = await api.post("/tasks", body);

    return NextResponse.json(res.data, {
      status: res.status ?? 201,
    });
  } catch (error) {
    return handleError(error);
  }
}
