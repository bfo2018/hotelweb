"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoomCard } from "@/components/ui/RoomCard";
import { useRooms } from "@/hooks/useRooms";

export default function RoomsPage() {
  const { rooms, loading, error, fromApi } = useRooms({ available_only: 1 });

  return (
    <>
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=1920&q=80"
            alt="Lumière & Stone Rooms"
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
              Accommodation
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white font-medium">
              Rooms & Suites
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Distinctive sanctuaries, each with its own character
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Choose Your Sanctuary"
            subtitle="From intimate studios to grand suites, every room at Lumière & Stone is a world unto itself."
          />

          {loading && (
            <p className="text-center text-tertiary mt-12">Loading rooms...</p>
          )}

          {error && fromApi === false && (
            <p className="text-center text-sm text-tertiary mt-6">
              Showing showcase rooms while live inventory is unavailable.
            </p>
          )}

          {!loading && rooms.length === 0 && (
            <p className="text-center text-tertiary mt-12">
              No rooms available at the moment.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {rooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
