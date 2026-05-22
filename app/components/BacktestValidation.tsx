"use client";

import { useState, useEffect } from "react";
import { OptResult } from "../types/dashboard";
import { BacktestResponse, BacktestRequest, CropName } from "../types/api";
import { Loader2, TrendingUp, History, CloudSun, AlertCircle, CheckCircle2 } from "lucide-react";

const API_BASE = "http://localhost:5000";

const fmt = (v: number) => {
  if (v === undefined || isNaN(v)) return "N/A";
  return Math.abs(v) >= 100000
    ? `Rs ${(v / 100000).toFixed(2)}L`
    : `Rs ${v.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
};

export default function BacktestValidation({ result }: { result: OptResult | null }) {
  const [backtestData, setBacktestData] = useState<BacktestResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBacktest = async (allocationMap: Partial<Record<CropName, number>>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE}/evaluate-backtest`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ allocation: allocationMap } as BacktestRequest),
      });
      
      if (!response.ok) throw new Error(`Backtest failed with status ${response.status}`);
      
      const data: BacktestResponse = await response.json();
      setBacktestData(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load backtest data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (result && result.allocationMap) {
      fetchBacktest(result.allocationMap);
    }
  }, [result]);

  if (!result) return null;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 40px 40px" }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: "#1C2B1A", marginBottom: 6 }}>
        3-Layer Backtest & Generlization Validation
      </h3>
      <p style={{ fontSize: 13, color: "#6B7A69", marginBottom: 24 }}>
        Comprehensive historical and out-of-sample simulation for the generated allocation.
      </p>

      {loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 24, background: "#fff", borderRadius: 16, border: "1px solid #E8E2D8" }}>
          <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} color="#2D6A2D" />
          <span style={{ fontSize: 14, color: "#6B7A69", fontWeight: 500 }}>Running extensive backtest simulations...</span>
        </div>
      )}

      {error && !loading && (
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: 16, background: "#FFF5F2", borderRadius: 12, border: "1px solid #FFD5C8", color: "#DC6040" }}>
          <AlertCircle size={18} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>{error}</span>
        </div>
      )}

      {backtestData && !loading && (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          
          {/* LAYER 1: Generalization */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, border: "1px solid #E8E2D8", boxShadow: "0 2px 12px rgba(44,90,44,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#F0F9EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <TrendingUp size={18} color="#2D6A2D" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1C2B1A" }}>Layer 1: Out-of-Sample Generalization</div>
                <div style={{ fontSize: 12, color: "#8A9688" }}>Monte Carlo validation on 500 new scenarios</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              <div style={{ background: "#F8F6F2", padding: 16, borderRadius: 12 }}>
                <div style={{ fontSize: 12, color: "#6B7A69", marginBottom: 4 }}>Train Mean (In-Sample)</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#1C2B1A" }}>{fmt(backtestData.layer1_outofsample.train_mean)}</div>
              </div>
              <div style={{ background: "#F0F9EE", padding: 16, borderRadius: 12 }}>
                <div style={{ fontSize: 12, color: "#2D6A2D", marginBottom: 4, fontWeight: 600 }}>Validation Mean (New)</div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#2D6A2D" }}>{fmt(backtestData.layer1_outofsample.val_mean)}</div>
              </div>
              <div style={{ background: "#FFFBF0", padding: 16, borderRadius: 12 }}>
                <div style={{ fontSize: 12, color: "#D4893A", marginBottom: 4 }}>Generalization Gap</div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#D4893A" }}>{fmt(backtestData.layer1_outofsample.generalization_gap)}</div>
              </div>
            </div>
          </div>

          {/* LAYER 2: Historical Backtest */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, border: "1px solid #E8E2D8", boxShadow: "0 2px 12px rgba(44,90,44,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <History size={18} color="#4F46E5" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1C2B1A" }}>Layer 2: Historical Performance (2014-2023)</div>
                <div style={{ fontSize: 12, color: "#8A9688" }}>How this allocation would have performed in the real world</div>
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <div style={{ display: "flex", gap: 12, paddingBottom: 8 }}>
                {backtestData.layer2_historical.years.map((y) => (
                  <div key={y.year} style={{ minWidth: 100, border: "1px solid #E8E2D8", borderRadius: 12, padding: 12, background: "#fff" }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: "#1C2B1A", marginBottom: 4 }}>{y.year}</div>
                    <div style={{ fontSize: 11, padding: "2px 6px", borderRadius: 4, display: "inline-block", marginBottom: 8, fontWeight: 600,
                      background: y.regime === "Drought" ? "#FFF5F2" : y.regime === "Flood" ? "#EEF2FF" : "#F0F9EE",
                      color: y.regime === "Drought" ? "#DC6040" : y.regime === "Flood" ? "#4F46E5" : "#2D6A2D"
                    }}>
                      {y.regime}
                    </div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#4A6FA5" }}>{fmt(y.profit)}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
               <div style={{ flex: 1, fontSize: 13, color: "#6B7A69" }}>
                 <strong style={{ color: "#1C2B1A" }}>10-Year Mean:</strong> {fmt(backtestData.layer2_historical.summary.mean)}
               </div>
               <div style={{ flex: 1, fontSize: 13, color: "#6B7A69" }}>
                 <strong style={{ color: "#1C2B1A" }}>10-Year Min:</strong> {fmt(backtestData.layer2_historical.summary.min)}
               </div>
            </div>
          </div>

          {/* LAYER 3: Regime Breakdown */}
          <div style={{ background: "#fff", borderRadius: 20, padding: 24, border: "1px solid #E8E2D8", boxShadow: "0 2px 12px rgba(44,90,44,0.04)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "#FFF8EE", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CloudSun size={18} color="#D4893A" />
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#1C2B1A" }}>Layer 3: Out-of-Sample Regime Breakdown</div>
                <div style={{ fontSize: 12, color: "#8A9688" }}>Performance isolated by distinct weather patterns</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
               {Object.entries(backtestData.layer3_regimes).map(([regime, stats]) => (
                <div key={regime} style={{ border: `1px solid ${regime === "Drought" ? "#FFD5C8" : regime === "Flood" ? "#C7D2FE" : "#B8DDB8"}`, borderRadius: 12, padding: 16, background: regime === "Drought" ? "#FFF5F2" : regime === "Flood" ? "#EEF2FF" : "#F0F9EE" }}>
                  <div style={{ fontSize: 14, fontWeight: 800, color: regime === "Drought" ? "#DC6040" : regime === "Flood" ? "#4F46E5" : "#2D6A2D", marginBottom: 12, display: "flex", justifyContent: "space-between" }}>
                    <span>{regime}</span>
                    <span style={{ fontSize: 11, opacity: 0.8 }}>n={stats.count}</span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#6B7A69" }}>Mean</span>
                      <strong style={{ color: "#1C2B1A" }}>{fmt(stats.mean)}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#6B7A69" }}>Min</span>
                      <strong style={{ color: "#1C2B1A" }}>{fmt(stats.min)}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                      <span style={{ color: "#6B7A69" }}>Max</span>
                      <strong style={{ color: "#1C2B1A" }}>{fmt(stats.max)}</strong>
                    </div>
                  </div>
                </div>
               ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}