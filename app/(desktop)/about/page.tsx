"use client";
import Link from "next/link";
import Image from "next/image";
import { Heart, Globe, Award, MapPin, ShieldCheck, Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-rose-100 selection:text-rose-900">
      
      {/* ─────────────────────────────────────────
          HERO SECTION - Heritage & Vision
      ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-stone-50 pt-12 pb-14">
        {/* Large Decorative Glyph */}
        <span
          className="pointer-events-none absolute -right-12 top-1/2 -translate-y-1/2 select-none font-serif text-[28rem] font-bold leading-none text-stone-100/80"
          aria-hidden
        >
          ब
        </span>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-center">
            {/* Column 1: Text Content */}
            <div className="text-center lg:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-500 mb-6 lg:mb-10">
                Lalitpur, Nepal — Est. 2012
              </p>
              
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium leading-[1.1] lg:leading-[1.05] text-stone-900">
                Woven with <br className="hidden lg:block" />
                <span className="text-rose-600 italic">Tradition,</span> <br className="hidden lg:block" />
                Styled for Today
              </h1>

              <div className="mt-8 lg:mt-10 mx-auto lg:mx-0 max-w-lg space-y-6">
                <p className="text-base md:text-lg leading-relaxed text-stone-600">
                  Bunchhat Collection is more than just a clothing store — it’s a heartfelt
                  initiative led by <span className="text-rose-600 font-medium">Menuka Rai</span>, a talented singer and passionate advocate for Nepali
                  culture and heritage.
                </p>
                <p className="text-sm md:text-base leading-relaxed text-stone-500 italic">
                  "Located in Tutepani Marga, Lalitpur, our mission is to bring
                  Nepal’s rich traditions, craftsmanship, and authentic handmade products to the
                  global stage."
                </p>
                
                <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
                  <Link
                    href="/shop"
                    className="rounded-full bg-stone-900 px-8 lg:px-10 py-3.5 lg:py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 active:scale-95 shadow-lg shadow-stone-900/10"
                  >
                    Explore Collection
                  </Link>
                  <Link
                    href="/contact"
                    className="rounded-full border border-stone-200 bg-white px-8 lg:px-10 py-3.5 lg:py-4 text-[10px] lg:text-xs font-bold uppercase tracking-widest text-stone-600 transition-all hover:bg-stone-50 active:scale-95"
                  >
                    Find Us
                  </Link>
                </div>
              </div>

              {/* Inline Trust Stats */}
              <div className="mt-12 lg:mt-16 flex justify-center lg:justify-start gap-8 lg:gap-12 pt-10 lg:pt-12 border-t border-stone-200/60">
                {[
                  { value: "100%", label: "Handcrafted" },
                  { value: "Nepal", label: "Origin" },
                  { value: "Global", label: "Shipping" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="font-serif text-2xl lg:text-3xl font-medium text-rose-600">{stat.value}</p>
                    <p className="mt-1 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-stone-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Hero Image */}
            <div className="relative max-w-lg mx-auto lg:max-w-none">
              <div className="aspect-[3/4] overflow-hidden rounded-[2.5rem] shadow-2xl shadow-stone-200">
                <Image
                  src="https://bunchhatcollection.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero1.ccf75e99.png&w=1080&q=75"
                  alt="Bunchhat Collection Artisan"
                  fill
                  className="object-cover transition-transform duration-1000 hover:scale-105"
                  priority
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 lg:-bottom-8 -left-4 lg:-left-8 rounded-2xl lg:rounded-3xl bg-white p-4 lg:p-6 shadow-xl shadow-stone-200/50 border border-stone-50">
                <div className="flex items-center gap-3 lg:gap-4">
                   <div className="flex h-8 lg:h-10 w-8 lg:w-10 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <p className="text-[10px] lg:text-[11px] font-bold text-stone-900 uppercase tracking-wider">Authentic Nepali</p>
                    <p className="text-[9px] lg:text-[10px] text-stone-400 mt-0.5 uppercase tracking-widest">Hand-Loomed Quality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          FOUNDER STORY SECTION
      ───────────────────────────────────────── */}
      <section className="bg-white py-12 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Founder Image */}
            <div className="relative group max-w-lg mx-auto lg:max-w-none order-2 lg:order-1">
              <div className="aspect-[4/5] overflow-hidden rounded-[2.5rem] lg:rounded-[3rem] shadow-2xl transition-transform duration-700 group-hover:-translate-y-2">
                <Image
                  src="https://bunchhatcollection.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fwaving.cf739c83.jpg&w=640&q=75"
                  alt="Menuka Rai - Founder"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-900/80 via-stone-900/40 to-transparent p-6 lg:p-12 rounded-b-[2.5rem] lg:rounded-b-[3rem]">
                <h3 className="font-serif text-2xl lg:text-3xl text-white">Menuka Rai</h3>
                <p className="text-[10px] lg:text-xs font-bold uppercase tracking-[0.2em] text-rose-400 mt-2">Singer & Founding Director</p>
              </div>
            </div>

            {/* Vision Text */}
            <div className="space-y-8 lg:space-y-10 order-1 lg:order-2 text-center lg:text-left">
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-500">
                  The Heart of Bunchhat
                </p>
                <h2 className="font-serif text-4xl lg:text-5xl font-medium italic text-stone-900 leading-tight">
                  Driven by Passion & Tradition
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-lg lg:text-xl leading-relaxed text-stone-900 border-l-4 border-rose-600 pl-6 italic font-serif text-left">
                   "मैले नेपाली उत्पादनहरू साथै संस्कृतिलाई विश्वसम्म पुर्‍याउने उद्देश्यले यो व्यवसाय सुरु गरेकी हुँ। नेपाली हस्तनिर्मित वस्तुहरू सबैले प्रयोग गरी आफू नेपाली हुनुमा गर्व गर्दै संसारसम्म आफ्नो शिर उच्च राख्ने अनुभूति गर्न सकौँ भन्ने मेरो चाहना हो।"
                </p>
                <div className="space-y-4 text-sm lg:text-base leading-relaxed text-stone-600">
                  <p>
                    Menuka Rai started this journey with the belief that by embracing and wearing Nepali products, we can proudly uphold our identity and celebrate our culture with dignity.
                  </p>
                  <p>
                    Whether you are from the Limbu, Rai, Magar, Gurung, or Newar community — or simply someone who values authentic Nepali attire — you’ll find something special here. We celebrate the diverse beauty of Nepal with outfits for weddings, pujas, and festivals.
                  </p>
                </div>
              </div>

              {/* Pillars Grid */}
              <div className="grid grid-cols-2 gap-x-6 gap-y-8 pt-6 lg:pt-10">
                {[
                  { icon: Heart, title: "Handcrafted", desc: "Slow-made by artisans" },
                  { icon: Globe, title: "Shipping", desc: "Reaching worldwide" },
                  { icon: Award, title: "Heritage", desc: "Ancient techniques" },
                  { icon: Star, title: "Premium", desc: "Highest standards" },
                ].map((pillar) => (
                  <div key={pillar.title} className="flex flex-col sm:flex-row items-center lg:items-start text-center lg:text-left gap-3 lg:gap-4">
                    <div className="flex-shrink-0 h-9 lg:h-10 w-9 lg:w-10 flex items-center justify-center rounded-xl bg-stone-50 text-rose-600 border border-stone-100">
                      <pillar.icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-[9px] lg:text-[11px] font-bold uppercase tracking-widest text-stone-900">{pillar.title}</h4>
                      <p className="text-[9px] lg:text-[10px] text-stone-500 mt-0.5">{pillar.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────
          GALLERY / ETHOS GRID
      ───────────────────────────────────────── */}
      <section className="bg-stone-50 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400 mb-6">
            The BUNCHHAT Philosophy
          </p>
          <h2 className="font-serif text-5xl font-medium text-stone-900 mb-16 italic">
            Connecting People through Culture
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              "https://bunchhatcollection.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero2.0f2ad4c4.png&w=1080&q=75",
              "https://bunchhatcollection.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdhaka-saree%20(8).9b501de3.png&w=640&q=75",
              "https://bunchhatcollection.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhero3.db9c66d4.jpg&w=1080&q=75"
            ].map((img, i) => (
              <div key={i} className="group relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-xl shadow-stone-200">
                <Image
                  src={img}
                  alt="Gallery Item"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-stone-900/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}