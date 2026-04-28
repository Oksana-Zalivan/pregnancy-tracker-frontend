import { api } from "../../api";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();
    // Запит на значення токенів
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get("refreshToken")?.value;

    await api.post("auth/logout", null, {
      headers: {
        Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
      },
    });

    // Видаляє токени з памʼяті.
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return NextResponse.json(
      { message: "Вихід виконано успішно" },
      { status: 200 },
    );
  } catch (error) {
    if (isAxiosError(error)) {
      // Axios помилка: повертаємо статус і деталі від бекенду
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }
    // Невідома помилка: проблема з мережею
    return NextResponse.json(
      { error: "Проблема з мережею або сервером. Спробуйте пізніше." },
      { status: 500 },
    );
  }
}
