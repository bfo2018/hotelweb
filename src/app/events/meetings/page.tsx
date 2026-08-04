"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { meetingPackages, venues } from "@/data/events";
import { Check, ArrowRight, Monitor, Wifi, Coffee } from "lucide-react";

export default function MeetingsPage() {
  const conferenceRoom = venues.find((v) => v.slug === "conference-room");

  return (
    <>
      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80"
            alt="Conference at Lumière & Stone"
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
              Corporate
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-white font-medium">
              Meetings & Conferences
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Professional spaces, seamless tech, and hospitality that
              impresses
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Specs */}
      <section className="py-12 px-4 border-b border-tertiary/10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Monitor className="w-6 h-6 text-primary" />
              <p className="font-medium text-neutral">4K AV & Conferencing</p>
              <p className="text-xs text-tertiary">
                Projector, screen, mics & video call setup
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Wifi className="w-6 h-6 text-primary" />
              <p className="font-medium text-neutral">High-Speed WiFi</p>
              <p className="text-xs text-tertiary">
                Dedicated bandwidth for your event
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Coffee className="w-6 h-6 text-primary" />
              <p className="font-medium text-neutral">F&B Included</p>
              <p className="text-xs text-tertiary">
                Tea, coffee, meals & refreshments
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Day Packages */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeading
            title="Delegate Packages"
            subtitle="All-inclusive per-person pricing. No hidden charges."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {meetingPackages.map((pkg, idx) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="border border-tertiary/20 rounded-sm p-6 space-y-4 bg-white"
              >
                <div className="text-center">
                  <h3 className="font-medium text-neutral text-lg">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-tertiary mt-1">{pkg.duration}</p>
                  <div className="mt-3">
                    <p className="text-3xl font-bold text-primary">
                      ₹{pkg.pricePerPerson.toLocaleString("en-IN")}
                    </p>
                    <p className="text-xs text-tertiary">per person</p>
                  </div>
                </div>

                <ul className="space-y-1.5 pt-4 border-t border-tertiary/10">
                  {pkg.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-tertiary"
                    >
                      <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                <Link href="/events/enquire">
                  <Button fullWidth variant="outlined" className="gap-2 mt-4">
                    Book This
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Conference Room Details */}
      {conferenceRoom && (
        <section className="py-16 px-4 bg-cream">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden">
                <Image
                  src={conferenceRoom.thumbnail}
                  alt="Conference Room"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="space-y-5">
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-medium text-neutral">
                  Conference Room Specs
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {conferenceRoom.seatingStyles.map((s) => (
                    <div key={s.style} className="bg-white rounded-sm p-3">
                      <p className="text-lg font-semibold text-primary">
                        {s.capacity}
                      </p>
                      <p className="text-xs text-tertiary">{s.style}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-1.5">
                  {conferenceRoom.amenities.slice(0, 6).map((a) => (
                    <p
                      key={a}
                      className="flex items-center gap-2 text-sm text-neutral/80"
                    >
                      <Check className="w-3.5 h-3.5 text-primary" />
                      {a}
                    </p>
                  ))}
                </div>
                <Link href={`/events/venues/${conferenceRoom.slug}`}>
                  <Button variant="outlined" size="sm" className="gap-2 mt-2">
                    View Full Details
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-tertiary">
            Need a customized setup or larger venue for your corporate event?
          </p>
          <Link href="/events/enquire">
            <Button className="gap-2 mt-4">
              Get a Custom Quote
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
