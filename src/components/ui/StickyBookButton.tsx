"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export function StickyBookButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-40 md:hidden"
        >
          <Link
            href="/rooms"
            className="flex items-center justify-center bg-primary text-white px-6 py-3.5 rounded-full shadow-lg hover:bg-primary-light transition-colors font-medium text-sm"
          >
            Book Now
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
