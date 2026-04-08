"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "../../../component/Header";
import { ApparelSection } from "./component/ApparelSection";
import { CategorySection } from "./component/CategorySection";
import { CoatSection } from "./component/CoatSection";
import { BrandStorySection } from "./component/CraftTrustSection";
import { FooterSection } from "./component/FooterSection";
import { HeroSection } from "./component/HeroSection";
import { FeaturedJewellerySection } from "./component/JacketSection";
import { NewProductsSection } from "./component/NewProductsSection";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        router.replace("/m");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [router]);

  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <CategorySection />
      <NewProductsSection />
      <FeaturedJewellerySection />
      <ApparelSection />
      <CoatSection />
      <BrandStorySection />
    </main>
  );
}