import { NextResponse } from 'next/server';
import axios from 'axios';

export const GET = async () => {
  try {
    // ТЗ: Публічний ендпоїнт для отримання даних дашборду гостя
    // Використовуємо BACKEND_URL 
    const { data } = await axios.get(`${process.env.BACKEND_URL}/api/weeks/public/current`);

    // Бекенд поверне: weekNumber, daysUntilBirth , babyInfo та momTip
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Помилка Route Handler:', error.message);

    const status = error.response?.status || 500;
    const message = error.response?.data?.message || 'Внутрішня помилка сервера на фронтенді';

    return NextResponse.json({ message }, { status });
  }
};