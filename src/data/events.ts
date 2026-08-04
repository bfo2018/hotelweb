export interface Venue {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  type: "indoor" | "outdoor" | "indoor-outdoor";
  capacitySeated: number;
  capacityFloating: number;
  area: number;
  areaUnit: string;
  basePrice: number;
  currency: string;
  priceUnit: string;
  images: string[];
  thumbnail: string;
  panoramaUrl?: string;
  amenities: string[];
  seatingStyles: SeatingStyle[];
  suitableFor: EventType[];
  decorationTiers: DecorationTier[];
}

export interface SeatingStyle {
  style: string;
  capacity: number;
}

export interface DecorationTier {
  name: string;
  price: number;
  includes: string[];
}

export type EventType =
  | "wedding"
  | "engagement"
  | "birthday"
  | "anniversary"
  | "corporate"
  | "conference"
  | "other";

export interface WeddingPackage {
  id: string;
  name: string;
  tier: "silver" | "gold" | "platinum";
  pricePerPlate: number;
  minGuests: number;
  description: string;
  includes: string[];
  venueIncluded: string;
  roomsIncluded: number;
  highlighted?: boolean;
}

export interface MeetingPackage {
  id: string;
  name: string;
  pricePerPerson: number;
  duration: string;
  includes: string[];
}

export interface BookedDate {
  date: string;
  venue: string;
}

// --- Venues Data ---

