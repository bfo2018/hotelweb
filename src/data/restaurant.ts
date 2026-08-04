export interface RestaurantInfo {
  name: string;
  tagline: string;
  cuisine: string;
  description: string;
  chefName: string;
  chefTitle: string;
  chefBio: string;
  philosophy: string;
  ambiance: string;
  dressCode: string;
  priceRange: string;
  hours: {
    breakfast: string;
    lunch: string;
    dinner: string;
    bar: string;
  };
  specialNights: string[];
  phone: string;
  email: string;
  capacity: number;
  heroImage: string;
  galleryImages: string[];
  panoramaUrl: string;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: MenuCategory;
  menuType: "food" | "drinks";
  dietaryTags: DietaryTag[];
  spiceLevel: 0 | 1 | 2 | 3;
  isChefsPick: boolean;
  image?: string;
}

export type MenuCategory =
  | "starters"
  | "mains"
  | "desserts"
  | "beverages"
  | "chefs-specials"
  | "cocktails"
  | "wines"
  | "spirits";

export type DietaryTag =
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "dairy-free"
  | "nut-free"
  | "spicy";

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface PrivateDiningRoom {
  id: string;
  name: string;
  capacity: number;
  description: string;
  features: string[];
  image: string;
  priceFrom: number;
}

// --- Mock Data ---

export const restaurantInfo: RestaurantInfo = {
  name: "Verdure",
  tagline: "Where fire meets finesse",
  cuisine: "Modern European with Asian inflections",
  description:
    "Verdure is the culinary heart of Lumière & Stone — a destination restaurant where seasonal ingredients are elevated through technique, creativity, and genuine passion. Open to hotel guests and local diners alike, our dining room celebrates the art of gathering around exceptional food.",
  chefName: "Chef Adriana Moretti",
  chefTitle: "Executive Chef",
  chefBio:
    "With two decades spanning Michelin-starred kitchens in Lyon, Tokyo, and Copenhagen, Chef Adriana brings a philosophy rooted in respect for ingredients. Her cooking is precise yet soulful — modern European foundations enriched with the umami depth and delicate balance she mastered in Japan.",
  philosophy:
    "We believe great food begins with great relationships — with farmers, fishermen, and foragers who share our obsession with quality. Every dish tells the story of its origin, transformed with technique but never disguised.",
  ambiance:
    "Warm terracotta tones, floor-to-ceiling windows overlooking the courtyard garden, soft candlelight, and a soundtrack that moves from afternoon jazz to evening soul. The space breathes — intimate enough for a quiet dinner, alive enough for celebration.",
  dressCode: "Smart casual. Elegant but never stiff.",
  priceRange: "₹₹₹",
  hours: {
    breakfast: "7:00 AM – 10:30 AM",
    lunch: "12:00 PM – 3:00 PM",
    dinner: "6:30 PM – 11:00 PM",
    bar: "5:00 PM – 1:00 AM",
  },
  specialNights: [
    "Live Jazz — Thursday & Saturday evenings",
    "Chef's Table Experience — Friday (8-course tasting)",
    "Sunday Long Lunch — relaxed 4-course with wine pairing",
  ],
  phone: "+91 7483667939",
  email: "info@billju.in",
  capacity: 80,
  heroImage:
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80",
  galleryImages: [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=800&q=80",
    "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    "https://images.unsplash.com/photo-1482275548304-a58859dc31b7?w=800&q=80",
    "https://images.unsplash.com/photo-1560053608-13721e0d69e8?w=800&q=80",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  ],
  panoramaUrl: "/images/tour/restaurant-panorama.jpg",
};

