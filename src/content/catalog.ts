import type { EventInfo, Product } from "@/types";
import { CUSTOM_SIGN_PRICE_CENTS } from "@/lib/pricing";

export type WoodSpecies = {
  id: string;
  name: string;
  origin: string;
  characteristics: string;
  pricing: string;
  facts: string;
};

export type GalleryImage = {
  src: string;
  alt: string;
};

export const products: Product[] = [
  {
    id: "mahogany-desk",
    name: "Mahogany Executive Desk",
    description:
      "A large, imposing desk with hidden compartments and brass fittings. Built for a client's home office.",
    price: "Commission",
    image: "/mahoganyDesk.png",
    category: "furniture",
    woodType: "mahogany",
  },
  {
    id: "cedar-chest",
    name: "Cedar Hope Chest",
    description:
      "Aromatic cedar chest with dovetail joinery and a custom-engraved lid. A wedding gift.",
    price: "Commission",
    image: "/cedarChest3.jpg",
    category: "furniture",
    woodType: "cedar",
  },
  {
    id: "oak-bookshelf",
    name: "Oak Bookshelf",
    description:
      "An intricate, handcrafted bookshelf with individually carved pieces. A true test of patience.",
    price: "Commission",
    image: "/bookshelf.jpg",
    category: "furniture",
    woodType: "oak",
  },
  {
    id: "cherry-table",
    name: "Cherry Wood Dining Table",
    description:
      "A classic design, updated for modern comfort. Hand-sanded to a smooth, warm finish.",
    price: "Commission",
    image: "/cherrywoodDineTable.jpg",
    category: "furniture",
    woodType: "cherry",
  },
  {
    id: "restaurant-bar",
    name: "Restaurant Bar Installation",
    description:
      "Complete design and build of a commercial bar, including countertops, shelving, and paneling.",
    price: "Commission",
    image: "/woodBar.png",
    category: "commercial",
    woodType: "mixed",
  },
  {
    id: "garden-bench",
    name: "Japanese-style Garden Bench",
    description:
      "A minimalist outdoor bench made from weather-resistant teak, featuring elegant, simple lines.",
    price: "Commission",
    image: "/gb.svg",
    category: "outdoor",
    woodType: "teak",
  },
];

export const events: EventInfo[] = [
  {
    id: "1",
    name: "Fall Festival",
    date: "Oct 3 - Oct 4, 2026, 10:00 AM - 6:00 PM",
    location: "Florence, Omaha, NE",
    description:
      "Join us for the annual Fall Festival! Discover unique handmade items from local artisans, including our latest woodworking creations.",
    imageUrl: "/fallFestEvent.jpg",
  },
  {
    id: "2",
    name: "Holiday Market Days",
    date: "Dec 12, 2026, 9:00 AM - 6:00 PM",
    location: "Aksarben Village, Omaha, NE",
    description:
      "Find unique handcrafted goods for the holidays. We'll have a booth showcasing custom signs, furniture, and home decor.",
    imageUrl: "/jingleMingle.jpg",
  },
  {
    id: "3",
    name: "Rockbrook Village Art Fair",
    date: "September 12-13, 2026, 10:00 AM - 4:00 PM",
    location: "2800 S 110th Street, Omaha, NE",
    description: "Come see some of the best local artists and crafters at this annual event.",
    imageUrl: "/rockVill.svg",
  },
  {
    id: "4",
    name: "Holiday Craft Show",
    date: "December 5-6, 2026, 12:00 PM - 4:00 PM",
    location: "Community Center Auditorium, Omaha, NE",
    description:
      "Hand-carved ornaments, custom signs, and gift-ready pieces for the season.",
    imageUrl: "/woodClassPoster2.png",
  },
];

