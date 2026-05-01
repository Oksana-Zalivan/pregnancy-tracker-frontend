export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(
<<<<<<< HEAD
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
=======
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
>>>>>>> origin/main
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
<<<<<<< HEAD
        body: JSON.stringify(body),
        credentials: "include",
=======
        credentials: "include",
        body: JSON.stringify(body),
>>>>>>> origin/main
      }
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch {
    return new Response(
      JSON.stringify({
        message: "Проблема з мережею або сервером. Спробуйте пізніше.",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
