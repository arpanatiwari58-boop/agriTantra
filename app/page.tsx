"use client";

import { useState } from "react";
import DashboardHero from "./components/DashboardHero";
import InputsAndResults from "./components/InputsAndResults";
import BacktestValidation from "./components/BacktestValidation";
import DashboardValidationSection from "./components/DashboardValidationSection";
import { OptResult } from "./types/dashboard";

/* ─── MAIN ──────────────────────────────────────────────────── */
export default function WDRODashboard() {
  const [result, setResult] = useState<OptResult | null>(null);

  const phaseIdx = result ? 1 : 0;

  return (
    <div style={{ minHeight: "100vh", background: "#F4F1EB", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#1C2B1A" }}>
      <DashboardHero phaseIdx={phaseIdx} />

      <InputsAndResults onResult={setResult} />
      

      <BacktestValidation result={result} />

      <DashboardValidationSection result={result} />

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