export const venues: Venue[] = [
  {
    id: "v1",
    slug: "grand-banquet-hall",
    name: "Grand Banquet Hall",
    tagline: "The grandest stage for your grandest celebration",
    description:
      "Our flagship indoor banquet hall with soaring crystal chandeliers, Italian marble flooring, and a built-in stage. The Grand Hall transforms seamlessly from a regal wedding mandap to an elegant corporate gala. Climate-controlled with world-class acoustics and professional lighting rigs.",
    type: "indoor",
    capacitySeated: 300,
    capacityFloating: 500,
    area: 5000,
    areaUnit: "sq ft",
    basePrice: 75000,
    currency: "INR",
    priceUnit: "per event",
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=800&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
    panoramaUrl: "/virtual-tour?venue=banquet",
    amenities: [
      "Built-in Stage",
      "Crystal Chandeliers",
      "Professional Sound System",
      "LED Lighting Rig",
      "Green Rooms (Bride & Groom)",
      "Air Conditioning",
      "Valet Parking (100 cars)",
      "Bridal Suite Access",
      "In-house Catering",
      "Power Backup",
    ],
    seatingStyles: [
      { style: "Round Table (Wedding)", capacity: 300 },
      { style: "Theatre Style", capacity: 450 },
      { style: "Cocktail / Floating", capacity: 500 },
      { style: "U-Shape (Conference)", capacity: 80 },
      { style: "Classroom Style", capacity: 200 },
    ],
    suitableFor: ["wedding", "engagement", "corporate", "conference", "anniversary"],
    decorationTiers: [
      {
        name: "Classic",
        price: 50000,
        includes: [
          "Stage backdrop with draping",
          "Table centerpieces (fresh flowers)",
          "Entrance gate decoration",
          "Basic lighting setup",
          "Chair covers & ribbons",
        ],
      },
      {
        name: "Premium",
        price: 125000,
        includes: [
          "Designer mandap / stage setup",
          "Full floral arrangements",
          "LED entrance archway",
          "Mood lighting throughout",
          "Photo booth corner",
          "Table runners & premium linens",
          "Hanging floral installations",
        ],
      },
      {
        name: "Royal",
        price: 250000,
        includes: [
          "Custom-designed theme décor",
          "Imported flowers & installations",
          "Choreographed LED & laser show",
          "Grand entrance setup with fog",
          "Complete venue transformation",
          "Dedicated décor manager",
          "VIP lounge styling",
          "Drone-safe confetti cannons",
        ],
      },
    ],
  },
  {
    id: "v2",
    slug: "garden-lawn",
    name: "Garden Lawn",
    tagline: "Under the open sky, surrounded by green",
    description:
      "A lush 8,000 sq ft manicured lawn surrounded by heritage trees and fairy lights. Perfect for outdoor weddings, sangeet nights, haldi ceremonies, and cocktail parties. The open sky and natural surroundings create a magical ambiance that no indoor hall can replicate.",
    type: "outdoor",
    capacitySeated: 400,
    capacityFloating: 600,
    area: 8000,
    areaUnit: "sq ft",
    basePrice: 60000,
    currency: "INR",
    priceUnit: "per event",
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
    amenities: [
      "Open Air Venue",
      "Fairy Light Canopy",
      "Portable Stage",
      "Generator Backup",
      "Washroom Facilities",
      "Parking (150 cars)",
      "Rain Backup (Shamiana available)",
      "Baraat Entry Path",
      "DJ / Band Setup Area",
      "In-house Catering",
    ],
    seatingStyles: [
      { style: "Round Table (Wedding)", capacity: 400 },
      { style: "Cocktail / Floating", capacity: 600 },
      { style: "Theatre Style", capacity: 500 },
    ],
    suitableFor: ["wedding", "engagement", "birthday", "anniversary", "other"],
    decorationTiers: [
      {
        name: "Classic",
        price: 40000,
        includes: [
          "Entrance gate with flowers",
          "Stage setup with backdrop",
          "Fairy light ceiling",
          "Basic table décor",
          "Pathway lighting",
        ],
      },
      {
        name: "Premium",
        price: 100000,
        includes: [
          "Designer mandap with florals",
          "Full fairy light canopy",
          "Themed entrance corridor",
          "Floral table settings",
          "Photo garden corner",
          "LED pathway markers",
          "Hanging lanterns & chandeliers",
        ],
      },
      {
        name: "Royal",
        price: 200000,
        includes: [
          "Complete theme transformation",
          "Luxury mandap with imported flowers",
          "Fireworks / cold pyro coordination",
          "Ceiling draping & installations",
          "Custom signage & monograms",
          "Fog machine entry",
          "Dedicated décor team on-site",
          "Day-of coordination",
        ],
      },
    ],
  },
  {
    id: "v3",
    slug: "rooftop-terrace",
    name: "Rooftop Terrace",
    tagline: "Celebrate above it all",
    description:
      "An intimate rooftop venue with panoramic city views. Ideal for engagement parties, milestone birthdays, cocktail evenings, and small corporate gatherings. The open-air setting with city lights as your backdrop creates an unforgettable atmosphere.",
    type: "outdoor",
    capacitySeated: 80,
    capacityFloating: 150,
    area: 2500,
    areaUnit: "sq ft",
    basePrice: 35000,
    currency: "INR",
    priceUnit: "per event",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
      "https://images.unsplash.com/photo-1482275548304-a58859dc31b7?w=800&q=80",
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    amenities: [
      "City Skyline Views",
      "Built-in Bar Counter",
      "Ambient Lighting",
      "Sound System",
      "Elevator Access",
      "Washroom Facilities",
      "Weather Canopy (retractable)",
      "In-house Catering",
    ],
    seatingStyles: [
      { style: "Round Table", capacity: 80 },
      { style: "Cocktail / Floating", capacity: 150 },
      { style: "Theatre Style", capacity: 120 },
    ],
    suitableFor: ["engagement", "birthday", "anniversary", "corporate", "other"],
    decorationTiers: [
      {
        name: "Classic",
        price: 25000,
        includes: [
          "Balloon & floral arrangements",
          "Candle pathway",
          "Basic table décor",
          "Entrance board",
        ],
      },
      {
        name: "Premium",
        price: 60000,
        includes: [
          "Themed décor setup",
          "Fairy lights & lanterns",
          "Floral installations",
          "Custom backdrop for photos",
          "LED name signage",
          "Table styling & linens",
        ],
      },
    ],
  },
  {
    id: "v4",
    slug: "conference-room",
    name: "Conference Room",
    tagline: "Where ideas take shape",
    description:
      "A modern, fully-equipped conference room with natural light, ergonomic seating, and state-of-the-art AV technology. Perfect for board meetings, training sessions, presentations, and small corporate workshops.",
    type: "indoor",
    capacitySeated: 50,
    capacityFloating: 60,
    area: 1200,
    areaUnit: "sq ft",
    basePrice: 15000,
    currency: "INR",
    priceUnit: "per day",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
      "https://images.unsplash.com/photo-1505409859467-3a796fd5798e?w=800&q=80",
    ],
    thumbnail:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    amenities: [
      "4K Projector & Screen",
      "Video Conferencing Setup",
      "High-Speed WiFi",
      "Whiteboard & Markers",
      "Air Conditioning",
      "Notepads & Stationery",
      "Water & Tea/Coffee Service",
      "Sound System with Mics",
      "Dedicated Support Staff",
    ],
    seatingStyles: [
      { style: "Boardroom", capacity: 25 },
      { style: "U-Shape", capacity: 30 },
      { style: "Classroom", capacity: 40 },
      { style: "Theatre Style", capacity: 50 },
    ],
    suitableFor: ["corporate", "conference"],
    decorationTiers: [
      {
        name: "Business Setup",
        price: 5000,
        includes: [
          "Corporate branding display",
          "Welcome signage",
          "Floral table centerpiece",
          "Registration desk setup",
        ],
      },
    ],
  },
];

