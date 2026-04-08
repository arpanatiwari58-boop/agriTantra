"use client";

import { Feather, Menu, Search, MessageCircle, X, ShoppingBag, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const navLinks = [
  { label: "Coat", href: "/m/shop/coat", count: 12 },
  { label: "Dhaka Meter Cloth", href: "/m/shop/dhaka-meter-cloth", count: 8 },
  { label: "Kurtha", href: "/m/shop/kurtha", count: 15 },
  { label: "Jewellery", href: "/m/shop/jewellery", count: 22 },
  { label: "Shawls & Wraps", href: "/m/shop/shawls-wraps", count: 10 },
  { label: "Accessories", href: "/m/shop/accessories", count: 18 },
  { label: "Sale", href: "/m/shop/sale", isSpecial: true },
];

export function Header() {
  const quickLinks = useMemo(() => navLinks, []);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,600&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

  .brand {
    font-family: 'Marcellus', serif;
    letter-spacing: 0.06em;
  }

  .fd {
    font-family: 'Cormorant Garamond', serif;
  }
`}</style>

      {/* HEADER */}
      <header className=" w-full border-b border-stone-100 bg-white/70 backdrop-blur-xl transition-all duration-300">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3.5">
          
          {/* LEFT - MENU */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMenuOpen(true)}
              className="p-2 -ml-2 rounded-full transition active:scale-90 active:bg-stone-100"
              aria-label="Open menu"
            >
              <Menu className="h-6 w- text-stone-900" strokeWidth={3} />
            </button>
          </div>

          {/* CENTER - BRAND */}
          <Link href="/m" className="flex flex-col items-center group">
            <div className="flex items-center gap-1.5 translate-x-0.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rose-700 text-rose-50 shadow-sm shadow-rose-200 transition-transform group-active:scale-95">
                <Feather className="h-5 w-4" strokeWidth={3} />
              </span>
       <span className="brand text-[12px] uppercase tracking-[0.35em] text-stone-600 mt-0.5">
  BunchHat
</span>
            </div>
    <span className="fd text-[22px] font-semibold tracking-tight text-stone-900 -mt-1 italic">
  Collection
</span>
          </Link>

          {/* RIGHT - ACTIONS */}
          <div className="flex items-center gap-2">
           <div className="flex items-center gap-1">
  <Link
    href="https://wa.me/9779808399048"
    target="_blank"
    className="flex items-center gap-1 rounded-full bg-green-600 px-3 py-2 transition active:scale-95 shadow-sm"
    aria-label="Contact on WhatsApp"
  >
    <MessageCircle className="h-5 w-5 text-white" strokeWidth={2} />
    <span className="text-white text-sm font-medium">WhatsApp</span>
  </Link>
</div>
          </div>
        </div>

        {/* SEARCH BAR - PREMIUM NEU-MINIMALIST DESIGN */}
 
      </header>

      {/* OVERLAY */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* SIDE DRAWER */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[88%] max-w-[320px] bg-white shadow-2xl transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* DRAWER HEADER - ELEGANT BRANDING */}
        <div className="flex items-center justify-between border-b border-stone-50 px-6 py-6 bg-stone-50/10">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold tracking-[0.2em] text-stone-400 uppercase">The</span>
            <span className="fd text-2xl font-bold text-stone-900 leading-none italic">Catalog</span>
          </div>
          <button 
            onClick={() => setMenuOpen(false)}
            className="p-2 -mr-1.5 rounded-full hover:bg-stone-100 transition duration-200"
          >
            <X className="h-5.5 w-5.5 text-stone-900" strokeWidth={1.5} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex flex-col h-[calc(100%-84px)] overflow-y-auto">
          
          <div className="px-3 py-6 space-y-0.5">
            <Link
              href="/m"
              onClick={() => setMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-3.5 text-[16px] font-semibold text-stone-950 rounded-2xl active:bg-stone-100 transition active:scale-[0.98]"
            >
              <span className="fd text-xl italic">Home</span>
              <span className="h-1.5 w-1.5 bg-rose-600 rounded-full ml-auto"></span>
            </Link>
            <Link
              href="/m/about"
              onClick={() => setMenuOpen(false)}
              className="fd flex items-center px-4 py-3.5 text-xl font-medium text-stone-700 rounded-2xl active:bg-stone-50 transition italic"
            >
              Brand Story
            </Link>
            <Link
              href="/m/contact"
              onClick={() => setMenuOpen(false)}
              className="fd flex items-center px-4 py-3.5 text-xl font-medium text-stone-700 rounded-2xl active:bg-stone-50 transition italic"
            >
              Support
            </Link>
          </div>

          <div className="mx-8 border-t border-stone-100" />

          <div className="px-3 py-6 space-y-0.5">
            <p className="px-4 pb-3 text-[10px] font-extrabold uppercase tracking-[0.3em] text-stone-300">
              Heirloom Categories
            </p>
            {quickLinks.map((item: any) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-4 text-[15px] rounded-2xl active:bg-stone-50 transition active:scale-[0.98] ${
                  item.isSpecial ? "bg-rose-50/50 text-rose-800 font-bold" : "text-stone-600 font-medium"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={item.isSpecial ? "fd text-lg italic" : ""}>{item.label}</span>
                  {item.count && (
                    <span className="px-1.5 py-0.5 rounded-md bg-stone-100 text-[10px] font-bold text-stone-400 group-active:bg-stone-200">
                      {item.count}
                    </span>
                  )}
                </div>
                <ArrowRight className={`h-4 w-4 ${item.isSpecial ? "text-rose-300" : "text-stone-200"}`} strokeWidth={2.5} />
              </Link>
            ))}
          </div>

          {/* DRAWER FOOTER - PREMIUM TOUCH */}
          <div className="mt-auto p-8 border-t border-stone-50 space-y-4">
            <div className="flex items-center gap-4">
               <div className="h-10 w-10 rounded-full bg-stone-900 flex items-center justify-center text-white">
                 <User size={20} strokeWidth={1.5} />
               </div>
               <div>
                 <p className="fd text-lg font-bold text-stone-900 italic leading-none">Sign In</p>
                 <p className="text-xs text-stone-400">Manage your collection</p>
               </div>
            </div>
            <p className="fd text-[12px] text-stone-500 leading-relaxed italic">
              Handcrafted with devotion in Nepal. Shipping globally from our valley to your doorstep.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}