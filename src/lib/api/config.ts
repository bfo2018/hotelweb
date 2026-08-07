/**
 * Hotel API configuration.
 * Set NEXT_PUBLIC_HOTEL_API_URL and NEXT_PUBLIC_RESTAURANT_ID in .env.local
 */
export const HOTEL_API_BASE_URL =
  process.env.NEXT_PUBLIC_HOTEL_API_URL?.replace(/\/$/, "") ||
  "http://localhost/restaurant4_for_client/hotel-api";

export const RESTAURANT_ID = Number(
  process.env.NEXT_PUBLIC_RESTAURANT_ID || "1"
);

/** Fallback when API rooms have no photos yet */
export const DEFAULT_ROOM_IMAGE =
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80";
