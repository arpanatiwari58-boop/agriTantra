"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { ProductModal } from "@/component/ProductModal";

type Product = {
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  description?: string;
  region?: string;
};

const products: Product[] = [
  {
    title: "Banarasi Silk Saree",
    price: 189,
    oldPrice: 229,
    description: "Zari buta on katan silk with meenakari highlights.",
    region: "Varanasi looms",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80&sat=-10",
  },
  {
    title: "Handloom Linen Kurta",
    price: 79,
    oldPrice: 99,
    description: "Breathable linen with selvedge detailing and coconut buttons.",
    region: "Kerala weaves",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Ajrakh Print Dress",
    price: 94,
    oldPrice: 119,
    description: "Natural-dyed ajrakh blocks on soft modal with waist tie.",
    region: "Kutch artisans",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Embroidered Nehru Jacket",
    price: 129,
    oldPrice: 159,
    description: "Hand aari embroidery on textured cotton-silk blend.",
    region: "Lucknow ateliers",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Chikankari Kurti",
    price: 72,
    oldPrice: 89,
    description: "Shadow work floral motifs with mukaish highlights.",
    region: "Lucknow craft clusters",
    image:
      "https://images.unsplash.com/photo-1582719478248-54e9f2af5400?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Handwoven Ikat Dress",
    price: 98,
    oldPrice: 129,
    description: "Double ikat checks with soft flare and side pockets.",
    region: "Telangana weaves",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80&sat=-25",
  },
];

export function ApparelSection() {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const whatsappNumber = "919876543210"; // replace with real contact number

  return (
  <section className="bg-stone-50 py-20">

      <div className="mx-auto max-w-7xl px-4">

        {/* header */}
        <div className="mb-10 text-center">

          <p className="font-serif text-[10px] tracking-[0.25em] text-rose-500 uppercase">
            HERITAGE EDIT
          </p>

          <h2 className="mt-2 font-serif text-3xl font-light text-stone-900 ">
            Handcrafted Apparel
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-stone-600">
            Discover artisanal weaves, heritage embroideries, and timeless silhouettes crafted across regions.
          </p>

        </div>



        {/* grid */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

          {products.map((p) => (
            <button
              key={p.title}
              onClick={() => setActiveProduct(p)}
              className="group text-left"
            >

              {/* image */}
              <div className="relative overflow-hidden rounded-2xl bg-stone-100 ring-1 ring-stone-200">

              

                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>

              </div>


              {/* text */}
              <div className="mt-3 space-y-1 text-center">

                <p className="text-sm font-medium text-stone-900 line-clamp-1">
                  {p.title}
                </p>

               

              </div>

            </button>
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
            description: activeProduct?.description,
            region: activeProduct?.region,
            tag: undefined,
          }}
        />

      </div>

    </section>
  );
}