"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  nearbyPlaces,
  dayTrips,
  PlaceCategory,
} from "@/data/nearby";
import {
  MapPin,
  Clock,
  Calendar,
  ArrowRight,
  Phone,
  Compass,
} from "lucide-react";

const categoryColors: Record<PlaceCategory, string> = {
  Heritage: "bg-primary/10 text-primary",
  Temple: "bg-amber-100 text-amber-800",
  Nature: "bg-emerald-100 text-emerald-800",
  Historical: "bg-stone-200 text-stone-700",
};

export default function ExplorePage() {
  const [filter, setFilter] = useState<PlaceCategory | "All">("All");

  const filteredPlaces =
    filter === "All"
      ? nearbyPlaces
      : nearbyPlaces.filter((p) => p.category === filter);

  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=1920&q=80"
            alt="Discover Bundelkhand — Orchha and Tikamgarh"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/70 text-sm uppercase tracking-[0.3em] mb-4">
              Tikamgarh, Madhya Pradesh
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl lg:text-7xl text-white font-medium leading-tight">
              Explore Tikamgarh & Around
            </h1>
            <p className="mt-5 text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Bheem Kund, local temples, waterfalls, and a day trip to
              Khajuraho — discover what&apos;s nearby without long journeys.
              Your hotel is the perfect base.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Places to Explore */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Places to Explore"
            subtitle="Local Tikamgarh favourites and nearby day trips. Distances are approximate — ask our front desk to confirm travel times."
          />

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {(["All", "Heritage", "Temple", "Nature", "Historical"] as const).map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
                    filter === cat
                      ? "bg-primary text-white"
                      : "bg-cream text-tertiary hover:text-neutral border border-tertiary/20"
                  }`}
                >
                  {cat}
                </button>
              )
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlaces.map((place, idx) => (
              <motion.article
                key={place.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                  <Image
                    src={place.image}
                    alt={place.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`text-xs font-medium px-2.5 py-1 rounded-full ${categoryColors[place.category]}`}
                    >
                      {place.category}
                    </span>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral">
                    {place.name}
                  </h3>
                  <p className="text-sm text-tertiary leading-relaxed line-clamp-2">
                    {place.description}
                  </p>
                  <div className="flex flex-wrap gap-3 pt-2 text-xs text-tertiary">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      ~{place.distanceKm} km
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {place.travelTime}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {place.bestTime}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Your Day Trip */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Plan Your Day Trip"
            subtitle="Ready-made itineraries so you can picture an actual day out — or ask us to customise one for you."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
            {dayTrips.map((trip, idx) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-sm overflow-hidden border border-tertiary/10"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={trip.image}
                    alt={trip.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-primary font-medium">
                      {trip.duration}
                    </p>
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral mt-1">
                      {trip.title}
                    </h3>
                    <p className="text-sm text-tertiary mt-2 leading-relaxed">
                      {trip.description}
                    </p>
                  </div>
                  <ol className="space-y-3 border-t border-tertiary/10 pt-4">
                    {trip.stops.map((stop, i) => (
                      <li key={stop.name} className="flex gap-3 text-sm">
                        <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center shrink-0">
                          {i + 1}
                        </span>
                        <div>
                          <p className="font-medium text-neutral">{stop.name}</p>
                          <p className="text-xs text-tertiary">{stop.timing}</p>
                          {stop.note && (
                            <p className="text-xs text-primary/80 mt-0.5 italic">
                              {stop.note}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="See How Close Everything Is"
            subtitle="Your hotel sits in Tikamgarh — Bheem Kund, Kundeshwar, Papora Ji, and more are an easy drive away."
          />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden border border-tertiary/20 bg-cream"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115847.5!2d78.8306!3d24.7435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3978a5f5c5c5c5c5%3A0x0!2sTikamgarh%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map of Tikamgarh and nearby attractions"
              className="absolute inset-0"
            />
          </motion.div>
          <p className="text-center text-xs text-tertiary mt-4">
            Map centred on Tikamgarh. Ask reception for a printed route map or
            cab booking to any attraction.
          </p>
        </div>
      </section>

      {/* Ask Us CTA */}
      <section className="py-24 px-4 bg-primary">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-2">
              <Compass className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white font-medium">
              Ask Us to Plan It For You
            </h2>
            <p className="text-white/80 text-lg leading-relaxed">
              Want a private cab, a local guide, or a custom itinerary?
              Our front desk — and AI Concierge — are happy to arrange
              everything so you can simply enjoy Tikamgarh.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <a href="tel:+917483667939">
                <Button variant="inverted" size="lg" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Call Reception
                </Button>
              </a>
              <Link href="/contact">
                <Button
                  variant="outlined"
                  size="lg"
                  className="gap-2 border-white text-white hover:bg-white hover:text-primary"
                >
                  Send a Message
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
