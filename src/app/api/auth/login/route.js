import { NextResponse } from 'next/server';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api';

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(`${BACKEND_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(body),
    });

    const data = await response.json();

    const res = NextResponse(JSON.stringify(data), {
      status: response.status,
    });

    const setCookie = response.headers.get('set-cookie');

    if (setCookie) {
      res.headers.set('set-cookie', setCookie);
    }

    return res;
  } catch {
    return NextResponse.json(
      {
        message: 'Проблема з мережею або сервером. Спробуйте пізніше.',
      },
      { status: 500 },
    );
  }
}
