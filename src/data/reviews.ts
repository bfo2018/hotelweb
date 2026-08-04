export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  roomType: string;
  avatar?: string;
}

export const reviews: Review[] = [
  {
    id: "1",
    name: "Alexandra Chen",
    location: "Singapore",
    rating: 5,
    text: "An absolute gem. The attention to detail is extraordinary — from the hand-written welcome note to the perfectly curated minibar. The Presidential Suite took my breath away.",
    date: "2026-06-15",
    roomType: "Presidential Suite",
  },
  {
    id: "2",
    name: "James Whitworth",
    location: "London, UK",
    rating: 5,
    text: "Lumière & Stone redefines boutique hospitality. The staff remembered my coffee preference from day one. The rooftop bar at sunset is simply unmissable.",
    date: "2026-05-22",
    roomType: "The Observatory",
  },
  {
    id: "3",
    name: "Maria Fernandez",
    location: "Barcelona, Spain",
    rating: 5,
    text: "We celebrated our anniversary here and it was perfection. The garden retreat room felt like our own private oasis. Already planning our return visit.",
    date: "2026-07-03",
    roomType: "Garden Retreat",
  },
  {
    id: "4",
    name: "David & Sarah Mitchell",
    location: "Melbourne, Australia",
    rating: 4,
    text: "Beautifully designed spaces with genuine warmth from every staff member. The AI concierge was surprisingly helpful for restaurant recommendations. A true boutique experience.",
    date: "2026-04-18",
    roomType: "Lumière Classic",
  },
  {
    id: "5",
    name: "Yuki Tanaka",
    location: "Tokyo, Japan",
    rating: 5,
    text: "The 360° virtual tour convinced me to book, and reality exceeded expectations. Impeccable taste in every corner. The Ayurveda wellness session was world-class.",
    date: "2026-06-28",
    roomType: "The Penthouse",
  },
];
