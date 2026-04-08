import Link from "next/link";
import { MessageCircle, PhoneCall, Mail, MapPin, Clock, Send } from "lucide-react";

export default function ContactPage() {
  const whatsappNumber = "9779808399048"; 
  const phoneNumber = "+977-9808399048"; 
  const email = "info@rishabdhaka.com";

  const waHref = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Greetings BUNCHHAT. I'd like to inquire about your artisanal collection."
  )}`;

  return (
    <main className="min-h-screen pt-12 pb-24 font-sans text-stone-900 selection:bg-rose-100 selection:text-rose-900">
      <div className="mx-auto max-w-7xl px-6">
        
        {/* Editorial Header */}
        <div className="mb-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-500 mb-4 font-sans">
              Connect With Us
            </p>
            <h1 className="font-serif text-6xl font-medium leading-tight text-stone-900">
              Cultural Fashion <span className="text-rose-600 italic border-b border-rose-200">Experts</span>
            </h1>
          </div>
          <div className="max-w-md pb-1">
            <p className="text-base leading-relaxed text-stone-600 font-light italic">
              "Reach out for inquiries, custom orders, or to schedule a consultation with our artisans. We are here to bring Nepali heritage to your doorstep."
            </p>
          </div>
        </div>

        {/* Visual Hero & Action Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.6fr] gap-6 mb-20">
          {/* Main Visual with Floating Info */}
          <div className="relative group overflow-hidden rounded-[2rem] shadow-xl shadow-stone-200/50">
            <img
              src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=2070&auto=format&fit=crop"
              alt="BUNCHHAT Studio"
              className="aspect-[21/9] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/20 transition-colors duration-500" />
            
            {/* Overlay Info */}
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-center">
              <div className="bg-white/95 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 shadow-lg flex items-center gap-3 transition-transform duration-500 group-hover:-translate-y-1">
                <MapPin className="h-4 w-4 text-rose-600" />
                <p className="text-xs font-medium text-stone-800 tracking-tight">Tutepani Marga, Lalitpur, Nepal</p>
              </div>
              
              <Link
                href={waHref}
                target="_blank"
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-6 py-3 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-emerald-600/20 transition-all active:scale-95"
              >
                <MessageCircle size={16} fill="currentColor" />
                WhatsApp Chat
              </Link>
            </div>
          </div>

          {/* Quick Contact Points */}
          <div className="flex flex-col gap-4">
            <div className="flex-1 bg-white rounded-[2rem] p-8 border border-stone-100 shadow-sm transition-all hover:shadow-md flex flex-col justify-center">
              <div className="h-10 w-10 rounded-xl bg-stone-50 flex items-center justify-center text-rose-600 mb-4">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">Email</h3>
              <p className="text-sm font-medium text-stone-900">{email}</p>
            </div>

            <div className="flex-1 bg-white rounded-[2rem] p-8 border border-stone-100 shadow-sm transition-all hover:shadow-md flex flex-col justify-center">
              <div className="h-10 w-10 rounded-xl bg-stone-50 flex items-center justify-center text-rose-600 mb-4">
                <PhoneCall className="h-5 w-5" />
              </div>
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">Call</h3>
              <p className="text-lg font-bold tracking-tight text-stone-900">{phoneNumber}</p>
              <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-widest">Sun-Sat: 8:00 AM - 8:00 PM</p>
            </div>
          </div>
        </div>

        {/* Content & Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.7fr] gap-12">
          {/* Inquiry Form */}
          <div className="bg-white rounded-[2rem] p-10 md:p-12 border border-stone-100 shadow-sm">
            <div className="mb-10">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-500 mb-3">Inquiry</p>
              <h2 className="font-serif text-3xl text-stone-900 italic">Send a Message</h2>
            </div>
            
            <form className="grid gap-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 ml-4 italic">Name</label>
                  <input
                    type="text"
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-stone-100 bg-stone-50 px-5 py-3.5 text-sm text-stone-900 outline-none transition focus:border-rose-200 focus:bg-white"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 ml-4 italic">Email</label>
                  <input
                    type="email"
                    placeholder="you@domain.com"
                    className="w-full rounded-xl border border-stone-100 bg-stone-50 px-5 py-3.5 text-sm text-stone-900 outline-none transition focus:border-rose-200 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-stone-400 ml-4 italic">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us what you are looking for..."
                  className="w-full rounded-xl border border-stone-100 bg-stone-50 px-5 py-3.5 text-sm text-stone-900 outline-none transition focus:border-rose-200 focus:bg-white resize-none"
                />
              </div>

              <button
                type="button"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-stone-900 px-10 py-4 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-stone-800 active:scale-95 group"
              >
                Send Inquiry
                <Send size={14} className="transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          </div>

          {/* Map Section */}
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-[2rem] border border-stone-100 shadow-lg h-full min-h-[400px]">
              <iframe
                title="BUNCHHAT Studio Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.529620793668!2d85.32231281504667!3d27.666969532887585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198b8e3c29ef%3A0x4c44c47e89cfd32!2sTutepani%20Marga%2C%20Lalitpur%2C%20Nepal!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                className="grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
