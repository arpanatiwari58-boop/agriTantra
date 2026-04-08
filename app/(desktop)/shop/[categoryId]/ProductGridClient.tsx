"use client";

import { useState } from "react";
import { ProductModal } from "@/component/ProductModal";
import type { Product } from "./page";

type ProductGridClientProps = {
  products: Product[];
  tagStyles: Record<string, string>;
  whatsappNumber: string;
};

export function ProductGridClient({ products, tagStyles, whatsappNumber }: ProductGridClientProps) {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <>
      <div className="grid gap-8 sm:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.title}
            className="group relative flex flex-col"
          >
            {/* Image Container */}
            <div 
              onClick={() => setActiveProduct(product)}
              className="relative aspect-[3/4] overflow-hidden rounded-[2rem] bg-stone-100 cursor-pointer shadow-sm transition-all duration-500 group-hover:shadow-xl group-hover:shadow-stone-200 group-hover:-translate-y-1"
            >
             

              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Quick View Overlay */}
              <div className="absolute inset-0 bg-stone-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="px-6 py-2.5 bg-white text-stone-900 text-[10px] font-bold uppercase tracking-widest rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                  Quick View
                </span>
              </div>
            </div>

            {/* Product Details */}
            <div className="mt-6 flex flex-col items-center text-center px-2">
            

              <h3 className=" text-md font-medium text-black mb-2  transition-colors">
                {product.title}
              </h3>

    
            </div>
          </div>
        ))}
      </div>

      <ProductModal
        open={Boolean(activeProduct)}
        onClose={() => setActiveProduct(null)}
        whatsappNumber={whatsappNumber}
        product={{
          title: activeProduct?.title || "",
          image: activeProduct?.image || "",
          price: activeProduct?.price,
          description: undefined,
          region: activeProduct?.region,
          tag: activeProduct?.tag,
        }}
      />
    </>
  );
}