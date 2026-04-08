"use client";

import { ChangeEvent } from "react";
import {
  Leaf, Wallet, ShieldAlert, Loader2,
  BarChart3, TrendingDown, Minus, TrendingUp,
  CheckCircle2, FlaskConical, ChevronRight
} from "lucide-react";
import { OptResult } from "../types/dashboard";

const fmt = (v: number) => Math.abs(v) >= 100000
  ? `Rs ${(v / 100000).toFixed(2)}L`
  : `Rs ${v.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;

interface InputsAndResultsProps {
  land: string;
  setLand: (v: string) => void;
  budget: string;
  setBudget: (v: string) => void;
  epsilon: number;
  setEpsilon: (v: number) => void;
  phase: "input" | "solving" | "result" | "validating" | "validated";
  optimize: () => void;
  result: OptResult | null;
  animP: { min: number; mean: number; max: number };
}

export default function InputsAndResults(props: InputsAndResultsProps) {
  const { land, setLand, budget, setBudget, epsilon, setEpsilon, phase, optimize, result, animP } = props;
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
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 40px 40px" }}>
      {/* Inputs */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C2B1A", margin: "0 0 4px" }}>
            {result ? "Adjust Farm Parameters" : "Enter Your Farm Details"}
          </h2>
          <p style={{ fontSize: 13, color: "#6B7A69", margin: 0 }}>Provide your available land and capital to generate a robust seasonal crop plan</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
          {/* Land */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #E8E2D8", boxShadow: "0 2px 12px rgba(44,90,44,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#F0F9EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Leaf size={18} color="#2D6A2D" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1C2B1A" }}>Total Farm Land</div>
                <div style={{ fontSize: 12, color: "#8A9688" }}>Available area for cultivation</div>
              </div>
            </div>
            <div style={{ position: "relative", marginBottom: 14 }}>
              <input type="number" value={land} onChange={handleNumber(setLand)} disabled={phase === "solving"}
                style={{ width: "100%", boxSizing: "border-box", background: "#F8F6F2", border: "2px solid #E8E2D8", borderRadius: 12, padding: "14px 56px 14px 18px", fontSize: 28, fontWeight: 800, color: "#1C2B1A", outline: "none", fontFamily: "inherit" }} />
              <span style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#8A9688", fontWeight: 600 }}>ha</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[1, 2, 4, 8].map(v => (
                <button key={v} onClick={() => setLand(String(v))} style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: `2px solid ${land === String(v) ? "#2D6A2D" : "#E8E2D8"}`, background: land === String(v) ? "#F0F9EE" : "#fff", color: land === String(v) ? "#2D6A2D" : "#8A9688", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>{v} ha</button>
              ))}
            </div>
          </div>

          {/* Budget */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #E8E2D8", boxShadow: "0 2px 12px rgba(44,90,44,0.06)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#FFF8EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Wallet size={18} color="#D4893A" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1C2B1A" }}>Total Budget</div>
                <div style={{ fontSize: 12, color: "#8A9688" }}>Available capital for this season</div>
              </div>
            </div>
            <div style={{ position: "relative", marginBottom: 14 }}>
              <input type="number" value={budget} onChange={handleNumber(setBudget)} disabled={phase === "solving"}
                style={{ width: "100%", boxSizing: "border-box", background: "#F8F6F2", border: "2px solid #E8E2D8", borderRadius: 12, padding: "14px 56px 14px 18px", fontSize: 28, fontWeight: 800, color: "#1C2B1A", outline: "none", fontFamily: "inherit" }} />
              <span style={{ position: "absolute", right: 18, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: "#8A9688", fontWeight: 600 }}>Rs</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {[300000, 600000, 900000, 1200000].map(v => (
                <button key={v} onClick={() => setBudget(String(v))} style={{ flex: 1, padding: "9px 0", borderRadius: 10, border: `2px solid ${budget === String(v) ? "#D4893A" : "#E8E2D8"}`, background: budget === String(v) ? "#FFF8EE" : "#fff", color: budget === String(v) ? "#D4893A" : "#8A9688", fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.2s" }}>{v >= 100000 ? `${v / 100000}L` : v}</button>
              ))}
            </div>
          </div>
        </div>
        {/* here make a table to show the cost of cultivation for each crop .table should be horizontal,in the first row show the crops and in the show row show there cost*/}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#f6f6f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FlaskConical size={18} color="#D4893A" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1C2B1A" }}>Cultivation Costs per Crop</div>
                <div style={{ fontSize: 12, color: "#8A9688" }}>Reference costs for each crop (per hectare)</div>
              </div>
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 400 }}>
                <thead>
                  <tr>
                    {crops.map(crop => (
                      <th key={crop} style={{ textAlign: "left", padding: "12px 16px", background: "#fffcfc", color: "#1C2B1A", fontSize: 13, fontWeight: 600, borderBottom: "2px solid #E8E2D8" }}>{crop}</th>
                                          ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {cost.map((c, idx) => (
                      <td key={idx} style={{ padding: "12px 16px", borderBottom: "1px solid #E8E2D8", fontSize: 13, color: "#6B7A69",background: "#fff" }}>{fmt(c)} / ha</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>  

        

        {/* Epsilon */}
        <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #E8E2D8", boxShadow: "0 2px 12px rgba(44,90,44,0.06)", marginBottom: 20, transition: "all 0.3s" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShieldAlert size={18} color="#4F46E5" />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1C2B1A" }}>Risk Profile (ε)</div>
                <div style={{ fontSize: 12, color: "#8A9688" }}>Robustness against market volatility</div>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: "#4F46E5" }}>{epsilon.toLocaleString()}</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: epsilon < 10000 ? "#DC2626" : epsilon > 20000 ? "#16A34A" : "#D97706", textTransform: "uppercase", letterSpacing: 0.5 }}>
                {epsilon < 10000 ? "Aggressive Strategy" : epsilon > 20000 ? "Safe / Conservative" : "Balanced Robustness"}
              </div>
            </div>
          </div>
          <input
            type="range" min="1000" max="30000" step="500" value={epsilon}
            onChange={(e) => setEpsilon(parseInt(e.target.value))}
            disabled={phase === "solving"}
            style={{ width: "100%", height: 6, borderRadius: 3, background: "#E8E2D8", appearance: "none", cursor: "pointer", outline: "none" }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <span style={{ fontSize: 11, color: "#8A9688", fontWeight: 600 }}>HIGH RISK</span>
            <span style={{ fontSize: 11, color: "#8A9688", fontWeight: 600 }}>HIGH ROBUSTNESS</span>
          </div>
        </div>

        <button onClick={optimize} disabled={phase === "solving"} style={{ width: "100%", padding: "18px 0", background: phase === "solving" ? "#E8E2D8" : "linear-gradient(135deg, #2D6A2D 0%, #4CAF50 100%)", border: "none", borderRadius: 16, fontSize: 15, fontWeight: 800, color: phase === "solving" ? "#8A9688" : "#fff", cursor: phase === "solving" ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, letterSpacing: 0.3, boxShadow: phase === "solving" ? "none" : "0 4px 20px rgba(45,106,45,0.35)", transition: "all 0.3s" }}>
          {phase === "solving" ? (<><Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />Running Optimization...</>) : (<><BarChart3 size={18} />{result ? "Recalculate Optimal Crop Plan" : "Generate Optimal Crop Plan"}<ChevronRight size={16} /></>)}
        </button>
      </div>

      {/* Results */}
      {(phase === "result" || phase === "validating" || phase === "validated") && result && (
        <div>
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 16 }}>
              <div>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1C2B1A", margin: "0 0 2px" }}>Optimization Complete</h2>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 14px", background: "#F0F9EE", borderRadius: 20, border: "1px solid #C8E6C9" }}>
                <CheckCircle2 size={14} color="#2D6A2D" />
                <span style={{ fontSize: 12, color: "#2D6A2D", fontWeight: 700 }}>WDRO Optimal</span>
              </div>
            </div>
            <div style={{ background: "#FFF8EE", borderRadius: 16, padding: "18px 24px", border: "1px solid #FFE4B0", display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <FlaskConical size={16} color="#D4893A" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontSize: 11, color: "#0a0a0a", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>Estimated Cultivation Cost</span>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#0e0e0d" }}>{fmt(totalCost)}</div>
              </div>
            </div>

            {/* <div style={{ fontSize: 14, fontWeight: 600, color: "#1C2B1A", marginBottom: 12 }}>Estimated Total Cultivation Cost: <strong style={{ color: "#D4893A" }}>{fmt(totalCost)}</strong></div>  */}





            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {[
                { label: "Worst Case", val: animP.min, icon: <TrendingDown size={16} />, accent: "#DC6040", bg: "#FFF5F2", border: "#FFD5C8" },
                { label: "Expected", val: animP.mean, icon: <Minus size={16} />, accent: "#D4893A", bg: "#FFFBF0", border: "#FFE4B0" },
                { label: "Best Case", val: animP.max, icon: <TrendingUp size={16} />, accent: "#2D6A2D", bg: "#F0F9EE", border: "#B8DDB8" },
              ].map(item => (
                <div key={item.label} style={{ background: item.bg, borderRadius: 18, padding: "22px 24px", border: `1px solid ${item.border}`, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, color: item.accent, marginBottom: 12 }}>
                    {item.icon}
                    <span style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 600 }}>{item.label}</span>
                  </div>
                  <div style={{ fontSize: 26, fontWeight: 800, color: item.accent, letterSpacing: -0.5 }}>{fmt(item.val)}</div>
                  <div style={{ fontSize: 11, color: item.accent, opacity: 0.6, marginTop: 4 }}>Projected season profit</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: 20, padding: 28, border: "1px solid #E8E2D8", boxShadow: "0 2px 12px rgba(44,90,44,0.06)", marginBottom: 0 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#1C2B1A" }}>Recommended Crop Allocation</div>
              <div style={{ fontSize: 12, color: "#8A9688" }}>Total: <strong style={{ color: "#1C2B1A" }}>{result.totalLand.toFixed(2)} ha</strong></div>
            </div>
            <div style={{ display: "flex", height: 14, borderRadius: 7, overflow: "hidden", marginBottom: 20, gap: 2 }}>
              {result.crops.map(crop => (
                <div key={crop.name} style={{ height: "100%", borderRadius: 4, width: `${(crop.area / result.totalLand) * 100}%`, background: crop.color, transition: "width 1s cubic-bezier(0.16,1,0.3,1)" }} />
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {result.crops.map(crop => (
                <div key={crop.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div style={{ fontSize: 22, width: 32, textAlign: "center", flexShrink: 0 }}>{crop.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1C2B1A" }}>{crop.name}</span>
                      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                        <span style={{ fontSize: 12, color: "#8A9688" }}>{((crop.area / result.totalLand) * 100).toFixed(0)}%</span>
                        <span style={{ fontSize: 13, fontWeight: 800, color: crop.color }}>{crop.area.toFixed(3)} ha</span>
                      </div>
                    </div>
                    <div style={{ height: 7, background: "#F4F1EB", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", borderRadius: 4, background: crop.color, width: `${(crop.area / maxArea) * 100}%`, transition: "width 1s cubic-bezier(0.16,1,0.3,1)" }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 14, marginTop: 20, flexWrap: "wrap", paddingTop: 18, borderTop: "1px solid #F0EBE0" }}>
              {result.crops.map(crop => (
                <div key={crop.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: crop.color }} />
                  <span style={{ fontSize: 11, color: "#8A9688" }}>{crop.name.split(" ")[0]}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
