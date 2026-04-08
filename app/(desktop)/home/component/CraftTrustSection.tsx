import Image from "next/image";
import { Truck, Globe, Quote } from "lucide-react"; // Note: Check if lucide-react or lucide-material-react is used, correcting to standard lucide-react if needed

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
    <section className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 gap-20 items-center">
          
          {/* Visual Hook: Featured Image */}
          <div className="relative overflow-hidden rounded-[3rem] shadow-2xl shadow-stone-200/50">
            <div className="aspect-[4/5] relative">
              <Image
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80"
                alt="Handcrafted Nepali clothing"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent" />
              <div className="absolute bottom-12 left-12 right-12">
                <p className="font-serif text-base tracking-widest text-white/90 uppercase mb-4 ">
                  The Heritage Story
                </p>
                <h2 className="font-serif text-4xl text-white  leading-tight">
                  Preserving Nepal's <br />
                  Cultural Heritage
                </h2>
              </div>
            </div>
          </div>

          {/* Narrative Content */}
          <div className="flex flex-col justify-center h-full">
            <div className="mb-12">
              <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-rose-500 mb-6">
                Our Legacy
              </p>
              <h2 className="font-serif text-4xl font-medium text-stone-900  mb-8">
                Crafted for Generations
              </h2>
              <div className="space-y-4 max-w-lg">
                <p className="font-sans text-base leading-relaxed text-stone-600">
                  Bunchhat Collection specializes in handcrafted Nepali clothing
                  that preserves the beauty of our cultural heritage — from Dhaka
                  sarees to traditional attire representing the diverse ethnic
                  communities of Nepal.
                </p>
                <p className="font-sans text-base leading-relaxed text-stone-600">
                  Each piece reflects the artistry and timeless traditions of our country, 
                  bringing the soul of Nepal to your wardrobe.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {/* Quote Styling */}
              <div className="relative py-10 px-10 bg-rose-50/50 rounded-[2rem] border border-rose-100/50">
                <Quote className="absolute top-6 left-6 h-8 w-8 text-rose-200/60" />
                <blockquote className="relative">
                  <p className="font-serif text-xl  leading-relaxed text-stone-800 mb-6">
                    "मैले नेपाली उत्पादनहरू साथै संस्कृतिलाई विश्वसम्म पुर्‍याउने
                    उद्देश्यले यो व्यवसाय सुरु गरेकी हुँ।"
                  </p>
                  <footer className="flex items-center gap-4">
                    <div className="h-px w-12 bg-rose-300" />
                    <div>
                      <cite className="font-serif text-sm font-semibold uppercase tracking-[0.2em] text-rose-600 not-">
                        Menuka Rai
                      </cite>
                      <p className="text-[9px] text-stone-400 mt-1 uppercase tracking-wider">
                        Singer & Founder
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </div>

              {/* Interactive Services */}
              <div className="grid grid-cols-2 gap-4">
                {services.map((s) => (
                  <div 
                    key={s.title} 
                    className="flex flex-col gap-3 p-5 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-stone-50 text-rose-600">
                      {s.icon}
                    </div>
                    <div>
                      <p className="font-sans text-[11px] font-bold text-stone-800 uppercase tracking-wider">{s.title}</p>
                      <p className="font-sans text-[10px] text-stone-500 leading-relaxed mt-0.5">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
            