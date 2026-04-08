"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "../_component/Header";
import {
  Heart,
  Globe,
  Award,
  MapPin,
  Instagram,
  Mail,
  Phone,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-rose-100 selection:text-rose-900">


      <main className="pb-20">
        {/* HERO VISUAL */}
        <section className="relative px-4 pt-6">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1621112904887-419379ce6824?q=80&w=2072&auto=format&fit=crop"
              alt="Artisan at work"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-serif text-sm italic tracking-widest text-stone-100/90 uppercase">
                EST. 2012
              </span>
              <h1 className="font-serif text-4xl font-medium leading-tight text-white mt-2">
                Woven with <br />
                <span className="italic">Tradition,</span> <br />
                Styled for Today
              </h1>
            </div>
          </div>
        </section>

        {/* SECTION 1: THE VISION */}
        <section className="px-6 py-16 text-center text-stone-900">
          <span className="mb-4 block font-serif text-sm font-medium tracking-[0.2em] text-rose-600 uppercase">
            Who We Are
          </span>
          <p className="mt-8 text-[16px] leading-relaxed text-stone-600">
            Bunchhat Collection is more than just a clothing store — it’s a heartfelt
            initiative led by <span className="text-rose-600 font-medium">Menuka Rai</span>, a talented singer and passionate advocate for Nepali
            culture and heritage.
          </p>
          <div className="mx-auto mt-6 h-px w-12 bg-rose-200" />
          <p className="mt-8 text-[16px] leading-relaxed text-stone-600">
            Located in Tutepani Marga, Lalitpur, our mission is to bring
            Nepal’s rich traditions, craftsmanship, and authentic handmade products to the
            global stage.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-stone-600 italic">
            "Menuka Rai started this journey with the belief that by embracing
            and wearing Nepali products, we can proudly uphold our identity and celebrate our
            culture with dignity."
          </p>
        </section>

        {/* SECTION 2: THE FOUNDER */}
        <section className="bg-white px-6 py-20 border-y border-stone-200">
          <div className="flex flex-col items-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop"
                alt="Menuka Rai"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="mt-6 font-serif text-2xl font-semibold text-stone-900">
              Menuka Rai
            </h3>
            <p className="text-xs tracking-[0.1em] text-stone-400 uppercase mt-1">
              Singer & Founding Director
            </p>

            <blockquote className="mt-10 border-l-2 border-rose-600 pl-6 italic">
              <p className="font-serif text-xl leading-relaxed text-stone-800">
                "मैले नेपाली उत्पादनहरू साथै संस्कृतिलाई विश्वसम्म पुर्‍याउने उद्देश्यले यो व्यवसाय सुरु गरेकी हुँ। नेपाली हस्तनिर्मित वस्तुहरू सबैले प्रयोग गरी आफू नेपाली हुनुमा गर्व गर्दै संसारसम्म आफ्नो शिर उच्च राख्ने अनुभूति गर्न सकौँ भन्ने मेरो चाहना हो।"
              </p>
              <footer className="mt-4 font-sans text-sm font-medium text-stone-500">
                — Menuka Rai
              </footer>
            </blockquote>
          </div>
        </section>

        {/* SECTION 3: CRAFT PROVENANCE */}
        <section className="px-6 py-20">
          <h2 className="text-center font-serif text-3xl font-medium text-stone-900 mb-12">
            Our Mission & Vision
          </h2>

          <div className="grid grid-cols-2 gap-x-6 gap-y-12">
            {[
              { icon: Heart, title: "Heritage", desc: "Preserving ancient techniques through handcrafted garments." },
              { icon: Globe, title: "Identity", desc: "Helping every Nepali wear their culture with pride." },
              { icon: Award, title: "Artistry", desc: "Tribute to the artisans passed down through generations." },
              { icon: MapPin, title: "Authenticity", desc: "Woven into every thread from local craft clusters." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="mt-4 font-serif text-lg font-medium text-stone-900">{item.title}</h4>
                <p className="mt-2 text-xs leading-relaxed text-stone-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>



        {/* FOOTER CTA */}
     
      </main>
    </div>
  );
}