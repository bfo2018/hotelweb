"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { weddingPackages } from "@/data/events";
import { Check, ArrowRight, Star } from "lucide-react";

const tierColors = {
  silver: "border-tertiary/30",
  gold: "border-primary ring-2 ring-primary/20",
  platinum: "border-neutral",
};

export default function WeddingsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
            alt="Wedding at Lumière & Stone"
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
          >
            <p className="text-white/70 text-sm uppercase tracking-[0.3em] mb-3">
              Packages
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white font-medium">
              Wedding Packages
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              Complete wedding solutions with transparent per-plate pricing.
              Every detail taken care of — you just celebrate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Choose Your Package"
            subtitle="All packages include venue, catering, decoration, and coordination. Pricing is per plate — final cost depends on guest count."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {weddingPackages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative border rounded-sm p-6 space-y-5 ${tierColors[pkg.tier]} ${
                  pkg.highlighted ? "bg-primary/[0.02]" : "bg-white"
                }`}
              >
                {pkg.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-medium px-4 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    Most Popular
                  </div>
                )}

                <div className="text-center">
                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-neutral">
                    {pkg.name}
                  </h3>
                  <div className="mt-3">
                    <p className="text-3xl font-bold text-primary">
                      ₹{pkg.pricePerPlate.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-tertiary">per plate</p>
                  </div>
                  <p className="text-xs text-tertiary mt-2">
                    Min. {pkg.minGuests} guests &middot; {pkg.roomsIncluded}{" "}
                    rooms included
                  </p>
                </div>

                <p className="text-sm text-tertiary text-center leading-relaxed">
                  {pkg.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-tertiary/10">
                  <p className="text-xs uppercase tracking-wider text-tertiary font-medium">
                    Includes
                  </p>
                  <ul className="space-y-1.5">
                    {pkg.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-neutral/80"
                      >
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4">
                  <p className="text-xs text-tertiary mb-2">
                    Venue: {pkg.venueIncluded}
                  </p>
                  <Link href="/events/enquire">
                    <Button
                      fullWidth
                      variant={pkg.highlighted ? "primary" : "outlined"}
                      className="gap-2"
                    >
                      Get a Quote
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Indian Wedding Context */}
          <div className="mt-16 bg-cream rounded-sm p-8 md:p-10">
            <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral mb-4">
              Designed for Indian Weddings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-tertiary">
              <div className="space-y-2">
                <p className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-neutral">Mandap & Stage:</strong>{" "}
                    Custom-designed wedding mandap setup with phoolon ki chadar
                    and entry walkway
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-neutral">Baraat Entry:</strong>{" "}
                    Dedicated baraat entry point with dhol, band space, and
                    fireworks clearance
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-neutral">Pre-Wedding:</strong>{" "}
                    Separate lawn available for Haldi, Mehndi & Sangeet
                    ceremonies
                  </span>
                </p>
              </div>
              <div className="space-y-2">
                <p className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-neutral">Catering:</strong>{" "}
                    Traditional Indian thalis, live chaat counters, regional
                    cuisines, and Jain options
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-neutral">Guest Rooms:</strong>{" "}
                    Blocked rooms for family at special rates with early
                    check-in for bride & groom
                  </span>
                </p>
                <p className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-neutral">Coordination:</strong>{" "}
                    Pandit arrangement, vidaai setup, and DJ/band coordination
                    all handled
                  </span>
                </p>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-tertiary mt-8">
            * Final pricing depends on guest count, season, and customization.
            Prices shown are starting rates (excl. GST). Contact us for a
            detailed quotation.
          </p>
        </div>
      </section>
    </>
  );
}
