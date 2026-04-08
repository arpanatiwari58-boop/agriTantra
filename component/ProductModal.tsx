"use client";

import { useEffect } from "react";
import { X, MessageCircle, Star, ShieldCheck, Globe, Info } from "lucide-react";

export type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  whatsappNumber: string; 
  product: {
    title: string;
    image: string;
    price?: number;
    description?: string;
    tag?: string;
    region?: string;
  };
};

export function ProductModal({ open, onClose, whatsappNumber, product }: ProductModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${product.title}. Can you provide more details?`
  )}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Background Overlay */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full  max-w-4xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl transition-all duration-500 animate-in fade-in zoom-in slide-in-from-bottom-4">
        {/* Close Button */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-6 top-6 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-stone-900 shadow-sm ring-1 ring-stone-200 transition-all hover:bg-white hover:scale-110 active:scale-95"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="grid grid-cols-1 min-h-120 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="relative bg-stone-100 h-[400px] md:h-auto">
            
            <div className="h-full w-full overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="flex flex-col p-8 md:p-12 bg-white">
            <div className="space-y-6">
              <div className="flex items-center gap-2 text-rose-500">
                <Star className="h-3 w-3 fill-current" />
                <span className="font-sans text-[10px] font-bold uppercase tracking-[0.2em]">
                  {product.region || "Handcrafted in Nepal"}
                </span>
              </div>

              <h2 className="font-serif text-4xl leading-tight text-stone-900">
                {product.title}
              </h2>

              <div className="h-px w-12 bg-rose-200" />

            
              
            </div>

            {/* Premium Trust Indicators */}
           
            {/* Call to Action */}
            <div className="mt-10 space-y-4">
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-2xl shadow-lg shadow-emerald-600/10 active:scale-[0.98] transition-all duration-200 group"
              >
                <MessageCircle className="h-5 w-5 fill-current transition-transform group-hover:scale-110" />
                <span className="font-sans font-bold uppercase tracking-[0.2em] text-xs">
                  Inquire on WhatsApp
                </span>
              </a>
              
              <p className="text-center text-[10px] text-stone-400 uppercase tracking-widest">
                Direct artisan connection • Secure Inquiry
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
