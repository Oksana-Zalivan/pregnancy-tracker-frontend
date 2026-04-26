import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET() {
  try {
    // ТЗ: Публічний ендпоінт для отримання даних дашборду
    const { data } = await axios.get(`${process.env.BACKEND_URL}/api/weeks/public/current`);

    // Повертаємо дані: weekNumber, daysUntilBirth, baby, momTip
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Помилка Route Handler:', error.message);

    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Внутрішня помилка сервера на фронтенді';

    return NextResponse.json({ message }, { status });
  }
}