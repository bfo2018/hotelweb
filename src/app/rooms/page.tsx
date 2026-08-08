"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoomCard } from "@/components/ui/RoomCard";
import { Button } from "@/components/ui/Button";
import { useRooms } from "@/hooks/useRooms";
import {
  isStayValid,
  roomsPath,
  todayISO,
} from "@/lib/stay";
import { CalendarDays, Users } from "lucide-react";

function RoomsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialCheckIn = searchParams.get("checkIn") || "";
  const initialCheckOut = searchParams.get("checkOut") || "";
  const initialGuests = searchParams.get("guests") || "2";

  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(initialGuests);
  const [filterError, setFilterError] = useState<string | null>(null);

  useEffect(() => {
    setCheckIn(initialCheckIn);
    setCheckOut(initialCheckOut);
    setGuests(initialGuests);
  }, [initialCheckIn, initialCheckOut, initialGuests]);

  const stayActive = isStayValid(initialCheckIn, initialCheckOut);

  const {
    rooms,
    loading,
    error,
    fromApi,
  } = useRooms({
    available_only: 1,
    check_in_date: stayActive ? initialCheckIn : undefined,
    check_out_date: stayActive ? initialCheckOut : undefined,
    useFallback: !stayActive,
    enabled: true,
  });

  const stay = useMemo(
    () => ({
      checkIn: initialCheckIn || undefined,
      checkOut: initialCheckOut || undefined,
      guests: initialGuests || undefined,
    }),
    [initialCheckIn, initialCheckOut, initialGuests]
  );

  const visibleRooms = useMemo(() => {
    const guestCount = Number(initialGuests) || 1;
    if (!stayActive) return rooms;
    return rooms.filter(
      (room) => room.apiId != null && room.maxGuests >= guestCount
    );
  }, [rooms, stayActive, initialGuests]);

  const applyDates = () => {
    if (!checkIn || !checkOut) {
      setFilterError("Please select check-in and check-out dates.");
      return;
    }
    if (!isStayValid(checkIn, checkOut)) {
      setFilterError(
        checkIn < todayISO()
          ? "Check-in cannot be in the past."
          : "Check-out must be after check-in."
      );
      return;
    }
    setFilterError(null);
    router.push(roomsPath({ checkIn, checkOut, guests }));
  };

  const clearDates = () => {
    setCheckIn("");
    setCheckOut("");
    setGuests("2");
    setFilterError(null);
    router.push("/rooms");
  };

  return (
    <>
      <section className="relative h-[45vh] min-h-[360px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920&q=80"
            alt="Lumière & Stone Rooms"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/70 text-sm uppercase tracking-[0.3em] mb-3">
              Accommodation
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white font-medium">
              Rooms & Suites
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              {stayActive
                ? `Available for ${initialCheckIn} → ${initialCheckOut}`
                : "Choose your dates, then pick a room to continue booking"}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 px-4 border-b border-tertiary/15 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                <CalendarDays className="w-3.5 h-3.5" />
                Check In
              </label>
              <input
                type="date"
                value={checkIn}
                min={todayISO()}
                onChange={(e) => {
                  setCheckIn(e.target.value);
                  setFilterError(null);
                }}
                className="w-full bg-white border border-tertiary/20 rounded-sm px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                <CalendarDays className="w-3.5 h-3.5" />
                Check Out
              </label>
              <input
                type="date"
                value={checkOut}
                min={checkIn || todayISO()}
                onChange={(e) => {
                  setCheckOut(e.target.value);
                  setFilterError(null);
                }}
                className="w-full bg-white border border-tertiary/20 rounded-sm px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                <Users className="w-3.5 h-3.5" />
                Guests
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-white border border-tertiary/20 rounded-sm px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-primary appearance-none"
              >
                {[1, 2, 3, 4].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? "Guest" : "Guests"}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <Button onClick={applyDates} className="flex-1">
                Show available
              </Button>
              {stayActive && (
                <Button variant="outlined" onClick={clearDates}>
                  Clear
                </Button>
              )}
            </div>
          </div>
          {filterError && (
            <p className="mt-3 text-sm text-red-600">{filterError}</p>
          )}
          {stayActive && (
            <p className="mt-3 text-sm text-tertiary">
              Showing rooms free for your stay. Already-booked rooms are hidden.
              Select a room to continue.
            </p>
          )}
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title={stayActive ? "Available Rooms" : "Choose Your Sanctuary"}
            subtitle={
              stayActive
                ? "Pick a room below to enter guest details and confirm your booking."
                : "Select your dates above to see what’s available, or browse all rooms."
            }
          />

          {loading && (
            <p className="text-center text-tertiary mt-12">Loading rooms...</p>
          )}

          {error && !fromApi && !stayActive && (
            <p className="text-center text-sm text-tertiary mt-6">
              Showing showcase rooms while live inventory is unavailable.
            </p>
          )}

          {error && stayActive && !loading && (
            <p className="text-center text-sm text-red-600 mt-6">{error}</p>
          )}

          {!loading && visibleRooms.length === 0 && (
            <p className="text-center text-tertiary mt-12">
              {stayActive
                ? "No rooms available for these dates. Try different dates."
                : "No rooms available at the moment."}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {visibleRooms.map((room, index) => (
              <RoomCard
                key={room.id}
                room={room}
                index={index}
                stay={stay}
                bookingMode={stayActive}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function RoomsPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 px-4 min-h-[50vh] flex items-center justify-center">
          <p className="text-tertiary">Loading rooms...</p>
        </div>
      }
    >
      <RoomsPageContent />
    </Suspense>
  );
}
