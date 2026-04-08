import Image from "next/image";
import { MapPin, Phone, Clock, Truck, Globe, Quote } from "lucide-react";

const services = [
  {
    icon: <Truck className="h-5 w-5" />,
    title: "Home Delivery",
    desc: "Reliable delivery anywhere in Nepal",
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: "International Shipping",
    desc: "We ship worldwide to Nepalis abroad",
  },
];

export function BrandStorySection() {
  return (
    <section className="bg-stone-50 py-16">
      <div className="mx-auto max-w-md px-6">
        {/* Visual Hook: Featured Image */}
        <div className="relative mb-10 overflow-hidden rounded-xl shadow-2xl shadow-stone-200/50">
          <div className="aspect-[4/5] relative">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
              alt="Handcrafted Nepali clothing"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-serif text-sm tracking-widest text-white/90 uppercase mb-2">
                The Heritage Story
              </p>
              <h2 className="font-serif text-3xl text-white leading-tight">
                Preserving Nepal's <br />
                <span className="italic">Cultural Heritage</span>
              </h2>
            </div>
          </div>
        </div>

        {/* Narrative Content */}
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="font-sans text-[15px] leading-relaxed text-stone-600">
              Bunchhat Collection specializes in handcrafted Nepali clothing
              that preserves the beauty of our cultural heritage — from Dhaka
              sarees to traditional attire representing the diverse ethnic
              communities of Nepal.
            </p>
            <p className="font-sans text-[15px] leading-relaxed text-stone-600">
              Each piece reflects the artistry and timeless traditions of our country, 
              bringing the soul of Nepal to your wardrobe.
            </p>
          </div>

          {/* Quote Styling */}
          <div className="relative py-10 px-8 bg-rose-50/50 rounded-2xl border border-rose-100/50">
            <Quote className="absolute top-4 left-4 h-8 w-8 text-rose-200/60" />
            <blockquote className="relative text-center space-y-4">
              <p className="font-serif text-xl italic leading-relaxed text-stone-800">
                "मैले नेपाली उत्पादनहरू साथै संस्कृतिलाई विश्वसम्म पुर्‍याउने
                उद्देश्यले यो व्यवसाय सुरु गरेकी हुँ।"
              </p>
              <footer className="flex flex-col items-center">
                <div className="h-px w-8 bg-rose-300 mb-3" />
                <cite className="font-serif text-xs font-semibold uppercase tracking-[0.2em] text-rose-600 not-italic">
                  Menuka Rai
                </cite>
                <span className="text-[10px] text-stone-400 mt-1 uppercase tracking-wider">
                  Singer & Founder
                </span>
              </footer>
            </blockquote>
          </div>

          <div className="h-px bg-stone-200/60 w-1/3 mx-auto" />

          {/* Interactive Services */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl text-stone-900 mb-4">Our Commitment</h3>
            <div className="grid gap-4">
              {services.map((s) => (
                <div 
                  key={s.title} 
                  className="flex items-center gap-5 p-4 bg-white rounded-xl border border-stone-100 shadow-sm active:scale-95 transition-transform duration-200"
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-rose-50 text-rose-600">
                    {s.icon}
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-stone-800">{s.title}</p>
                    <p className="font-sans text-[13px] text-stone-500 leading-tight mt-0.5">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA & Location: Business Card Style */}
          <div className="mt-12 p-6 bg-stone-900 rounded-2xl text-stone-100 shadow-xl">
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-rose-400 mt-0.5" />
                <div>
                  <p className="font-serif text-lg leading-tight">Visit our Studio</p>
                  <p className="font-sans text-[13px] text-stone-400 mt-1">
                    Tutepani Marga, Lalitpur, Nepal
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-stone-800 pt-5">
                <a 
                  href="tel:+9779808399048"
                  className="flex items-center gap-3 active:scale-95 transition-transform"
                >
                  <Phone className="h-4 w-4 text-rose-400" />
                  <span className="text-[13px] font-medium">+977 9808399048</span>
                </a>
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-rose-400" />
                  <span className="text-[13px] text-stone-400">8AM - 8PM</span>
                </div>
              </div>

              <button className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-sans text-sm font-semibold tracking-wide active:scale-95 transition-all shadow-lg shadow-rose-900/20">
                Get Directions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

     