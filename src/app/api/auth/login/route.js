export async function POST(req) {
  try {
    const body = await req.json();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    const res = new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const setCookie = response.headers.get("set-cookie");

    if (setCookie) {
      res.headers.set("set-cookie", setCookie);
    }

    return res;
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