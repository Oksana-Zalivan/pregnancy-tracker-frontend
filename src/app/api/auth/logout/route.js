export async function POST() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`,
      {
        method: "POST",
        credentials: "include",
      }
    );

    return new Response(null, {
      status: response.status,
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
