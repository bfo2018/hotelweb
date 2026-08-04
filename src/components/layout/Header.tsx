"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/rooms", label: "Rooms & Suites" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/events", label: "Weddings & Events" },
  { href: "/explore", label: "Explore" },
  { href: "/offers", label: "Offers" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <span
                className={`font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-medium tracking-tight transition-colors ${
                  isScrolled ? "text-primary" : "text-white"
                }`}
              >
                LUMIÈRE
              </span>
              <span
                className={`text-xs tracking-[0.3em] uppercase transition-colors ${
                  isScrolled ? "text-tertiary" : "text-white/80"
                }`}
              >
                & Stone
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
                    isScrolled ? "text-neutral/80" : "text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <a
                href="tel:+917483667939"
                className={`flex items-center gap-2 text-sm transition-colors ${
                  isScrolled ? "text-neutral/70" : "text-white/80"
                }`}
              >
                <Phone className="w-4 h-4" />
                <span>+91 7483667939</span>
              </a>
              <Link href="/book">
                <Button variant={isScrolled ? "primary" : "inverted"} size="sm">
                  Book Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 transition-colors ${
                isScrolled ? "text-neutral" : "text-white"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-[family-name:var(--font-playfair)] text-2xl text-neutral hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-tertiary/20">
                <Link href="/book" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button fullWidth size="lg">
                    Book Now
                  </Button>
                </Link>
              </div>
              <a
                href="tel:+917483667939"
                className="flex items-center gap-2 text-tertiary"
              >
                <Phone className="w-4 h-4" />
                +91 7483667939
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
