
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

export async function PATCH(request, { params }) {
  try {
    const { taskId } = params;
    const body = await request.json();
    const authorization = request.headers.get("authorization");

    const response = await fetch(
      "${BACKEND_URL}/api/tasks/${taskId}/status",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(authorization ? { Authorization: authorization } : {}),
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { message: "Не вдалося оновити статус задачі" },
      { status: 500 }
    );
  }
}

