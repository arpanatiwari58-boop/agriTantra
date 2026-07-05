"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardHero from "./components/DashboardHero";
import InputsAndResults from "./components/InputsAndResults";
import { clearStoredUser, getStoredUser, type StoredUser } from "@/app/lib/session";

/* ─── MAIN ──────────────────────────────────────────────────── */
export default function WDRODashboard() {
  const router = useRouter();
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
    return (
      <div style={{ minHeight: "100vh", background: "#F4F1EB", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#1C2B1A" }} />
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#F4F1EB", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#1C2B1A" }}>
      <DashboardHero phaseIdx={0} userLabel={user.name || user.email} onSignOut={handleSignOut} />
      <InputsAndResults />

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