import { Room } from "@/data/rooms";
import { DEFAULT_ROOM_IMAGE, HOTEL_API_BASE_URL } from "./config";
import type { ApiRoom, RoomPhoto } from "./types";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Origin used to resolve relative photo paths from the Hotel API */
function mediaOrigin(): string {
  try {
    const stripped = HOTEL_API_BASE_URL.replace(/\/(?:hotel-api|api\/hotel)\/?$/i, "");
    return new URL(stripped || HOTEL_API_BASE_URL).origin;
  } catch {
    return "";
  }
}

function mediaBasePath(): string {
  try {
    const stripped = HOTEL_API_BASE_URL.replace(/\/(?:hotel-api|api\/hotel)\/?$/i, "");
    return stripped.replace(/\/$/, "");
  } catch {
    return "";
  }
}

/** Turn relative API image paths into absolute URLs browsers / next/image can load */
export function absoluteMediaUrl(url: string): string {
  const trimmed = url.trim();
  if (!trimmed) return "";
  if (/^(https?:\/\/|data:)/i.test(trimmed)) return trimmed;

  if (trimmed.startsWith("//")) {
    return `http:${trimmed}`;
  }

  if (trimmed.startsWith("/")) {
    const origin = mediaOrigin();
    return origin ? `${origin}${trimmed}` : trimmed;
  }

  const base = mediaBasePath();
  return base ? `${base}/${trimmed}` : trimmed;
}

function extractPhotoUrl(photo: RoomPhoto | Record<string, unknown>): string {
  const raw =
    (photo as RoomPhoto).url ||
    (photo as { photo_url?: string }).photo_url ||
    (photo as { image_url?: string }).image_url ||
    (photo as { path?: string }).path ||
    "";
  return absoluteMediaUrl(String(raw || ""));
}

function isPrimaryPhoto(photo: RoomPhoto | Record<string, unknown>): boolean {
  const flag = (photo as RoomPhoto).is_primary as unknown;
  return flag === 1 || flag === true || flag === "1";
}

/**
 * Prefer API photos (primary first); then primary_photo; then default image.
 * Handles absolute and relative URLs.
 */
export function resolveRoomImages(apiRoom: ApiRoom): string[] {
  const photos = Array.isArray(apiRoom.photos) ? [...apiRoom.photos] : [];

  photos.sort((a, b) => {
    const ap = isPrimaryPhoto(a) ? 0 : 1;
    const bp = isPrimaryPhoto(b) ? 0 : 1;
    return ap - bp;
  });

  const fromPhotos = photos
    .map(extractPhotoUrl)
    .filter((url): url is string => Boolean(url));

  // Deduplicate while preserving order
  const unique = [...new Set(fromPhotos)];
  if (unique.length > 0) return unique;

  if (apiRoom.primary_photo?.trim()) {
    const primary = absoluteMediaUrl(apiRoom.primary_photo);
    if (primary) return [primary];
  }

  return [DEFAULT_ROOM_IMAGE];
}

export function mapApiRoomToRoom(apiRoom: ApiRoom): Room {
  const categoryName = apiRoom.category?.name?.trim() || "Room";
  const roomLabel = `${categoryName} ${apiRoom.room_number}`.trim();
  const images = resolveRoomImages(apiRoom);
  const amenitiesRaw = apiRoom.category?.amenities || "";
  const amenities = amenitiesRaw
    .split(/[,|]/)
    .map((a) => a.trim())
    .filter(Boolean);

  return {
    id: String(apiRoom.id),
    apiId: apiRoom.id,
    slug: `room-${apiRoom.id}-${slugify(apiRoom.room_number || categoryName)}`,
    name: roomLabel,
    tagline: apiRoom.category?.description?.trim() || "Comfortable stay",
    description:
      apiRoom.description?.trim() ||
      apiRoom.category?.description?.trim() ||
      `${roomLabel} available for booking.`,
    price:
      Number(apiRoom.rate_per_night) ||
      Number(apiRoom.category?.base_rate) ||
      0,
    currency: "INR",
    size: apiRoom.floor_number ?? 0,
    sizeUnit: apiRoom.floor_number != null ? "Floor" : "",
    maxGuests: apiRoom.category?.max_occupancy || 2,
    bedType: categoryName,
    view: apiRoom.status === "AVAILABLE" ? "Available" : apiRoom.status,
    images,
    thumbnail: images[0] || DEFAULT_ROOM_IMAGE,
    amenities: amenities.length ? amenities : ["WiFi", "AC", "TV"],
    features: [
      `Room ${apiRoom.room_number}`,
      categoryName,
      ...(apiRoom.floor_number != null ? [`Floor ${apiRoom.floor_number}`] : []),
    ],
    available: apiRoom.status === "AVAILABLE",
    roomNumber: apiRoom.room_number,
    categoryName,
  };
}

export function mapApiRooms(apiRooms: ApiRoom[]): Room[] {
  return apiRooms.map(mapApiRoomToRoom);
}
