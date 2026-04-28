export async function GET(req, { params }) {
  try {
    const { weekNumber } = await params;

    const token = req.headers.get("authorization");

    const response = await fetch(
      `${process.env.API_URL}/api/weeks/${weekNumber}/mom-body`,
      {
        headers: {
          ...(token && { Authorization: token }),
        },
      },
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
        message: "Не вдалося завантажити дані мами",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
