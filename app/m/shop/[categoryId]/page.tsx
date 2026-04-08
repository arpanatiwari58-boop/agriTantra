import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGridClient } from "./ProductGridClient";

export type Product = {
  title: string;
  price: number;
  oldPrice?: number;
  image: string;
  tag?: string;
  region?: string;
};

const catalog: Record<
  string,
  {
    title: string;
    description: string;
    heroImage: string;
    regions: number;
    products: Product[];
  }
> = {
  sarees: {
    title: "Sarees",
    description:
      "Banarasi, Kanjivaram, Chanderi, and Jamdani weaves curated from master looms across India.",
    heroImage:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    regions: 4,
    products: [
      {
        title: "Banarasi Silk Saree",
        price: 189,
        oldPrice: 229,
        tag: "HANDLOOM",
        region: "Varanasi",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Kanjivaram Zari Saree",
        price: 249,
        tag: "NEW",
        region: "Kanchipuram",
        image:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Chanderi Tissue Saree",
        price: 164,
        region: "Madhya Pradesh",
        image:
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Jamdani Cotton Saree",
        price: 138,
        region: "Bengal",
        image:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  "kurta-sets": {
    title: "Kurta Sets",
    description:
      "Handloom linens, chikan work, and block prints tailored for comfort.",
    heroImage:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
    regions: 4,
    products: [
      {
        title: "Handloom Linen Kurta Set",
        price: 98,
        oldPrice: 119,
        tag: "NEW",
        region: "Andhra",
        image:
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Chikankari Kurta Set",
        price: 92,
        oldPrice: 109,
        region: "Lucknow",
        image:
          "https://images.unsplash.com/photo-1582719478248-54e9f2af5400?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Ajrakh Block Print Set",
        price: 104,
        region: "Kutch",
        image:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Mulmul Angrakha Set",
        price: 88,
        region: "Jaipur",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  handloom: {
    title: "Handloom",
    description:
      "Loom-fresh weaves: ikat, kalamkari, ajrakh, and more from craft clusters.",
    heroImage:
      "https://images.unsplash.com/photo-1582719478215-2fd3c5b72a1b?auto=format&fit=crop&w=1200&q=80",
    regions: 4,
    products: [
      {
        title: "Ikat Handloom Saree",
        price: 142,
        region: "Pochampally",
        image:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Ajrakh Dupatta",
        price: 68,
        region: "Kutch",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Kalamkari Stole",
        price: 74,
        region: "Andhra",
        image:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Ilkal Cotton Saree",
        price: 118,
        region: "Karnataka",
        image:
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  "festive-wear": {
    title: "Festive Wear",
    description:
      "Zari, gotta patti, and rich embroideries made for celebrations.",
    heroImage:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
    regions: 2,
    products: [
      {
        title: "Zari Anarkali Set",
        price: 214,
        tag: "NEW",
        image:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Gotta Patti Lehenga",
        price: 329,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Zardozi Sharara",
        price: 268,
        image:
          "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Embroidered Dupatta",
        price: 98,
        region: "Jaipur",
        image:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  jewellery: {
    title: "Jewellery",
    description:
      "Heritage-inspired kundan, polki, silver, and temple accents.",
    heroImage:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    regions: 3,
    products: [
      {
        title: "Kundan Chandbali",
        price: 129,
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Temple Coin Necklace",
        price: 189,
        image:
          "https://images.unsplash.com/photo-1516632664305-eda5d6a5bb3c?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Silver Kada",
        price: 114,
        image:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Polki Maangtikka",
        price: 96,
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  "shawls-wraps": {
    title: "Shawls & Wraps",
    description:
      "Pashmina, kani, and embroidered stoles for heirloom layering.",
    heroImage:
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    regions: 3,
    products: [
      {
        title: "Pashmina Stole",
        price: 149,
        tag: "NEW",
        image:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Kullu Wool Shawl",
        price: 128,
        image:
          "https://images.unsplash.com/photo-1582719478215-2fd3c5b72a1b?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Kani Jamawar Wrap",
        price: 189,
        tag: "SALE",
        image:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Embroidered Cape",
        price: 139,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  footwear: {
    title: "Footwear",
    description:
      "Kolhapuris, juttis, and embroidered sandals handmade by artisans.",
    heroImage:
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=1200&q=80",
    regions: 3,
    products: [
      {
        title: "Kolhapuri Flats",
        price: 64,
        image:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Embroidered Juttis",
        price: 84,
        tag: "NEW",
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Block Print Slides",
        price: 58,
        image:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Leather Mojaris",
        price: 92,
        image:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  accessories: {
    title: "Accessories",
    description:
      "Potlis, belts, scarves, and jewellery-inspired add-ons to complete the look.",
    heroImage:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    regions: 3,
    products: [
      {
        title: "Embroidered Potli Bag",
        price: 48,
        image:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Block Print Scarf",
        price: 36,
        image:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Mirror Work Belt",
        price: 42,
        image:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Beaded Hair Accessory",
        price: 29,
        image:
          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  sale: {
    title: "Sale",
    description:
      "Seasonal finds with special pricing — limited pieces, artisan made.",
    heroImage:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80",
    regions: 4,
    products: [
      {
        title: "Ajrakh Print Dress",
        price: 94,
        oldPrice: 119,
        tag: "SALE",
        image:
          "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Pashmina Stole",
        price: 129,
        oldPrice: 159,
        tag: "SALE",
        image:
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Temple Coin Necklace",
        price: 169,
        oldPrice: 189,
        image:
          "https://images.unsplash.com/photo-1516632664305-eda5d6a5bb3c?auto=format&fit=crop&w=600&q=80",
      },
      {
        title: "Kolhapuri Flats",
        price: 52,
        oldPrice: 64,
        image:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
};

// Tag styles mapping
const tagStyles: Record<string, string> = {
  HANDLOOM: "bg-rose-600 text-white",
  NEW: "bg-rose-600 text-white",
  SALE: "bg-rose-600 text-white",
};

export function generateStaticParams() {
  return Object.keys(catalog).map((categoryId) => ({ categoryId }));
}

// ✅ async component with awaited params — Next.js 15 compatible
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const category = catalog[categoryId];
  if (!category) return notFound();

  const filters = ["All", "New arrivals", "On sale", "Handloom"];
  const whatsappNumber = "919876543210"; // replace with real contact number

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-md px-4 py-8">

        {/* ── Breadcrumb ── */}
        <nav className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-sans">
          <Link
            href="/"
            className="text-stone-400 transition-colors hover:text-rose-600"
          >
            Home
          </Link>
          <span className="text-stone-300">›</span>
          <Link
            href="/shop"
            className="text-stone-400 transition-colors hover:text-rose-600"
          >
            Shop
          </Link>
          <span className="text-stone-300">›</span>
          <span className="text-stone-800 font-bold">{category.title}</span>
        </nav>

        {/* ── Hero Banner ── */}
        <div className="relative mb-10 -mx-4 h-[40vh] overflow-hidden">
          <img
            src={category.heroImage}
            alt={category.title}
            className="h-full w-full object-cover"
          />
          {/* Soft Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
          
          <div className="absolute bottom-8 left-6 right-6">
            <p className="mb-2 font-serif text-sm italic tracking-widest text-white/90">
              Explore
            </p>
            <h1 className="font-serif text-4xl text-white leading-tight">
              {category.title}
            </h1>
            <p className="mt-2 max-w-[280px] text-xs leading-relaxed text-white/70 font-sans line-clamp-2">
              {category.description}
            </p>
          </div>
        </div>

        {/* ── Toolbar ── */}
       
        {/* ── Product Grid ── */}
        <ProductGridClient
          products={category.products}
          tagStyles={tagStyles}
          whatsappNumber={whatsappNumber}
        />

      </div>
    </div>
  );
}