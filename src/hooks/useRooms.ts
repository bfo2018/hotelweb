"use client";

import { useEffect, useState } from "react";
import { fetchRooms } from "@/lib/api/hotel";
import { mapApiRooms } from "@/lib/api/map-room";
import type { RoomsQuery } from "@/lib/api/types";
import { HotelApiError } from "@/lib/api/types";
import { rooms as fallbackRooms, type Room } from "@/data/rooms";

type UseRoomsOptions = RoomsQuery & {
  /** When true and API fails, return static marketing rooms */
  useFallback?: boolean;
};

export function useRooms(options: UseRoomsOptions = {}) {
  const { useFallback = true, ...query } = options;
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromApi, setFromApi] = useState(false);

  const queryKey = JSON.stringify(query);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchRooms(query);
        if (cancelled) return;
        setRooms(mapApiRooms(data.rooms || []));
        setFromApi(true);
      } catch (err) {
        if (cancelled) return;
        const message =
          err instanceof HotelApiError
            ? err.message
            : "Failed to load rooms";
        setError(message);
        setFromApi(false);
        if (useFallback) {
          setRooms(fallbackRooms);
        } else {
          setRooms([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- queryKey serializes filters
  }, [queryKey, useFallback]);

  return { rooms, loading, error, fromApi, refetchKey: queryKey };
}