export const menuItems: MenuItem[] = [
  // Starters
  {
    id: "s1",
    name: "Burrata & Heirloom Tomato",
    description:
      "Creamy burrata, vine-ripened heirloom tomatoes, aged balsamic, basil oil, toasted sourdough",
    price: 750,
    currency: "INR",
    category: "starters",
    menuType: "food",
    dietaryTags: ["vegetarian"],
    spiceLevel: 0,
    isChefsPick: true,
  },
  {
    id: "s2",
    name: "Tuna Tartare",
    description:
      "Yellowfin tuna, avocado mousse, crispy wonton, yuzu-soy dressing, tobiko",
    price: 950,
    currency: "INR",
    category: "starters",
    menuType: "food",
    dietaryTags: ["gluten-free", "dairy-free"],
    spiceLevel: 1,
    isChefsPick: false,
  },
  {
    id: "s3",
    name: "Wild Mushroom Velouté",
    description:
      "Silky porcini and chanterelle soup, truffle cream, crispy sage, parmesan tuile",
    price: 650,
    currency: "INR",
    category: "starters",
    menuType: "food",
    dietaryTags: ["vegetarian"],
    spiceLevel: 0,
    isChefsPick: false,
  },
  {
    id: "s4",
    name: "Hamachi Crudo",
    description:
      "Thinly sliced yellowtail, jalapeño, ponzu, microgreens, sesame oil",
    price: 900,
    currency: "INR",
    category: "starters",
    menuType: "food",
    dietaryTags: ["gluten-free", "dairy-free"],
    spiceLevel: 2,
    isChefsPick: true,
  },
  // Mains
  {
    id: "m1",
    name: "Pan-Seared Sea Bass",
    description:
      "Line-caught sea bass, saffron risotto, braised fennel, citrus beurre blanc",
    price: 1450,
    currency: "INR",
    category: "mains",
    menuType: "food",
    dietaryTags: ["gluten-free"],
    spiceLevel: 0,
    isChefsPick: true,
  },
  {
    id: "m2",
    name: "Wagyu Ribeye 300g",
    description:
      "Australian wagyu MB7, bone marrow butter, roasted garlic jus, triple-cooked chips",
    price: 3500,
    currency: "INR",
    category: "mains",
    menuType: "food",
    dietaryTags: [],
    spiceLevel: 0,
    isChefsPick: true,
  },
  {
    id: "m3",
    name: "Miso-Glazed Eggplant",
    description:
      "Roasted eggplant, white miso glaze, pickled ginger, sesame, steamed rice, bok choy",
    price: 1200,
    currency: "INR",
    category: "mains",
    menuType: "food",
    dietaryTags: ["vegan", "dairy-free"],
    spiceLevel: 1,
    isChefsPick: false,
  },
  {
    id: "m4",
    name: "Duck Breast à l'Orange",
    description:
      "Roasted duck breast, blood orange glaze, dauphinoise potato, charred radicchio",
    price: 1650,
    currency: "INR",
    category: "mains",
    menuType: "food",
    dietaryTags: ["gluten-free"],
    spiceLevel: 0,
    isChefsPick: false,
  },
  {
    id: "m5",
    name: "Wild Truffle Risotto",
    description:
      "Arborio rice, black truffle shavings, parmigiano reggiano, brown butter, chives",
    price: 1350,
    currency: "INR",
    category: "mains",
    menuType: "food",
    dietaryTags: ["vegetarian", "gluten-free"],
    spiceLevel: 0,
    isChefsPick: false,
  },
  // Desserts
  {
    id: "d1",
    name: "Dark Chocolate Fondant",
    description:
      "Valrhona 70% chocolate, molten centre, vanilla bean ice cream, salted caramel",
    price: 650,
    currency: "INR",
    category: "desserts",
    menuType: "food",
    dietaryTags: ["vegetarian"],
    spiceLevel: 0,
    isChefsPick: true,
  },
  {
    id: "d2",
    name: "Yuzu Panna Cotta",
    description:
      "Citrus-infused cream, passion fruit coulis, white chocolate tuile, mint",
    price: 550,
    currency: "INR",
    category: "desserts",
    menuType: "food",
    dietaryTags: ["vegetarian", "gluten-free"],
    spiceLevel: 0,
    isChefsPick: false,
  },
  {
    id: "d3",
    name: "Cheese Selection",
    description:
      "Curated artisan cheeses, honeycomb, fig compote, walnut bread, seasonal fruit",
    price: 850,
    currency: "INR",
    category: "desserts",
    menuType: "food",
    dietaryTags: ["vegetarian"],
    spiceLevel: 0,
    isChefsPick: false,
  },
  // Chef's Specials
  {
    id: "cs1",
    name: "8-Course Tasting Menu",
    description:
      "Chef Adriana's seasonal journey — eight courses with optional wine pairing. A celebration of technique and terroir.",
    price: 8500,
    currency: "INR",
    category: "chefs-specials",
    menuType: "food",
    dietaryTags: [],
    spiceLevel: 0,
    isChefsPick: true,
  },
  {
    id: "cs2",
    name: "Lobster Thermidor",
    description:
      "Whole Maine lobster, brandy cream sauce, gruyère gratin, hand-cut frites, garden salad",
    price: 3800,
    currency: "INR",
    category: "chefs-specials",
    menuType: "food",
    dietaryTags: [],
    spiceLevel: 0,
    isChefsPick: true,
  },
  // Cocktails
  {
    id: "c1",
    name: "Verdure Signature",
    description: "Gin, elderflower, cucumber, champagne top, edible flowers",
    price: 750,
    currency: "INR",
    category: "cocktails",
    menuType: "drinks",
    dietaryTags: ["vegan", "gluten-free"],
    spiceLevel: 0,
    isChefsPick: true,
  },
  {
    id: "c2",
    name: "Smoky Old Fashioned",
    description:
      "Japanese whisky, smoked maple syrup, Angostura bitters, torched orange",
    price: 850,
    currency: "INR",
    category: "cocktails",
    menuType: "drinks",
    dietaryTags: ["vegan", "gluten-free"],
    spiceLevel: 0,
    isChefsPick: true,
  },
  {
    id: "c3",
    name: "Spiced Margarita",
    description:
      "Reposado tequila, Cointreau, lime, chilli-salt rim, jalapeño slice",
    price: 700,
    currency: "INR",
    category: "cocktails",
    menuType: "drinks",
    dietaryTags: ["vegan", "gluten-free", "spicy"],
    spiceLevel: 2,
    isChefsPick: false,
  },
  {
    id: "c4",
    name: "Garden Spritz",
    description:
      "Aperol, prosecco, basil, grapefruit tonic, rosemary sprig",
    price: 650,
    currency: "INR",
    category: "cocktails",
    menuType: "drinks",
    dietaryTags: ["vegan", "gluten-free"],
    spiceLevel: 0,
    isChefsPick: false,
  },
  // Wines
  {
    id: "w1",
    name: "Sancerre, Domaine Vacheron",
    description: "Loire Valley, France — crisp minerality, citrus, white flowers",
    price: 800,
    currency: "INR",
    category: "wines",
    menuType: "drinks",
    dietaryTags: ["vegan"],
    spiceLevel: 0,
    isChefsPick: true,
  },
  {
    id: "w2",
    name: "Barolo, Marchesi di Barolo",
    description: "Piedmont, Italy — dark cherry, leather, rose petal, long finish",
    price: 1200,
    currency: "INR",
    category: "wines",
    menuType: "drinks",
    dietaryTags: ["vegan"],
    spiceLevel: 0,
    isChefsPick: false,
  },
  // Beverages (non-alcoholic)
  {
    id: "b1",
    name: "Cold-Pressed Juices",
    description:
      "Daily selection: green detox, citrus sunrise, beetroot & ginger",
    price: 450,
    currency: "INR",
    category: "beverages",
    menuType: "drinks",
    dietaryTags: ["vegan", "gluten-free"],
    spiceLevel: 0,
    isChefsPick: false,
  },
  {
    id: "b2",
    name: "Artisan Coffee Selection",
    description:
      "Single-origin espresso, pour-over, cold brew, oat/almond milk available",
    price: 350,
    currency: "INR",
    category: "beverages",
    menuType: "drinks",
    dietaryTags: ["vegan", "gluten-free"],
    spiceLevel: 0,
    isChefsPick: false,
  },
];

