"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { eventCategories } from "@/data/events";
import {
  ArrowRight,
  UtensilsCrossed,
  Palette,
  UserCheck,
  Hotel,
  Car,
  Headphones,
} from "lucide-react";

function StickyCTA() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const h = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!visible) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-40"
    >
      <Link
        href="/events/enquire"
        className="flex items-center gap-2 bg-primary text-white px-6 py-3.5 rounded-full shadow-lg hover:bg-primary-light transition-colors font-medium text-sm"
      >
        Check Availability & Pricing
      </Link>
    </motion.div>
  );
}

export default function EventsPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1920&q=80"
            alt="Weddings & Events at Lumière & Stone"
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
              Weddings, Banquets & Events
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-6xl lg:text-7xl text-white font-medium leading-tight">
              Your Celebration,
              <br />
              Our Canvas
            </h1>
            <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              From grand weddings to intimate gatherings — stunning venues,
              in-house catering, and a dedicated team to make every moment
              perfect.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/events/enquire">
                <Button variant="inverted" size="lg" className="gap-2">
                  Check Availability
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/events/venues">
                <Button
                  variant="outlined"
                  size="lg"
                  className="gap-2 border-white text-white hover:bg-white hover:text-primary"
                >
                  View Venues
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Event Categories */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="What Are You Celebrating?"
            subtitle="Choose your occasion and explore venues & packages tailored for it."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {eventCategories.map((cat, idx) => (
              <motion.div
                key={cat.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
              >
                <Link
                  href={`/events/venues?type=${cat.type}`}
                  className="group block relative aspect-[4/3] rounded-sm overflow-hidden"
                >
                  <Image
                    src={cat.image}
                    alt={cat.label}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-[family-name:var(--font-playfair)] text-xl text-white font-medium">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-white/70 mt-1">
                      {cat.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Host With Us */}
      <section className="py-24 px-4 bg-cream">
        <div className="max-w-7xl mx-auto">
          <SectionHeading
            title="Why Host With Us"
            subtitle="Everything under one roof — so you can focus on celebrating, not coordinating."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              {
                icon: UtensilsCrossed,
                title: "In-House Catering",
                description:
                  "Multi-cuisine menus crafted by our chefs — from traditional thalis to live counters. Veg, non-veg, and Jain options available.",
              },
              {
                icon: Palette,
                title: "Decoration Partners",
                description:
                  "Trusted décor teams who transform our venues into your dream setting — mandaps, stages, floral work, lighting, and themes.",
              },
              {
                icon: UserCheck,
                title: "Dedicated Event Manager",
                description:
                  "A single point of contact who coordinates everything — from setup to sendoff, so your family can relax and enjoy.",
              },
              {
                icon: Hotel,
                title: "Guest Room Blocks",
                description:
                  "Special rates on room blocks for outstation guests. Keep your family close with comfortable stay options.",
              },
              {
                icon: Car,
                title: "Ample Parking",
                description:
                  "Valet and self-parking for 150+ vehicles. No guest has to worry about finding a spot.",
              },
              {
                icon: Headphones,
                title: "Entertainment & AV",
                description:
                  "Professional sound systems, DJ setups, LED screens, and coordination with bands, artists, and performers.",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-white p-6 rounded-sm border border-tertiary/10"
              >
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-medium text-neutral mb-2">{item.title}</h3>
                <p className="text-sm text-tertiary leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Pricing CTA */}
      <section className="py-20 px-4 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl text-white font-medium">
              Transparent Pricing, No Surprises
            </h2>
            <p className="mt-4 text-white/80 max-w-2xl mx-auto">
              We believe in upfront pricing. Browse our venue rates, wedding
              packages, and meeting day-rates — all clearly listed so you can
              plan with confidence.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/events/weddings">
                <Button variant="inverted" className="gap-2">
                  Wedding Packages
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/events/meetings">
                <Button
                  variant="outlined"
                  className="gap-2 border-white text-white hover:bg-white hover:text-primary"
                >
                  Meeting Packages
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <StickyCTA />
    </>
  );
}
