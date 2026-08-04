"use client";

import { useParams } from "next/navigation";
import { notFound } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { venues } from "@/data/events";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Maximize2,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function VenueDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const venue = venues.find((v) => v.slug === slug);
  const [currentImage, setCurrentImage] = useState(0);

  if (!venue) {
    notFound();
  }

  return (
    <>
      {/* Back */}
      <div className="pt-24 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/events/venues"
            className="inline-flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All Venues
          </Link>
        </div>
      </div>

      {/* Gallery */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden group">
            <Image
              src={venue.images[currentImage]}
              alt={`${venue.name} - Image ${currentImage + 1}`}
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <button
              onClick={() =>
                setCurrentImage(
                  (p) => (p - 1 + venue.images.length) % venue.images.length
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous"
            >
              <ChevronLeft className="w-5 h-5 text-neutral" />
            </button>
            <button
              onClick={() =>
                setCurrentImage((p) => (p + 1) % venue.images.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next"
            >
              <ChevronRight className="w-5 h-5 text-neutral" />
            </button>
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
              {currentImage + 1} / {venue.images.length}
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span className="text-xs uppercase tracking-wider text-primary font-medium bg-primary/10 px-3 py-1 rounded-full capitalize">
                  {venue.type.replace("-", " / ")}
                </span>
                <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-medium text-neutral mt-3">
                  {venue.name}
                </h1>
                <p className="text-tertiary italic mt-1">{venue.tagline}</p>
              </motion.div>

              <div className="flex flex-wrap gap-6 py-4 border-y border-tertiary/20">
                <div className="flex items-center gap-2 text-neutral">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm">
                    {venue.capacitySeated} seated / {venue.capacityFloating}{" "}
                    floating
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral">
                  <Maximize2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">
                    {venue.area.toLocaleString("en-IN")} {venue.areaUnit}
                  </span>
                </div>
              </div>

              <p className="text-tertiary leading-relaxed">
                {venue.description}
              </p>

              {/* Seating Styles */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral mb-4">
                  Seating Configurations
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {venue.seatingStyles.map((s) => (
                    <div
                      key={s.style}
                      className="bg-cream rounded-sm p-4 text-center"
                    >
                      <p className="text-2xl font-semibold text-primary">
                        {s.capacity}
                      </p>
                      <p className="text-xs text-tertiary mt-1">{s.style}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral mb-4">
                  Amenities Included
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {venue.amenities.map((a) => (
                    <div
                      key={a}
                      className="flex items-center gap-2 text-sm text-neutral/80"
                    >
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {a}
                    </div>
                  ))}
                </div>
              </div>

              {/* Decoration Tiers */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral mb-4">
                  Decoration Packages
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {venue.decorationTiers.map((tier) => (
                    <div
                      key={tier.name}
                      className="border border-tertiary/20 rounded-sm p-5 space-y-3"
                    >
                      <h3 className="font-medium text-neutral">{tier.name}</h3>
                      <p className="text-xl font-semibold text-primary">
                        ₹{tier.price.toLocaleString("en-IN")}
                      </p>
                      <ul className="space-y-1.5">
                        {tier.includes.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-xs text-tertiary"
                          >
                            <Check className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="sticky top-28 bg-white border border-tertiary/20 rounded-sm p-6 shadow-sm space-y-5">
                <div>
                  <p className="text-sm text-tertiary">Starting from</p>
                  <p className="text-3xl font-semibold text-primary">
                    ₹{venue.basePrice.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-tertiary">{venue.priceUnit}</p>
                </div>

                <div className="space-y-2 text-sm text-tertiary">
                  <p>
                    <span className="font-medium text-neutral">Capacity:</span>{" "}
                    {venue.capacitySeated} seated
                  </p>
                  <p>
                    <span className="font-medium text-neutral">Area:</span>{" "}
                    {venue.area.toLocaleString("en-IN")} {venue.areaUnit}
                  </p>
                  <p>
                    <span className="font-medium text-neutral">Type:</span>{" "}
                    <span className="capitalize">
                      {venue.type.replace("-", " / ")}
                    </span>
                  </p>
                </div>

                <Link href="/events/enquire">
                  <Button fullWidth size="lg" className="gap-2">
                    Check Availability
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>

                <Link
                  href="/events/enquire"
                  className="block text-center text-sm text-primary font-medium hover:text-primary-light transition-colors"
                >
                  Request a Detailed Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
