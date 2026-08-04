"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { venues, bookedDates } from "@/data/events";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CalendarDays,
  Users,
  Building,
  Send,
} from "lucide-react";

type Step = 1 | 2 | 3 | 4;

export default function EnquirePage() {
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    eventType: "",
    date: "",
    guestCount: "",
    venue: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
    requirements: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const next = () => setStep((s) => Math.min(s + 1, 4) as Step);
  const prev = () => setStep((s) => Math.max(s - 1, 1) as Step);

  const isDateBooked = (date: string) =>
    bookedDates.some((b) => b.date === date);

  if (submitted) {
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
              Enquiry Submitted!
            </h1>
            <p className="text-tertiary">
              Thank you, {form.name}. Our Events Manager will contact you within
              24 hours with availability and a detailed quotation.
            </p>
            <div className="bg-cream rounded-sm p-6 text-left space-y-2 text-sm">
              <p className="text-tertiary">
                <span className="font-medium text-neutral">Event:</span>{" "}
                {form.eventType}
              </p>
              <p className="text-tertiary">
                <span className="font-medium text-neutral">Date:</span>{" "}
                {form.date}
              </p>
              <p className="text-tertiary">
                <span className="font-medium text-neutral">Guests:</span>{" "}
                {form.guestCount}
              </p>
              <p className="text-tertiary">
                <span className="font-medium text-neutral">Venue:</span>{" "}
                {venues.find((v) => v.slug === form.venue)?.name || "Flexible"}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/events">
                <Button variant="outlined">Back to Events</Button>
              </Link>
              <Link href="/events/weddings">
                <Button variant="primary">View Wedding Packages</Button>
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
            href="/events"
            className="inline-flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Link>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium">
            Enquire & Check Availability
          </h1>
          <p className="text-tertiary mt-2">
            Tell us about your event and we&apos;ll get back with pricing and
            availability.
          </p>

          {/* Progress */}
          <div className="flex items-center gap-2 mt-6">
            {[
              { n: 1, l: "Event Type" },
              { n: 2, l: "Date & Guests" },
              { n: 3, l: "Venue" },
              { n: 4, l: "Contact" },
            ].map((s, i) => (
              <div key={s.n} className="flex items-center gap-2 flex-1">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium ${
                    step >= s.n
                      ? "bg-primary text-white"
                      : "bg-cream text-tertiary border border-tertiary/30"
                  }`}
                >
                  {step > s.n ? <Check className="w-3.5 h-3.5" /> : s.n}
                </div>
                <span
                  className={`text-xs hidden sm:block ${
                    step >= s.n ? "text-primary font-medium" : "text-tertiary"
                  }`}
                >
                  {s.l}
                </span>
                {i < 3 && (
                  <div
                    className={`flex-1 h-px ${
                      step > s.n ? "bg-primary" : "bg-tertiary/20"
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
            {/* Step 1 */}
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral">
                  What are you planning?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Wedding",
                    "Engagement",
                    "Birthday Party",
                    "Anniversary",
                    "Corporate Meeting",
                    "Conference",
                    "Kitty Party / Social",
                    "Other",
                  ].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() =>
                        setForm((p) => ({ ...p, eventType: type }))
                      }
                      className={`p-4 rounded-sm border text-left text-sm font-medium transition-all ${
                        form.eventType === type
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-tertiary/20 text-neutral hover:border-tertiary/40"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
                <div className="flex justify-end pt-4">
                  <Button
                    onClick={next}
                    disabled={!form.eventType}
                    className="gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral">
                  When and how many guests?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                      <CalendarDays className="w-3.5 h-3.5" />
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary"
                    />
                    {form.date && isDateBooked(form.date) && (
                      <p className="text-xs text-red-500">
                        This date may be booked. We&apos;ll confirm availability.
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                      <Users className="w-3.5 h-3.5" />
                      Expected Guests
                    </label>
                    <select
                      name="guestCount"
                      value={form.guestCount}
                      onChange={handleChange}
                      className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary appearance-none"
                    >
                      <option value="">Select range...</option>
                      <option value="50-100">50 – 100 guests</option>
                      <option value="100-200">100 – 200 guests</option>
                      <option value="200-300">200 – 300 guests</option>
                      <option value="300-500">300 – 500 guests</option>
                      <option value="500+">500+ guests</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outlined" onClick={prev}>
                    Back
                  </Button>
                  <Button
                    onClick={next}
                    disabled={!form.date || !form.guestCount}
                    className="gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral">
                  Preferred Venue & Budget
                </h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-tertiary uppercase tracking-wider">
                    <Building className="w-3.5 h-3.5" />
                    Preferred Venue
                  </label>
                  <select
                    name="venue"
                    value={form.venue}
                    onChange={handleChange}
                    className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="">No preference / Suggest best</option>
                    {venues.map((v) => (
                      <option key={v.id} value={v.slug}>
                        {v.name} ({v.capacitySeated} seated) — ₹
                        {v.basePrice.toLocaleString("en-IN")}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                    Budget Range (Optional)
                  </label>
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary appearance-none"
                  >
                    <option value="">Prefer not to say</option>
                    <option value="under-1L">Under ₹1,00,000</option>
                    <option value="1-3L">₹1,00,000 – ₹3,00,000</option>
                    <option value="3-5L">₹3,00,000 – ₹5,00,000</option>
                    <option value="5-10L">₹5,00,000 – ₹10,00,000</option>
                    <option value="10L+">₹10,00,000+</option>
                  </select>
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outlined" onClick={prev}>
                    Back
                  </Button>
                  <Button onClick={next} className="gap-2">
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <motion.div
                key="s4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral">
                  Your Contact Details
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
                      placeholder="Your name"
                      className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      placeholder="+91 98765 43210"
                      className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary"
                    />
                  </div>
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
                    className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                    Special Requirements (Optional)
                  </label>
                  <textarea
                    name="requirements"
                    value={form.requirements}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Theme preferences, dietary needs, entertainment requirements..."
                    className="w-full bg-cream border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary resize-none"
                  />
                </div>
                <div className="flex justify-between pt-4">
                  <Button variant="outlined" onClick={prev}>
                    Back
                  </Button>
                  <Button
                    onClick={() => setSubmitted(true)}
                    disabled={!form.name || !form.phone || !form.email}
                    size="lg"
                    className="gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Submit Enquiry
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
