import Hero from "@/components/sections/Hero";
import StayCard from "@/components/StayCard";
import { getStays, getExperiences, getReviews } from "@/lib/supabase/services";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf, ShieldCheck, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const stays = await getStays();
  const experiences = await getExperiences();
  const reviews = await getReviews();

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />

      {/* Featured Stays */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Our Unique Stays</h2>
            <p className="text-muted-foreground mt-2">Handpicked accommodations for every kind of traveler.</p>
          </div>
          <Link href="/stay">
            <Button variant="outline" className="hidden md:flex gap-2 border-primary text-primary hover:bg-primary/5">
              Explore All <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stays.map((stay) => (
            <StayCard key={stay.id} {...stay} image={stay.images[0]} />
          ))}
        </div>
      </section>

      {/* Trust & Features */}
      <section className="bg-secondary py-20 border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-foreground">Why Stay With Us?</h2>
            <p className="text-muted-foreground mt-4">We go beyond just providing a bed. We provide a connection to nature and culture.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Leaf className="w-8 h-8 text-primary" />, title: "Nature-First", desc: "Eco-friendly practices and deep immersion in the local ecosystem." },
              { icon: <ShieldCheck className="w-8 h-8 text-primary" />, title: "Safe & Secure", desc: "Verified hosts and high standards of safety for all guests." },
              { icon: <Heart className="w-8 h-8 text-primary" />, title: "Authentic", desc: "Experience true local hospitality and homemade traditional cuisine." },
              { icon: <Sparkles className="w-8 h-8 text-primary" />, title: "Premium Comfort", desc: "Thoughtfully designed spaces that blend rustic charm with modern needs." }
            ].map((feature, i) => (
              <div key={i} className="bg-background p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center">
                <div className="inline-block p-4 rounded-full bg-primary/5 mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Curated Experiences</h2>
          <p className="text-muted-foreground mt-2">Make your stay memorable with our handpicked activities.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative h-80 rounded-2xl overflow-hidden group">
              <Image
                src={exp.image}
                alt={exp.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-primary/90 text-[10px] uppercase font-bold px-2 py-1 rounded-sm mb-2 inline-block tracking-widest">{exp.category}</span>
                <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                <p className="text-sm text-gray-300 line-clamp-1 mb-3">{exp.description}</p>
                <div className="flex justify-between items-center text-xs text-gray-300">
                  <span>Duration: {exp.duration}</span>
                  <button className="text-white font-semibold flex items-center hover:underline">Learn More <ArrowRight className="w-3 h-3 ml-1" /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-4 w-full">
        <div className="bg-earth-brown/5 rounded-3xl p-8 md:p-16 border border-earth-brown/10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">What Our Guests Say</h2>
            <div className="flex justify-center gap-1 mt-4">
              {[1, 2, 3, 4, 5].map((s) => <Sparkles key={s} className="w-4 h-4 text-primary fill-primary" />)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="italic text-foreground/80 relative">
                <span className="text-6xl text-primary/20 absolute -top-8 -left-4 font-serif">"</span>
                <p className="mb-6 relative z-10">{review.comment}</p>
                <div className="flex items-center gap-3 not-italic">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {review.userName[0]}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold">{review.userName}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{review.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-5xl mx-auto px-4 w-full">
        <div className="bg-primary rounded-3xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-white/80 mb-10 max-w-xl mx-auto">Book your stay today and reconnect with nature. Our host is ready to welcome you with open arms.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-bold px-8">Book via WhatsApp</Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold px-8">Explore All Stays</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
