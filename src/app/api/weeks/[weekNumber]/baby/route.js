export async function GET(req, { params }) {
  try {
    const { weekNumber } = await params;

    const token = req.headers.get("authorization");

    const response = await fetch(
      `http://localhost:3001/api/weeks/${weekNumber}/baby`,
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
        message: "Не вдалося завантажити дані дитини",
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