export const privateDiningRooms: PrivateDiningRoom[] = [
  {
    id: "pd1",
    name: "The Cellar Room",
    capacity: 12,
    description:
      "An intimate stone-walled dining room beneath the restaurant. Exposed brick, candlelit ambiance, and a curated wine wall. Ideal for close gatherings and celebratory dinners.",
    features: [
      "Dedicated sommelier",
      "Custom menu",
      "AV equipment",
      "Private entrance",
    ],
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
    priceFrom: 4500,
  },
  {
    id: "pd2",
    name: "The Garden Terrace",
    capacity: 40,
    description:
      "Our outdoor terrace overlooking the hotel's courtyard garden. Draped in fairy lights with retractable awning. Perfect for cocktail receptions and al fresco dining events.",
    features: [
      "Outdoor setting",
      "Weather-protected",
      "Live music available",
      "Custom décor",
    ],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    priceFrom: 3500,
  },
  {
    id: "pd3",
    name: "The Rooftop Suite",
    capacity: 60,
    description:
      "Exclusive rooftop space with panoramic city views. A stunning backdrop for milestone celebrations, corporate events, or wedding receptions with skyline sunsets.",
    features: [
      "City skyline views",
      "Indoor/outdoor flow",
      "Full bar service",
      "DJ booth",
      "Dance floor",
    ],
    image:
      "https://images.unsplash.com/photo-1482275548304-a58859dc31b7?w=800&q=80",
    priceFrom: 6000,
  },
];

export const availableTimeSlots: Record<string, TimeSlot[]> = {
  lunch: [
    { time: "12:00 PM", available: true },
    { time: "12:30 PM", available: true },
    { time: "1:00 PM", available: false },
    { time: "1:30 PM", available: true },
    { time: "2:00 PM", available: true },
    { time: "2:30 PM", available: true },
  ],
  dinner: [
    { time: "6:30 PM", available: true },
    { time: "7:00 PM", available: false },
    { time: "7:30 PM", available: true },
    { time: "8:00 PM", available: false },
    { time: "8:30 PM", available: true },
    { time: "9:00 PM", available: true },
    { time: "9:30 PM", available: true },
    { time: "10:00 PM", available: true },
  ],
};
