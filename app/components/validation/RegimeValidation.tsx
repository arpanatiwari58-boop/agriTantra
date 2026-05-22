"use client";

import { useState } from "react";
import { ChevronRight, Loader2, Info, CloudRain, Sun } from "lucide-react";
import { OptResult, ValResult } from "../../types/dashboard";
import { ValidationRequest, ValidationResponse, ScenarioData, CropName } from "../../types/api";

const API_BASE = "http://localhost:5000";

export default function RegimeValidation({ result, cropsMeta, onComplete }: { result: OptResult, cropsMeta: any[], onComplete: (res: ValResult) => void }) {
  const [drought, setDrought] = useState(30);
  const [flood, setFlood] = useState(10);
  
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [valResult, setValResult] = useState<ValResult | null>(null);

  const normal = Math.max(0, 100 - drought - flood);

  async function runValidation() {
    setLoading(true);
    setProgress(0);
    setValResult(null);
    
    let prog = 0;
    const iv = setInterval(() => {
      prog += Math.random() * 5;
      setProgress(Math.min(prog, 90));
    }, 100);

    try {
      const payload: ValidationRequest = {
        p_drought: drought / 100,
        p_normal: normal / 100,
        p_flood: flood / 100
      };

      const res = await fetch(`${API_BASE}/test-validation`, { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(payload) 
      });
      if (!res.ok) throw new Error("Fetch failed");
      const data: ValidationResponse = await res.json();
      
      const scenarios = data.regime_shift || [];
      const profits = scenarios.map(s => {
        let profit = 0;
        Object.entries(result.allocationMap).forEach(([crop, area]) => {
          if (!area) return;
          const y = s.yields[crop as CropName] ?? 0;
          const p = s.prices[crop as CropName] ?? 0;
          const cost = cropsMeta.find(c => c.name === crop)?.cost ?? 0;
          profit += area * (y * p - cost);
        });
        return profit;
      });

      const mean = profits.reduce((a, b) => a + b, 0) / (profits.length || 1);
      
      const newResult = {
        profits, mean, min: Math.min(...profits), max: Math.max(...profits), std: 0,
        successRate: profits.filter(p => p > 0).length / (profits.length || 1)
      };

      setProgress(100);
      setValResult(newResult);
      onComplete(newResult);
    } catch (e) {
      console.error(e);
      alert("Climate Regime validation failed.");
    } finally {
      clearInterval(iv);
      setLoading(false);
    }
  }

  function handleDroughtChange(val: number) {
    if (val + flood > 100) setFlood(100 - val);
    setDrought(val);
  }
  function handleFloodChange(val: number) {
    if (val + drought > 100) setDrought(100 - val);
    setFlood(val);
  }

  return (
    <div style={{ background: "#fff", borderRadius: 16, padding: 24, border: "1px solid #E8E2D8" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
        <CloudRain size={20} color="#3A9P94" /> 
        <div style={{ fontWeight: 700, fontSize: 18, color: "#1C2B1A" }}>Climate Regimes</div>
      </div>
      <div style={{ fontSize: 13, color: "#6B7A69", marginBottom: 24 }}>
        Test how allocation performs under different climatic probabilities (Drought vs Flood vs Normal).
      </div>
      
      <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 80, fontSize: 13, fontWeight: 600, color: "#9A3C32" }}>Drought</div>
          <input type="range" min={0} max={100} step={1} value={drought} onChange={e => handleDroughtChange(Number(e.target.value))} disabled={loading} style={{ flex: 1, accentColor: "#9A3C32" }} />
          <div style={{ width: 40, textAlign: "right", fontWeight: 700, fontSize: 14 }}>{drought}%</div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ width: 80, fontSize: 13, fontWeight: 600, color: "#3A7BD5" }}>Flood</div>
          <input type="range" min={0} max={100} step={1} value={flood} onChange={e => handleFloodChange(Number(e.target.value))} disabled={loading} style={{ flex: 1, accentColor: "#3A7BD5" }} />
          <div style={{ width: 40, textAlign: "right", fontWeight: 700, fontSize: 14 }}>{flood}%</div>
        </div>
        <div style={{ display: "flex", gap: 16, alignItems: "center", padding: "8px 0", borderTop: "1px dashed #E8E2D8" }}>
          <div style={{ width: 80, fontSize: 13, fontWeight: 600, color: "#4A7A59" }}>Normal</div>
          <div style={{ flex: 1, background: "#E8E2D8", height: 4, borderRadius: 2 }}><div style={{ width: `${normal}%`, height: "100%", background: "#4A7A59", borderRadius: 2 }}/></div>
          <div style={{ width: 40, textAlign: "right", fontWeight: 700, fontSize: 14 }}>{normal}%</div>
        </div>
      </div>
      
    
        <button 
          onClick={runValidation} 
          style={{ width: "100%", padding: "14px", background: "#fff", border: "2px solid #5A8F74", borderRadius: 12, fontSize: 14, fontWeight: 700, color: "#5A8F74", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
        >
          Simulate Climates <ChevronRight size={16} />
        </button>
  

      {loading && (
        <div style={{ marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <Loader2 size={16} color="#5A8F74" style={{ animation: "spin 1s linear infinite" }} />
            <span style={{ fontSize: 13, fontWeight: 600 }}>Simulating scenarios...</span>
          </div>
          <div style={{ height: 6, background: "#F0EBE0", borderRadius: 3, overflow: "hidden" }}>
            <div style={{ height: "100%", background: "#5A8F74", width: `${progress}%`, borderRadius: 3, transition: "width 0.2s" }} />
          </div>
        </div>
      )}

      {valResult && (
        <div style={{ marginTop: 24, padding: 16, background: "#F2F9F5", borderRadius: 12, border: "1px solid #DDEBE3" }}>
          <h4 style={{ margin: "0 0 16px 0", fontSize: 16, color: "#1C2B1A" }}>Test Results</h4>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div>
              <div style={{ fontSize: 12, color: "#6B7A69", fontWeight: 600 }}>Success Rate (Profit &gt; 0)</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: valResult.successRate > 0.8 ? "#2D6A2D" : "#B33939" }}>
                {(valResult.successRate * 100).toFixed(1)}%
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6B7A69", fontWeight: 600 }}>Mean Profit</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: valResult.mean >= 0 ? "#1C2B1A" : "#B33939" }}>₹{Math.round(valResult.mean).toLocaleString()}</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6B7A69", fontWeight: 600 }}>Min Profit (Worst Case)</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: valResult.min < 0 ? "#B33939" : "#1C2B1A" }}>
                ₹{Math.round(valResult.min).toLocaleString()}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#6B7A69", fontWeight: 600 }}>Max Profit (Best Case)</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#1C2B1A" }}>
                ₹{Math.round(valResult.max).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}