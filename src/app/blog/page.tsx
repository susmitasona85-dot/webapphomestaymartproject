import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    title: "5 Best Hidden Viewpoints in Upper Hill Tracts",
    excerpt: "Discover the spots that only locals know about. These viewpoints offer 360-degree views of the mountain range.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop",
    date: "May 10, 2024",
    author: "Local Guide",
    category: "Adventure"
  },
  {
    id: 2,
    title: "What to Pack for a Monsoon Trek in North Bengal",
    excerpt: "Monsoon treks are magical but require the right gear. Here's our comprehensive packing list for your rainy adventures.",
    image: "https://images.unsplash.com/photo-1551632432-c73581c61966?q=80&w=2000&auto=format&fit=crop",
    date: "April 22, 2024",
    author: "Nature Enthusiast",
    category: "Guide"
  },
  {
    id: 3,
    title: "The Art of Slow Living: Life at a Homestay",
    excerpt: "Why choosing a homestay over a hotel can transform your travel experience and rejuvenate your soul.",
    image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=2000&auto=format&fit=crop",
    date: "April 05, 2024",
    author: "Travel Writer",
    category: "Lifestyle"
  }
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Travel Blog</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">Stories, guides, and updates from the heart of the mountains.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="group overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 rounded-3xl flex flex-col">
            <div className="relative h-48 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <Badge className="absolute top-4 left-4 bg-white/90 text-primary border-none backdrop-blur-md">
                {post.category}
              </Badge>
            </div>
            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-1">
                {post.excerpt}
              </p>
              <Link href="#" className="text-sm font-bold text-primary flex items-center gap-2 mt-auto">
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
