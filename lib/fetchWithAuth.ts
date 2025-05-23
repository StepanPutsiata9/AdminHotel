import { cookies } from "next/headers";
import { API_HOST } from "./constants";

export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const headers = new Headers(options.headers || {});
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  // Always send JSON by default
  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${API_HOST}${path}`, {
    ...options,
    headers,
    // credentials: "include", // not needed for server-side fetch
  });
}
