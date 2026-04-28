import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { cookies } from "next/headers";
import { parse } from "cookie";
import { isAxiosError } from "axios";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    // Відправляємо дані авторизації на бекенд
    const response = await api.post("auth/login", body);
    // Отримуємо доступ до сховища cookies поточного запиту
    const cookieStore = await cookies();
    // зчитуємо заголовок set-cookie з відповіді бекенду
    const setCookie = response.headers["set-cookie"];

    // Якщо бекенд повернув cookies - парсимо і зберігаємо їх
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        const options = {
          expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
          path: parsed.Path,
          maxAge: Number(parsed["Max-Age"]),
        };
        if (parsed.accessToken)
          cookieStore.set("accessToken", parsed.accessToken, options);
        if (parsed.refreshToken)
          cookieStore.set("refreshToken", parsed.refreshToken, options);
      }
      // Повертаємо відповідь бекенду клієнту
      return NextResponse.json(response.data, { status: response.status });
    }
    // Бекенд не повернув cookies - авторизація не вдалась
    return NextResponse.json({ error: "Неавторизований" }, { status: 401 });
  } catch (error) {
    if (isAxiosError(error)) {
      // logErrorResponse(error.response?.data);
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
