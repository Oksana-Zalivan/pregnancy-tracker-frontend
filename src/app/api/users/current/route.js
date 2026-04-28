import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/mock-user-store";

export async function GET() {
  return NextResponse.json({ data: getCurrentUser() });
}
