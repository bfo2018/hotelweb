"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { menuItems, MenuItem, MenuCategory, DietaryTag } from "@/data/restaurant";
import { Flame, Star, Download, ArrowRight, Leaf } from "lucide-react";

const foodCategories: { key: MenuCategory; label: string }[] = [
  { key: "starters", label: "Starters" },
  { key: "mains", label: "Mains" },
  { key: "desserts", label: "Desserts" },
  { key: "chefs-specials", label: "Chef's Specials" },
];

const drinkCategories: { key: MenuCategory; label: string }[] = [
  { key: "cocktails", label: "Cocktails" },
  { key: "wines", label: "Wines" },
  { key: "beverages", label: "Beverages" },
];

const dietaryLabels: Record<DietaryTag, { label: string; color: string }> = {
  vegetarian: { label: "V", color: "bg-green-100 text-green-700" },
  vegan: { label: "VG", color: "bg-emerald-100 text-emerald-700" },
  "gluten-free": { label: "GF", color: "bg-amber-100 text-amber-700" },
  "dairy-free": { label: "DF", color: "bg-blue-100 text-blue-700" },
  "nut-free": { label: "NF", color: "bg-purple-100 text-purple-700" },
  spicy: { label: "🌶", color: "bg-red-100 text-red-700" },
};

function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="flex items-start justify-between gap-4 py-6 border-b border-tertiary/10 last:border-b-0"
    >
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-medium text-neutral">
            {item.name}
          </h3>
          {item.isChefsPick && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-gold bg-gold/10 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-gold" />
              Chef&apos;s Pick
            </span>
          )}
        </div>
        <p className="text-sm text-tertiary leading-relaxed">
          {item.description}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          {item.dietaryTags.map((tag) => (
            <span
              key={tag}
              className={`text-xs font-medium px-1.5 py-0.5 rounded ${dietaryLabels[tag].color}`}
            >
              {dietaryLabels[tag].label}
            </span>
          ))}
          {item.spiceLevel > 0 && (
            <span className="flex items-center gap-0.5">
              {Array.from({ length: item.spiceLevel }).map((_, i) => (
                <Flame key={i} className="w-3 h-3 text-red-500" />
              ))}
            </span>
          )}
        </div>
      </div>
      <p className="text-lg font-semibold text-primary whitespace-nowrap">
        ₹{item.price.toLocaleString("en-IN")}
      </p>
    </motion.div>
  );
}

export default function MenuPage() {
  const [menuType, setMenuType] = useState<"food" | "drinks">("food");
  const [activeCategory, setActiveCategory] = useState<MenuCategory>("starters");

  const categories = menuType === "food" ? foodCategories : drinkCategories;
  const filteredItems = menuItems.filter(
    (item) => item.menuType === menuType && item.category === activeCategory
  );

  const handleMenuTypeChange = (type: "food" | "drinks") => {
    setMenuType(type);
    setActiveCategory(type === "food" ? "starters" : "cocktails");
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 px-4 bg-cream">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
              Verdure
            </p>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl text-neutral font-medium">
              The Menu
            </h1>
            <p className="mt-4 text-lg text-tertiary max-w-xl mx-auto">
              Seasonal ingredients, refined technique, and flavours that linger
              in memory.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Menu Content */}
      <section className="py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Menu Type Toggle */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <button
              onClick={() => handleMenuTypeChange("food")}
              className={`px-6 py-2.5 rounded-sm text-sm font-medium transition-all ${
                menuType === "food"
                  ? "bg-primary text-white"
                  : "bg-cream text-tertiary hover:text-neutral"
              }`}
            >
              Food Menu
            </button>
            <button
              onClick={() => handleMenuTypeChange("drinks")}
              className={`px-6 py-2.5 rounded-sm text-sm font-medium transition-all ${
                menuType === "drinks"
                  ? "bg-primary text-white"
                  : "bg-cream text-tertiary hover:text-neutral"
              }`}
            >
              Drinks & Bar
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-8 border-b border-tertiary/20">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-all border-b-2 -mb-[2px] ${
                  activeCategory === cat.key
                    ? "border-primary text-primary"
                    : "border-transparent text-tertiary hover:text-neutral"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Menu Items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {filteredItems.length > 0 ? (
                <div>
                  {filteredItems.map((item) => (
                    <MenuItemCard key={item.id} item={item} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-tertiary py-12">
                  Menu items coming soon.
                </p>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Dietary Legend */}
          <div className="mt-12 pt-8 border-t border-tertiary/20">
            <p className="text-xs uppercase tracking-wider text-tertiary font-medium mb-3">
              Dietary Key
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="flex items-center gap-1.5 text-xs text-tertiary">
                <Leaf className="w-3 h-3 text-green-600" /> V = Vegetarian
              </span>
              <span className="flex items-center gap-1.5 text-xs text-tertiary">
                VG = Vegan
              </span>
              <span className="flex items-center gap-1.5 text-xs text-tertiary">
                GF = Gluten-Free
              </span>
              <span className="flex items-center gap-1.5 text-xs text-tertiary">
                DF = Dairy-Free
              </span>
              <span className="flex items-center gap-1.5 text-xs text-tertiary">
                <Flame className="w-3 h-3 text-red-500" /> = Spice Level
              </span>
            </div>
          </div>

          {/* Download + Reserve CTA */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-cream rounded-sm">
            <div>
              <p className="font-medium text-neutral">
                Want a copy for your table?
              </p>
              <p className="text-sm text-tertiary">
                Download the full menu as a PDF
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="/menu.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-tertiary/30 rounded-sm text-sm font-medium text-neutral hover:border-primary hover:text-primary transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
              <Link href="/restaurant/reserve">
                <Button size="sm" className="gap-2">
                  Reserve a Table
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
