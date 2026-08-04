export interface Offer {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price?: number;
  discount?: string;
  validUntil: string;
  inclusions: string[];
  terms: string[];
}

export const offers: Offer[] = [
  {
    id: "1",
    slug: "romantic-escape",
    title: "Romantic Getaway",
    subtitle: "Two nights of togetherness",
    description:
      "Create unforgettable memories with your special someone. Enjoy a beautifully decorated room, a private candlelit dinner under the stars, and a rejuvenating couples wellness session — all designed to celebrate your bond.",
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&q=80",
    price: 45000,
    validUntil: "2026-12-31",
    inclusions: [
      "2-night stay in Garden Retreat",
      "Welcome drinks & sweets on arrival",
      "Couples wellness session (90 min)",
      "Private candlelit dinner",
      "Late checkout (2pm)",
    ],
    terms: ["Subject to availability", "Non-refundable", "Blackout dates apply"],
  },
  {
    id: "2",
    slug: "extended-stay",
    title: "Stay Longer, Save More",
    subtitle: "Up to 30% off stays of 5+ nights",
    description:
      "Make Lumière & Stone your home away from home. Extended stays of 5 nights or more enjoy significant savings plus complimentary daily breakfast.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    discount: "30% OFF",
    validUntil: "2026-11-30",
    inclusions: [
      "30% off best available rate",
      "Daily breakfast for two",
      "Welcome amenity",
      "Complimentary pressing service",
      "Flexible cancellation",
    ],
    terms: ["Minimum 5-night stay", "Cannot combine with other offers"],
  },
  {
    id: "3",
    slug: "wellness-retreat",
    title: "Wellness Retreat",
    subtitle: "Restore mind, body & soul",
    description:
      "A transformative 3-night wellness journey including daily yoga, personalized Ayurveda treatments, healthy dining menus, and guided meditation sessions.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?w=800&q=80",
    price: 65000,
    validUntil: "2026-12-31",
    inclusions: [
      "3-night stay in Observatory Suite",
      "Daily morning yoga session",
      "2 Ayurveda treatments per person",
      "Wellness menu dining",
      "Guided meditation sessions",
      "Aromatherapy turndown",
    ],
    terms: ["Subject to availability", "72-hour cancellation policy"],
  },
  {
    id: "4",
    slug: "weekend-brunch",
    title: "Weekend & Brunch",
    subtitle: "The ultimate city weekend",
    description:
      "Turn your weekend into a celebration. Arrive Friday, indulge in our legendary Saturday brunch, and enjoy a leisurely Sunday before departure.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
    price: 25000,
    validUntil: "2026-10-31",
    inclusions: [
      "2-night weekend stay",
      "Saturday brunch for two",
      "Welcome cocktails",
      "Late checkout Sunday (3pm)",
      "Complimentary valet parking",
    ],
    terms: ["Friday-Sunday only", "Subject to availability"],
  },
];
