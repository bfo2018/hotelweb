"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, User, LogOut, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/auth";

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
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const customer = useAuthStore((s) => s.customer);
  const hydrated = useAuthStore((s) => s.hydrated);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const logout = useAuthStore((s) => s.logout);
  const loggedIn = hydrated && isAuthenticated();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    setAccountOpen(false);
    setIsMobileMenuOpen(false);
    await logout();
    router.push("/");
  };

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

              {loggedIn ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setAccountOpen((o) => !o)}
                    className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                      isScrolled ? "text-neutral/80" : "text-white/90"
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span className="max-w-[120px] truncate">
                      {customer?.full_name?.split(" ")[0] || "Account"}
                    </span>
                  </button>
                  <AnimatePresence>
                    {accountOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-sm shadow-lg border border-tertiary/15 py-1 z-50"
                      >
                        <Link
                          href="/my-bookings"
                          onClick={() => setAccountOpen(false)}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-neutral hover:bg-cream"
                        >
                          <CalendarCheck className="w-4 h-4 text-primary" />
                          My Bookings
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-neutral hover:bg-cream"
                        >
                          <LogOut className="w-4 h-4 text-primary" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  href="/login"
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isScrolled ? "text-neutral/80" : "text-white/90"
                  }`}
                >
                  Sign In
                </Link>
              )}

              <Link href="/book">
                <Button variant={isScrolled ? "primary" : "inverted"} size="sm">
                  Book Now
                </Button>
              </Link>
            </div>

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

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden overflow-y-auto"
          >
            <nav className="flex flex-col gap-6 pb-12">
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

              {loggedIn ? (
                <>
                  <Link
                    href="/my-bookings"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="font-[family-name:var(--font-playfair)] text-2xl text-neutral hover:text-primary transition-colors"
                  >
                    My Bookings
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="text-left font-[family-name:var(--font-playfair)] text-2xl text-neutral hover:text-primary transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-[family-name:var(--font-playfair)] text-2xl text-neutral hover:text-primary transition-colors"
                >
                  Sign In
                </Link>
              )}

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
