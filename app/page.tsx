"use client";

import { useState, useEffect } from "react";
import DashboardHero from "./components/DashboardHero";
import InputsAndResults from "./components/InputsAndResults";
import DashboardValidationSection from "./components/DashboardValidationSection";
import { CropAllocation, OptResult, ValResult } from "./types/dashboard";
import { CropName, SolveResponse } from "./types/api";

/* ─── CONFIG ───────────────────────────────────────────────── */
const API_BASE = "https://python-project.sphirontech.com/";

/* ─── DATA ──────────────────────────────────────────────────── */
const CROPS: Array<{ name: CropName; cost: number; color: string; emoji: string }> = [
  { name: "LR Rice (Sub1)", cost: 50000, color: "#E8A045", emoji: "🌾" },
  { name: "HR Rice (Basmati)", cost: 62000, color: "#D4893A", emoji: "🌾" },
  { name: "Maize", cost: 40000, color: "#F2C94C", emoji: "🌽" },
  { name: "Soybean", cost: 36000, color: "#6BAF5C", emoji: "🫘" },
  { name: "Kodo Millet", cost: 22000, color: "#A0C878", emoji: "🌿" }, // unchanged
  { name: "Black Gram (Urad)", cost: 26000, color: "#8B7355", emoji: "🫘" },
  { name: "Moong Dal", cost: 27000, color: "#9DC45A", emoji: "🌱" },
];

async function runModel(land: number, budget: number, epsilon: number): Promise<OptResult> {
  const res = await fetch(`${API_BASE}/solve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ land, budget, epsilon })
  });
  if (!res.ok) throw new Error(`Solve failed with ${res.status}`);
  const data: SolveResponse = await res.json();

  const allocationMap = data.allocation ?? {};
  const allocationArray = CROPS.map(c => allocationMap[c.name] ?? 0);

  const crops: CropAllocation[] = CROPS
    .map((c, idx) => ({ ...c, area: allocationArray[idx] }))
    .filter(c => c.area > 0.001)
    .map(c => ({ name: c.name, area: c.area, color: c.color, emoji: c.emoji }));

  return {
    crops,
    minProfit: data.metrics.min_profit,
    meanProfit: data.metrics.mean_profit ?? data.metrics.objective_value,
    maxProfit: data.metrics.max_profit ?? data.metrics.objective_value,
    totalLand: crops.reduce((s, c) => s + c.area, 0),
    status: data.status,
    allocationMap,
    allocationArray
  };
}

/* ─── MAIN ──────────────────────────────────────────────────── */
export default function WDRODashboard() {
  const [land, setLand] = useState("4");
  const [budget, setBudget] = useState("900000");
  const [epsilon, setEpsilon] = useState(20000);
  const [phase, setPhase] = useState<"input" | "solving" | "result" | "validating" | "validated">("input");
  const [result, setResult] = useState<OptResult | null>(null);
  const [validation, setValidation] = useState<ValResult | null>(null);
  const [validProgress, setValidProgress] = useState(0);
  const [animP, setAnimP] = useState({ min: 0, mean: 0, max: 0 });
  const [shiftPerc, setShiftPerc] = useState(10);

  useEffect(() => {
    if (!result || phase !== "result") return;
    let step = 0;
    const iv = setInterval(() => {
      step++; const t = 1 - Math.pow(1 - step / 60, 3);
      setAnimP({ min: result.minProfit * t, mean: result.meanProfit * t, max: result.maxProfit * t });
      if (step >= 60) clearInterval(iv);
    }, 20);
    return () => clearInterval(iv);
  }, [result, phase]);

  async function optimize() {
    const l = parseFloat(land), b = parseFloat(budget);
    if (!l || !b) return;
    setPhase("solving");
    try {
      const modelResult = await runModel(l, b, epsilon);

      // Save allocation for ValidationSection
      localStorage.setItem("current_allocation", JSON.stringify(modelResult.allocationArray));

      setResult(modelResult);
      setPhase("result");
    } catch (error) {
      console.error("Optimization failed:", error);
      setPhase("input"); // Reset on error
      alert("Failed to connect to the optimization server. Please ensure the backend is running at https://project-backend-g8h7.onrender.com");
    }
  }

  const phaseIdx = { input: 0, solving: 0, result: 1, validating: 2, validated: 2 }[phase];

  return (
    <div style={{ minHeight: "100vh", background: "#F4F1EB", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", color: "#1C2B1A" }}>
      <DashboardHero phaseIdx={phaseIdx} />

      <InputsAndResults
        land={land}
        setLand={setLand}
        budget={budget}
        setBudget={setBudget}
        epsilon={epsilon}
        setEpsilon={setEpsilon}
        phase={phase}
        optimize={optimize}
        result={result}
        animP={animP}
      />

      <DashboardValidationSection
        phase={phase}
        result={result}
        validation={validation}
        validProgress={validProgress}
        shiftPerc={shiftPerc}
        cropsMeta={CROPS}
        setShiftPerc={setShiftPerc}
        setPhase={setPhase}
        setValidation={setValidation}
        setValidProgress={setValidProgress}
      />

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