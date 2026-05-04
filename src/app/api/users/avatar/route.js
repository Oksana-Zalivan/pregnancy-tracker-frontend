import { NextResponse } from "next/server";
import { updateUserAvatar } from "@/lib/mock-user-store";

export async function PATCH(req) {
  try {
    const formData = await req.formData();
    const avatar = formData.get("avatar");

    if (!(avatar instanceof File)) {
      return NextResponse.json(
        {
          message: "Оберіть файл зображення.",
        },
        {
          status: 400,
        }
      );
    }

    const updatedProfile = await updateUserAvatar(avatar);

    return NextResponse.json({ data: updatedProfile });
  } catch {
    return NextResponse.json(
      {
        message: "Не вдалося оновити фото профілю.",
      },
      {
        status: 500,
      }
    );
  }
}
