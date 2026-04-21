"use client";

import { Button } from "@/components/ui/button";

interface MobileStickyCTAProps {
  price: number;
  rating: number;
}

export default function MobileStickyCTA({ price, rating }: MobileStickyCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-border lg:hidden z-50 flex items-center justify-between">
      <div>
        <p className="text-lg font-bold">₹{price} <span className="text-sm font-normal text-muted-foreground">/ night</span></p>
        <div className="flex items-center gap-1 text-xs">
          <StarIcon className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          <span>{rating}</span>
        </div>
      </div>
      <Button
        onClick={() => {
          document.getElementById('booking-widget')?.scrollIntoView({ behavior: 'smooth' });
        }}
        className="bg-primary hover:bg-primary/90 text-white font-bold px-8 h-12 rounded-xl"
      >
        Check Availability
      </Button>
    </div>
  );
}

const StarIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
      clipRule="evenodd"
    />
  </svg>
);