// --- Wedding Packages ---

export const weddingPackages: WeddingPackage[] = [
  {
    id: "wp1",
    name: "Silver",
    tier: "silver",
    pricePerPlate: 1200,
    minGuests: 100,
    description:
      "A complete wedding experience with all the essentials. Perfect for intimate celebrations that don't compromise on quality.",
    includes: [
      "Garden Lawn or Banquet Hall (1 event)",
      "Veg buffet menu (12 items + starters)",
      "Classic decoration package",
      "Basic sound & DJ setup",
      "Valet parking",
      "Standard lighting",
      "Service staff & event coordinator",
      "Complimentary baraat welcome dhol",
    ],
    venueIncluded: "Garden Lawn or Grand Banquet Hall",
    roomsIncluded: 2,
  },
  {
    id: "wp2",
    name: "Gold",
    tier: "gold",
    pricePerPlate: 1800,
    minGuests: 150,
    highlighted: true,
    description:
      "Our most popular wedding package — elevated dining, stunning décor, and seamless coordination for a celebration your guests will remember.",
    includes: [
      "Grand Banquet Hall + Garden Lawn (2 events: Wedding + Sangeet/Reception)",
      "Multi-cuisine buffet (18 items + live counters)",
      "Premium decoration package",
      "Professional DJ & sound system",
      "LED lighting & stage design",
      "Mandap setup with floral work",
      "Baraat entry with band & fireworks",
      "Photography-friendly décor spots",
      "Valet parking & guest coordination",
      "Dedicated wedding planner",
    ],
    venueIncluded: "Grand Banquet Hall + Garden Lawn",
    roomsIncluded: 5,
  },
  {
    id: "wp3",
    name: "Platinum",
    tier: "platinum",
    pricePerPlate: 2500,
    minGuests: 200,
    description:
      "The ultimate royal wedding experience. Every detail is bespoke, every moment is curated. For celebrations that deserve nothing less than extraordinary.",
    includes: [
      "All venues for 3 days (Haldi + Sangeet + Wedding + Reception)",
      "Luxury multi-cuisine spread (25+ items + 5 live counters)",
      "Royal decoration — full theme customization",
      "Celebrity DJ / Live band option",
      "Choreographed lighting & pyro show",
      "Designer mandap (imported flowers)",
      "Grand baraat with horse/vintage car",
      "Pre-wedding shoot locations access",
      "Complete guest management & hospitality",
      "Dedicated event manager + assistant",
      "Complimentary honeymoon suite for couple",
      "Airport transfers for VIP guests",
    ],
    venueIncluded: "All Venues — Full Hotel Buyout Option",
    roomsIncluded: 10,
  },
];

