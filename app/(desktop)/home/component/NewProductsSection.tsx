"use client";

import { useState } from "react";

import { ProductModal } from "@/component/ProductModal";

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

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-20">
      {/* header */}
      <div className="mb-12 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-500 mb-2">
            Freshly Crafted
          </p>
          <h2 className="font-serif text-4xl font-medium text-stone-900 ">
            New Arrivals
          </h2>
        </div>

        
      </div>

      {/* list */}
      <div className="grid grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.title}
            className="group relative flex flex-col"
          >
            {/* image container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-stone-100 shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-stone-200 group-hover:-translate-y-2">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            

              <button 
                onClick={() => setActiveProduct(product)}
                className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
              >
                <span className="px-6 py-2.5 bg-white text-stone-900 text-xs font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  Quick View
                </span>
              </button>
            </div>

            <div className="mt-6 flex flex-col items-center text-center">
             
              <h3 className="font-serif text-lg font-medium text-stone-900  transition-colors">
                {product.title}
              </h3>
              
            </div>
          </div>
        ))}
      </div>

      {activeProduct && (
       <ProductModal
        open={Boolean(activeProduct)}
        onClose={() => setActiveProduct(null)}
        whatsappNumber={"9876543210"}
        product={{
          title: activeProduct?.title || "",
          image: activeProduct?.image || "",
          price: activeProduct?.price,
          description: activeProduct?.description,
          region: activeProduct?.region,
          tag: activeProduct?.sale ? "Sale" : undefined,
        }}
      />
      )}
    </section>
  );
}
              