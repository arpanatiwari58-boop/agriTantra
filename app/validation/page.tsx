"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHero from "../components/DashboardHero";
import BacktestValidation from "../components/BacktestValidation";
import DashboardValidationSection from "../components/DashboardValidationSection";
import { useOptimization } from "../context/OptimizationContext";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { clearStoredUser, getStoredUser, type StoredUser } from "../lib/session";

export default function ValidationPage() {
  const router = useRouter();
  const { result } = useOptimization();
  const [user, setUser] = useState<StoredUser | null | undefined>(undefined);

  useEffect(() => {
    const storedUser = getStoredUser();
    if (!storedUser) {
      router.replace("/login");
      return;
    }

    setUser(storedUser);
  }, [router]);

  async function handleSignOut() {
    clearStoredUser();
    setUser(null);
    router.replace("/login");
  }

  if (user === undefined) {
    return <div style={{ minHeight: "100vh", background: "#F4F1EB" }} />;
  }

  if (!user) {
    return null;
  }

  if (!result) {
    return (
      <div style={{ minHeight: "100vh", background: "#F4F1EB", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#1C2B1A" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "60px 40px", textAlign: "center" }}>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1C2B1A", marginBottom: 16 }}>No Optimization Data</h1>
          <p style={{ fontSize: 14, color: "#6B7A69", marginBottom: 24 }}>Please run an optimization first on the main page.</p>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "#2D6A2D", color: "#fff", borderRadius: 12, textDecoration: "none", fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Optimization
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F4F1EB", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#1C2B1A" }}>
      <DashboardHero phaseIdx={1} userLabel={user.name || user.email} onSignOut={handleSignOut} />

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 40px 0" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "8px 16px", color: "#2D6A2D", textDecoration: "none", fontWeight: 600, marginBottom: 24, borderRadius: 8, background: "#F0F9EE" }}>
          <ArrowLeft size={16} /> Back to Optimization
        </Link>
      </div>

      <BacktestValidation />

      <DashboardValidationSection />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;0,9..40,800&display=swap');
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input[type=number]::-webkit-inner-spin-button, 
        input[type=number]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }
        input:focus { border-color: #2D6A2D !important; box-shadow: 0 0 0 3px rgba(45,106,45,0.1) !important; }
        button:hover:not(:disabled) { filter: brightness(0.96); transform: translateY(-1px); }
      `}</style>
    </div>
  );
}
