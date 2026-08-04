"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { privateDiningRooms } from "@/data/restaurant";
import { Users, Check, ArrowLeft, Send } from "lucide-react";

export default function PrivateDiningPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    guestCount: "",
    preferredDate: "",
    preferredSpace: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1920&q=80"
            alt="Private dining at Verdure"
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
              Verdure
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white font-medium">
              Private Dining & Events
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Exclusive spaces for celebrations, gatherings, and moments that
              matter
            </p>
          </motion.div>
        </div>
      </section>

      {/* Spaces */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Our Private Spaces"
            subtitle="Three distinctive settings, each with its own character and charm."
          />

          <div className="space-y-16 mt-12">
            {privateDiningRooms.map((room, idx) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  idx % 2 === 1 ? "lg:direction-rtl" : ""
                }`}
              >
                <div
                  className={`relative aspect-[4/3] rounded-sm overflow-hidden ${
                    idx % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div
                  className={`space-y-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-medium text-neutral">
                    {room.name}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-tertiary">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-primary" />
                      Up to {room.capacity} guests
                    </span>
                    <span className="text-primary font-medium">
                      From ₹{room.priceFrom.toLocaleString("en-IN")}/person
                    </span>
                  </div>
                  <p className="text-tertiary leading-relaxed">
                    {room.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {room.features.map((feature) => (
                      <span
                        key={feature}
                        className="inline-flex items-center gap-1.5 text-xs font-medium bg-primary/5 text-primary px-3 py-1.5 rounded-sm"
                      >
                        <Check className="w-3 h-3" />
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-3xl mx-auto">
          <SectionHeading
            title="Plan Your Event"
            subtitle="Tell us about your occasion and we'll create something unforgettable."
          />

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 space-y-4"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10">
                <Check className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-neutral">
                Inquiry Received
              </h3>
              <p className="text-tertiary">
                Our events team will be in touch within 24 hours to discuss your
                requirements.
              </p>
              <Link href="/restaurant">
                <Button variant="outlined" className="mt-4">
                  Back to Restaurant
                </Button>
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
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
                    className="w-full bg-white border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors"
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
                    className="w-full bg-white border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                    Event Type
                  </label>
                  <select
                    name="eventType"
                    value={form.eventType}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="">Select type...</option>
                    <option value="birthday">Birthday Dinner</option>
                    <option value="anniversary">Anniversary</option>
                    <option value="wedding">Wedding Reception</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="cocktail">Cocktail Reception</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                    Guest Count
                  </label>
                  <input
                    type="number"
                    name="guestCount"
                    value={form.guestCount}
                    onChange={handleChange}
                    min="1"
                    max="100"
                    required
                    className="w-full bg-white border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    name="preferredDate"
                    value={form.preferredDate}
                    onChange={handleChange}
                    required
                    className="w-full bg-white border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                    Preferred Space
                  </label>
                  <select
                    name="preferredSpace"
                    value={form.preferredSpace}
                    onChange={handleChange}
                    className="w-full bg-white border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral focus:outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="">No preference</option>
                    {privateDiningRooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} (up to {room.capacity})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-tertiary uppercase tracking-wider">
                  Additional Details
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Tell us more about your event — theme, dietary requirements, AV needs, any special requests..."
                  className="w-full bg-white border border-tertiary/20 rounded-sm px-4 py-3 text-sm text-neutral placeholder:text-tertiary/50 focus:outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              <Button type="submit" fullWidth size="lg" className="gap-2">
                <Send className="w-4 h-4" />
                Submit Inquiry
              </Button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
