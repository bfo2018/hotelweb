"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "@/components/ui/SearchBar";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { RoomCard } from "@/components/ui/RoomCard";
import { ReviewCard } from "@/components/ui/ReviewCard";
import { Button } from "@/components/ui/Button";
import { StickyBookButton } from "@/components/ui/StickyBookButton";
import { useRooms } from "@/hooks/useRooms";
import { reviews } from "@/data/reviews";
import { ArrowRight, Sparkles, Shield, Heart } from "lucide-react";

export default function HomePage() {
  const { rooms } = useRooms({ available_only: 1 });
  const featuredRooms = rooms.slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
            alt="Lumière & Stone Hotel Lobby"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/80 text-sm md:text-base uppercase tracking-[0.3em] mb-4">
              Boutique Hotel
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl lg:text-7xl text-white font-medium leading-tight">
              Lumière & Stone
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/80 max-w-xl mx-auto">
              Where timeless elegance meets modern luxury
            </p>
          </motion.div>

          <div className="mt-12">
            <SearchBar />
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-white/60 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* The Art of Arrival */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-4">
                Welcome
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl text-neutral font-medium leading-tight">
                The Art of Arrival
              </h2>
              <p className="mt-6 text-lg text-tertiary leading-relaxed">
                Step into a world where every detail has been considered. At
                Lumière & Stone, we believe luxury is not about excess — it is
                about intention. From the warmth of our welcome to the quiet
                elegance of your room, every moment is crafted to feel
                effortlessly extraordinary.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/rooms">
                  <Button variant="primary" className="gap-2">
                    Explore Our Rooms
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/virtual-tour">
                  <Button variant="outlined" className="gap-2">
                    Take a Virtual Tour
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
                    alt="Hotel interior detail"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80"
                    alt="Elegant hotel hallway"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sanctuaries of Rest — Room Showcase */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Sanctuaries of Rest"
            subtitle="Each room tells its own story — handcrafted interiors, premium amenities, and views that inspire."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/rooms">
              <Button variant="outlined" className="gap-2">
                View All Rooms
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Restaurant Teaser */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-sm overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80"
                alt="Verdure restaurant signature dish"
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
                Dining
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium leading-tight">
                Verdure Restaurant
              </h2>
              <p className="text-lg text-tertiary leading-relaxed">
                Modern European cuisine with Asian inflections — crafted by Chef
                Adriana Moretti. A destination for hotel guests and local food
                lovers alike.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/restaurant">
                  <Button variant="primary" className="gap-2">
                    Explore the Restaurant
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/restaurant/reserve">
                  <Button variant="outlined" className="gap-2">
                    Reserve a Table
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Events Teaser */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <p className="text-sm uppercase tracking-[0.2em] text-primary">
                Weddings & Events
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium leading-tight">
                Plan Your Celebration With Us
              </h2>
              <p className="text-lg text-tertiary leading-relaxed">
                Grand banquet halls, lush garden lawns, and a rooftop with city
                views — stunning venues for weddings, engagements, birthdays,
                and corporate events. Complete packages with in-house catering
                and dedicated coordination.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/events">
                  <Button variant="primary" className="gap-2">
                    Explore Events
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/events/weddings">
                  <Button variant="outlined" className="gap-2">
                    Wedding Packages
                  </Button>
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-[4/3] rounded-sm overflow-hidden"
            >
              <Image
                src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80"
                alt="Banquet hall decorated for a wedding"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Explore Bundelkhand Teaser */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-primary mb-3">
                Beyond the Hotel
              </p>
              <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-neutral font-medium">
                More Than a Stay — Explore Tikamgarh
              </h2>
              <p className="mt-4 text-lg text-tertiary max-w-2xl mx-auto">
                Bheem Kund, Kundeshwar, Papora Ji, and a day trip to Khajuraho —
                nearby places worth extending your stay for.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
            {[
              {
                src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80",
                alt: "Orchha fort heritage",
              },
              {
                src: "https://images.unsplash.com/photo-1548013146-72479768bada?w=600&q=80",
                alt: "Temple architecture",
              },
              {
                src: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&q=80",
                alt: "Riverside cenotaphs",
              },
              {
                src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
                alt: "Nature near Tikamgarh",
              },
            ].map((img, idx) => (
              <motion.div
                key={img.alt}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className={`relative overflow-hidden rounded-sm ${
                  idx % 2 === 0 ? "aspect-[3/4]" : "aspect-[3/4] mt-0 md:mt-8"
                }`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link href="/explore">
              <Button variant="primary" className="gap-2">
                Explore Nearby Attractions
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="The Lumière Difference"
            subtitle="What sets us apart is not what we do — but how we make you feel."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Sparkles,
                title: "Bespoke Experiences",
                description:
                  "Every stay is tailored. From pillow menus to personalized itineraries, we anticipate your desires before you voice them.",
              },
              {
                icon: Shield,
                title: "Uncompromising Quality",
                description:
                  "Italian linens, artisan toiletries, locally sourced cuisine — we partner with the finest to deliver the exceptional.",
              },
              {
                icon: Heart,
                title: "Genuine Hospitality",
                description:
                  "Our team doesn't just serve — they connect. Expect warm smiles, remembered names, and care that feels like home.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="text-center p-8"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-medium text-neutral mb-3">
                  {item.title}
                </h3>
                <p className="text-tertiary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Carousel */}
      <section className="py-24 px-4 bg-primary">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Guest Stories"
            subtitle="Hear from those who have experienced the Lumière & Stone difference."
            light
          />

          <div className="overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-6 w-max">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl text-neutral font-medium">
              Begin Your Story
            </h2>
            <p className="mt-4 text-lg text-tertiary max-w-2xl mx-auto">
              Whether for a celebration, a retreat, or simply because you
              deserve it — your extraordinary stay awaits.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book">
                <Button size="lg" className="gap-2">
                  Reserve Your Room
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/offers">
                <Button variant="outlined" size="lg">
                  View Special Offers
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Book Button (mobile) */}
      <StickyBookButton />
    </>
  );
}
