"use client";

import { useState, Suspense, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { useRooms } from "@/hooks/useRooms";
import { useAuthStore, normalizeMobile } from "@/store/auth";
import { createBooking } from "@/lib/api/hotel";
import type { Booking, PaymentType } from "@/lib/api/types";
import { HotelApiError } from "@/lib/api/types";
import {
  CalendarDays,
  Users,
  Check,
  ArrowLeft,
  ArrowRight,
  CreditCard,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4;

function BookPageContent() {
  const searchParams = useSearchParams();
  const preselectedRoom = searchParams.get("room") || "";
  const preCheckIn = searchParams.get("checkIn") || "";
  const preCheckOut = searchParams.get("checkOut") || "";
  const preGuests = searchParams.get("guests") || "2";

  const customer = useAuthStore((s) => s.customer);
  const token = useAuthStore((s) => s.token);
  const hydrated = useAuthStore((s) => s.hydrated);

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    checkIn: preCheckIn,
    checkOut: preCheckOut,
    guests: preGuests,
    room: preselectedRoom,
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

  const roomQuery = useMemo(
    () => ({
      available_only: 1 as const,
      check_in_date: form.checkIn || undefined,
      check_out_date: form.checkOut || undefined,
    }),
    [form.checkIn, form.checkOut]
  );

  const { rooms, loading: roomsLoading } = useRooms(roomQuery);

  useEffect(() => {
    if (!hydrated || !customer) return;
    setForm((prev) => ({
      ...prev,
      name: prev.name || customer.full_name || "",
      email: prev.email || customer.email || "",
      phone: prev.phone || customer.mobile_number || "",
    }));
  }, [hydrated, customer]);

  const selectedRoom = rooms.find(
    (r) => r.slug === form.room || r.id === form.room
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4) as Step);
  const prevStep = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const handleConfirm = async () => {
    setSubmitError(null);

    const roomId = selectedRoom?.apiId ?? Number(selectedRoom?.id);
    if (!selectedRoom || !Number.isFinite(roomId) || roomId <= 0) {
      setSubmitError(
        "This room cannot be booked online yet. Please choose a live inventory room."
      );
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
          check_in_date: form.checkIn,
          check_out_date: form.checkOut,
          guest_name: form.name.trim(),
          mobile_number: mobile,
          email: form.email.trim() || undefined,
          number_of_guests: Number(form.guests) || 1,
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
              Thank you, {confirmedBooking.guest_name}. Your reservation at
              Lumière & Stone is confirmed.
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
                <span className="font-medium text-neutral">Guests:</span>{" "}
                {confirmedBooking.number_of_guests}
              </p>
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Total:</span> ₹
                {Number(confirmedBooking.final_amount).toLocaleString("en-IN")}
              </p>
            </div>
            {confirmedBooking.email && (
              <p className="text-sm text-tertiary">
                Confirmation details for{" "}
                <span className="font-medium">{confirmedBooking.email}</span>
              </p>
            )}
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

  return (
    <>
      <section className="pt-32 pb-8 px-4">
        <div className="max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium">
            Book Your Stay
          </h1>

          <div className="flex items-center gap-2 mt-6">
            {[
              { num: 1, label: "Dates" },
              { num: 2, label: "Room" },
              { num: 3, label: "Details" },
              { num: 4, label: "Confirm" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= s.num
                      ? "bg-primary text-white"
                      : "bg-cream text-tertiary border border-tertiary/30"
                  }`}
                >
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`text-xs hidden sm:block ${
                    step >= s.num ? "text-primary font-medium" : "text-tertiary"
                  }`}
                >
                  {s.label}
                </span>
                {i < 3 && (
                  <div
                    className={`flex-1 h-px ${
                      step > s.num ? "bg-primary" : "bg-tertiary/20"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral">
                  When are you visiting?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                      <CalendarDays className="w-3.5 h-3.5" />
                      Check In
                    </label>
                    <input
                      type="date"
                      name="checkIn"
                      value={form.checkIn}
                      onChange={handleChange}
                      required
                      className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                      <CalendarDays className="w-3.5 h-3.5" />
                      Check Out
                    </label>
                    <input
                      type="date"
                      name="checkOut"
                      value={form.checkOut}
                      onChange={handleChange}
                      required
                      className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                    <Users className="w-3.5 h-3.5" />
                    Number of Guests
                  </label>
                  <select
                    name="guests"
                    value={form.guests}
                    onChange={handleChange}
                    className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    {[1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={nextStep}
                    disabled={!form.checkIn || !form.checkOut}
                    className="gap-2"
                  >
                    Next: Select Room
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral">
                  Choose your room
                </h2>
                {roomsLoading && (
                  <p className="text-sm text-tertiary">
                    Checking availability...
                  </p>
                )}
                {!roomsLoading && rooms.length === 0 && (
                  <p className="text-sm text-tertiary">
                    No rooms available for these dates. Try different dates.
                  </p>
                )}
                <div className="space-y-3">
                  {rooms.map((room) => (
                    <button
                      key={room.id}
                      type="button"
                      onClick={() =>
                        setForm((p) => ({ ...p, room: room.slug }))
                      }
                      className={`w-full text-left p-4 rounded-sm border transition-all ${
                        form.room === room.slug
                          ? "border-primary bg-primary/5"
                          : "border-tertiary/20 hover:border-tertiary/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-neutral">{room.name}</p>
                          <p className="text-xs text-tertiary mt-0.5">
                            {room.categoryName || room.bedType}
                            {room.maxGuests
                              ? ` · Up to ${room.maxGuests} guests`
                              : ""}
                            {!room.apiId ? " · Showcase only" : ""}
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-semibold text-primary">
                            ₹{room.price.toLocaleString("en-IN")}
                          </p>
                          <p className="text-xs text-tertiary">per night</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outlined" onClick={prevStep}>
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!form.room}
                    className="gap-2"
                  >
                    Next: Your Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral">
                  Guest Details
                </h2>
                {!token && (
                  <p className="text-sm text-tertiary">
                    Optional:{" "}
                    <Link href="/login" className="text-primary hover:underline">
                      sign in
                    </Link>{" "}
                    to link this booking to your account.
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
                    placeholder="Early check-in, extra pillows, dietary needs..."
                    className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors resize-none"
                  />
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outlined" onClick={prevStep}>
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    disabled={!form.name || !form.phone}
                    className="gap-2"
                  >
                    Next: Confirm
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral">
                  Review & Confirm
                </h2>

                <div className="bg-cream rounded-sm p-6 space-y-4">
                  <h3 className="font-medium text-neutral">Booking Summary</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-tertiary">Room</span>
                      <span className="font-medium text-neutral">
                        {selectedRoom?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-tertiary">Check-in</span>
                      <span className="text-neutral">{form.checkIn}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-tertiary">Check-out</span>
                      <span className="text-neutral">{form.checkOut}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-tertiary">Guests</span>
                      <span className="text-neutral">{form.guests}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-tertiary/20">
                      <span className="font-medium text-neutral">
                        Rate per night
                      </span>
                      <span className="font-semibold text-primary">
                        ₹{selectedRoom?.price.toLocaleString("en-IN")}
                      </span>
                    </div>
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
                  <p className="text-sm text-tertiary">
                    Your booking will be created as confirmed. Online payment
                    gateway can be added later.
                  </p>
                </div>

                {submitError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm px-4 py-3">
                    {submitError}
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <Button variant="outlined" onClick={prevStep}>
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
          </AnimatePresence>
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
