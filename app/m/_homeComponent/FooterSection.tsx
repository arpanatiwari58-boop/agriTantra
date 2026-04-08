import { Instagram, Mail, MapPin, Phone, Facebook, MessageCircle, Heart } from "lucide-react";
import Link from "next/link";

const shopLinks = [
  { label: "Coat", href: "/m/shop/coat" },
  { label: "Dhaka Meter Cloth", href: "/m/shop/dhaka-meter-cloth" },
  { label: "Dhaka Saree", href: "/m/shop/dhaka-saree" },
  { label: "Kurtha", href: "/m/shop/kurtha" },
  { label: "Lungi & Faria", href: "/m/shop/lungi-faria" },
  { label: "Sarees", href: "/m/shop/sarees" },
  { label: "Sawl", href: "/m/shop/sawl" },
];

const infoLinks = [
  { label: "About Us", href: "/m/about" },
  { label: "Contact", href: "/m/contact" },
];

export function FooterSection() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-8">
      <div className="mx-auto max-w-md px-6">
        <div className="flex flex-col gap-12">
          {/* Brand Identity */}
          <div className="space-y-6 text-center">
            <div className="space-y-2">
              <h2 className="font-serif text-3xl text-white tracking-tight">
                 BUNCHHAT <span className="italic">Collective</span>
              </h2>
              <p className="font-sans text-[13px] uppercase tracking-[0.2em] text-rose-400 font-medium">
                Preserving Heritage
              </p>
            </div>
            <p className="font-sans text-sm leading-relaxed text-stone-400 px-4">
              Preserving Nepal&apos;s rich cultural heritage through authentic handmade traditional clothing.
            </p>
            <div className="flex items-center justify-center gap-6">
              {[
                { Icon: Instagram, href: "https://instagram.com/" },
                { Icon: Facebook, href: "https://facebook.com/" },
                { Icon: MessageCircle, href: "https://wa.me/9808399048" }
              ].map(({ Icon, href }, i) => (
                <Link 
                  key={i} 
                  href={href} 
                  target="_blank"
                  className="text-stone-400 active:text-rose-400 active:scale-95 transition-all duration-200"
                >
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          <div className="h-px bg-stone-800" />

          {/* Shop Links - 2 Column Grid */}
          <div className="space-y-6">
            <h4 className="font-serif text-xl text-white text-center">The Collections</h4>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {shopLinks.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  className="font-sans text-[14px] text-stone-400 active:text-white active:scale-95 transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Info Links - 2 Column Grid */}
          <div className="space-y-6">
            <h4 className="font-serif text-xl text-white text-center">Company</h4>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              {infoLinks.map((item) => (
                <Link 
                  key={item.label} 
                  href={item.href} 
                  className="font-sans text-[14px] text-stone-400 active:text-white active:scale-95 transition-all duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-6 bg-stone-800/50 p-6 rounded-2xl border border-stone-800">
            <h4 className="font-serif text-xl text-white text-center">Stay in Touch</h4>
            <p className="font-sans text-[13px] text-stone-400 text-center leading-relaxed">
              Get craft stories, regional drops, and early access to festive edits.
            </p>
            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full h-12 rounded-xl bg-stone-900 border border-stone-700 px-4 text-sm text-white placeholder:text-stone-500 focus:outline-none focus:border-rose-500/50 transition-colors"
              />
              <button
                type="submit"
                className="w-full h-12 rounded-xl bg-rose-600 text-white text-sm font-semibold uppercase tracking-wider active:scale-95 transition-all duration-200 shadow-lg shadow-rose-900/20"
              >
                Join the Collective
              </button>
            </form>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 pt-4">
            <div className="flex flex-col items-center gap-3 text-sm text-stone-400 font-sans">
              <a 
                href="https://wa.me/9779808399048"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 active:opacity-70"
              >
                <Phone className="h-4 w-4 text-rose-500" />
                <span>+977 9808399048</span>
              </a>
              <a 
                href="mailto:info@rishabdhaka.com"
                className="flex items-center gap-3 active:opacity-70"
              >
                <Mail className="h-4 w-4 text-rose-500" />
                <span>info@rishabdhaka.com</span>
              </a>
              <div className="flex items-center gap-3 text-center active:opacity-70">
                <MapPin className="h-4 w-4 text-rose-500 flex-shrink-0" />
                <span>Tutepani Marga, Lalitpur, Nepal</span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-stone-800 flex flex-col items-center gap-4 text-center">
            <p className="text-[11px] text-stone-500 uppercase tracking-[0.3em] font-medium flex items-center gap-2">
              Made with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for Nepali Heritage
            </p>
            <p className="text-[10px] text-stone-600 font-sans">
              &copy; {new Date().getFullYear()} Bunchhat collection. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

