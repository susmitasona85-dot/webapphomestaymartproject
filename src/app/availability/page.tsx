"use client";

import { useState } from "react";
import { getStays, getAvailability } from "@/lib/supabase/services";
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { Stay } from "@/types";
import { useEffect } from "react";

export default function AvailabilityPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [selectedStayId, setSelectedStayId] = useState<string>("");
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const data = await getStays();
      setStays(data);
      if (data.length > 0) setSelectedStayId(data[0].id);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    const loadAvailability = async () => {
      if (selectedStayId) {
        const data = await getAvailability(selectedStayId, new Date(), addMonths(new Date(), 3));
        const dates = data
          .filter(a => !a.isAvailable)
          .map(a => new Date(a.date));
        setBookedDates(dates);
      }
    };
    loadAvailability();
  }, [selectedStayId]);

  const selectedStay = stays.find(s => s.id === selectedStayId);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">Availability Calendar</h1>
        <p className="text-muted-foreground">Check the real-time availability of our properties before you plan your trip.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="border-none shadow-md bg-secondary/30">
            <CardHeader>
              <CardTitle className="text-lg">Select Property</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={selectedStayId} onValueChange={(val) => setSelectedStayId(val || "")}>
                <SelectTrigger className="w-full bg-background border-border">
                  <SelectValue placeholder="Choose a stay" />
                </SelectTrigger>
                <SelectContent>
                  {stays.map(stay => (
                    <SelectItem key={stay.id} value={stay.id}>{stay.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="mt-8 space-y-4">
                <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Legend</h4>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-white border border-border"></div>
                  <span className="text-sm">Available</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-primary/20"></div>
                  <span className="text-sm">Booked / Unavailable</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <span className="text-sm">Selected Date</span>
                </div>
              </div>

              {selectedStay && (
                <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
                  <div className="flex gap-2 items-start text-primary">
                    <Info className="w-4 h-4 mt-0.5 shrink-0" />
                    <p className="text-xs leading-relaxed">
                      Dates marked in <span className="font-bold">light green</span> are currently booked. Please select other dates for your stay.
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="border-none shadow-xl p-4">
            <Calendar
              mode="single"
              numberOfMonths={1}
              className="w-full"
              modifiers={{
                booked: bookedDates
              }}
              modifiersClassNames={{
                booked: "bg-primary/20 text-primary-foreground line-through opacity-50 cursor-not-allowed"
              }}
              disabled={(date) => bookedDates.some(bd => isSameDay(bd, date)) || date < new Date()}
            />
          </Card>

          <div className="mt-8 text-center">
             <p className="text-sm text-muted-foreground mb-4">Found your perfect dates?</p>
             <a href={`/stay/${selectedStayId}`}>
               <Button className="bg-primary hover:bg-primary/90 text-white font-bold">Go to Booking Page</Button>
             </a>
          </div>
        </div>
      </div>
    </div>
  );
}
