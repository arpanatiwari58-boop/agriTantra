"use client";

import { ChangeEvent, useState, useEffect } from "react";
import Link from "next/link";
import {
  Leaf, Wallet, ShieldAlert, Loader2,
  BarChart3, TrendingDown, Minus, TrendingUp,
  CheckCircle2, FlaskConical, ChevronRight
} from "lucide-react";
import { OptResult, CropAllocation } from "../types/dashboard";
import { CropName, SolveResponse } from "../types/api";
import { useOptimization } from "../context/OptimizationContext";

const fmt = (v: number) => Math.abs(v) >= 100000
  ? `Rs ${(v / 100000).toFixed(2)}L`
  : `Rs ${v.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

const API_BASE = "http://localhost:5000";

const CROPS: Array<{ name: CropName; cost: number; color: string; emoji: string }> = [
  { name: "LR Rice (Sub1)", cost: 50000, color: "#E8A045", emoji: "🌾" },
  { name: "HR Rice (Basmati)", cost: 62000, color: "#D4893A", emoji: "🌾" },
  { name: "Maize", cost: 40000, color: "#F2C94C", emoji: "🌽" },
  { name: "Soybean", cost: 36000, color: "#6BAF5C", emoji: "🫘" },
  { name: "Kodo Millet", cost: 22000, color: "#A0C878", emoji: "🌿" },
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

export default function InputsAndResults() {
  const { setResult: setContextResult } = useOptimization();
  const [land, setLand] = useState("4");
  const [budget, setBudget] = useState("400000");
  const [epsilon, setEpsilon] = useState(5);
  const [phase, setPhase] = useState<"input" | "solving" | "result" | "validating" | "validated">("input");
  const [result, setResult] = useState<OptResult | null>(null);
  const [animP, setAnimP] = useState({ min: 0, mean: 0, max: 0 });

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

      setResult(modelResult);
      setContextResult(modelResult); // Store in context
      setPhase("result");
    } catch (error) {
      console.error("Optimization failed:", error);
      setPhase("input"); // Reset on error
      alert("Failed to connect to the optimization server. Please ensure the backend is running at https://project-backend-g8h7.onrender.com");
    }
  }

  const maxArea = result ? Math.max(...result.crops.map(c => c.area)) : 1;

  // COST = np.array([48000, 54000, 30000, 32000, 22000, 30000, 30000], dtype=float)

  const cost =[58000, 64000, 42000, 38000, 22000, 28000, 29000]; // for reference in validation section - can be removed later
 const crops= [
    "LR Rice (Sub1)",
    "HR Rice (Basmati)",
    "Maize",
    "Soybean",
    "Kodo Millet",
    "Black Gram (Urad)",
    "Moong Dal"
]
  const totalCost = result ? result.allocationArray.reduce((sum, area, idx) => sum + area * cost[idx], 0) : 0;




  const handleNumber = (setter: (v: string) => void) => (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "16px 40px 40px" }}>
      {/* Inputs Control Panel */}
      <div style={{
        background: "#fff",
        borderRadius: 24,
        padding: 32,
        border: "1px solid #E8E2D8",
        boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
        marginBottom: 40
      }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C2B1A", margin: "0 0 6px" }}>
            {result ? "Adjust Farm Parameters" : "Farm Configuration"}
          </h2>
          <p style={{ fontSize: 13, color: "#6B7A69", margin: 0 }}>Define your bounds to generate a robust allocation plan.</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
          {/* Land */}
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#1C2B1A", marginBottom: 8 }}>
              <Leaf size={16} color="#2D6A2D" /> Total Land (ha)
            </label>
            <input 
              type="number" 
              value={land} 
              onChange={handleNumber(setLand)} 
              disabled={phase === "solving"}
              style={{ width: "100%", boxSizing: "border-box", background: "#F8F6F2", border: "1px solid #E8E2D8", borderRadius: 12, padding: "12px 16px", fontSize: 20, fontWeight: 700, color: "#1C2B1A", outline: "none", fontFamily: "inherit" }} 
            />
          </div>

          {/* Budget */}
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#1C2B1A", marginBottom: 8 }}>
              <Wallet size={16} color="#D4893A" /> Total Budget (Rs)
            </label>
            <input 
              type="number" 
              value={budget} 
              onChange={handleNumber(setBudget)} 
              disabled={phase === "solving"}
              style={{ width: "100%", boxSizing: "border-box", background: "#F8F6F2", border: "1px solid #E8E2D8", borderRadius: 12, padding: "12px 16px", fontSize: 20, fontWeight: 700, color: "#1C2B1A", outline: "none", fontFamily: "inherit" }} 
            />
          </div>
        </div>

        {/* Epsilon */}
        <div style={{ marginBottom: 28, padding: "20px 24px", background: "#F8F6F2", borderRadius: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: "#1C2B1A" }}>
              <ShieldAlert size={16} color="#4F46E5" /> Risk Profile (ε: {epsilon.toFixed(1)})
            </label>
            <div style={{
              fontSize: 10, fontWeight: 700, padding: "4px 8px", borderRadius: 8,
              background: epsilon < 3.4 ? "#FFF5F2" : epsilon > 6.6 ? "#F0F9EE" : "#FFF8EE",
              color: epsilon < 3.4 ? "#DC2626" : epsilon > 6.6 ? "#16A34A" : "#D97706",
            }}>
              {epsilon < 3.4 ? "AGGRESSIVE" : epsilon > 6.6 ? "CONSERVATIVE" : "BALANCED"}
            </div>
          </div>
          <input
            type="range" min="0" max="5" step="0.1"
            value={epsilon} onChange={(e) => setEpsilon(parseFloat(e.target.value))}
            disabled={phase === "solving"}
            style={{ width: "100%", height: 6, borderRadius: 3, background: "#E8E2D8", appearance: "none", cursor: "pointer", outline: "none" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
            <span style={{ fontSize: 11, color: "#8A9688", fontWeight: 500 }}>High Risk</span>
            <span style={{ fontSize: 11, color: "#8A9688", fontWeight: 500 }}>High Robustness</span>
          </div>
        </div>

        <button 
          onClick={
            // setResult(null);
            optimize 
          } 
          disabled={phase === "solving"} 
          style={{ 
            width: "100%", padding: "16px 0", 
            background: phase === "solving" ? "#E8E2D8" : "#2D6A2D", 
            border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, 
            color: phase === "solving" ? "#8A9688" : "#fff", cursor: phase === "solving" ? "not-allowed" : "pointer", 
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" 
          }}>
          {phase === "solving" ? (
            <><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Running...</>
          ) : (
            <><BarChart3 size={18} /> {result ? "Recalculate Plan" : "Generate Plan"}</>
          )}
        </button>
      </div>

      {/* Results */}
      {(phase === "result" || phase === "validating" || phase === "validated") && result && (
        <div style={{ 
          background: "#fff", 
          borderRadius: 24, 
          padding: 32, 
          border: "1px solid #E8E2D8", 
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)" 
        }}>
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 24 }}>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C2B1A", margin: "0 0 4px" }}>Optimization Strategy</h2>
              <span style={{ fontSize: 13, color: "#6B7A69" }}>Calculated Cultivation Cost: <strong style={{color: "#D4893A"}}>{fmt(totalCost)}</strong></span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: "#F0F9EE", borderRadius: 20, border: "1px solid #C8E6C9" }}>
              <CheckCircle2 size={14} color="#2D6A2D" />
              <span style={{ fontSize: 12, color: "#2D6A2D", fontWeight: 700 }}>Optimal</span>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 32 }}>
            {[
              { label: "Worst Case", val: animP.min, icon: <TrendingDown size={16} />, accent: "#DC6040", bg: "#FFF5F2", border: "#FFD5C8" },
              { label: "Expected", val: animP.mean, icon: <Minus size={16} />, accent: "#D4893A", bg: "#FFFBF0", border: "#FFE4B0" },
              { label: "Best Case", val: animP.max, icon: <TrendingUp size={16} />, accent: "#2D6A2D", bg: "#F0F9EE", border: "#B8DDB8" },
            ].map(item => (
              <div key={item.label} style={{ background: item.bg, borderRadius: 16, padding: "16px 20px", border: `1px solid ${item.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: item.accent, marginBottom: 8 }}>
                  {item.icon}
                  <span style={{ fontSize: 11, letterSpacing: 1, textTransform: "uppercase", fontWeight: 700 }}>{item.label}</span>
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, color: item.accent }}>{fmt(item.val)}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#1C2B1A" }}>Recommended Crop Allocation</div>
              <div style={{ fontSize: 12, color: "#8A9688" }}>Total: <strong style={{ color: "#1C2B1A" }}>{result.totalLand.toFixed(2)} ha</strong></div>
            </div>
            
            <div style={{ display: "flex", height: 12, borderRadius: 6, overflow: "hidden", marginBottom: 24, gap: 2 }}>
              {result.crops.map(crop => (
                <div key={crop.name} style={{ height: "100%", width: `${(crop.area / result.totalLand) * 100}%`, background: crop.color, transition: "width 1s cubic-bezier(0.16,1,0.3,1)" }} />
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px 24px" }}>
              {result.crops.map(crop => (
                <div key={crop.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ fontSize: 20, width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", background: "#F8F6F2", borderRadius: 8 }}>
                    {crop.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1C2B1A" }}>{crop.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: crop.color }}>{crop.area.toFixed(2)} ha</span>
                    </div>
                    <div style={{ height: 4, background: "#F4F1EB", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: crop.color, width: `${(crop.area / maxArea) * 100}%`, transition: "width 1s ease" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Link href="/validation" target="_blank" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 32, padding: "14px 0", background: "#4CAF50", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, color: "#fff", cursor: "pointer", textDecoration: "none", transition: "all 0.2s" }}>
              <FlaskConical size={18} /> Validate Strategy
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