// --- Meeting Packages ---

export const meetingPackages: MeetingPackage[] = [
  {
    id: "mp1",
    name: "Half-Day Package",
    pricePerPerson: 800,
    duration: "4 hours",
    includes: [
      "Conference Room for 4 hours",
      "Projector & screen",
      "WiFi access",
      "Tea/coffee with cookies (2 breaks)",
      "Water & notepad",
      "Whiteboard & markers",
    ],
  },
  {
    id: "mp2",
    name: "Full-Day Delegate Package",
    pricePerPerson: 1500,
    duration: "8 hours",
    includes: [
      "Conference Room for 8 hours",
      "Projector, screen & sound system",
      "WiFi access",
      "Tea/coffee with snacks (2 breaks)",
      "Buffet lunch (veg & non-veg)",
      "Water, notepad & stationery",
      "Whiteboard & markers",
      "Dedicated support staff",
    ],
  },
  {
    id: "mp3",
    name: "Premium Full-Day Package",
    pricePerPerson: 2200,
    duration: "10 hours",
    includes: [
      "Conference Room for full day",
      "All AV equipment & video conferencing",
      "Unlimited WiFi",
      "Breakfast + lunch + hi-tea",
      "3 tea/coffee breaks with snacks",
      "Welcome kit with branding",
      "Dedicated support staff",
      "Complimentary parking",
      "Post-event room discount for delegates",
    ],
  },
];

// --- Booked dates (mock data for calendar) ---

export const bookedDates: BookedDate[] = [
  { date: "2026-08-15", venue: "grand-banquet-hall" },
  { date: "2026-08-16", venue: "grand-banquet-hall" },
  { date: "2026-08-22", venue: "garden-lawn" },
  { date: "2026-08-23", venue: "garden-lawn" },
  { date: "2026-08-29", venue: "grand-banquet-hall" },
  { date: "2026-09-05", venue: "grand-banquet-hall" },
  { date: "2026-09-06", venue: "garden-lawn" },
  { date: "2026-09-12", venue: "rooftop-terrace" },
  { date: "2026-09-19", venue: "grand-banquet-hall" },
  { date: "2026-09-20", venue: "grand-banquet-hall" },
  { date: "2026-10-02", venue: "garden-lawn" },
  { date: "2026-10-03", venue: "grand-banquet-hall" },
  { date: "2026-11-14", venue: "grand-banquet-hall" },
  { date: "2026-11-15", venue: "garden-lawn" },
  { date: "2026-12-25", venue: "grand-banquet-hall" },
  { date: "2026-12-31", venue: "rooftop-terrace" },
];

export const eventCategories = [
  {
    type: "wedding" as EventType,
    label: "Weddings",
    description: "Grand celebrations of love — from intimate to lavish",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80",
  },
  {
    type: "engagement" as EventType,
    label: "Engagements",
    description: "Mark the beginning of your forever",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600&q=80",
  },
  {
    type: "birthday" as EventType,
    label: "Birthday Parties",
    description: "From first birthdays to milestone celebrations",
    image: "https://images.unsplash.com/photo-1464349153159-4e725ab10577?w=600&q=80",
  },
  {
    type: "anniversary" as EventType,
    label: "Anniversaries",
    description: "Celebrate years of togetherness in style",
    image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?w=600&q=80",
  },
  {
    type: "corporate" as EventType,
    label: "Corporate Events",
    description: "Meetings, conferences & team celebrations",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
  },
  {
    type: "other" as EventType,
    label: "Other Celebrations",
    description: "Kitty parties, reunions, farewell dinners & more",
    image: "https://images.unsplash.com/photo-1482275548304-a58859dc31b7?w=600&q=80",
  },
];
