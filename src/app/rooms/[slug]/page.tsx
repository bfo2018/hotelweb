"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { rooms as fallbackRooms } from "@/data/rooms";
import { Button } from "@/components/ui/Button";
import { useRooms } from "@/hooks/useRooms";
import {
  ArrowLeft,
  ArrowRight,
  Users,
  Maximize2,
  Bed,
  Eye,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMemo, useState } from "react";

export default function RoomDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { rooms, loading } = useRooms({ available_only: 1 });

  const room = useMemo(() => {
    const fromApi = rooms.find((r) => r.slug === slug || r.id === slug);
    if (fromApi) return fromApi;
    return fallbackRooms.find((r) => r.slug === slug);
  }, [rooms, slug]);

  const [currentImage, setCurrentImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (loading && !room) {
    return (
      <div className="pt-32 pb-24 px-4 min-h-screen flex items-center justify-center">
        <p className="text-tertiary">Loading room...</p>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="pt-32 pb-24 px-4 min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-tertiary">Room not found.</p>
        <Link href="/rooms">
          <Button variant="outlined">Back to Rooms</Button>
        </Link>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % room.images.length);
  };

  const prevImage = () => {
    setCurrentImage(
      (prev) => (prev - 1 + room.images.length) % room.images.length
    );
  };

  return (
    <>
      {/* Back Navigation */}
      <div className="pt-24 pb-4 px-4">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Rooms
          </Link>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-sm overflow-hidden group">
            <Image
              src={room.images[currentImage]}
              alt={`${room.name} - Image ${currentImage + 1}`}
              fill
              className="object-cover cursor-pointer transition-transform duration-500"
              onClick={() => setLightboxOpen(true)}
              priority
              sizes="100vw"
            />

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5 text-neutral" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5 text-neutral" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 right-4 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
              {currentImage + 1} / {room.images.length}
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
            {room.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`relative w-20 h-14 rounded-sm overflow-hidden shrink-0 border-2 transition-all ${
                  idx === currentImage
                    ? "border-primary opacity-100"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image
                  src={img}
                  alt={`${room.name} thumbnail ${idx + 1}`}
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Room Details */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-sm uppercase tracking-[0.2em] text-primary mb-2">
                  {room.view} View
                </p>
                <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-medium text-neutral">
                  {room.name}
                </h1>
                <p className="mt-2 text-lg text-tertiary italic">
                  {room.tagline}
                </p>
              </motion.div>

              {/* Quick Stats */}
              <div className="flex flex-wrap gap-6 py-6 border-y border-tertiary/20">
                <div className="flex items-center gap-2 text-neutral">
                  <Maximize2 className="w-4 h-4 text-primary" />
                  <span className="text-sm">
                    {room.size} {room.sizeUnit}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-neutral">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="text-sm">Up to {room.maxGuests} guests</span>
                </div>
                <div className="flex items-center gap-2 text-neutral">
                  <Bed className="w-4 h-4 text-primary" />
                  <span className="text-sm">{room.bedType} Bed</span>
                </div>
                {room.virtualTourUrl && (
                  <Link
                    href={room.virtualTourUrl}
                    className="flex items-center gap-2 text-primary hover:text-primary-light transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">360° Tour</span>
                  </Link>
                )}
              </div>

              {/* Description */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral mb-4">
                  About This Room
                </h2>
                <p className="text-tertiary leading-relaxed">
                  {room.description}
                </p>
              </div>

              {/* Features */}
              {room.features.length > 0 && (
                <div>
                  <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral mb-4">
                    Highlights
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {room.features.map((feature) => (
                      <span
                        key={feature}
                        className="bg-primary/10 text-primary px-4 py-2 rounded-sm text-sm font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Amenities */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral mb-4">
                  Amenities
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {room.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center gap-2 text-sm text-neutral/80"
                    >
                      <Check className="w-4 h-4 text-primary shrink-0" />
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-white border border-tertiary/20 rounded-sm p-6 shadow-sm space-y-6">
                <div>
                  <p className="text-sm text-tertiary">From</p>
                  <p className="text-3xl font-semibold text-primary">
                    ₹{room.price.toLocaleString("en-IN")}
                    <span className="text-sm font-normal text-tertiary ml-1">
                      / night
                    </span>
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-tertiary uppercase tracking-wider block mb-1.5">
                      Check In
                    </label>
                    <input
                      type="date"
                      className="w-full bg-cream border border-tertiary/20 rounded-sm px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-tertiary uppercase tracking-wider block mb-1.5">
                      Check Out
                    </label>
                    <input
                      type="date"
                      className="w-full bg-cream border border-tertiary/20 rounded-sm px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-tertiary uppercase tracking-wider block mb-1.5">
                      Guests
                    </label>
                    <select className="w-full bg-cream border border-tertiary/20 rounded-sm px-3 py-2.5 text-sm text-neutral focus:outline-none focus:border-primary appearance-none">
                      {Array.from({ length: room.maxGuests }).map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <Link href={`/book?room=${room.slug}`}>
                  <Button fullWidth size="lg">
                    Reserve This Room
                  </Button>
                </Link>

                <p className="text-xs text-center text-tertiary">
                  Free cancellation up to 48 hours before check-in
                </p>

                {/* Restaurant Cross-Promo */}
                <div className="mt-6 pt-6 border-t border-tertiary/20">
                  <p className="text-xs uppercase tracking-wider text-tertiary font-medium mb-2">
                    Dining
                  </p>
                  <p className="text-sm text-neutral font-medium">
                    Dine at Verdure
                  </p>
                  <p className="text-xs text-tertiary mt-1">
                    Reserve a table at our award-worthy restaurant during your stay.
                  </p>
                  <Link
                    href="/restaurant/reserve"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary-light mt-2 transition-colors"
                  >
                    Reserve a Table
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/80 hover:text-white text-2xl"
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <div className="relative w-[90vw] h-[80vh]">
            <Image
              src={room.images[currentImage]}
              alt={`${room.name} - Full view`}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </>
  );
}
