"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { venues } from "@/data/events";
import { Users, Maximize2, ArrowRight, Eye } from "lucide-react";

export default function VenuesPage() {
  const [filter, setFilter] = useState<string>("all");

  const filteredVenues =
    filter === "all"
      ? venues
      : venues.filter((v) => v.suitableFor.includes(filter as never));

  return (
    <>
      <section className="pt-32 pb-12 px-4 bg-cream">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
              Our Spaces
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-neutral font-medium">
              Event Venues
            </h1>
            <p className="mt-4 text-lg text-tertiary max-w-xl mx-auto">
              Four distinctive spaces for every scale of celebration
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-10">
            {[
              { key: "all", label: "All Venues" },
              { key: "wedding", label: "Weddings" },
              { key: "corporate", label: "Corporate" },
              { key: "birthday", label: "Birthdays" },
              { key: "engagement", label: "Engagements" },
            ].map((f) => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`px-4 py-2 rounded-sm text-sm font-medium transition-all ${
                  filter === f.key
                    ? "bg-primary text-white"
                    : "bg-white text-tertiary hover:text-neutral border border-tertiary/20"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredVenues.map((venue, idx) => (
              <motion.div
                key={venue.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Link
                  href={`/events/venues/${venue.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[16/10] rounded-sm overflow-hidden">
                    <Image
                      src={venue.thumbnail}
                      alt={venue.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-white/90 backdrop-blur-sm text-xs font-medium text-primary px-3 py-1 rounded-full capitalize">
                        {venue.type.replace("-", " / ")}
                      </span>
                    </div>
                    {venue.panoramaUrl && (
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-primary" />
                        <span className="text-xs font-medium text-primary">
                          360°
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral group-hover:text-primary transition-colors">
                          {venue.name}
                        </h3>
                        <p className="text-sm text-tertiary mt-0.5">
                          {venue.tagline}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-primary">
                          ₹{venue.basePrice.toLocaleString("en-IN")}
                        </p>
                        <p className="text-xs text-tertiary">
                          {venue.priceUnit}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-tertiary pt-2 border-t border-tertiary/20">
                      <span className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5" />
                        {venue.capacitySeated} seated / {venue.capacityFloating}{" "}
                        floating
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Maximize2 className="w-3.5 h-3.5" />
                        {venue.area.toLocaleString("en-IN")} {venue.areaUnit}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/events/enquire">
              <Button className="gap-2">
                Enquire Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
