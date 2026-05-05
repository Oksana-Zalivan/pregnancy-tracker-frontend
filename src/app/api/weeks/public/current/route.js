import { NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001/api";
export async function GET() {
  try {
  
    const response = await fetch(`${BACKEND_URL}/weeks/public/current`, {
      method: "GET",
      cache: "no-store", 
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
    
  } catch (error) {
    return NextResponse.json(
      { message: "Не вдалося отримати публічні дані тижня" },
      { status: 500 }
    );
  }
}