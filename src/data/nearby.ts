export type PlaceCategory = "Heritage" | "Temple" | "Nature" | "Historical";

export interface NearbyPlace {
  id: string;
  slug: string;
  name: string;
  category: PlaceCategory;
  description: string;
  /** Approximate distance from the hotel — verify with hotel team before publish */
  distanceKm: number;
  /** Approximate travel time by car — verify with hotel team before publish */
  travelTime: string;
  bestTime: string;
  image: string;
}

export interface DayTrip {
  id: string;
  title: string;
  duration: string;
  description: string;
  stops: {
    name: string;
    timing: string;
    note?: string;
  }[];
  image: string;
}

/**
 * Nearby attractions in and around Tikamgarh, Madhya Pradesh.
 * Focused on local / regional day-trip places (not far destinations like Orchha).
 * Distances and travel times are approximate — hotel staff should confirm before going live.
 */
export const nearbyPlaces: NearbyPlace[] = [
  {
    id: "p1",
    slug: "bheem-kund",
    name: "Bheem Kund",
    category: "Nature",
    description:
      "A natural underground spring and kund near Bajna — crystal-clear waters in a dramatic rocky setting. One of the most visited nature spots from Tikamgarh.",
    distanceKm: 45,
    travelTime: "Approx. 1–1.5 hrs",
    bestTime: "Oct – Mar",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: "p2",
    slug: "kundeshwar-mahadev",
    name: "Kundeshwar Mahadev Temple",
    category: "Temple",
    description:
      "A revered Shiva temple near Tikamgarh with a peaceful campus, picnic lawns, and the scenic Usha Waterfall nearby — ideal for a short local outing.",
    distanceKm: 12,
    travelTime: "Approx. 20–30 mins",
    bestTime: "Monsoon & Winter",
    image:
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&q=80",
  },
  {
    id: "p3",
    slug: "usha-waterfall",
    name: "Usha Waterfall",
    category: "Nature",
    description:
      "A scenic waterfall near Kundeshwar — especially beautiful after the rains. Perfect for a picnic and a quiet half-day with family.",
    distanceKm: 14,
    travelTime: "Approx. 25–35 mins",
    bestTime: "Monsoon – Winter",
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
  },
  {
    id: "p4",
    slug: "papora-ji",
    name: "Papora Ji Jain Temples",
    category: "Temple",
    description:
      "A serene cluster of around 80 old Jain temples near Tikamgarh — an important local pilgrimage site with quiet courtyards and carved shrines.",
    distanceKm: 8,
    travelTime: "Approx. 15–20 mins",
    bestTime: "Morning",
    image:
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80",
  },
  {
    id: "p5",
    slug: "aharji-jain-tirth",
    name: "Aharji Digambar Jain Tirth",
    category: "Temple",
    description:
      "A peaceful Digambar Jain pilgrimage centre near Tikamgarh, known for its temple complex and spiritual calm — a meaningful stop for devotees and visitors alike.",
    distanceKm: 25,
    travelTime: "Approx. 40–50 mins",
    bestTime: "Morning",
    image:
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800&q=80",
  },
  {
    id: "p6",
    slug: "baldeogarh-fort",
    name: "Baldeogarh Fort",
    category: "Heritage",
    description:
      "A historic fort near Tikamgarh with hilltop views and Bundela-era character — a quieter heritage stop without a long journey.",
    distanceKm: 28,
    travelTime: "Approx. 45–60 mins",
    bestTime: "Oct – Mar",
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
  },
  {
    id: "p7",
    slug: "tikamgarh-town",
    name: "Tikamgarh Town & Local Markets",
    category: "Historical",
    description:
      "Explore the district town — local temples, markets, and everyday Bundelkhand life. Easy to combine with a morning walk or evening stroll from the hotel.",
    distanceKm: 3,
    travelTime: "Approx. 10 mins",
    bestTime: "Evening",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800&q=80",
  },
  {
    id: "p8",
    slug: "khajuraho-temples",
    name: "Khajuraho Temples",
    category: "Heritage",
    description:
      "UNESCO World Heritage temples famous for intricate stone carvings — the classic day trip from Tikamgarh for art, history, and architecture lovers.",
    distanceKm: 100,
    travelTime: "Approx. 2–2.5 hrs",
    bestTime: "Oct – Mar",
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
  },
  {
    id: "p9",
    slug: "raneh-falls",
    name: "Raneh Falls (near Khajuraho)",
    category: "Nature",
    description:
      "A canyon waterfall on the Ken River near Khajuraho — dramatic rock formations and monsoon beauty. Combine with a Khajuraho temple visit.",
    distanceKm: 110,
    travelTime: "Approx. 2.5 hrs",
    bestTime: "Monsoon – Winter",
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=800&q=80",
  },
];

export const dayTrips: DayTrip[] = [
  {
    id: "dt1",
    title: "Tikamgarh Temples & Nature",
    duration: "Half Day",
    description:
      "Stay close to home — Papora Ji, Kundeshwar, and Usha Waterfall in one easy outing from the hotel.",
    stops: [
      {
        name: "Papora Ji Jain Temples",
        timing: "8:00 AM – 9:30 AM",
        note: "Peaceful morning start",
      },
      {
        name: "Kundeshwar Mahadev Temple",
        timing: "10:00 AM – 11:30 AM",
      },
      {
        name: "Usha Waterfall & Picnic",
        timing: "11:45 AM – 1:30 PM",
        note: "Best after monsoon rains",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?w=800&q=80",
  },
  {
    id: "dt2",
    title: "Bheem Kund Nature Trip",
    duration: "Half Day – Full Day",
    description:
      "A scenic drive to Bheem Kund’s natural spring — ideal for photography, a picnic, and a refreshing day outdoors.",
    stops: [
      {
        name: "Drive to Bheem Kund (Bajna)",
        timing: "8:00 AM – 9:30 AM",
      },
      {
        name: "Bheem Kund exploration",
        timing: "9:30 AM – 12:30 PM",
        note: "Carry water & comfortable shoes",
      },
      {
        name: "Picnic / lunch nearby",
        timing: "12:30 PM – 2:00 PM",
      },
      {
        name: "Return to hotel",
        timing: "2:00 PM onwards",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: "dt3",
    title: "Khajuraho Day Trip",
    duration: "Full Day",
    description:
      "The region’s most famous heritage outing — Western Group temples, then optional Raneh Falls if time and season allow.",
    stops: [
      {
        name: "Drive to Khajuraho",
        timing: "7:00 AM – 9:30 AM",
      },
      {
        name: "Western Group of Temples",
        timing: "9:30 AM – 1:00 PM",
        note: "UNESCO World Heritage site",
      },
      {
        name: "Lunch in Khajuraho",
        timing: "1:00 PM – 2:00 PM",
      },
      {
        name: "Raneh Falls (optional) or return",
        timing: "2:30 PM onwards",
      },
    ],
    image:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
  },
];

/** Approximate map center — Tikamgarh, Madhya Pradesh */
export const hotelMapCenter = {
  lat: 24.7435,
  lng: 78.8306,
  label: "Lumière & Stone, Tikamgarh",
};
