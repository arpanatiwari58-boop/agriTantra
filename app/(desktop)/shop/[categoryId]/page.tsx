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
  HANDLOOM: "bg-emerald-900 text-stone-50",
  NEW: "bg-stone-900 text-stone-50",
  SALE: "bg-rose-600 text-stone-50",
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
  const whatsappNumber = "9779808399048";

  if (!category) return notFound();

  return (
    <main className="min-h-screen bg-stone-50 pb-32">
      {/* Editorial Category Hero */}




      {/* Main Grid Section */}
      <div className="mx-auto mt-16 max-w-7xl px-6">
        <ProductGridClient
          products={category.products}
          tagStyles={tagStyles}
          whatsappNumber={whatsappNumber}
        />
      </div>
    </main>
  );
}