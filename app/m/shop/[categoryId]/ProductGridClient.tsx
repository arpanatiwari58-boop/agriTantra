"use client";

import Link from "next/link";
import type { Product } from "./page";

type ProductGridClientProps = {
  products: Product[];
  tagStyles: Record<string, string>;
  whatsappNumber: string;
};

export function ProductGridClient({ products, tagStyles, whatsappNumber }: ProductGridClientProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        {products.map((product) => (
          <Link
            key={product.title}
            href={`/m/product/${encodeURIComponent(product.title)}`}
            className="group relative cursor-pointer text-left active:scale-95 transition-transform duration-200"
          >
            <div className="relative overflow-hidden rounded-xl bg-stone-100">
              
              

              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="mt-3 space-y-1 px-1">
              {product.region && (
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-rose-600/80 font-sans">
                  {product.region}
                </p>
              )}

              <p className="text-[13px] font-medium text-stone-800 line-clamp-1 font-sans">
                {product.title}
              </p>

             
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
