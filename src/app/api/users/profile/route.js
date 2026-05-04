import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userProfile = {
      name: "Ганна",
      email: "hanna@gmail.com",
      avatar: "/icons/profile.svg",
    };

    return NextResponse.json(userProfile, { status: 200 });
  } catch {
    return NextResponse.json(
      { message: "Не вдалося завантажити профіль" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Дані отримано:", body);

    return NextResponse.json({ message: "Профіль оновлено" }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Помилка оновлення" }, { status: 400 });
  }
}
