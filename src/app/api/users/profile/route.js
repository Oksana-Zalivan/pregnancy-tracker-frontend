import { NextResponse } from "next/server";
import { updateUserProfile } from "@/lib/mock-user-store";

export async function PATCH(req) {
  try {
    const body = await req.json();
    const updatedProfile = updateUserProfile(body);

    return NextResponse.json({ data: updatedProfile });
  } catch {
    return NextResponse.json(
      {
        message: "Не вдалося оновити дані профілю.",
      },
      {
        status: 500,
      }
    );
  }
}
