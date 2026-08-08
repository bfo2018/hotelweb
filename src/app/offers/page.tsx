"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { offers } from "@/data/offers";
import { ArrowRight, Calendar, Check } from "lucide-react";

export default function OffersPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80"
            alt="Lumière & Stone special offers"
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
              Exclusive
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl text-white font-medium">
              Offers & Packages
            </h1>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              Curated experiences designed to make your stay even more
              extraordinary
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16">
            {offers.map((offer, idx) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 items-center ${
                  idx % 2 === 1 ? "" : ""
                }`}
              >
                <div
                  className={`relative aspect-[4/3] rounded-sm overflow-hidden ${
                    idx % 2 === 1 ? "lg:order-2" : ""
                  }`}
                >
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {offer.discount && (
                    <div className="absolute top-4 left-4 bg-primary text-white text-sm font-bold px-4 py-2 rounded-sm">
                      {offer.discount}
                    </div>
                  )}
                </div>
                <div
                  className={`space-y-5 ${idx % 2 === 1 ? "lg:order-1" : ""}`}
                >
                  <div>
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-medium text-neutral">
                      {offer.title}
                    </h2>
                    <p className="text-primary font-medium mt-1">
                      {offer.subtitle}
                    </p>
                  </div>
                  <p className="text-tertiary leading-relaxed">
                    {offer.description}
                  </p>

                  {/* Inclusions */}
                  <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wider text-tertiary font-medium">
                      Package Includes
                    </p>
                    <ul className="space-y-1.5">
                      {offer.inclusions.map((item) => (
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

                  {/* Price & CTA */}
                  <div className="flex items-center justify-between pt-4 border-t border-tertiary/20">
                    <div>
                      {offer.price && (
                        <p className="text-2xl font-semibold text-primary">
                          ₹{offer.price.toLocaleString("en-IN")}
                          <span className="text-sm font-normal text-tertiary ml-1">
                            per package
                          </span>
                        </p>
                      )}
                      <p className="flex items-center gap-1.5 text-xs text-tertiary mt-1">
                        <Calendar className="w-3 h-3" />
                        Valid until{" "}
                        {new Date(offer.validUntil).toLocaleDateString("en-IN", {
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <Link href="/rooms">
                      <Button size="sm" className="gap-2">
                        Book Now
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-cream">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl text-neutral font-medium">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="mt-3 text-tertiary">
            Contact us for custom packages tailored to your needs — weddings,
            corporate retreats, family celebrations, and more.
          </p>
          <div className="mt-6">
            <Link href="/contact">
              <Button variant="outlined" className="gap-2">
                Get in Touch
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
