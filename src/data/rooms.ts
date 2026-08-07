export interface Room {
  id: string;
  /** Numeric id from Hotel API — required for create_booking */
  apiId?: number;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  currency: string;
  size: number;
  sizeUnit: string;
  maxGuests: number;
  bedType: string;
  view: string;
  images: string[];
  thumbnail: string;
  amenities: string[];
  features: string[];
  virtualTourUrl?: string;
  available: boolean;
  roomNumber?: string;
  categoryName?: string;
}

export const rooms: Room[] = [
  {
    id: "1",
    slug: "the-penthouse",
    name: "The Penthouse",
    tagline: "Where the sky meets luxury",
    description:
      "Our crown jewel — a sprawling penthouse suite with panoramic city views, private terrace, and bespoke furnishings. Features a separate living area, marble bathroom with soaking tub, and personal butler service.",
    price: 6000,
    currency: "INR",
    size: 120,
    sizeUnit: "m²",
    maxGuests: 4,
    bedType: "King",
    view: "City Panorama",
    images: [
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    amenities: [
      "Private Terrace",
      "Butler Service",
      "Soaking Tub",
      "Rain Shower",
      "Mini Bar",
      "Nespresso Machine",
      "Smart TV",
      "High-Speed WiFi",
      "Heated Floors",
      "Walk-in Closet",
    ],
    features: ["Panoramic Views", "Separate Living Area", "Dining for 6"],
    virtualTourUrl: "/virtual-tour?room=penthouse",
    available: true,
  },
  {
    id: "2",
    slug: "presidential-suite",
    name: "The Presidential Suite",
    tagline: "Uncompromising elegance",
    description:
      "The Presidential Suite epitomizes grandeur. The two-bedroom suite features a formal dining area, study, and a luxurious bathroom with chromotherapy lighting. Every detail has been curated for the most discerning guests.",
    price: 7000,
    currency: "INR",
    size: 150,
    sizeUnit: "m²",
    maxGuests: 4,
    bedType: "King",
    view: "Sea View",
    images: [
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    amenities: [
      "Private Jacuzzi",
      "Butler Service",
      "Grand Piano",
      "Rain Shower",
      "Premium Mini Bar",
      "Nespresso Machine",
      "Bang & Olufsen TV",
      "High-Speed WiFi",
      "Heated Floors",
      "Dressing Room",
    ],
    features: ["Two Bedrooms", "Private Jacuzzi", "Formal Dining"],
    virtualTourUrl: "/virtual-tour?room=presidential",
    available: true,
  },
  {
    id: "3",
    slug: "lumiere-classic",
    name: "Lumière Classic",
    tagline: "Timeless comfort, modern grace",
    description:
      "Our signature room blends classic design with modern amenities. Featuring handcrafted furniture, premium linens, and a marble-clad bathroom. Perfect for the refined traveler seeking comfort without compromise.",
    price: 3500,
    currency: "INR",
    size: 45,
    sizeUnit: "m²",
    maxGuests: 2,
    bedType: "Queen",
    view: "Garden",
    images: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    amenities: [
      "Rain Shower",
      "Mini Bar",
      "Nespresso Machine",
      "Smart TV",
      "High-Speed WiFi",
      "Plush Robes",
      "Turndown Service",
    ],
    features: ["Garden Views", "Handcrafted Furniture", "Marble Bathroom"],
    virtualTourUrl: "/virtual-tour?room=classic",
    available: true,
  },
  {
    id: "4",
    slug: "garden-retreat",
    name: "Garden Retreat",
    tagline: "Your private sanctuary",
    description:
      "Step directly into lush private gardens from this ground-floor retreat. Featuring floor-to-ceiling windows, an outdoor seating area, and nature-inspired décor that brings the outside in.",
    price: 4500,
    currency: "INR",
    size: 55,
    sizeUnit: "m²",
    maxGuests: 2,
    bedType: "King",
    view: "Garden",
    images: [
      "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=800&q=80",
    amenities: [
      "Private Garden Access",
      "Outdoor Seating",
      "Rain Shower",
      "Bathtub",
      "Mini Bar",
      "Nespresso Machine",
      "Smart TV",
      "High-Speed WiFi",
    ],
    features: ["Private Garden", "Ground Floor", "Outdoor Seating"],
    virtualTourUrl: "/virtual-tour?room=garden",
    available: true,
  },
  {
    id: "5",
    slug: "the-observatory",
    name: "The Observatory",
    tagline: "Elevated perspectives",
    description:
      "Perched on the top floor with a private rooftop terrace and telescope. This unique suite offers unobstructed views of the city skyline and stars. Features contemporary design with celestial-inspired accents.",
    price: 5500,
    currency: "INR",
    size: 85,
    sizeUnit: "m²",
    maxGuests: 3,
    bedType: "King",
    view: "City Skyline",
    images: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80",
    amenities: [
      "Rooftop Terrace",
      "Telescope",
      "Rain Shower",
      "Soaking Tub",
      "Premium Mini Bar",
      "Nespresso Machine",
      "Smart TV",
      "High-Speed WiFi",
      "Heated Floors",
    ],
    features: ["Rooftop Access", "Telescope", "360° Views"],
    virtualTourUrl: "/virtual-tour?room=observatory",
    available: true,
  },
  {
    id: "6",
    slug: "stone-studio",
    name: "Stone Studio",
    tagline: "Artful simplicity",
    description:
      "A beautifully designed compact studio inspired by natural stone textures. Ideal for solo travelers or couples seeking a stylish base. Every square meter is thoughtfully designed for maximum comfort.",
    price: 2000,
    currency: "INR",
    size: 32,
    sizeUnit: "m²",
    maxGuests: 2,
    bedType: "Queen",
    view: "Courtyard",
    images: [
      "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
    ],
    thumbnail: "https://images.unsplash.com/photo-1595576508898-0ad5c879a061?w=800&q=80",
    amenities: [
      "Rain Shower",
      "Mini Bar",
      "Smart TV",
      "High-Speed WiFi",
      "Work Desk",
      "Nespresso Machine",
    ],
    features: ["Compact Luxury", "Work-Friendly", "Stone Accents"],
    available: true,
  },
];