export const woods: WoodSpecies[] = [
  {
    id: "american-cherry",
    name: "American Cherry",
    origin: "Eastern United States",
    characteristics:
      "Rich reddish-brown that darkens with light. Fine, uniform grain and moderately hard.",
    pricing: "Mid-to-high domestic hardwood.",
    facts: "Also called Black Cherry. A favorite for fine furniture and cabinetry.",
  },
  {
    id: "red-oak",
    name: "Red Oak",
    origin: "Eastern and Central United States",
    characteristics:
      "Durable with a coarse, open grain. Color ranges from light reddish-brown to pinkish-red.",
    pricing: "Affordable and widely available.",
    facts: "Open grain takes stain evenly, which is why it is common for signs and furniture.",
  },
  {
    id: "white-ash",
    name: "American White Ash",
    origin: "Eastern North America",
    characteristics:
      "Light-colored and straight-grained, similar to oak but less pronounced. Excellent shock resistance.",
    pricing: "Comparable to oak.",
    facts: "Traditional wood for baseball bats and tool handles.",
  },
  {
    id: "black-walnut",
    name: "American Black Walnut",
    origin: "Eastern United States",
    characteristics:
      "Deep chocolate brown with dramatic figure, including swirls and burls. Strong and stable.",
    pricing: "One of the more expensive domestic hardwoods.",
    facts: "Sunlight can lighten walnut; finishes are often chosen to hold the deep tone.",
  },
  {
    id: "european-ash",
    name: "European Ash",
    origin: "Europe and Western Asia",
    characteristics:
      "Similar toughness to American ash, often with a creamier color. Resists splitting.",
    pricing: "Similar to American ash.",
    facts: "Steam-bends well, so it shows up in bentwood furniture.",
  },
  {
    id: "tropical-hardwoods",
    name: "Tropical Hardwoods (Sapele, Zebrano)",
    origin: "Africa",
    characteristics:
      "Sapele has a lustrous ribbon grain. Zebrano is known for bold zebra-like stripes.",
    pricing: "Typically higher due to import and appearance.",
    facts: "Sapele is often used as a mahogany alternative. Zebrano can be fussy to mill.",
  },
  {
    id: "hard-maple",
    name: "American Hard Maple",
    origin: "Northeastern United States and Canada",
    characteristics:
      "Very hard and dense with a fine grain. Creamy white, sometimes with bird's-eye or curly figure.",
    pricing: "Moderate; figured boards cost more.",
    facts: "Ideal for butcher blocks, flooring, and high-wear surfaces.",
  },
  {
    id: "poplar",
    name: "Poplar",
    origin: "Eastern North America",
    characteristics:
      "Lightweight with a uniform grain. Pale yellow-white, sometimes with green or purple streaks.",
    pricing: "Among the most affordable hardwoods.",
    facts: "Takes paint exceptionally well because the grain is quiet.",
  },
  {
    id: "pine",
    name: "Pine",
    origin: "North America, Europe, and Asia",
    characteristics:
      "Softwood, creamy to yellow, often knotty. Lightweight and easy to work.",
    pricing: "Inexpensive and widely available.",
    facts: "White pine and yellow pine are the most common shop species.",
  },
];

export const galleryImages: GalleryImage[] = [
  { src: "/marketing-shot.jpg", alt: "Custom walnut family name sign on the workbench" },
  { src: "/custom-table.jpg", alt: "Handcrafted oak dining table" },
  { src: "/bookshelf.jpg", alt: "Built-in hardwood bookshelf" },
  { src: "/chair.jpg", alt: "Hardwood Adirondack chair" },
  { src: "/cherrywoodDineTable.jpg", alt: "Cherry wood dining table" },
  { src: "/handCraftedChair.jpg", alt: "Restored antique chair" },
];

export const customSignCatalog = {
  id: "custom-sign",
  name: "Custom Wooden Sign",
  priceCents: CUSTOM_SIGN_PRICE_CENTS,
  sizes: ["small", "medium", "large"] as const,
  stains: [
    "woodBackground",
    "amerBlackWalnut",
    "amerWhiteAsh",
    "zebrano",
    "redOak",
    "americanCherry",
  ] as const,
};
