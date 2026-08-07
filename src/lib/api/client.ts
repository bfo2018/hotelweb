import { HOTEL_API_BASE_URL } from "./config";
import {
  ApiErrorBody,
  ApiResponse,
  HotelApiError,
} from "./types";

type RequestOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  token?: string | null;
  query?: Record<string, string | number | boolean | undefined | null>;
};

function buildUrl(
  path: string,
  query?: RequestOptions["query"]
): string {
  const base = `${HOTEL_API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  if (!query) return base;

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null || value === "") continue;
    params.set(key, String(value));
  }
  const qs = params.toString();
  return qs ? `${base}?${qs}` : base;
}

export async function hotelFetch<T>(
  path: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = "GET", body, token, query } = options;
  const url = buildUrl(path, query);

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response: Response;
  try {
    response = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
  } catch {
    throw new HotelApiError(
      "Unable to reach the hotel booking service. Please check your connection.",
      0
    );
  }

  let json: ApiResponse<T> | null = null;
  try {
    json = (await response.json()) as ApiResponse<T>;
  } catch {
    throw new HotelApiError(
      "Unexpected response from the hotel booking service.",
      response.status
    );
  }

  if (!response.ok || json.status === "error") {
    const err = json as ApiErrorBody;
    throw new HotelApiError(
      err?.message || `Request failed (${response.status})`,
      response.status,
      err?.details
    );
  }

  return (json.data ?? ({} as T)) as T;
}
