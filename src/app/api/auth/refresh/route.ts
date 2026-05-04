import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get('cookie') ?? '';

  try {
    const backendRes = await axios.post(
      `${BACKEND_URL}/auth/refresh`,
      {},
      {
        headers: {
          Cookie: cookieHeader,
        },
        validateStatus: () => true,
      }
    );

    if (backendRes.status !== 200) {
      return NextResponse.json({ error: 'Помилка оновлення токену' }, { status: 401 });
    }

    const response = NextResponse.json({
      access_token: backendRes.data.access_token,
    });

    const setCookie = backendRes.headers['set-cookie'];
    if (setCookie) {
      response.headers.set('set-cookie', setCookie.join(', '));
    }

    return response;

  } catch (err) {
    console.error('Виникла помилка:', err);
    return NextResponse.json({ error: 'Проблема з мережею або сервером. Спробуйте пізніше' }, { status: 500 });
  }
}