"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { restaurantInfo } from "@/data/restaurant";
import {
  Clock,
  UtensilsCrossed,
  Shirt,
  DollarSign,
  Music,
  ArrowRight,
} from "lucide-react";
import { useState, useEffect } from "react";

function StickyReserveButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 500);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link
        href="/restaurant/reserve"
        className="flex items-center justify-center bg-primary text-white px-6 py-3.5 rounded-full shadow-lg hover:bg-primary-light transition-colors font-medium text-sm"
      >
        Reserve a Table
      </Link>
    </motion.div>
  );
}

export default function RestaurantPage() {
  return (
    <>
      {/* Cinematic Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src={restaurantInfo.heroImage}
            alt={`${restaurantInfo.name} Restaurant`}
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/40" />
        </div>

        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/70 text-sm uppercase tracking-[0.3em] mb-4">
              {restaurantInfo.cuisine}
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl text-white font-medium">
              {restaurantInfo.name}
            </h1>
            <p className="mt-4 text-xl md:text-2xl text-white/80 font-light italic">
              {restaurantInfo.tagline}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/restaurant/reserve">
                <Button variant="inverted" size="lg" className="gap-2">
                  Reserve a Table
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/restaurant/menu">
                <Button
                  variant="outlined"
                  size="lg"
                  className="gap-2 border-white text-white hover:bg-white hover:text-primary"
                >
                  View Menu
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-primary">
                Our Story
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl text-neutral font-medium leading-tight">
                A Destination for the Senses
              </h2>
              <p className="text-lg text-tertiary leading-relaxed">
                {restaurantInfo.description}
              </p>
              <div className="pt-4 border-t border-tertiary/20">
                <p className="font-[family-name:var(--font-playfair)] text-xl text-neutral font-medium">
                  {restaurantInfo.chefName}
                </p>
                <p className="text-sm text-tertiary mt-1">
                  {restaurantInfo.chefTitle}
                </p>
                <p className="text-tertiary leading-relaxed mt-4">
                  {restaurantInfo.chefBio}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-sm overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80"
                alt="Chef Adriana in the kitchen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-white/60 text-sm uppercase tracking-[0.2em] mb-6">
              Philosophy
            </p>
            <blockquote className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-white font-light italic leading-relaxed">
              &ldquo;{restaurantInfo.philosophy}&rdquo;
            </blockquote>
            <p className="mt-6 text-white/60 text-sm">
              — {restaurantInfo.chefName}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="The Experience"
            subtitle="From plate to place — every detail curated for delight."
          />

          {/* Masonry-style gallery */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {restaurantInfo.galleryImages.map((img, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="relative break-inside-avoid overflow-hidden rounded-sm group"
              >
                <Image
                  src={img}
                  alt={`Verdure restaurant gallery ${idx + 1}`}
                  width={600}
                  height={idx % 3 === 0 ? 800 : idx % 3 === 1 ? 600 : 500}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Strip */}
      <section className="py-16 px-4 border-y border-tertiary/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-center space-y-2"
            >
              <Clock className="w-5 h-5 text-primary mx-auto" />
              <p className="text-xs uppercase tracking-wider text-tertiary font-medium">
                Hours
              </p>
              <div className="text-sm text-neutral space-y-0.5">
                <p>Lunch: {restaurantInfo.hours.lunch}</p>
                <p>Dinner: {restaurantInfo.hours.dinner}</p>
                <p>Bar: {restaurantInfo.hours.bar}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="text-center space-y-2"
            >
              <UtensilsCrossed className="w-5 h-5 text-primary mx-auto" />
              <p className="text-xs uppercase tracking-wider text-tertiary font-medium">
                Cuisine
              </p>
              <p className="text-sm text-neutral">{restaurantInfo.cuisine}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center space-y-2"
            >
              <Shirt className="w-5 h-5 text-primary mx-auto" />
              <p className="text-xs uppercase tracking-wider text-tertiary font-medium">
                Dress Code
              </p>
              <p className="text-sm text-neutral">{restaurantInfo.dressCode}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="text-center space-y-2"
            >
              <DollarSign className="w-5 h-5 text-primary mx-auto" />
              <p className="text-xs uppercase tracking-wider text-tertiary font-medium">
                Price Range
              </p>
              <p className="text-sm text-neutral">
                {restaurantInfo.priceRange} — Fine Dining
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="text-center space-y-2"
            >
              <Music className="w-5 h-5 text-primary mx-auto" />
              <p className="text-xs uppercase tracking-wider text-tertiary font-medium">
                Special Nights
              </p>
              <div className="text-sm text-neutral space-y-0.5">
                {restaurantInfo.specialNights.map((night, i) => (
                  <p key={i} className="text-xs">
                    {night}
                  </p>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ambiance Description */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-sm overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80"
                alt="Verdure dining room ambiance"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-primary">
                The Space
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium">
                An Atmosphere You&apos;ll Crave
              </h2>
              <p className="text-lg text-tertiary leading-relaxed">
                {restaurantInfo.ambiance}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/restaurant/private-dining">
                  <Button variant="outlined" className="gap-2">
                    Private Dining
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/restaurant/menu">
                  <Button variant="secondary" className="gap-2">
                    Explore the Menu
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium">
              Your Table Awaits
            </h2>
            <p className="text-lg text-tertiary">
              Whether you&apos;re a hotel guest or a local food lover, Verdure
              welcomes you. Reserve your table and let us take care of the rest.
            </p>
            <Link href="/restaurant/reserve">
              <Button size="lg" className="gap-2 mt-4">
                Reserve a Table
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <StickyReserveButton />
    </>
  );
}
