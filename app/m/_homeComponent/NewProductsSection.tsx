"use client";

import { useState } from "react";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

type Product = {
  title: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  sale?: boolean;
  description?: string;
  region?: string;
};

const products: Product[] = [
  {
    title: "Classic White Oversized Tee",
    price: 21.99,
    oldPrice: 29.99,
    rating: 4,
    description: "Breathable cotton with relaxed drape for all-day ease.",
    region: "Jaipur craft studio",
    sale: true,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Vintage Denim Jacket",
    price: 64.99,
    rating: 5,
    description: "Hand-finished seams and brass hardware with a lived-in wash.",
    region: "Mumbai ateliers",
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Floral Summer Dress",
    price: 54.99,
    oldPrice: 69.99,
    rating: 4,
    sale: true,
    description: "Block-printed florals on soft mulmul with side pockets.",
    region: "Bagru artisans",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Running Sneakers",
    price: 89.99,
    rating: 4,
    description: "Featherlight knit upper with responsive midsole cushioning.",
    region: "Bengaluru design lab",
    image:
      "https://images.unsplash.com/photo-1528701800489-20be9f98098b?auto=format&fit=crop&w=800&q=80",
  },
];

export function NewProductsSection() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  const whatsappNumber = "919876543210"; // replace with real contact number

  return (
    <section className="w-full pb-16">
      {/* header */}
      <div className="mb-6 flex items-center justify-between px-6">
        <h2 className="font-serif  text-3xl font-medium tracking-tight text-neutral-900">
          New Arrivals
        </h2>

       
      </div>

      {/* list - bleed layout */}
      <div className="flex gap-4 overflow-x-auto px-6 pb-4 scrollbar-hide -mx-0">
        <div className="flex gap-4">
          {products.map((product) => (
            <div
              key={product.title}
              className="relative min-w-[200px] max-w-[200px] flex-shrink-0"
            >
              {/* Product Card with active state for touch feedback */}
              <Link
                href={`/m/product/classic-white-oversized-tee`}
                className="group relative w-full text-left active:scale-[0.98] transition-transform duration-200"
              >
                {/* image container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-stone-100">
                 

                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />

             
                </div>

                {/* content - Functional Sans-serif */}
                <div className="mt-3 space-y-1.5 px-0.5">
                  {/* rating - minimal dots/circles in Rose-500 */}
                  

                  {/* title */}
                  <p className="font-sans text-[13px] font-medium leading-snug text-neutral-800 line-clamp-2">
                    {product.title}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}