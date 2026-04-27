import { NextResponse } from "next/server";

let diaries = [
  { id: 1, text: "First record", week: 1 },
  { id: 2, text: "Second record", week: 1 },
];

// GET
export async function GET() {
  return NextResponse.json(diaries);
}

// POST
export async function POST(request) {
  const body = await request.json();

  const newDiary = {
    id: Date.now(),
    ...body,
  };

  diaries.push(newDiary);

  return NextResponse.json(newDiary, { status: 201 });
}