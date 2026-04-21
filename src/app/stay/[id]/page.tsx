import { getStayById, getAvailability } from "@/lib/supabase/services";
import { notFound } from "next/navigation";
import { Check, Star, Users, Maximize, MapPin, Wifi, Coffee, Wind, Mountain, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import BookingWidget from "@/components/booking/BookingWidget";
import MobileStickyCTA from "@/components/stay/MobileStickyCTA";
import { addMonths } from "date-fns";
import Image from "next/image";

export default async function StayDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stay = await getStayById(id);

  if (!stay) {
    notFound();
  }

  // Fetch availability for next 3 months
  const availability = await getAvailability(stay.id, new Date(), addMonths(new Date(), 3));

  const amenityIcons: Record<string, any> = {
    "Wifi": <Wifi className="w-4 h-4" />,
    "Kitchen": <Utensils className="w-4 h-4" />,
    "Mountain View": <Mountain className="w-4 h-4" />,
    "Private Patio": <Wind className="w-4 h-4" />,
    "Breakfast Included": <Coffee className="w-4 h-4" />,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[600px] mb-8 rounded-3xl overflow-hidden">
        <div className="md:col-span-2 md:row-span-2 relative">
          <Image src={stay.images[0]} alt={stay.title} fill priority className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </div>
        <div className="relative">
          <Image src={stay.images[1]} alt={stay.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
        </div>
        <div className="relative">
          <Image src={stay.images[2]} alt={stay.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 25vw" />
        </div>
        <div className="md:col-span-2 relative">
          <Image src={stay.images[0]} alt={stay.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Button variant="secondary" className="bg-white/90 backdrop-blur-sm">View All Photos</Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 mb-4">
            {stay.tags.map(tag => <Badge key={tag} variant="secondary" className="bg-primary/5 text-primary border-primary/10">{tag}</Badge>)}
          </div>

          <h1 className="text-4xl font-bold mb-4">{stay.title}</h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
            <div className="flex items-center gap-1 font-semibold text-foreground">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {stay.rating} ({stay.reviews} reviews)
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {stay.location}
            </div>
          </div>

          <div className="flex gap-8 mb-8">
            <div className="flex flex-col items-center p-4 bg-secondary rounded-2xl min-w-[100px]">
              <Users className="w-6 h-6 text-primary mb-2" />
              <span className="text-sm font-bold">{stay.maxGuests} Guests</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-secondary rounded-2xl min-w-[100px]">
              <Maximize className="w-6 h-6 text-primary mb-2" />
              <span className="text-sm font-bold">{stay.sqft} sqft</span>
            </div>
          </div>

          <Separator className="my-8" />

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">About this stay</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {stay.longDescription}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6">What this place offers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4">
              {stay.amenities.map(amenity => (
                <div key={amenity} className="flex items-center gap-3 text-foreground/80">
                  <div className="p-2 rounded-full bg-primary/5 text-primary">
                    {amenityIcons[amenity] || <Check className="w-4 h-4" />}
                  </div>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sticky Booking Widget Container */}
        <div className="lg:col-span-1">
          <div id="booking-widget" className="sticky top-24">
             <BookingWidget stay={stay} availability={availability} />
          </div>
        </div>
      </div>

      <MobileStickyCTA price={stay.price} rating={stay.rating} />
    </div>
  );
}
