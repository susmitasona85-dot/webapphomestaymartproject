import { Stay, Experience, Review } from "@/types";

export const STAYS: Stay[] = [
  {
    id: "forest-cabin",
    title: "Eco-Friendly Forest Cabin",
    description: "A cozy wooden cabin tucked deep in the forest, offering total privacy and nature immersion.",
    longDescription: "Escape to our handcrafted forest cabin, where the only neighbors are the birds and the breeze. This eco-friendly retreat is built using sustainable materials and offers a perfect blend of rustic charm and modern comfort. Enjoy your morning coffee on the spacious deck as you watch the mist roll over the trees, or cozy up by the wood-burning stove in the evenings.",
    images: [
      "https://images.unsplash.com/photo-1449156001437-1299973b1cc7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop"
    ],
    price: 4500,
    baseGuests: 2,
    extraGuestPrice: 1000,
    maxGuests: 4,
    sqft: 650,
    rating: 4.9,
    reviews: 128,
    amenities: ["Wifi", "Kitchen", "Fireplace", "Mountain View", "Solar Power"],
    tags: ["Eco-friendly", "Privacy", "Mountain View"],
    location: "Upper Hill Tracts"
  },
  {
    id: "riverside-cottage",
    title: "Riverside Stone Cottage",
    description: "Listen to the soothing sounds of the flowing river from this charming stone-built cottage.",
    longDescription: "Our Riverside Stone Cottage is located just steps away from the crystal-clear mountain stream. The thick stone walls keep the cottage naturally cool in summer and warm in winter. The highlight is the private river-facing patio, ideal for meditation, reading, or enjoying a traditional local meal prepared by our in-house cook.",
    images: [
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop"
    ],
    price: 3800,
    baseGuests: 2,
    extraGuestPrice: 800,
    maxGuests: 2,
    sqft: 450,
    rating: 4.8,
    reviews: 95,
    amenities: ["Wifi", "Private Patio", "River Access", "King Bed", "Breakfast Included"],
    tags: ["Romantic", "Waterfront", "Peaceful"],
    location: "River Valley"
  },
  {
    id: "mountain-villa",
    title: "Panoramic Mountain Villa",
    description: "Spacious villa with floor-to-ceiling windows offering 360-degree views of the peaks.",
    longDescription: "Perched on the highest ridge of our property, the Mountain Villa is designed for those who appreciate grandeur and sweeping vistas. Every room features large glass windows that frame the majestic peaks. It's perfect for families or small groups looking for a premium experience without losing the personal touch of a homestay.",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop"
    ],
    price: 7500,
    baseGuests: 4,
    extraGuestPrice: 1500,
    maxGuests: 6,
    sqft: 1200,
    rating: 5.0,
    reviews: 54,
    amenities: ["High-speed Wifi", "Full Kitchen", "Private Garden", "BBQ Grill", "Dedicated Workspace"],
    tags: ["Premium", "Family-friendly", "Best Views"],
    location: "Eagle's Nest Peak"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: "forest-trek",
    title: "Guided Forest Trek",
    description: "Explore hidden trails and learn about local flora and fauna with our expert guide.",
    image: "https://images.unsplash.com/photo-1551632432-c73581c61966?q=80&w=2070&auto=format&fit=crop",
    duration: "4 Hours",
    category: "Nature"
  },
  {
    id: "local-cooking",
    title: "Traditional Cooking Class",
    description: "Learn to cook authentic local dishes using farm-fresh ingredients and age-old recipes.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2070&auto=format&fit=crop",
    duration: "2.5 Hours",
    category: "Culture"
  },
  {
    id: "stargazing",
    title: "Midnight Stargazing",
    description: "Experience the magic of the night sky away from city lights with a high-quality telescope.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop",
    duration: "2 Hours",
    category: "Activity"
  }
];

export const REVIEWS: Review[] = [
  {
    id: "r1",
    userName: "Anjali Sharma",
    rating: 5,
    comment: "An incredible experience! The forest cabin was peaceful, and the hospitality was heartwarming. The food was the highlight - so fresh and tasty.",
    date: "March 15, 2024"
  },
  {
    id: "r2",
    userName: "Rohan Das",
    rating: 4,
    comment: "Beautiful location and very clean. The trek was slightly more difficult than expected, but the views were worth it. Highly recommended for nature lovers.",
    date: "February 28, 2024"
  },
  {
    id: "r3",
    userName: "Sarah Jenkins",
    rating: 5,
    comment: "A perfect getaway. We stayed at the Riverside cottage and the sound of the water was so meditative. We'll definitely be back!",
    date: "April 02, 2024"
  }
];
