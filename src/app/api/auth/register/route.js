import { NextResponse } from 'next/server';

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001/api';

export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });

    const data = await response.json();

    const nextResponse = NextResponse.json(data, {
      status: response.status,
    });

    const setCookie = response.headers.get('set-cookie');

    if (setCookie) {
      nextResponse.headers.set('set-cookie', setCookie);
    }

    return nextResponse;
  } catch {
    return NextResponse.json(
      {
        message: 'Проблема з мережею або сервером. Спробуйте пізніше.',
      },
      { status: 500 },
    );
  }
}
