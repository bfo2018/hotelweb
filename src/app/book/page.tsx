"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { rooms } from "@/data/rooms";
import {
  CalendarDays,
  Users,
  Check,
  ArrowLeft,
  ArrowRight,
  CreditCard,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function BookPage() {
  const searchParams = useSearchParams();
  const preselectedRoom = searchParams.get("room") || "";

  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState({
    checkIn: "",
    checkOut: "",
    guests: "2",
    room: preselectedRoom,
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [isConfirmed, setIsConfirmed] = useState(false);

  const selectedRoom = rooms.find((r) => r.slug === form.room);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const nextStep = () => setStep((s) => Math.min(s + 1, 4) as Step);
  const prevStep = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  if (isConfirmed) {
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
              Thank you, {form.name}. Your reservation at Lumière & Stone has
              been confirmed.
            </p>
            <div className="bg-cream rounded-sm p-6 text-left space-y-3">
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Room:</span>{" "}
                {selectedRoom?.name}
              </p>
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Check-in:</span>{" "}
                {form.checkIn}
              </p>
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Check-out:</span>{" "}
                {form.checkOut}
              </p>
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Guests:</span>{" "}
                {form.guests}
              </p>
            </div>
            <p className="text-sm text-tertiary">
              A confirmation email has been sent to{" "}
              <span className="font-medium">{form.email}</span>
            </p>
            <Link href="/">
              <Button variant="outlined" className="mt-4">
                Back to Home
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Header */}
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

          {/* Progress Steps */}
          <div className="flex items-center gap-2 mt-6">
            {[
              { num: 1, label: "Dates" },
              { num: 2, label: "Room" },
              { num: 3, label: "Details" },
              { num: 4, label: "Payment" },
            ].map((s, i) => (
              <div key={s.num} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step >= s.num
                      ? "bg-primary text-white"
                      : "bg-cream text-tertiary border border-tertiary/30"
                  }`}
                >
                  {step > s.num ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    s.num
                  )}
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

      {/* Form Steps */}
      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Dates & Guests */}
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

            {/* Step 2: Room Selection */}
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
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-neutral">
                            {room.name}
                          </p>
                          <p className="text-xs text-tertiary mt-0.5">
                            {room.size} {room.sizeUnit} &middot; {room.bedType}{" "}
                            Bed &middot; {room.view} View
                          </p>
                        </div>
                        <div className="text-right">
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

            {/* Step 3: Guest Details */}
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
                      required
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
                    placeholder="+91 98765 43210"
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
                    disabled={!form.name || !form.email || !form.phone}
                    className="gap-2"
                  >
                    Next: Payment
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Payment */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral">
                  Review & Payment
                </h2>

                {/* Booking Summary */}
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

                {/* Payment Placeholder */}
                <div className="border border-tertiary/20 rounded-sm p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary" />
                    <h3 className="font-medium text-neutral">Payment</h3>
                  </div>
                  <p className="text-sm text-tertiary">
                    Secure payment powered by Razorpay. You will be redirected to
                    complete payment after confirmation.
                  </p>
                  <div className="bg-cream/50 border border-dashed border-tertiary/30 rounded-sm p-4 text-center">
                    <p className="text-xs text-tertiary">
                      Razorpay Payment Gateway will load here
                    </p>
                  </div>
                </div>

                <div className="flex justify-between pt-4">
                  <Button variant="outlined" onClick={prevStep}>
                    Back
                  </Button>
                  <Button onClick={handleConfirm} size="lg" className="gap-2">
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
