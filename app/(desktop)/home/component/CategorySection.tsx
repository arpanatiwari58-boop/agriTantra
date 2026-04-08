import { ArrowRight } from "lucide-react";
import Link from "next/link";

type Category = {
  title: string;
  image: string;
  href: string;
};

const categories: Category[] = [
  {
    title: "Sarees",
    href: "/shop/sarees",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80&sat=-10",
  },
  {
    title: "Kurta Sets",
    href: "/shop/kurta-sets",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Handloom",
    href: "/shop/handloom",
    image:
      "https://images.unsplash.com/photo-1582719478215-2fd3c5b72a1b?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Jewellery",
    href: "/shop/jewellery",
    image:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Festive Wear",
    href: "/shop/festive-wear",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Footwear",
    href: "/shop/footwear",
    image:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Accessories",
    href: "/shop/accessories",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80&sat=-30",
  },
];

export function CategorySection() {
  return (
    <section className="mx-auto w-full max-w-7xl mt-16 px-4 pb-16">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-500 mb-2">
            Browse Collection
          </p>
          <h2 className="font-serif text-4xl font-medium text-stone-900 ">
            Shop by Craft
          </h2>
        </div>

  
      </div>

      {/* GRID FOR DESKTOP */}
      <div className="grid grid-cols-7 gap-6">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href}
            className="group flex flex-col items-center text-center"
          >
            {/* Elegant Circle with soft shadow */}
            <div className="relative h-32 w-32 rounded-full bg-stone-50 p-1.5 border border-stone-100 shadow-sm transition-all duration-500 group-hover:scale-105 group-hover:shadow-xl group-hover:shadow-stone-200 group-hover:border-rose-100">
              <div className="h-full w-full rounded-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
            </div>

            <p className="mt-4 font-serif text-base font-medium text-stone-800 transition-colors  ">
              {category.title}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}