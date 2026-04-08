"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

type Product = {
  title: string;
  price: number;
  image: string;
  tag?: string;
  description?: string;
  region?: string;
};

const coats: Product[] = [
  {
    title: "Pashmina Stole",
    price: 149,
    tag: "NEW",
    description: "Pure pashmina with hand-rolled edges and subtle twill.",
    region: "Kashmir looms",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Handwoven Kullu Shawl",
    price: 129,
    description: "Geometric Kullu borders on soft wool base.",
    region: "Himachal weavers",
    image:
      "https://images.unsplash.com/photo-1582719478215-2fd3c5b72a1b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Kani Jamawar Wrap",
    price: 199,
    tag: "SALE",
    description: "Intricate kani motifs across the field with paisley pallus.",
    region: "Kashmir artisans",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Embroidered Cape",
    price: 139,
    description: "Wool-blend cape with phulkari-inspired embroidery.",
    region: "Punjab clusters",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80&sat=-20",
  },
  {
    title: "Merino Wool Shawl",
    price: 159,
    description: "Ultra-soft merino finished with ladder hem stitch.",
    region: "Uttarakhand looms",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=900&q=80&sat=-15",
  },
];

export function CoatSection() {
  return (
    <section className="bg-stone-50 py-16 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="font-serif text-[12px] tracking-[0.3em] text-black uppercase">
            HERITAGE LAYERS
          </p>
          <h2 className="mt-2 font-serif  text-3xl font-medium text-gray-900">
            Shawls & Wraps
          </h2>
          <div className="mx-auto mt-4 h-px w-8 bg-stone-300" />
          <p className="mx-auto mt-4 font-sans text-xs leading-relaxed text-stone-500 max-w-[280px]">
            Handwoven warmth with regional motifs and intricate embroideries.
          </p>
        </div>

        {/* Scroll Row */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-8 snap-x snap-mandatory scroll-smooth">
          {coats.map((p) => (
            <div
              key={p.title}
              className="group relative min-w-[75%] sm:min-w-[260px] max-w-[260px] flex-shrink-0 snap-start"
            >
              <div className="relative">
                {/* MAIN CLICK */}
                <Link
                  href={`/m/product/${encodeURIComponent(p.title)}`}
                  className="block w-full text-left active:scale-95 transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-stone-100 shadow-sm transition-shadow duration-500">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover"
                    />

                 
                  </div>

                <div className="mt-3 flex flex-col space-y-1 text-center font-sans">
                <h3 className="text-[13px] font-medium text-gray-900 line-clamp-1">
                  {p.title}
                </h3>

              </div>
                </Link>

                {/* HEART BUTTON (fixed placement) */}
       
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}