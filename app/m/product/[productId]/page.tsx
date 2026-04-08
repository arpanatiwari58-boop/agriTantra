import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, MessageCircle, Star, ShieldCheck, Globe, ArrowRight } from "lucide-react";

// This would typically come from a data fetching layer or CMS
const getProduct = (id: string) => {
  // Mock data matching the existing structure
  return {
    id,
    title: "Hand-Woven Cashmere Shawl",
    price: 245.00,
    region: "MUSTANG, NEPAL",
    description: "A testament to centuries of tradition, this shawl is hand-loomed using the finest sustainably sourced Chyangra cashmere from the high Himalayas. Each piece requires over forty hours of meticulous craftsmanship, resulting in a texture that is both weightless and exceptionally warm.",
    narrative: "In the high-altitude valleys of Mustang, our weavers continue a legacy of hand-looming that has remained unchanged for generations. The delicate fibers are sorted by hand, spun into fine yarn, and woven on traditional wooden looms that carry the rhythm of the mountains.",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    specs: [
      { label: "Material", value: "100% Chyangra Cashmere" },
      { label: "Color", value: "Natural Stone / Undyed" },
      { label: "Care", value: "Dry Clean Only" },
      { label: "Shipping", value: "Worldwide / 5-7 Days" }
    ],
    similarProducts: [
      { id: "1", title: "Silk Blend Scarf", price: 120, image: "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&w=400&q=80" },
      { id: "2", title: "Yak Wool Wrap", price: 185, image: "https://images.unsplash.com/photo-1445205170230-053b830c6050?auto=format&fit=crop&w=400&q=80" },
      { id: "3", title: "Fine Linen Throw", price: 95, image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80" },
    ]
  };
};

export default async function ProductDetailPage({ params }: { params: { productId: string } }) {
  const { productId } = params;
  const product = getProduct(productId);
  const whatsappNumber = "9779800000000"; // Mock number
  
  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${product.title} (${product.id}). Could you provide more details?`
  )}`;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900 pb-24">
      {/* 1. Premium Sticky Header */}
      <header className="sticky top-0 z-50 w-full h-16 bg-stone-50/90 backdrop-blur-md border-b border-stone-200 flex items-center justify-between px-4">
        <Link href="/m" className="p-2 -ml-2 active:scale-95 transition-transform">
          <ChevronLeft className="h-6 w-6 stroke-[1.5]" />
        </Link>
        
        <div className="absolute left-1/2 -translate-x-1/2">
          <h1 className="font-serif text-lg tracking-widest uppercase font-medium">
            The BUNCHHAT Collective
          </h1>
        </div>


      </header>

      <main className="flex-1 w-full max-w-md mx-auto overflow-x-hidden">
        {/* 2. Immersive Visuals */}
        <div className="-mx-4 px-4">
          <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-200">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 448px"
              priority
            />
          </div>
        </div>

        {/* 3. Product Intro */}
        <div className="pt-8 pb-6 px-4 space-y-3">
          <div className="flex items-center gap-1.5 text-stone-500">
            <Star className="h-3 w-3 fill-stone-400 stroke-none" />
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold">
              Nepal
            </span>
          </div>
          
          <h2 className="font-serif text-4xl leading-[1.1] text-stone-900">
            {product.title}
          </h2>
          
         
        </div>

     
        {/* 5. Technical Grid */}
      

      </main>

      {/* 7. Sticky Call to Action */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-stone-50/80 backdrop-blur-md border-t border-stone-200 z-50">
        <div className="max-w-md mx-auto">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full bg-rose-600 hover:bg-rose-700 text-white py-4 rounded-xl shadow-lg shadow-rose-600/20 active:scale-[0.98] transition-all duration-200"
          >
            <MessageCircle className="h-5 w-5 fill-current" />
            <span className="font-sans font-bold uppercase tracking-widest text-sm">
              Inquire on WhatsApp
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
