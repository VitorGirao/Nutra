const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

async function request(path) {
  const response = await fetch(`${API_BASE_URL}${path}`);
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await response.json() : null;

  if (!response.ok) {
    const message =
      body?.message || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.code = body?.code;
    error.details = body?.details;
    throw error;
  }

  return body;
}



export async function toggleSalvarPost(nutriId, postId) {
  const response = await fetch(`${API_BASE_URL}/nutricionistas/${nutriId}/favoritar`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId }),
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await response.json() : null;

  if (!response.ok) {
    const message = body?.message || `Request failed with status ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.code = body?.code;
    error.details = body?.details;
    throw error;
  }

  return body;
}

export async function getNutricionistaLogado(nutriId) {
  return request(`/nutricionistas/${nutriId}`);
}

export async function getPosts() {
  return request("/posts");
}

export async function getNutritionists() {
  return request("/nutricionistas");
}

export async function getFeaturedNutritionists(limit = 3) {
  return request(`/nutricionistas/featured?limit=${limit}`);
}

export async function getNutritionistById(id) {
  return request(`/nutricionistas/${id}`);
}
