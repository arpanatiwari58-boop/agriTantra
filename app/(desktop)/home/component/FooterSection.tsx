import { Clock, Facebook, Instagram, Mail, MapPin, MessageCircle, Phone, Twitter } from "lucide-react";
import Link from "next/link";

const shopLinks = [
  { label: "Coat", href: "/shop/coat" },
  { label: "Dhaka Meter Cloth", href: "/shop/dhaka-meter-cloth" },
  { label: "Dhaka Saree", href: "/shop/dhaka-saree" },
  { label: "Kurtha", href: "/shop/kurtha" },
  { label: "Lungi & Faria", href: "/shop/lungi-faria" },
  { label: "Sarees", href: "/shop/sarees" },
  { label: "Sawl", href: "/shop/shawls-wraps" },
];

const infoLinks = [
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function FooterSection() {
  const whatsappNumber = "9779808399048";
  const email = "info@rishabdhaka.com";

  return (
    <footer className="bg-stone-900 text-stone-300 pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Identity */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-serif text-3xl text-white tracking-tight">
                BUNCHHAT <span className="italic text-rose-400">Collection</span>
              </h2>
              <p className="font-sans text-[10px] font-bold uppercase tracking-[0.3em] text-rose-500">
                Heritage & Culture
              </p>
            </div>
            <p className="font-sans text-sm leading-relaxed text-stone-400 max-w-xs">
              Preserving Nepal's rich cultural heritage through authentic handmade traditional clothing.
            </p>
            <div className="flex items-center gap-6">
              {[Instagram, Facebook].map((Icon, i) => (
                <Link 
                  key={i} 
                  href={i === 0 ? "https://instagram.com/" : "https://facebook.com/"}
                  target="_blank"
                  className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:text-rose-400 hover:border-rose-400/50 hover:bg-rose-400/5 transition-all duration-300"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
              <Link 
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                className="w-10 h-10 rounded-full border border-stone-800 flex items-center justify-center text-stone-400 hover:text-emerald-400 hover:border-emerald-400/50 hover:bg-emerald-400/5 transition-all duration-300"
              >
                <MessageCircle size={20} />
              </Link>
            </div>
          </div>

          {/* Shop Links */}
          <div className="space-y-8">
            <h4 className="font-serif text-xl text-white italic">The Collections</h4>
            <div className="flex flex-col gap-4">
              {shopLinks.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  className="font-sans text-sm text-stone-400 hover:text-rose-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-8">
            <h4 className="font-serif text-xl text-white italic">Support</h4>
            <div className="flex flex-col gap-4">
              {infoLinks.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  className="font-sans text-sm text-stone-400 hover:text-rose-400 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-4">
                <div className="flex items-center gap-3 text-stone-400 group">
                  <MapPin size={16} className="text-rose-500" />
                  <span className="text-[11px] leading-tight group-hover:text-stone-200 transition-colors">Tutepani Marga, Lalitpur, Nepal</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400 group">
                  <Phone size={16} className="text-rose-500" />
                  <span className="text-[11px] leading-tight group-hover:text-stone-200 transition-colors">+977-9808399048</span>
                </div>
                <div className="flex items-center gap-3 text-stone-400 group">
                  <Mail size={16} className="text-rose-500" />
                  <span className="text-[11px] leading-tight group-hover:text-stone-200 transition-colors">{email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-8 bg-stone-800/30 p-10 rounded-[2.5rem] border border-stone-800/50">
            <h4 className="font-serif text-xl text-white italic">Visit Our Store</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Clock size={16} className="text-rose-500" />
                <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-stone-200">Open Sun - Sat</p>
              </div>
              <p className="text-2xl font-serif text-white tracking-tight italic">8:00 AM - 8:00 PM</p>
            </div>
            <Link
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-emerald-600 px-6 text-[10px] font-bold uppercase tracking-widest text-white transition-all hover:bg-emerald-700 active:scale-95 shadow-xl shadow-emerald-950/20"
            >
              <MessageCircle size={18} fill="currentColor" />
              Direct Inquiry
            </Link>
          </div>
        </div>

        <div className="h-px bg-stone-800 w-full mb-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-stone-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            <p>© 2025 BUNCHHAT COLLECTION. MADE FOR NEPALI HERITAGE.</p>
            <div className="flex gap-8">
                <Link href="#" className="hover:text-stone-300">Privacy Policy</Link>
                <Link href="#" className="hover:text-stone-300">Terms of Service</Link>
            </div>
        </div>
      </div>
    </footer>
  );
}

      