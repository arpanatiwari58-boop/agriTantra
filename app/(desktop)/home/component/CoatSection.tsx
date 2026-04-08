"use client";

import { useState } from "react";

import { ProductModal } from "@/component/ProductModal";

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
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col md:flex-row gap-20 items-start">
          
          {/* left text - Static Sidebar Style */}
          <div className="md:w-1/3 sticky top-24">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-500 mb-4">
              Heritage Layers
            </p>
            <h2 className="font-serif text-3xl font-medium text-stone-900  leading-tight mb-6">
              Shawls & <br /> Wraps
            </h2>
            <div className="h-px w-12 bg-rose-200 mb-6" />
            <p className="text-sm leading-relaxed text-stone-500">
              Handwoven warmth with regional motifs and intricate embroideries, perfect for timeless elegance.
            </p>
            <button className="mt-10 group flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-stone-900 hover:text-rose-600 transition-colors">
              View Collection
              <div className="h-px w-8 bg-stone-900 group-hover:bg-rose-600 group-hover:w-12 transition-all" />
            </button>
          </div>

          {/* product horizontal scroll / grid */}
          <div className="md:w-2/3">
            <div className="flex gap-8 overflow-x-auto pb-10 no-scrollbar snap-x">
              {coats.map((p) => (
                <div
                  key={p.title}
                  className="min-w-[280px] group flex flex-col snap-start"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-stone-100 shadow-sm transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-stone-200 group-hover:-translate-y-2">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    
                  

                    <button 
                      onClick={() => setActiveProduct(p)}
                      className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                    >
                      <span className="px-8 py-3 bg-white text-stone-900 text-xs font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Quick View
                      </span>
                    </button>
                  </div>

                  <div className="mt-8 flex flex-col items-center text-center">
                  
                    <h3 className="font-serif text-xl font-medium text-stone-900 mb-3   transition-colors">
                      {p.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
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
          tag:  "Sale" ,
        }}
      />
      )}
    </section>
  );
}
