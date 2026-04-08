"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";

type Product = {
  title: string;
  price: number;
  image: string;
  rating: number;
  description?: string;
  region?: string;
};

const products: Product[] = [
  {
    title: "Kundan Chandbali Earrings",
    price: 79.99,
    rating: 4,
    description: "Gold-plated chandbalis with kundan inlay and pearl clusters.",
    region: "Jaipur karigars",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Temple Coin Necklace",
    price: 119.0,
    rating: 5,
    description: "Goddess Lakshmi coins strung with antique finish detailing.",
    region: "Karnataka templesmiths",
    image:
      "https://images.unsplash.com/photo-1516632664305-eda5d6a5bb3c?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Handcrafted Silver Kada",
    price: 89.5,
    rating: 4,
    description: "Oxidized sterling bangle with hand-etched vines.",
    region: "Gujarat silversmiths",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
  },
];

export function FeaturedJewellerySection() {
  return (
    <section className="bg-stone-50 py-12 overflow-hidden">
      <div className="px-6">
        {/* header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.25em] text-stone-500 font-medium uppercase font-sans">
              CURATED CRAFT
            </p>
            <h2 className="mt-1  text-3xl font-medium font-serif text-stone-900 ">
              Heritage Jewellery
            </h2>
          </div>
          
        </div>

        {/* banner */}
        <div className="relative mb-10 overflow-hidden rounded-[2rem] shadow-xl shadow-stone-200/50 aspect-[4/5]">
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80"
            className="h-full w-full object-cover"
            alt="Regal Polki Sets"
          />
          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />
          {/* text */}
          <div className="absolute bottom-10 left-8 right-8 text-white">
            <p className="text-[10px] tracking-[0.3em] text-stone-300 font-medium uppercase font-sans mb-2">
              NEW ARRIVALS
            </p>
            <h3 className="text-4xl font-serif italic mb-6">
              Regal Polki Sets
            </h3>
            <button className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition active:scale-95 font-sans">
              Shop Now
            </button>
          </div>
        </div>

        {/* products horizontal scroll */}
        <div className="-mx-6 px-6 overflow-x-auto no-scrollbar flex gap-5 pb-8">
          {products.map((p) => (
            <Link
              key={p.title}
              href={`/m/product/${encodeURIComponent(p.title)}`}
              className="flex-none w-[200px] group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-stone-100 transition active:scale-[0.98]">
                <img
                  src={p.image}
                  className="h-full w-full object-cover transition group-hover:scale-105"
                  alt={p.title}
                />
              </div>

              <div className="mt-4 px-1">
                <p className="text-sm font-medium text-stone-800 font-sans truncate">
                  {p.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}