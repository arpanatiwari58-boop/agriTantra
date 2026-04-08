"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApparelSection } from "./_homeComponent/ApparelSection";
import { CategorySection } from "./_homeComponent/CategorySection";
import { CoatSection } from "./_homeComponent/CoatSection";
import { BrandStorySection } from "./_homeComponent/CraftTrustSection";
import { HeroSection } from "./_homeComponent/HeroSection";
import { FeaturedJewellerySection } from "./_homeComponent/JewellerySection";
import { NewProductsSection } from "./_homeComponent/NewProductsSection";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        router.replace("/home");
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