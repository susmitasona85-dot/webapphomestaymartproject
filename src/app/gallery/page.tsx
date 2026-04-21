import { getStays } from "@/lib/supabase/services";
import Image from "next/image";

export default async function GalleryPage() {
  const stays = await getStays();
  const allImages = stays.flatMap(stay => stay.images);

  // Mix in some nature shots
  const natureImages = [
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=2000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop"
  ];

  const gallery = [...new Set([...allImages, ...natureImages])];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Gallery</h1>
        <p className="text-muted-foreground">A glimpse into the life at NatureStay.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((img, i) => (
          <div key={i} className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow cursor-pointer group">
             <Image
               src={img}
               alt={`Gallery image ${i}`}
               fill
               sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
               className="object-cover group-hover:scale-105 transition-transform duration-500"
             />
          </div>
        ))}
      </div>
    </div>
  );
}
