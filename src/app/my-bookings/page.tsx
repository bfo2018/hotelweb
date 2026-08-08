"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth";
import { fetchMyBookings } from "@/lib/api/hotel";
import type { Booking } from "@/lib/api/types";
import { HotelApiError } from "@/lib/api/types";
import { ArrowLeft, CalendarDays, LogIn } from "lucide-react";

export default function MyBookingsPage() {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const customer = useAuthStore((s) => s.customer);
  const hydrated = useAuthStore((s) => s.hydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!hydrated) return;

    if (!isAuthenticated() || !token) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchMyBookings(token!);
        if (!cancelled) setBookings(data.bookings || []);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof HotelApiError
              ? err.message
              : "Failed to load bookings"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [hydrated, token, isAuthenticated]);

  if (!hydrated) {
    return (
      <section className="pt-32 pb-24 px-4 min-h-screen flex items-center justify-center">
        <p className="text-tertiary">Loading...</p>
      </section>
    );
  }

  if (!isAuthenticated()) {
    return (
      <section className="pt-32 pb-24 px-4 min-h-screen">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <LogIn className="w-10 h-10 text-primary mx-auto" />
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl text-neutral font-medium">
            Sign in to view bookings
          </h1>
          <p className="text-tertiary text-sm">
            Your reservations are linked to your guest account.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/login">
              <Button>Sign In</Button>
            </Link>
            <Link href="/register">
              <Button variant="outlined">Create Account</Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium">
              My Bookings
            </h1>
            <p className="mt-2 text-sm text-tertiary">
              {customer?.full_name
                ? `Welcome, ${customer.full_name}`
                : "Your reservations"}
            </p>
          </div>
          <Button onClick={() => router.push("/rooms")} size="sm">
            Book a Room
          </Button>
        </div>

        {loading && (
          <p className="text-tertiary text-sm py-12 text-center">
            Loading your bookings...
          </p>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm px-4 py-3 mb-6">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <CalendarDays className="w-10 h-10 text-tertiary mx-auto" />
            <p className="text-tertiary">No bookings found yet.</p>
            <Link href="/rooms">
              <Button variant="outlined">Make your first booking</Button>
            </Link>
          </div>
        )}

        <div className="space-y-4">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="border border-tertiary/20 rounded-sm p-5 space-y-3"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-neutral">
                    {booking.room?.category_name || "Room"}{" "}
                    {booking.room?.room_number
                      ? `· ${booking.room.room_number}`
                      : ""}
                  </p>
                  <p className="text-xs text-tertiary mt-1">
                    {booking.booking_number}
                  </p>
                </div>
                <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-sm bg-primary/10 text-primary font-medium">
                  {booking.status}
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                <div>
                  <p className="text-xs text-tertiary uppercase tracking-wider">
                    Check-in
                  </p>
                  <p className="text-neutral mt-0.5">{booking.check_in_date}</p>
                </div>
                <div>
                  <p className="text-xs text-tertiary uppercase tracking-wider">
                    Check-out
                  </p>
                  <p className="text-neutral mt-0.5">{booking.check_out_date}</p>
                </div>
                <div>
                  <p className="text-xs text-tertiary uppercase tracking-wider">
                    Nights
                  </p>
                  <p className="text-neutral mt-0.5">{booking.total_nights}</p>
                </div>
                <div>
                  <p className="text-xs text-tertiary uppercase tracking-wider">
                    Total
                  </p>
                  <p className="text-primary font-semibold mt-0.5">
                    ₹{Number(booking.final_amount).toLocaleString("en-IN")}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
