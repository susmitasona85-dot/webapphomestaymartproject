"use client";

import { useState, useMemo } from "react";
import { format, differenceInDays, addDays, isWithinInterval } from "date-fns";
import { Calendar as CalendarIcon, Users, ArrowRight, MessageCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Stay, Availability } from "@/types";
import { toast } from "sonner";
import { siteConfig } from "@/config/site";

interface BookingWidgetProps {
  stay: Stay;
  availability?: Availability[];
}

const BookingWidget = ({ stay, availability = [] }: BookingWidgetProps) => {
  const [date, setDate] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");

  const numberOfNights = useMemo(() => {
    if (date.from && date.to) {
      return differenceInDays(date.to, date.from);
    }
    return 0;
  }, [date]);

  const extraGuests = Math.max(0, guests - (stay.baseGuests || stay.maxGuests));
  const extraGuestTotal = extraGuests * (stay.extraGuestPrice || 0) * numberOfNights;
  const basePriceTotal = numberOfNights * stay.price;
  const totalPrice = basePriceTotal + extraGuestTotal;

  const isDateDisabled = (date: Date) => {
    const isPast = date < new Date() && !isWithinInterval(date, { start: new Date(), end: new Date() });
    const isBooked = availability.some(a =>
      !a.isAvailable && format(new Date(a.date), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
    );
    return isPast || isBooked;
  };

  const handleWhatsAppBooking = () => {
    if (!date.from || !date.to) {
      toast.error("Please select check-in and check-out dates");
      return;
    }

    if (!name) {
      toast.error("Please enter your name");
      return;
    }

    const checkInStr = format(date.from, "dd MMM yyyy");
    const checkOutStr = format(date.to, "dd MMM yyyy");

    const message = `Hello! I'd like to book a stay at *${stay.title}*.

*Details:*
- *Name:* ${name}
- *Dates:* ${checkInStr} to ${checkOutStr}
- *Nights:* ${numberOfNights}
- *Guests:* ${guests} (${guests > (stay.baseGuests || 0) ? `${stay.baseGuests} base + ${guests - (stay.baseGuests || 0)} extra` : 'Base occupancy'})
- *Total Price:* ₹${totalPrice.toLocaleString('en-IN')}

Is it available for these dates?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="bg-white rounded-3xl p-8 shadow-xl border border-border">
      <div className="flex justify-between items-end mb-6">
        <div>
          <span className="text-3xl font-bold text-primary">₹{stay.price}</span>
          <span className="text-muted-foreground ml-1">/ night</span>
        </div>
        <div className="flex items-center gap-1 text-sm font-semibold">
          <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          {stay.rating}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="grid grid-cols-1 gap-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Your Name</Label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Dates</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal h-12 rounded-xl border-border",
                  !date.from && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {date.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "MMM dd")} - {format(date.to, "MMM dd")}
                    </>
                  ) : (
                    format(date.from, "MMM dd")
                  )
                ) : (
                  <span>Select dates</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={{ from: date.from, to: date.to }}
                onSelect={(range) => setDate({ from: range?.from, to: range?.to })}
                numberOfMonths={1}
                disabled={isDateDisabled}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Guests</Label>
          <div className="relative">
            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary" />
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-transparent transition-all"
            >
              {[...Array(stay.maxGuests)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1} {i === 0 ? "Guest" : "Guests"}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {numberOfNights > 0 && (
        <div className="space-y-3 mb-6 p-4 bg-primary/5 rounded-2xl border border-primary/10">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">₹{stay.price.toLocaleString('en-IN')} x {numberOfNights} nights</span>
            <span className="font-semibold text-foreground">₹{basePriceTotal.toLocaleString('en-IN')}</span>
          </div>

          {extraGuests > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Extra guests (₹{stay.extraGuestPrice?.toLocaleString('en-IN')} x {extraGuests})</span>
              <span className="font-semibold text-foreground">₹{extraGuestTotal.toLocaleString('en-IN')}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Service Fee</span>
            <span className="font-semibold text-foreground">₹0</span>
          </div>
          <Separator className="bg-primary/10" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span className="text-primary">₹{totalPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      )}

      <Button
        onClick={handleWhatsAppBooking}
        className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-2xl text-lg gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
      >
        <MessageCircle className="w-5 h-5" />
        Book via WhatsApp
      </Button>

      <p className="text-center text-[10px] uppercase tracking-widest text-muted-foreground mt-4 font-bold">
        Instant Confirmation via Chat
      </p>
    </div>
  );
};

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

const Separator = ({ className }: { className?: string }) => (
  <div className={cn("h-px w-full", className)} />
);

export default BookingWidget;
