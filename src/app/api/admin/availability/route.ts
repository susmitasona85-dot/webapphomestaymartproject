import { updateAvailability } from "@/lib/supabase/services";
import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";

export async function POST(req: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { stayId, date, isAvailable } = await req.json();

    if (!stayId || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const success = await updateAvailability(stayId, date, isAvailable);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: "Failed to update availability" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
