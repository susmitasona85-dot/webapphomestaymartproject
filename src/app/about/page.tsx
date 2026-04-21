import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Leaf, Users, ShieldCheck, MapPin } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4 py-1 px-4 border-primary text-primary">Our Story</Badge>
        <h1 className="text-5xl font-bold mb-6">Connecting Souls with Nature</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          NatureStay started as a small dream to provide travelers with an escape that doesn't just offer a bed, but a bridge to the wilderness.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <div className="relative h-[400px] w-full">
          <Image
            src="https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=2000&auto=format&fit=crop"
            alt="Our Heritage"
            fill
            className="rounded-3xl shadow-2xl object-cover"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Why We Started</h2>
          <p className="text-lg text-muted-foreground">
            In a world that's increasingly digital and loud, we felt the need for spaces that are analog and quiet. NatureStay properties are handpicked for their unique locations and the stories they tell.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <Leaf className="text-primary mb-2" />
                <h4 className="font-bold">Eco-Conscious</h4>
                <p className="text-sm text-muted-foreground">Minimal footprint on the environment.</p>
             </div>
             <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <Users className="text-primary mb-2" />
                <h4 className="font-bold">Community-led</h4>
                <p className="text-sm text-muted-foreground">Supporting local families and guides.</p>
             </div>
          </div>
        </div>
      </div>

      <div className="bg-secondary/30 rounded-[40px] p-12 mb-24">
         <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Our Philosophy</h2>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ShieldCheck className="w-8 h-8 text-primary" />}
              title="Absolute Privacy"
              description="Each stay is designed to be your private sanctuary away from tourists."
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8 text-primary" />}
              title="Off-Beat Locations"
              description="We don't do commercial hubs. We do hidden ridges and valley streams."
            />
            <FeatureCard
              icon={<Leaf className="w-8 h-8 text-primary" />}
              title="Authentic Food"
              description="Farm-to-table meals prepared using traditional wood-fire techniques."
            />
         </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <Card className="bg-white border-none shadow-sm">
      <CardContent className="pt-8 text-center">
        <div className="flex justify-center mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
