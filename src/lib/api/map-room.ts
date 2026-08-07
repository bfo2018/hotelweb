import { Room } from "@/data/rooms";
import { DEFAULT_ROOM_IMAGE } from "./config";
import type { ApiRoom } from "./types";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Prefer API photos; fall back to primary_photo; then default Unsplash image */
export function resolveRoomImages(apiRoom: ApiRoom): string[] {
  const fromPhotos =
    apiRoom.photos
      ?.map((p) => p.url)
      .filter((url): url is string => Boolean(url?.trim())) ?? [];

  if (fromPhotos.length > 0) return fromPhotos;

  if (apiRoom.primary_photo?.trim()) {
    return [apiRoom.primary_photo.trim()];
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
    price: Number(apiRoom.rate_per_night) || Number(apiRoom.category?.base_rate) || 0,
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
