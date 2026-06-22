import { API_BASE_URL } from "../api/index.js";

export async function publicarPost(dadosPost) {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dadosPost),
  });

  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await response.json() : null;

  if (!response.ok) {
    const error = new Error(body?.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.code = body?.code;
    throw error;
  }

  return body;
}
