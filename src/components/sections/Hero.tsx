"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Users, Search } from "lucide-react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

const Hero = () => {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Optimized Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2070&auto=format&fit=crop"
          alt="NatureStay Forest Resort"
          fill
          priority
          className="object-cover transition-transform duration-10000"
          quality={90}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-1000">
          Escape to <span className="text-earth-beige">Nature's</span> Embrace
        </h1>
        <p className="text-lg md:text-xl mb-10 text-earth-beige/90 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
          Discover a peaceful sanctuary tucked away in the forest. Authentic experiences, local flavors, and unforgettable memories await.
        </p>

        {/* Search Bar */}
        <div className="bg-white/95 backdrop-blur p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row items-center gap-2 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="w-full md:flex-1 grid grid-cols-1 md:grid-cols-2 gap-2 px-4 py-2 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex flex-col items-start">
              <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Check In - Out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"ghost"}
                    className={cn(
                      "w-full justify-start text-left font-normal p-0 h-auto hover:bg-transparent text-foreground",
                      !date.from && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {date.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd")} - {format(date.to, "LLL dd")}
                        </>
                      ) : (
                        format(date.from, "LLL dd")
                      )
                    ) : (
                      <span>Pick dates</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={{ from: date.from, to: date.to }}
                    onSelect={(range) => setDate({ from: range?.from, to: range?.to })}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="w-full md:w-48 px-4 py-2 flex flex-col items-start border-b md:border-b-0 md:border-r border-gray-200">
            <Label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Guests</Label>
            <div className="flex items-center w-full">
              <Users className="mr-2 h-4 w-4 text-primary" />
              <input
                type="number"
                min="1"
                placeholder="Add guests"
                className="w-full bg-transparent border-none focus:outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          <Button className="w-full md:w-auto md:px-8 h-12 md:h-14 rounded-xl md:rounded-full bg-primary hover:bg-primary/90 text-white font-semibold gap-2">
            <Search className="w-4 h-4" />
            Check Availability
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/60 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
