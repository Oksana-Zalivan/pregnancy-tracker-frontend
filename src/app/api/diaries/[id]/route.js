const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function PATCH(request, { params }) {
  const { id } = await params;
  const body = await request.json();
  const authorization = request.headers.get("authorization");

  const response = await fetch(`${BACKEND_URL}/api/diaries/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      ...(authorization && { authorization }),
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  const authorization = request.headers.get("authorization");

  const response = await fetch(`${BACKEND_URL}/api/diaries/${id}`, {
    method: "DELETE",
    headers: {
      ...(authorization && { authorization }),
    },
  });

  const data = await response.json();
  return Response.json(data, { status: response.status });
}