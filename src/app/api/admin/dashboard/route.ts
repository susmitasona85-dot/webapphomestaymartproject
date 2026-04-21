import { getStays, getAvailability } from "@/lib/supabase/services";
import { Stay, Availability } from "@/types";
import { addMonths } from "date-fns";
import { getSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const stays = await getStays();
  const allAvailability: Record<string, Availability[]> = {};

  for (const stay of stays) {
    const data = await getAvailability(stay.id, new Date(), addMonths(new Date(), 3));
    allAvailability[stay.id] = data;
  }

  return NextResponse.json({
    stats: {
      totalRevenue: "₹1,24,500",
      activeBookings: 8,
      occupancyRate: "78%",
      guestRating: "4.9/5"
    },
    stays,
    availability: allAvailability,
    recentBookings: [
      { id: "1", name: "Rahul Sharma", property: "Forest Cabin", dates: "12 May - 15 May", status: "confirmed", amount: "₹13,500", phone: "+91 98765 43210" },
      { id: "2", name: "Priya Patel", property: "Riverside Cottage", dates: "18 May - 20 May", status: "pending", amount: "₹7,600", phone: "+91 98765 43211" },
      { id: "3", name: "David Miller", property: "Mountain Villa", dates: "25 May - 29 May", status: "confirmed", amount: "₹30,000", phone: "+91 98765 43212" },
    ]
  });
}
