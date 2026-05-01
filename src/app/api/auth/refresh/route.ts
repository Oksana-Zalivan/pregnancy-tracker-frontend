// app/api/auth/refresh/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL!;

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get('refreshToken')?.value;
  const sessionId = req.cookies.get('sessionId')?.value;

  console.log('Cookies:', { refreshToken, sessionId });

  if (!refreshToken || !sessionId) {
    return NextResponse.json(
      { message: 'Сесію не знайдено' },
      { status: 401 }
    );
  }

  const cookieHeader = ` refreshToken=${refreshToken}; sessionId=${sessionId}`;

  try {
    const backendRes = await axios.post(
      `${BACKEND_URL}/api/auth/refresh`,
      {},
      {
        headers: {
          Cookie: cookieHeader,
        },
        validateStatus: () => true,
      }
    );

    console.log('Бекенд статус:', backendRes.status);
    console.log('Бекенд відповідь:', backendRes.data);

    if (backendRes.status !== 200) {
      return NextResponse.json(
        { message: backendRes.data?.message ?? 'Не вдалося оновити сесію' },
        { status: backendRes.status }
      );
    }

    const response = NextResponse.json({ message: 'ok' });

    const setCookie = backendRes.headers['set-cookie'];
    if (setCookie) {
      setCookie.forEach((cookie) => {
        response.headers.append('set-cookie', cookie);
      });
    }

    return response;

  } catch (err) {
    console.error('BFF помилка рефрешу:', err);
    return NextResponse.json(
      { message: 'Внутрішня помилка сервера' },
      { status: 500 }
    );
  }
}