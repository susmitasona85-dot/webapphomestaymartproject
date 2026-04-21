export interface Stay {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  images: string[];
  price: number;
  extraGuestPrice?: number;
  baseGuests?: number;
  maxGuests: number;
  sqft: number;
  rating: number;
  reviews: number;
  amenities: string[];
  tags: string[];
  location: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  price?: number;
  duration: string;
  category: "Activity" | "Nature" | "Culture" | "Food";
}

export interface BookingRequest {
  id?: string;
  stayId: string;
  stayTitle: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  totalPrice: number;
  status: "pending" | "confirmed" | "cancelled";
  createdAt: Date;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Availability {
  stayId: string;
  date: string; // ISO format
  isAvailable: boolean;
}
