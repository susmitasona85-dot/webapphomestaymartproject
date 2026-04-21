"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Calendar,
  MessageSquare,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  Home,
  Loader2,
  Phone,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Stay, Availability } from "@/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DashboardData {
  stats: {
    totalRevenue: string;
    activeBookings: number;
    occupancyRate: string;
    guestRating: string;
  };
  stays: Stay[];
  availability: Record<string, Availability[]>;
  recentBookings: Array<{
    id: string;
    name: string;
    property: string;
    dates: string;
    status: string;
    amount: string;
    phone: string;
  }>;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("admin_auth");
    if (!auth) {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, [router]);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      if (res.status === 401) {
        localStorage.removeItem("admin_auth");
        router.push("/admin");
        return;
      }
      const json = await res.json();
      setData(json);
    } catch (error) {
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (stayId: string, date: string, currentAvailable: boolean) => {
    try {
      const res = await fetch("/api/admin/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stayId, date, isAvailable: !currentAvailable })
      });

      if (res.status === 401) {
        localStorage.removeItem("admin_auth");
        router.push("/admin");
        return;
      }

      if (res.ok) {
        toast.success(`Date ${!currentAvailable ? 'unblocked' : 'blocked'} successfully`);
        fetchDashboardData();
      } else {
        toast.error("Failed to update availability");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      localStorage.removeItem("admin_auth");
      router.push("/admin");
      router.refresh();
      toast.info("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="flex min-h-screen bg-secondary/20">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border hidden md:flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-primary flex items-center gap-2">
            Nature<span className="text-earth-brown">Stay</span>
          </h2>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1 font-semibold">Admin Panel</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Button variant="ghost" className="w-full justify-start gap-3 text-primary bg-primary/5">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Calendar className="w-4 h-4" /> Bookings
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Home className="w-4 h-4" /> Properties
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <MessageSquare className="w-4 h-4" /> AI Chat Logs
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3">
            <Settings className="w-4 h-4" /> Settings
          </Button>
        </nav>
        <div className="p-4 border-t border-border">
          <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1.5 py-1">
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                Demo Mode
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm">Welcome back, Admin. Data is currently in mock mode.</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="gap-2" onClick={() => window.open('/', '_blank')}>
              <ArrowRight className="w-4 h-4" /> View Site
            </Button>
            <Button className="bg-primary hover:bg-primary/90 gap-2">
              <Plus className="w-4 h-4" /> New Booking
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard title="Total Revenue" value={data.stats.totalRevenue} change="+12% from last month" />
          <StatCard title="Active Bookings" value={data.stats.activeBookings.toString()} change="3 checking in today" />
          <StatCard title="Occupancy Rate" value={data.stats.occupancyRate} change="+5% vs target" />
          <StatCard title="Guest Rating" value={data.stats.guestRating} change="Based on 120 reviews" />
        </div>

        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="bg-white border border-border mb-6">
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Recent WhatsApp Inquiries</CardTitle>
                <CardDescription>Manage your incoming booking requests.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 bg-white border border-border rounded-xl hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-10 h-10 rounded-full flex items-center justify-center",
                          booking.status === "confirmed" ? "bg-green-100 text-green-600" : "bg-yellow-100 text-yellow-600"
                        )}>
                          {booking.status === "confirmed" ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{booking.name}</h4>
                          <p className="text-xs text-muted-foreground">{booking.property} • {booking.dates}</p>
                          <div className="flex items-center gap-1 mt-1 text-[10px] text-primary font-medium">
                            <Phone className="w-3 h-3" /> {booking.phone}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <span className="font-bold text-sm">{booking.amount}</span>
                        <div className="flex gap-2">
                           <Button variant="outline" size="sm" className="h-8 text-xs">Confirm</Button>
                           <Button variant="ghost" size="icon" className="h-8 w-8"><Edit2 className="w-3.5 h-3.5" /></Button>
                           <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500"><Trash2 className="w-3.5 h-3.5" /></Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="properties">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.stays.map(stay => (
                <Card key={stay.id} className="border-none shadow-sm overflow-hidden flex h-40">
                   <div className="relative w-40 flex-shrink-0">
                     <Image src={stay.images[0]} fill className="object-cover" alt={stay.title} />
                   </div>
                   <div className="flex-1 p-6 flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-lg">{stay.title}</h4>
                        <p className="text-sm text-muted-foreground line-clamp-1">{stay.location}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary" className="bg-primary/10 text-primary">₹{stay.price.toLocaleString('en-IN')}/night</Badge>
                        <Button variant="outline" size="sm" className="gap-2"><Edit2 className="w-3 h-3" /> Edit</Button>
                      </div>
                   </div>
                </Card>
              ))}
              <Card className="border-none shadow-sm border-2 border-dashed border-border flex flex-col items-center justify-center p-8 bg-transparent hover:bg-white/50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Plus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="font-bold text-muted-foreground">Add New Property</p>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="availability">
             <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Occupancy Overview</CardTitle>
                  <CardDescription>Block/Unblock dates for your properties.</CardDescription>
                </CardHeader>
                <CardContent>
                   <div className="space-y-6">
                      {data.stays.map(stay => {
                        const bookedDates = data.availability[stay.id]?.filter(a => !a.isAvailable) || [];
                        return (
                          <div key={stay.id} className="border-b border-border pb-6 last:border-0 last:pb-0">
                             <div className="flex justify-between items-center mb-4">
                               <h4 className="font-bold">{stay.title}</h4>
                               <Popover>
                                 <PopoverTrigger asChild>
                                   <Button variant="outline" size="sm">Block Dates</Button>
                                 </PopoverTrigger>
                                 <PopoverContent className="w-auto p-0" align="end">
                                    <CalendarComponent
                                      mode="single"
                                      onSelect={(d) => {
                                        if (d) toggleAvailability(stay.id, format(d, 'yyyy-MM-dd'), true);
                                      }}
                                    />
                                 </PopoverContent>
                               </Popover>
                             </div>
                             <div className="flex flex-wrap gap-2">
                                {bookedDates.length > 0 ? (
                                  bookedDates.map((a, i) => (
                                    <Badge
                                      key={i}
                                      variant="outline"
                                      className="bg-red-50 text-red-600 border-red-100 cursor-pointer hover:bg-red-100 transition-colors"
                                      onClick={() => toggleAvailability(stay.id, a.date, false)}
                                    >
                                      {format(new Date(a.date), 'dd MMM')} (Booked) ×
                                    </Badge>
                                  ))
                                ) : (
                                  <p className="text-xs text-muted-foreground italic">No dates blocked for the next 3 months</p>
                                )}
                             </div>
                          </div>
                        );
                      })}
                   </div>
                </CardContent>
             </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function StatCard({ title, value, change }: { title: string, value: string, change: string }) {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-2">
        <CardDescription className="text-xs uppercase font-bold tracking-wider">{title}</CardDescription>
        <CardTitle className="text-2xl font-bold">{value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-xs text-primary font-medium">{change}</p>
      </CardContent>
    </Card>
  );
}
