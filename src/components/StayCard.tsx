import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Users, Wifi, Coffee, Maximize, Star, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface StayCardProps {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  maxGuests: number;
  sqft: number;
  rating: number;
  reviews: number;
  tags: string[];
}

const StayCard = ({
  id,
  title,
  description,
  image,
  price,
  maxGuests,
  sqft,
  rating,
  reviews,
  tags,
}: StayCardProps) => {
  return (
    <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-64 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="bg-white/90 backdrop-blur-sm text-primary font-semibold">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            {rating} ({reviews} reviews)
          </div>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
          {description}
        </p>
        <div className="flex items-center justify-between text-muted-foreground text-xs border-t border-border pt-4">
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5 text-primary" />
            <span>Up to {maxGuests} guests</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize className="w-3.5 h-3.5 text-primary" />
            <span>{sqft} sqft</span>
          </div>
          <div className="flex items-center gap-3">
            <Wifi className="w-3.5 h-3.5 text-primary" />
            <Coffee className="w-3.5 h-3.5 text-primary" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex items-center justify-between">
        <div>
          <span className="text-2xl font-bold text-primary">₹{price}</span>
          <span className="text-muted-foreground text-sm ml-1">/ night</span>
        </div>
        <Link href={`/stay/${id}`}>
          <Button variant="ghost" className="group/btn text-primary hover:text-primary hover:bg-primary/5 font-semibold p-0">
            View Details
            <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default StayCard;
