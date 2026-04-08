"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

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
  const whatsappNumber = "919876543210"; // replace with real contact number

  return (
    <section className="bg-stone-50 py-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* header */}
        <div className="mb-10 text-center">
          <p className="font-serif text-[10px] tracking-[0.25em] text-stone-500 uppercase">
            Heritage Edit
          </p>

          <h2 className="mt-2 font-serif   text-3xl font-medium text-gray-900">
            Handcrafted Apparel
          </h2>

          <p className="mx-auto mt-3 max-w-[300px] text-[13px] leading-relaxed text-stone-600">
            Discover artisanal weaves, heritage embroideries, and timeless silhouettes crafted across regions.
          </p>
        </div>

        {/* grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-8">
          {products.map((p) => (
            <Link
              key={p.title}
              href={`/m/product/${encodeURIComponent(p.title)}`}
              className="group relative flex flex-col active:scale-[0.98] transition-transform duration-200"
            >
              {/* image */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-stone-200">
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                
                {/* Heart Icon Overlay */}
               
              </div>

              {/* text */}
              <div className="mt-3 flex flex-col space-y-1 text-center font-sans">
                <h3 className="text-[13px] font-medium text-gray-900 line-clamp-1">
                  {p.title}
                </h3>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
