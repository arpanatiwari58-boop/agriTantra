"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
  id: number;
  image: string;
  alt: string;
  title: string;
  subtitle: string;
  category: string;
};

const SLIDE_INTERVAL_MS = 5000;

export function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const slides = useMemo<Slide[]>(
    () => [
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
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);

  // ✅ FIXED: stable interval (no dependency on activeIndex)
  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % slides.length;
        goTo(next);
        return next;
      });
    }, SLIDE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [slides.length]);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const scrollLeft = scrollRef.current.scrollLeft;
    const width = scrollRef.current.clientWidth; // ✅ FIXED
    const index = Math.round(scrollLeft / width);

    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const goTo = (index: number) => {
    if (!scrollRef.current) return;

    const width = scrollRef.current.clientWidth; // ✅ FIXED
    const targetIndex = (index + slides.length) % slides.length;

    scrollRef.current.scrollTo({
      left: targetIndex * width,
      behavior: "smooth",
    });

    setActiveIndex(targetIndex);
  };

  return (
    <section className="mx-auto mt-2 w-full max-w-md px-4">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&display=swap');
        .fd { font-family: 'Cormorant Garamond', serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="relative overflow-hidden rounded-[2.5rem] bg-stone-100 shadow-xl shadow-stone-200/50">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="relative aspect-[3/4] w-full flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar"
        >
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="relative h-full w-full flex-shrink-0 snap-start"
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="h-full w-full object-cover"
                loading={index === 0 ? "eager" : "lazy"}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              <div
                className={`absolute bottom-16 left-0 right-0 px-8 text-center transition-all duration-700 ${
                  index === activeIndex
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-400 mb-3">
                  {slide.category}
                </p>
                <h2 className="fd text-4xl font-medium text-white italic leading-tight mb-2">
                  {slide.title}
                </h2>
                <p className="text-sm font-light text-stone-200 max-w-[240px] mx-auto leading-relaxed">
                  {slide.subtitle}
                </p>

                <button className="mt-8 px-8 py-3 bg-white text-stone-900 text-xs font-bold rounded-full active:scale-95 transition-transform shadow-lg">
                  Explore Story
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* arrows */}
        <button
          onClick={() => goTo(activeIndex - 1)}
          className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          onClick={() => goTo(activeIndex + 1)}
          className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20"
        >
          <ChevronRight size={20} />
        </button>

        {/* dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goTo(index)}
              className={`h-1.5 rounded-full ${
                index === activeIndex
                  ? "w-8 bg-rose-500"
                  : "w-1.5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}