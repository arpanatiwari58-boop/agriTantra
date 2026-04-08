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
    <section className="mx-auto w-full max-w-md mt-12 px-6 pb-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&display=swap');
        .fd { font-family: 'Cormorant Garamond', serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="mb-8 flex items-end justify-between">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-rose-500 mb-1">
            Browse Collection
          </p>
          <h2 className="fd text-3xl font-medium text-stone-900 ">
            Shop by Craft
          </h2>
        </div>

        <Link
          href="#"
          className="group flex items-center gap-2 px-4 py-2 bg-stone-100 rounded-full active:scale-95 transition-all duration-300"
        >
         
          <div className="h-5 w-5 rounded-full bg-stone-900 flex items-center justify-center transition-transform group-active:translate-x-0.5">
            <ArrowRight size={10} className="text-white" strokeWidth={3} />
          </div>
        </Link>
      </div>

      {/* HORIZONTAL SWIPEABLE CATEGORIES */}
      <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 -mx-6 px-6 snap-x snap-proximity">
        {categories.map((category) => (
          <Link
            key={category.title}
            href={category.href.replace('/shop/', '/m/shop/')}
            className="group flex flex-col items-center text-center shrink-0 snap-start"
          >
            {/* Elegant Circle with soft shadow */}
            <div className="relative h-20 w-20 rounded-full bg-stone-50 p-1 border border-stone-100 shadow-sm transition-all duration-300 active:scale-90 active:shadow-inner active:border-rose-100">
              <div className="h-full w-full rounded-full overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover grayscale-[20%] group-active:grayscale-0 transition-all duration-500"
                />
              </div>
              {/* Subtle accent ring on active */}
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-active:border-rose-500/20 transition-all" />
            </div>

            <p className="mt-4 text-[13px] font-semibold text-stone-800 tracking-tight leading-tight">
              {category.title}
            </p>
            <div className="mt-1 h-0.5 w-0 bg-rose-500 transition-all duration-300 group-active:w-4 rounded-full" />
          </Link>
        ))}
      </div>
    </section>
  );
}