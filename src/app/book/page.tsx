"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useRooms } from "@/hooks/useRooms";
import { useAuthStore, normalizeMobile } from "@/store/auth";
import { createBooking } from "@/lib/api/hotel";
import { DEFAULT_ROOM_IMAGE } from "@/lib/api/config";
import type { Booking, PaymentType } from "@/lib/api/types";
import { HotelApiError } from "@/lib/api/types";
import { isStayValid, roomsPath } from "@/lib/stay";
import {
  ArrowLeft,
  Check,
  CreditCard,
} from "lucide-react";

type Step = "details" | "confirm";

function BookPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const roomSlug = searchParams.get("room") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = searchParams.get("guests") || "2";

  const customer = useAuthStore((s) => s.customer);
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s.hydrated);

  const stayReady = isStayValid(checkIn, checkOut) && Boolean(roomSlug);

  const [step, setStep] = useState<Step>("details");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
    paymentType: "UPI" as PaymentType,
    advancePayment: "",
  });
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { rooms, loading: roomsLoading } = useRooms({
    available_only: 1,
    check_in_date: checkIn,
    check_out_date: checkOut,
    useFallback: false,
    enabled: stayReady,
  });

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.slug === roomSlug || r.id === roomSlug),
    [rooms, roomSlug]
  );

  // Incomplete stay → send user to Rooms & Suites to pick dates/room
  useEffect(() => {
    if (!stayReady) {
      router.replace(
        roomsPath({
          checkIn: checkIn || undefined,
          checkOut: checkOut || undefined,
          guests: guests || undefined,
        })
      );
    }
  }, [stayReady, checkIn, checkOut, guests, router]);

  // Room not available for dates → back to rooms list
  useEffect(() => {
    if (!stayReady || roomsLoading) return;
    if (!selectedRoom || selectedRoom.apiId == null) {
      router.replace(roomsPath({ checkIn, checkOut, guests }));
    }
  }, [
    stayReady,
    roomsLoading,
    selectedRoom,
    checkIn,
    checkOut,
    guests,
    router,
  ]);

  useEffect(() => {
    if (!hydrated || !customer) return;
    setForm((prev) => ({
      ...prev,
      name: prev.name || customer.full_name || "",
      email: prev.email || customer.email || "",
      phone: prev.phone || customer.mobile_number || "",
    }));
  }, [hydrated, customer]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleConfirm = async () => {
    setSubmitError(null);
    const roomId = selectedRoom?.apiId;
    if (!roomId) {
      setSubmitError("Selected room is no longer available. Please pick another.");
      return;
    }

    const mobile = normalizeMobile(form.phone);
    if (mobile.length !== 10) {
      setSubmitError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    try {
      const data = await createBooking(
        {
          room_id: roomId,
          check_in_date: checkIn,
          check_out_date: checkOut,
          guest_name: form.name.trim(),
          mobile_number: mobile,
          email: form.email.trim() || undefined,
          number_of_guests: Number(guests) || 1,
          payment_type: form.paymentType,
          advance_payment: form.advancePayment
            ? Number(form.advancePayment)
            : 0,
        },
        token
      );
      setConfirmedBooking(data.booking);
    } catch (err) {
      setSubmitError(
        err instanceof HotelApiError
          ? err.message
          : "Booking failed. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!stayReady || roomsLoading || !selectedRoom) {
    return (
      <section className="pt-32 pb-24 px-4 min-h-screen flex items-center justify-center">
        <p className="text-tertiary">Preparing your booking...</p>
      </section>
    );
  }

  if (confirmedBooking) {
    return (
      <section className="pt-32 pb-24 px-4 min-h-screen flex items-center">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium">
              Booking Confirmed!
            </h1>
            <p className="text-tertiary">
              Thank you, {confirmedBooking.guest_name}. Your reservation is
              confirmed.
            </p>
            <div className="bg-cream rounded-sm p-6 text-left space-y-3">
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Booking No:</span>{" "}
                {confirmedBooking.booking_number}
              </p>
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Room:</span>{" "}
                {confirmedBooking.room?.category_name || "Room"}{" "}
                {confirmedBooking.room?.room_number}
              </p>
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Check-in:</span>{" "}
                {confirmedBooking.check_in_date}
              </p>
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Check-out:</span>{" "}
                {confirmedBooking.check_out_date}
              </p>
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Total:</span> ₹
                {Number(confirmedBooking.final_amount).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/my-bookings">
                <Button>View My Bookings</Button>
              </Link>
              <Link href="/">
                <Button variant="outlined">Back to Home</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  const imageSrc =
    selectedRoom.thumbnail ||
    selectedRoom.images?.[0] ||
    DEFAULT_ROOM_IMAGE;

  return (
    <>
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href={roomsPath({ checkIn, checkOut, guests })}
            className="inline-flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Change room
          </Link>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium">
            Complete Your Booking
          </h1>
          <p className="mt-2 text-sm text-tertiary">
            Room and dates are set — just add guest details and confirm.
          </p>

          {/* Selected stay summary */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 border border-tertiary/20 rounded-sm overflow-hidden">
            <div className="relative w-full sm:w-44 h-36 sm:h-auto shrink-0 bg-cream">
              <Image
                src={imageSrc}
                alt={selectedRoom.name}
                fill
                className="object-cover"
                sizes="176px"
              />
            </div>
            <div className="p-4 flex-1 space-y-1">
              <p className="font-medium text-neutral text-lg">
                {selectedRoom.name}
              </p>
              <p className="text-sm text-tertiary">
                {checkIn} → {checkOut} · {guests}{" "}
                {guests === "1" ? "guest" : "guests"}
              </p>
              <p className="text-primary font-semibold pt-1">
                ₹{selectedRoom.price.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-tertiary ml-1">
                  per night
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-8">
            {[
              { key: "details", label: "Guest details" },
              { key: "confirm", label: "Confirm" },
            ].map((s, i) => {
              const active =
                step === s.key || (step === "confirm" && s.key === "details");
              const done = step === "confirm" && s.key === "details";
              return (
                <div key={s.key} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      active
                        ? "bg-primary text-white"
                        : "bg-cream text-tertiary border border-tertiary/30"
                    }`}
                  >
                    {done ? <Check className="w-4 h-4" /> : i + 1}
                  </div>
                  <span
                    className={`text-xs hidden sm:block ${
                      active ? "text-primary font-medium" : "text-tertiary"
                    }`}
                  >
                    {s.label}
                  </span>
                  {i === 0 && (
                    <div
                      className={`flex-1 h-px ${
                        step === "confirm" ? "bg-primary" : "bg-tertiary/20"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          {step === "details" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {token && customer ? (
                <p className="text-sm text-tertiary">
                  Signed in as{" "}
                  <span className="font-medium text-neutral">
                    {customer.full_name}
                  </span>
                  — details prefilled. You can edit if needed.
                </p>
              ) : (
                <p className="text-sm text-tertiary">
                  Optional:{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    sign in
                  </Link>{" "}
                  to prefill and save this booking to your account.
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="10-digit mobile number"
                  className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                  Special Requests (Optional)
                </label>
                <textarea
                  name="specialRequests"
                  value={form.specialRequests}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Early check-in, extra pillows..."
                  className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>
              <div className="flex justify-end pt-2">
                <Button
                  onClick={() => setStep("confirm")}
                  disabled={!form.name || !form.phone}
                >
                  Review & Confirm
                </Button>
              </div>
            </motion.div>
          )}

          {step === "confirm" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-cream rounded-sm p-6 space-y-3 text-sm">
                <h3 className="font-medium text-neutral text-base">
                  Booking Summary
                </h3>
                <div className="flex justify-between">
                  <span className="text-tertiary">Guest</span>
                  <span className="text-neutral">{form.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Phone</span>
                  <span className="text-neutral">{form.phone}</span>
                </div>
                {form.email && (
                  <div className="flex justify-between">
                    <span className="text-tertiary">Email</span>
                    <span className="text-neutral">{form.email}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-tertiary">Room</span>
                  <span className="text-neutral">{selectedRoom.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Stay</span>
                  <span className="text-neutral">
                    {checkIn} → {checkOut}
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-tertiary/20">
                  <span className="font-medium text-neutral">Per night</span>
                  <span className="font-semibold text-primary">
                    ₹{selectedRoom.price.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              <div className="border border-tertiary/20 rounded-sm p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  <h3 className="font-medium text-neutral">Payment</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                      Payment Type
                    </label>
                    <select
                      name="paymentType"
                      value={form.paymentType}
                      onChange={handleChange}
                      className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary appearance-none"
                    >
                      <option value="UPI">UPI</option>
                      <option value="CARD">Card</option>
                      <option value="CASH">Cash</option>
                      <option value="BANK_TRANSFER">Bank Transfer</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                      Advance (optional)
                    </label>
                    <input
                      type="number"
                      name="advancePayment"
                      min="0"
                      value={form.advancePayment}
                      onChange={handleChange}
                      placeholder="0"
                      className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>

              {submitError && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm px-4 py-3">
                  {submitError}
                </div>
              )}

              <div className="flex justify-between pt-2">
                <Button variant="outlined" onClick={() => setStep("details")}>
                  Back
                </Button>
                <Button
                  onClick={handleConfirm}
                  size="lg"
                  className="gap-2"
                  loading={submitting}
                >
                  Confirm Booking
                  <Check className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-32 pb-24 px-4 min-h-screen flex items-center justify-center">
          <p className="text-tertiary">Loading booking...</p>
        </div>
      }
    >
      <BookPageContent />
    </Suspense>
  );
}
