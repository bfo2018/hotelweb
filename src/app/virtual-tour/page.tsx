"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Eye, ChevronRight } from "lucide-react";

const tourSpots = [
  {
    id: "lobby",
    name: "Grand Lobby",
    description:
      "Step into our welcoming lobby with its soaring ceilings, handcrafted chandeliers, and warm stone accents.",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80",
  },
  {
    id: "room",
    name: "Luxury Room",
    description:
      "Experience the refined comfort of our rooms — plush linens, curated art, and thoughtful amenities.",
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1200&q=80",
  },
  {
    id: "restaurant",
    name: "Verdure Restaurant",
    description:
      "Our signature dining space where culinary artistry meets warm ambiance and candlelit evenings.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  },
  {
    id: "pool",
    name: "Courtyard Pool",
    description:
      "A tranquil oasis surrounded by lush greenery — perfect for a refreshing dip or quiet lounging.",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80",
  },
  {
    id: "rooftop",
    name: "Rooftop Lounge",
    description:
      "Panoramic city views, signature cocktails, and live music under the stars.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=80",
  },
];

export default function VirtualTourPage() {
  const [activeSpot, setActiveSpot] = useState(tourSpots[0]);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
              Explore
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-neutral font-medium">
              Virtual Tour
            </h1>
            <p className="mt-4 text-lg text-tertiary max-w-xl mx-auto">
              Walk through Lumière & Stone from anywhere in the world. Click
              the hotspots to navigate between spaces.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tour Viewer */}
      <section className="pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Main Viewer */}
          <motion.div
            key={activeSpot.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[16/9] rounded-sm overflow-hidden mb-6"
          >
            <Image
              src={activeSpot.image}
              alt={activeSpot.name}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Spot Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-white/80" />
                <span className="text-xs uppercase tracking-wider text-white/70">
                  360° View
                </span>
              </div>
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white font-medium">
                {activeSpot.name}
              </h2>
              <p className="mt-2 text-white/80 max-w-lg text-sm md:text-base">
                {activeSpot.description}
              </p>
            </div>

            {/* Placeholder for actual 360 viewer */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
              <Eye className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">
                360° Interactive — Drag to explore
              </span>
            </div>
          </motion.div>

          {/* Hotspot Navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {tourSpots.map((spot) => (
              <button
                key={spot.id}
                onClick={() => setActiveSpot(spot)}
                className={`relative aspect-[4/3] rounded-sm overflow-hidden group transition-all ${
                  activeSpot.id === spot.id
                    ? "ring-2 ring-primary ring-offset-2"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={spot.image}
                  alt={spot.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-2">
                  <span className="text-white text-xs font-medium">
                    {spot.name}
                  </span>
                </div>
                {activeSpot.id === spot.id && (
                  <div className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Info Note */}
          <div className="mt-10 bg-cream rounded-sm p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium text-neutral">
                Want the full immersive experience?
              </p>
              <p className="text-sm text-tertiary mt-1">
                The complete 360° interactive walkthrough with hotspot
                navigation is available on desktop browsers.
              </p>
            </div>
            <Button variant="outlined" className="gap-2 shrink-0">
              Launch Full Tour
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
