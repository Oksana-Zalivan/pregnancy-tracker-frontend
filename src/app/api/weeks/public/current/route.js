import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001/api";

export async function GET() {
  try {
    // Використовуємо fetch згідно з порадою ментора
    const response = await fetch(`${BACKEND_URL}/weeks/public/current`, {
      method: "GET",
      cache: "no-store", // Забороняємо кешування для отримання актуальних даних
    });

    const data = await response.json();

    // Повертаємо дані разом зі статусом відповіді бекенда
    return NextResponse.json(data, {
      status: response.status,
    });
    
  } catch (error) {
    // Помилка має бути інформативна для користувача, без консоль логів згідно ТЗ
    return NextResponse.json(
      { message: "Не вдалося отримати публічні дані тижня" },
      { status: 500 }
    );
  }
}