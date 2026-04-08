"use client";

import Link from "next/link";
import Image from "next/image";
import { Header } from "../_component/Header";
import { MessageCircle, PhoneCall, Mail, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const whatsappNumber = "9779808399048"; 
  const phoneNumber = "+977-9808399048"; 
  const email = "info@rishabdhaka.com";

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Greetings BUNCHHAT. I'd like to inquire about your artisanal collection."
  )}`;

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-rose-100 selection:text-rose-900">
      <main className="pb-20">
        {/* IMMERSIVE VISUAL & HEADER */}
        <section className="relative px-4 pt-4">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-sm">
            <Image
              src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop"
              alt="BUNCHHAT Studio"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-stone-900/10" />
          </div>

          <div className="mt-10 text-center px-4">
            <span className="font-serif italic text-sm tracking-widest text-rose-600 uppercase">
              Connect With Us
            </span>
            <h1 className="mt-4 font-serif text-4xl font-medium tracking-tight text-stone-900 leading-tight">
              Cultural Fashion Experts
            </h1>
            <p className="mt-5 text-[15px] leading-relaxed text-stone-600 max-w-[280px] mx-auto font-light">
              Reach out for inquiries, custom orders, or to schedule a consultation with our artisans.
            </p>
          </div>
        </section>

        {/* PRIMARY ACTIONS */}
        <section className="mt-12 px-6 grid grid-cols-1 gap-4">
          <Link
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 rounded-xl bg-rose-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 active:scale-[0.98] transition-all"
          >
            <MessageCircle className="h-5 w-5" />
            WhatsApp Chat
          </Link>
          <Link
            href={`tel:${phoneNumber.replace(/-/g, "").replace(/\+/g, "")}`}
            className="flex items-center justify-center gap-3 rounded-xl border border-stone-200 bg-white px-6 py-4 text-sm font-semibold text-stone-900 shadow-sm active:scale-[0.98] transition-all"
          >
            <PhoneCall className="h-5 w-5" />
            Direct Call
          </Link>
        </section>

        {/* INFORMATION CARDS */}
        <section className="mt-14 px-6 space-y-4">
          {/* EMAIL */}
          <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stone-50 text-rose-600">
              <Mail className="size-5" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xs font-semibold text-stone-400 uppercase tracking-[0.15em]">Email</h3>
              <p className="text-[15px] font-medium text-stone-900 leading-none">{email}</p>
              <p className="text-xs text-stone-400 italic">Prompt assistance guaranteed</p>
            </div>
          </div>

          {/* STUDIO ADDRESS */}
          <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stone-50 text-rose-600">
              <MapPin className="size-5" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xs font-semibold text-stone-400 uppercase tracking-[0.15em]">Studio</h3>
              <p className="text-[15px] font-medium text-stone-900">Tutepani Marga, Lalitpur, Nepal</p>
              <p className="text-xs text-stone-400 italic leading-relaxed">Artisanal Heritage Since 2012</p>
            </div>
          </div>

          {/* MAP */}
          <div className="overflow-hidden rounded-2xl border border-stone-100 shadow-sm">
            <iframe
              title="BUNCHHAT Studio Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.529620793668!2d85.32231281504667!3d27.666969532887585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198b8e3c29ef%3A0x4c44c47e89cfd32!2sTutepani%20Marga%2C%20Lalitpur%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
              width="100%"
              height="300"
              className="border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          {/* WORKING HOURS */}
          <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-stone-50 text-rose-600">
              <Clock className="size-5" strokeWidth={1.5} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-xs font-semibold text-stone-400 uppercase tracking-[0.15em]">Hours</h3>
              <p className="text-[15px] font-medium text-stone-900">Sun - Sat</p>
              <p className="text-xs text-stone-400 italic">8:00 AM - 8:00 PM (NPT)</p>
            </div>
          </div>
        </section>

        {/* FOOTER NOTE */}
        <footer className="mt-20 px-8 text-center text-stone-400">
          <p className="font-serif text-[11px] leading-loose italic tracking-[0.1em] uppercase">
            © 2025 Bunchhat collection <br />
            Preserving Nepal's rich cultural heritage
          </p>
        </footer>
      </main>
    </div>
  );
}