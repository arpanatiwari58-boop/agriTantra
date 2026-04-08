"use client";

import { useEffect, useState } from "react";
import { X, MessageCircle, Heart, ChevronLeft, ShieldCheck, Globe, Star, ArrowRight } from "lucide-react";
import Image from "next/image";

export type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  whatsappNumber: string;
  product: {
    title: string;
    image: string;
    price?: number | string;
    description?: string;
    tag?: string;
    region?: string;
    materials?: string;
    care?: string;
  };
};

export function ProductModal({ open, onClose, whatsappNumber, product }: ProductModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      document.body.style.overflow = "unset";
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!open && !mounted) return null;

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'm interested in ${product.title}. Can you share more details?`
  )}`;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-stone-50 transition-transform duration-500 ease-in-out touch-none ${
        open ? "translate-y-0" : "translate-y-full"
      }`}
    >
      {/* 1. Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-[110] flex items-center justify-between px-4 h-16 bg-stone-50/80 backdrop-blur-md border-b border-stone-200/50">
        <button 
          onClick={onClose}
          className="p-2 -ml-2 text-stone-900 active:scale-90 transition-transform"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <h1 className="font-serif text-xl tracking-widest uppercase text-stone-900">
          Bunchhat
        </h1>

        <button className="p-2 -mr-2 text-stone-900 active:scale-90 transition-transform">
          <Heart className="h-5 w-5" />
        </button>
      </header>

      {/* Scrollable Body Content */}
      <div className="h-full overflow-y-auto pt-16 pb-32 overscroll-contain">
        {/* 2. Immersive Image Section */}
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-200">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          {product.tag && (
            <div className="absolute top-6 left-6 bg-rose-600 text-white text-[10px] uppercase tracking-[0.2em] px-4 py-1.5 rounded-full font-medium shadow-lg">
              {product.tag}
            </div>
          )}
        </div>

        {/* 3. Product Overview Section */}
        <div className="px-6 py-10 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-rose-600">
              <Star className="h-3 w-3 fill-rose-600" />
              <p className="font-serif text-xs uppercase tracking-[0.2em] italic font-medium">
                {product.region || "Artisan Made in Nepal"}
              </p>
            </div>
            
            <h2 className="font-serif text-4xl text-stone-900 leading-tight">
              {product.title}
            </h2>
            
            <div className="flex items-baseline gap-2 pt-2">
              <p className="font-sans text-2xl font-bold text-stone-900 tracking-tight">
                Rs. {product.price || "Contact for Price"}
              </p>
              {product.price && (
                <span className="font-sans text-xs text-stone-400 uppercase tracking-widest">
                   (Tax included)
                </span>
              )}
            </div>
          </div>

          <div className="h-px bg-stone-200/60 w-full" />

          {/* 4. Story & Craft Section */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-stone-900">Artisan Story</h3>
            <p className="font-serif text-[17px] leading-relaxed text-stone-600 italic">
              Each thread of this {product.title.toLowerCase()} tells a story of generations. 
              Handcrafted in the heart of Nepal using traditional techniques that have 
              defined Himalayan elegance for centuries.
            </p>
            <p className="font-sans text-[14px] leading-relaxed text-stone-500">
              {product.description || "A timeless masterpiece that blends traditional Nepali aesthetics with contemporary comfort. Perfectly suited for those who value heritage and craftsmanship."}
            </p>
          </div>

          {/* 5. Utility Grid (Material, Care, etc.) */}
          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-5 bg-stone-100/50 rounded-2xl border border-stone-200/50">
              <p className="font-sans text-[11px] uppercase tracking-widest text-stone-400 mb-2">Material</p>
              <p className="font-sans text-sm font-semibold text-stone-800 tracking-tight">{product.materials || "Premium Dhaka / Cotton"}</p>
            </div>
            <div className="p-5 bg-stone-100/50 rounded-2xl border border-stone-200/50">
              <p className="font-sans text-[11px] uppercase tracking-widest text-stone-400 mb-2">Care</p>
              <p className="font-sans text-sm font-semibold text-stone-800 tracking-tight">{product.care || "Dry Clean Only"}</p>
            </div>
            <div className="p-5 bg-stone-100/50 rounded-2xl border border-stone-200/50">
              <p className="font-sans text-[11px] uppercase tracking-widest text-stone-400 mb-2">Origin</p>
              <p className="font-sans text-sm font-semibold text-stone-800 tracking-tight">Kathmandu, Nepal</p>
            </div>
            <div className="p-5 bg-stone-100/50 rounded-2xl border border-stone-200/50">
              <p className="font-sans text-[11px] uppercase tracking-widest text-stone-400 mb-2">Shipping</p>
              <p className="font-sans text-sm font-semibold text-stone-800 tracking-tight">Worldwide</p>
            </div>
          </div>

          <div className="pt-8 text-center pb-4">
            <p className="font-serif text-stone-400 italic text-sm">
              Handcrafted in Nepal with love & pride.
            </p>
          </div>
        </div>
      </div>

      {/* 6. Sticky CTA Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[110] px-6 py-6 bg-stone-50/90 backdrop-blur-xl border-t border-stone-200/50">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-3 w-full h-14 bg-rose-600 text-white rounded-full text-base font-semibold tracking-wide shadow-xl shadow-rose-900/10 active:scale-[0.98] transition-all duration-200"
        >
          <MessageCircle className="h-5 w-5 fill-current" />
          Enquire on WhatsApp
          <ArrowRight className="h-4 w-4 ml-1" />
        </a>
      </div>
    </div>
  );
}