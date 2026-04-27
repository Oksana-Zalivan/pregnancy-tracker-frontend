import { NextResponse } from "next/server";

let diaries = [];

// GET
export async function GET() {
  const sorted = diaries.sort((a, b) => new Date(b.date) - new Date(a.date));
  return NextResponse.json(sorted);
}

// POST
export async function POST(request) {
  const body = await request.json();

  const newDiary = {
    _id: Date.now().toString(),
    title: body.title,
    description: body.description,
    date: body.date,
    emotions: body.emotions || [],
    userId: "1",
  };

  diaries.push(newDiary);

  return NextResponse.json(newDiary, { status: 201 });
}