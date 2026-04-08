"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  id: number;
  image: string;
  alt: string;
  category: string;
  title: string;
  subtitle: string;
};

export function HeroSection() {
  const slides = useMemo<Slide[]>(() => [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1800&q=80",
      alt: "Woman in traditional handloom attire",
      category: "New Arrival",
      title: "Heirloom Threads",
      subtitle: "Handcrafted dhaka sarees for timeless elegance.",
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1800&q=80",
      alt: "Handcrafted textiles and drapes",
      category: "Artisanal",
      title: "The Craft Story",
      subtitle: "Preserving Nepal's rich cultural heritage in every weave.",
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1800&q=80",
      alt: "Festive saree drape in studio",
      category: "Festive",
      title: "Divine Drapes",
      subtitle: "Celebrate traditions with our exclusive festive collection.",
    },
  ], []);

  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = (index: number) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  return (
    <section className="mx-auto mt-6 w-full max-w-7xl px-4">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-stone-100 shadow-xl shadow-stone-200/50">
        <div className="relative aspect-[21/9] w-full">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 ${index === activeIndex ? "block" : "hidden"}`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />

              <div className="absolute inset-y-0 left-0 flex flex-col justify-center px-16 text-left">
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-rose-400 mb-4">
                  {slide.category}
                </p>
                <h2 className="font-serif text-6xl font-medium text-white italic leading-tight mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg font-light text-stone-200 max-w-md leading-relaxed mb-8">
                  {slide.subtitle}
                </p>
                <button className="w-fit px-10 py-4 bg-white text-stone-900 text-sm font-bold rounded-full shadow-lg">
                  Contact Whattsapp
                </button>
              </div>
            </div>
          ))}

          <button
            type="button"
            aria-label="Previous slide"
            onClick={() => goTo(activeIndex - 1)}
            className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white border border-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={() => goTo(activeIndex + 1)}
            className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white border border-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
                className={`${index === activeIndex ? "w-8 bg-white" : "w-2 bg-white/40" } h-1.5 rounded-full`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}