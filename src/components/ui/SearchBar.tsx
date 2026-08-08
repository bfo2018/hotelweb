"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CalendarDays, Users, Search } from "lucide-react";
import { Button } from "./Button";
import { isStayValid, roomsPath, todayISO } from "@/lib/stay";

export function SearchBar() {
  const router = useRouter();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      setError("Please select check-in and check-out dates.");
      return;
    }
    if (!isStayValid(checkIn, checkOut)) {
      setError(
        checkIn < todayISO()
          ? "Check-in cannot be in the past."
          : "Check-out must be after check-in."
      );
      return;
    }
    setError(null);
    router.push(roomsPath({ checkIn, checkOut, guests }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white/95 backdrop-blur-md rounded-sm shadow-2xl p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                setError(null);
              }}
              className="w-full bg-cream border border-tertiary/20 rounded-sm px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-primary transition-colors"
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
                setError(null);
              }}
              className="w-full bg-cream border border-tertiary/20 rounded-sm px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-primary transition-colors"
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
              className="w-full bg-cream border border-tertiary/20 rounded-sm px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-primary transition-colors appearance-none"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button
              fullWidth
              size="md"
              className="gap-2"
              onClick={handleSearch}
            >
              <Search className="w-4 h-4" />
              Check Availability
            </Button>
          </div>
        </div>
        {error && (
          <p className="mt-3 text-sm text-red-600 text-center">{error}</p>
        )}
      </div>
    </motion.div>
  );
}
