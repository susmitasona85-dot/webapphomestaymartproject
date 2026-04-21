import { getStays } from "@/lib/supabase/services";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Users } from "lucide-react";

export default async function StayListPage() {
  const stays = await getStays();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Unique Stays</h1>
        <p className="text-muted-foreground">Handpicked homes in the heart of nature.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stays.map((stay) => (
          <Link key={stay.id} href={`/stay/${stay.id}`}>
            <Card className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={stay.images[0]}
                  alt={stay.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  {stay.tags.slice(0, 2).map(tag => (
                    <Badge key={tag} className="bg-white/90 text-primary border-none backdrop-blur-md">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{stay.title}</h3>
                  <div className="flex items-center gap-1 font-bold text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {stay.rating}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin className="w-3 h-3" />
                  {stay.location}
                </div>
                <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    Up to {stay.maxGuests} guests
                  </div>
                </div>
              </CardContent>
              <CardFooter className="px-6 py-4 border-t border-border flex justify-between items-center bg-secondary/5">
                <div>
                  <span className="text-xl font-bold text-primary">₹{stay.price.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-muted-foreground ml-1">/ night</span>
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Details →</span>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
