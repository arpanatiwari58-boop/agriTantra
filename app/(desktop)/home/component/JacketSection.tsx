"use client";

import { useState } from "react";


import { ProductModal } from "@/component/ProductModal";


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
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const whatsappNumber = "919876543210"; // replace with real contact number

  return (
  <section className="bg-stone-50 py-20">

      <div className="mx-auto max-w-7xl px-4">

        {/* header */}
        <div className="mb-12 flex items-end justify-between">

          <div>
            <p className="font-serif text-[10px] tracking-[0.25em] text-rose-500 font-medium uppercase">
              CURATED CRAFT
            </p>

            <h2 className="mt-2 font-serif text-4xl font-medium text-stone-900 ">
              Heritage Jewellery
            </h2>
          </div>

        

        </div>



        <div className="grid gap-8 md:grid-cols-2">

          {/* banner */}
          <div className="relative overflow-hidden rounded-[2.5rem] shadow-xl shadow-stone-200/50 ring-1 ring-stone-100">

            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1600&q=80"
              className="h-full w-full object-cover"
            />

            {/* gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent" />

            {/* text */}
            <div className="absolute bottom-12 left-12 right-12 text-white">

              <p className="text-[10px] tracking-[0.3em] text-stone-300 font-medium uppercase font-sans mb-3">
                NEW ARRIVALS
              </p>

              <h3 className="font-serif text-5xl  mb-8">
                Regal Polki Sets
              </h3>

              <button className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-10 py-4 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg transition hover:bg-white hover:text-stone-900 active:scale-95 font-sans">
                Contact now
              </button>

            </div>

          </div>



          {/* products */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-10">
            {products.map((p) => (
              <button
                key={p.title}
                onClick={() => setActiveProduct(p)}
                className="group flex flex-col text-left"
              >
                {/* image container */}
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-stone-100 ring-1 ring-stone-200">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

                {/* text container */}
                <div className="mt-4 text-center">
                  <p className="font-sans text-sm font-medium text-stone-900 line-clamp-1">
                    {p.title}
                  </p>
                  
                </div>
              </button>
            ))}
          </div>

        </div>

        <ProductModal
          open={Boolean(activeProduct)}
          onClose={() => setActiveProduct(null)}
          whatsappNumber={whatsappNumber}
          product={{
            title: activeProduct?.title || "",
            image: activeProduct?.image || "",
            price: activeProduct?.price,
            description: activeProduct?.description,
            region: activeProduct?.region,
            tag: undefined,
          }}
        />

      </div>
    </section>
  );
}