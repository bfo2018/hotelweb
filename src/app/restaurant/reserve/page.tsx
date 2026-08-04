"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { availableTimeSlots, restaurantInfo } from "@/data/restaurant";
import {
  CalendarDays,
  Clock,
  Users,
  MapPin,
  PartyPopper,
  MessageSquare,
  Check,
  ArrowLeft,
} from "lucide-react";

interface ReservationForm {
  date: string;
  time: string;
  guests: string;
  seating: string;
  occasion: string;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export default function ReservePage() {
  const [form, setForm] = useState<ReservationForm>({
    date: "",
    time: "",
    guests: "2",
    seating: "indoor",
    occasion: "",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState<"lunch" | "dinner">(
    "dinner"
  );

  const timeSlots = availableTimeSlots[selectedMeal] || [];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would POST to /api/restaurant/reserve
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="pt-32 pb-24 px-4 min-h-screen flex items-center">
        <div className="max-w-lg mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium">
              Reservation Confirmed
            </h1>
            <div className="bg-cream rounded-sm p-6 text-left space-y-3">
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Date:</span>{" "}
                {form.date}
              </p>
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Time:</span>{" "}
                {form.time}
              </p>
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Guests:</span>{" "}
                {form.guests}
              </p>
              <p className="text-sm text-tertiary">
                <span className="font-medium text-neutral">Seating:</span>{" "}
                {form.seating}
              </p>
              {form.occasion && (
                <p className="text-sm text-tertiary">
                  <span className="font-medium text-neutral">Occasion:</span>{" "}
                  {form.occasion}
                </p>
              )}
            </div>
            <p className="text-sm text-tertiary">
              A confirmation email has been sent to{" "}
              <span className="font-medium">{form.email}</span>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/restaurant">
                <Button variant="outlined">Back to Restaurant</Button>
              </Link>
              <Link href="/restaurant/menu">
                <Button variant="primary">View Menu</Button>
              </Link>
            </div>
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
            href="/restaurant"
            className="inline-flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Verdure
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium">
              Reserve a Table
            </h1>
            <p className="mt-3 text-tertiary">
              Choose your date, time, and preferences. We&apos;ll confirm your
              reservation instantly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Reservation Form */}
      <section className="pb-24 px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Date & Meal Period */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                  <CalendarDays className="w-3.5 h-3.5" />
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                  <Clock className="w-3.5 h-3.5" />
                  Meal Period
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMeal("lunch");
                      setForm((p) => ({ ...p, time: "" }));
                    }}
                    className={`flex-1 py-3 rounded-sm text-sm font-medium transition-all ${
                      selectedMeal === "lunch"
                        ? "bg-primary text-white"
                        : "bg-cream border border-tertiary/20 text-tertiary hover:text-neutral"
                    }`}
                  >
                    Lunch
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMeal("dinner");
                      setForm((p) => ({ ...p, time: "" }));
                    }}
                    className={`flex-1 py-3 rounded-sm text-sm font-medium transition-all ${
                      selectedMeal === "dinner"
                        ? "bg-primary text-white"
                        : "bg-cream border border-tertiary/20 text-tertiary hover:text-neutral"
                    }`}
                  >
                    Dinner
                  </button>
                </div>
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-3">
              <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                Available Times
              </label>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedMeal}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2"
                >
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() =>
                        setForm((p) => ({ ...p, time: slot.time }))
                      }
                      className={`py-2.5 px-3 rounded-sm text-sm font-medium transition-all ${
                        !slot.available
                          ? "bg-gray-100 text-tertiary/40 cursor-not-allowed line-through"
                          : form.time === slot.time
                          ? "bg-primary text-white"
                          : "bg-cream border border-tertiary/20 text-neutral hover:border-primary"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Guests & Seating */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1} {i === 0 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                  <MapPin className="w-3.5 h-3.5" />
                  Seating Preference
                </label>
                <select
                  name="seating"
                  value={form.seating}
                  onChange={handleChange}
                  className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors appearance-none"
                >
                  <option value="indoor">Indoor Dining</option>
                  <option value="outdoor">Outdoor Terrace</option>
                  <option value="bar">Bar Seating</option>
                  <option value="private">Private Dining Room</option>
                </select>
              </div>
            </div>

            {/* Occasion */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                <PartyPopper className="w-3.5 h-3.5" />
                Special Occasion (Optional)
              </label>
              <select
                name="occasion"
                value={form.occasion}
                onChange={handleChange}
                className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors appearance-none"
              >
                <option value="">None</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="proposal">Proposal</option>
                <option value="business">Business Dinner</option>
                <option value="celebration">General Celebration</option>
              </select>
            </div>

            {/* Contact Details */}
            <div className="pt-6 border-t border-tertiary/20 space-y-6">
              <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral">
                Your Details
              </h3>
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
                    placeholder="John Smith"
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
                    placeholder="john@example.com"
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
                  placeholder="+1 (234) 567-8900"
                  className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                <MessageSquare className="w-3.5 h-3.5" />
                Special Requests / Dietary Needs (Optional)
              </label>
              <textarea
                name="specialRequests"
                value={form.specialRequests}
                onChange={handleChange}
                rows={3}
                placeholder="Allergies, dietary restrictions, high-chair needed, etc."
                className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <div className="pt-4">
              <Button
                type="submit"
                fullWidth
                size="lg"
                disabled={!form.date || !form.time || !form.name || !form.email}
              >
                Confirm Reservation
              </Button>
              <p className="text-xs text-center text-tertiary mt-3">
                You&apos;ll receive an instant confirmation email. Free
                cancellation up to 4 hours before your reservation.
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
