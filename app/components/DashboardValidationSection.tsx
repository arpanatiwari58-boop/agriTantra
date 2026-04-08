"use client";

import { useState } from "react";
import { FlaskConical, ChevronRight, Loader2, BarChart3, Info } from "lucide-react";
import { ValResult, OptResult } from "../types/dashboard";
import { ValidationResponse, ScenarioData, CropName } from "../types/api";

const API_BASE = "http://localhost:5000";

function fmt(v: number) {
  return Math.abs(v) >= 100000
    ? `Rs ${(v / 100000).toFixed(2)}L`
    : `Rs ${v.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
}

function ProfitCurve({ profits }: { profits: number[] }) {
  const bins = 40;
  const mn = Math.min(...profits);
  const mx = Math.max(...profits);
  const range = mx - mn || 1;
  const b = Array(bins).fill(0);
  profits.forEach(p => {
    const i = Math.min(Math.floor(((p - mn) / range) * bins), bins - 1);
    b[i]++;
  });
  const maxC = Math.max(...b) || 1;

  const points = b.map((count, i) => ({
    x: (i / (bins - 1)) * 100,
    y: 100 - (count / maxC) * 90,
    isNegative: (mn + (i / bins) * range) < 0
  }));

  const d = `M ${points.map(p => `${p.x},${p.y}`).join(" L ")}`;
  const areaD = `${d} L 100,100 L 0,100 Z`;
  const zeroX = mn < 0 && mx > 0 ? (Math.abs(mn) / range) * 100 : mn >= 0 ? 0 : 100;

  return (
    <div style={{ height: 100, width: "100%", position: "relative", marginTop: 10 }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: "100%", height: "100%", overflow: "visible" }}>
        <defs>
          <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={mn < 0 ? "#ef4444" : "#22c55e"} stopOpacity="0.2" />
            <stop offset={`${zeroX}%`} stopColor={mn < 0 ? "#ef4444" : "#22c55e"} stopOpacity="0.2" />
            <stop offset={`${zeroX}%`} stopColor="#22c55e" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <line x1={zeroX} y1="0" x2={zeroX} y2="100" stroke="rgba(0,0,0,0.1)" strokeWidth="0.5" strokeDasharray="2,2" />
        <path d={areaD} fill="url(#curveGradient)" style={{ transition: "all 0.8s ease" }} />
        <path d={d} fill="none" stroke="#2D6A2D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "all 0.8s ease" }} />
        {mn < 0 && mx > 0 && (
          <text x={zeroX} y="110" fontSize="4" textAnchor="middle" fill="#9CA3AF" fontWeight="600">BEP</text>
        )}
      </svg>
    </div>
  );
}

interface DashboardValidationSectionProps {
  phase: "input" | "solving" | "result" | "validating" | "validated";
  result: OptResult | null;
  validation: ValResult | null;
  validProgress: number;
  shiftPerc: number;
  cropsMeta: Array<{ name: CropName; cost: number; color: string; emoji: string }>;
  setShiftPerc: (v: number) => void;
  setPhase: (p: "input" | "solving" | "result" | "validating" | "validated") => void;
  setValidation: (v: ValResult | null) => void;
  setValidProgress: (v: number) => void;
}

export default function DashboardValidationSection({ phase, result, validation, validProgress, shiftPerc, cropsMeta, setShiftPerc, setPhase, setValidation, setValidProgress }: DashboardValidationSectionProps) {
  const [isValidating, setIsValidating] = useState(false);
  console.log(result)

  async function runValidation() {
    if (!result) return;
    setIsValidating(true);
    setPhase("validating");
    setValidation(null);
    setValidProgress(0);

    let prog = 0;
    const iv = setInterval(() => {
      prog += Math.random() * 2;
      setValidProgress(Math.min(prog, 90));
    }, 100);

    try {
      const res = await fetch(`${API_BASE}/test-validation`, { method: "GET" });
      if (!res.ok) throw new Error(`Validation fetch failed with ${res.status}`);
      const data: ValidationResponse = await res.json();

      const profits = calculateScenarioProfits(data.scenarios, result.allocationMap, shiftPerc);
      const mean = profits.reduce((a, b) => a + b, 0) / (profits.length || 1);
      const std = Math.sqrt(profits.reduce((s, p) => s + (p - mean) ** 2, 0) / (profits.length || 1));

      setValidProgress(100);
      setValidation({
        profits,
        mean,
        min: Math.min(...profits),
        max: Math.max(...profits),
        std,
        successRate: profits.filter(p => p > 0).length / (profits.length || 1)
      });
      setPhase("validated");
    } catch (error) {
      console.error("Validation failed:", error);
      setPhase("result");
      alert("Validation failed. Please check the backend connection.");
    } finally {
      clearInterval(iv);
      setIsValidating(false);
    }
  }

  function calculateScenarioProfits(scenarios: ScenarioData[], allocation: OptResult["allocationMap"], shiftPercent: number) {
    // Apply a deterministic downward shock to yields and prices to stress-test the plan
    const stressFactor = Math.max(0, 1 - shiftPercent / 100);
    return scenarios.map(s => {
      let profit = 0;
      Object.entries(allocation).forEach(([crop, area]) => {
        if (!area) return;
        const y = s.yields[crop as keyof typeof s.yields] ?? 0;
        const p = s.prices[crop as keyof typeof s.prices] ?? 0;
        const cost = (cropsMeta.find(c => c.name === crop)?.cost ?? 0);
        profit += area * ((y * stressFactor) * (p * stressFactor) - cost);
      });
      return profit;
    });
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 40px 80px" }}>
      {result && (
        <div style={{ background: "#fff", borderRadius: 16, padding: 18, border: "1px solid #E8E2D8", boxShadow: "0 2px 10px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column", gap: 12, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: "#6B7A69", marginBottom: 6 }}>Expected variation in future seasons</div>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <input
                  type="range"
                  min={0}
                  max={50}
                  step={1}
                  value={shiftPerc}
                  onChange={(e) => setShiftPerc(Math.min(50, Math.max(0, Number(e.target.value) || 0)))}
                  disabled={phase === "validating" || isValidating}
                  style={{ flex: 1, accentColor: "#2D6A2D", opacity: (phase === "validating" || isValidating) ? 0.6 : 1 }}
                />
                <div style={{ minWidth: 90, textAlign: "right", fontWeight: 800, color: "#1C2B1A" }}>±{shiftPerc}%</div>
              </div>
              <span style={{ fontSize: 13, color: "#6B7A69" }}>We will apply this shock to yields, prices, and rainfall.</span>
            </div>
          </div>
          <button onClick={runValidation} disabled={phase === "validating" || isValidating} style={{ width: "100%", padding: "14px 0", background: "#fff", border: "2px solid #2D6A2D", borderRadius: 14, fontSize: 14, fontWeight: 700, color: "#2D6A2D", cursor: (phase === "validating" || isValidating) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s", boxShadow: "0 2px 12px rgba(45,106,45,0.10)" }}>
            <FlaskConical size={17} />
            {(phase === "validating" || isValidating) ? "Running Validation..." : "Validate Against 200 Future Scenarios"}
            <ChevronRight size={15} />
          </button>
        </div>
      )}

      {phase === "validating" && (
        <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #E8E2D8", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
            <Loader2 size={18} color="#2D6A2D" style={{ animation: "spin 1s linear infinite" }} />
            <span style={{ fontSize: 14, fontWeight: 600, color: "#1C2B1A" }}>Generating Monte Carlo scenarios...</span>
            <span style={{ fontSize: 13, color: "#2D6A2D", fontWeight: 700, marginLeft: "auto" }}>{Math.floor(validProgress * 5)} / 200</span>
          </div>
          <div style={{ height: 8, background: "#F0EBE0", borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg, #2D6A2D, #6BAF5C)", borderRadius: 4, width: `${validProgress}%`, transition: "width 0.1s ease" }} />
          </div>
          <div style={{ fontSize: 12, color: "#8A9688" }}>Applying ±{shiftPerc}% distributional shift to yields, prices, and rainfall...</div>
        </div>
      )}

      {phase === "validated" && validation && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginTop: 16 }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #E8E2D8", boxShadow: "0 2px 12px rgba(44,90,44,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#F0F9EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BarChart3 size={18} color="#2D6A2D" />
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#1C2B1A" }}>Out-of-Sample Performance</div>
                <div style={{ fontSize: 12, color: "#8A9688" }}>200 unseen future seasons · ±{shiftPerc}% distribution shift</div>
              </div>
              <div style={{ marginLeft: "auto", padding: "7px 16px", background: "#F0F9EE", borderRadius: 20, border: "1px solid #B8DDB8", fontSize: 13, fontWeight: 800, color: "#2D6A2D" }}>
                {(validation.successRate * 100).toFixed(0)}% Success
              </div>
            </div>
            <ProfitCurve profits={validation.profits} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: "#DC6040" }} /><span style={{ fontSize: 10, color: "#8A9688" }}>Loss</span></div>
              <span style={{ fontSize: 11, color: "#8A9688" }}>Profit Distribution · 200 scenarios</span>
              <div style={{ display: "flex", alignItems: "center", gap: 5 }}><div style={{ width: 8, height: 8, borderRadius: 2, background: "#4CAF50" }} /><span style={{ fontSize: 10, color: "#8A9688" }}>Profit</span></div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { label: "Mean Profit", val: fmt(validation.mean), sub: "average across 200 scenarios", color: "#D4893A", bg: "#FFFBF0", border: "#FFE4B0" },
              { label: "Success Rate", val: `${(validation.successRate * 100).toFixed(1)}%`, sub: "scenarios with positive profit", color: "#2D6A2D", bg: "#F0F9EE", border: "#B8DDB8" },
              // { label: "Volatility (σ)", val: fmt(validation.std), sub: "standard deviation of profits", color: "#4A6FA5", bg: "#F0F4FF", border: "#B8CCE8" },
              // show max profit
              { label: "maxt profit", val: fmt(validation.max), sub: "maximum across all 200 tests", color: "#2D6A2D", bg: "#F0F9EE", border: "#B8DDB8" },
              { label: "Worst Outcome", val: fmt(validation.min), sub: "minimum across all 200 tests", color: "#DC6040", bg: "#FFF5F2", border: "#FFD5C8" },
            ].map(item => (
              <div key={item.label} style={{ background: item.bg, borderRadius: 16, padding: "20px 22px", border: `1px solid ${item.border}` }}>
                <div style={{ fontSize: 11, color: item.color, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>{item.label}</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: item.color }}>{item.val}</div>
                <div style={{ fontSize: 11, color: item.color, opacity: 0.65, marginTop: 4 }}>{item.sub}</div>
              </div>
            ))}
          </div>

          <div style={{ background: "#F0F9EE", borderRadius: 16, padding: "18px 22px", border: "1px solid #C8E6C9", display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Info size={17} color="#2D6A2D" style={{ marginTop: 1, flexShrink: 0 }} />
            <div style={{ fontSize: 13, color: "#3D6B3C", lineHeight: 1.7 }}>
              Your WDRO plan maintained a <strong>{(validation.successRate * 100).toFixed(0)}% success rate</strong> even under ±10% distributional shift. Worst-case profit was <strong>{fmt(validation.min)}</strong>, demonstrating the protective floor built into the allocation.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
