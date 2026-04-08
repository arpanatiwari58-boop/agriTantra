"use client";

import { Sprout, Sun, CloudRain, Wind } from "lucide-react";

interface DashboardHeroProps {
  phaseIdx: number;
}

export default function DashboardHero({ phaseIdx }: DashboardHeroProps) {
  const steps = ["Farm Parameters", "WDRO Optimization", "Scenario Validation"];

  return (
    <>
      {/* Topbar */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #E4DDD0",
        padding: "0 40px", display: "flex", alignItems: "center",
        justifyContent: "space-between", height: 64,
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 1px 8px rgba(44,90,44,0.06)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #2D6A2D, #4CAF50)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Sprout size={16} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#1C2B1A", letterSpacing: -0.3 }}>KrisiBuddhiman</div>
            <div style={{ fontSize: 10, color: "#8A9688", letterSpacing: 1, textTransform: "uppercase" }}>WDRO · Crop Intelligence</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          {["Dashboard", "History", "About"].map(t => (
            <span key={t} style={{ fontSize: 13, color: t === "Dashboard" ? "#2D6A2D" : "#8A9688", fontWeight: t === "Dashboard" ? 700 : 400, cursor: "pointer" }}>{t}</span>
          ))}
          <div style={{ padding: "7px 16px", borderRadius: 8, background: "#2D6A2D", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Season 2081 BS</div>
        </div>
      </div>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #2D6A2D 0%, #3D8B3D 40%, #4CAF50 100%)", padding: "36px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", right: -60, top: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "absolute", right: 80, bottom: -80, width: 180, height: 180, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: 3, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", marginBottom: 8 }}>Wasserstein Distributionally Robust Optimization</div>
              <h1 style={{ fontSize: 30, fontWeight: 800, color: "#fff", margin: "0 0 8px", letterSpacing: -0.5, lineHeight: 1.15 }}>Smart Farm Allocation System</h1>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, margin: 0 }}>Optimized crop planning under climate and price uncertainty · Nepal Terai</p>
            </div>
            <div style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", borderRadius: 16, padding: "16px 22px", border: "1px solid rgba(255,255,255,0.2)", display: "flex", gap: 24 }}>
              {[{ icon: <Sun size={18} color="#FFD700" />, label: "Season", val: "Kharif" }, { icon: <CloudRain size={18} color="#90CAF9" />, label: "Avg Rain", val: "1,060mm" }, { icon: <Wind size={18} color="#E0F0FF" />, val: "Terai Zone", label: "Region" }].map(item => (
                <div key={item.label} style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>{item.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{item.val}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", letterSpacing: 0.5 }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Step tracker */}
          <div style={{ display: "flex", alignItems: "center", marginTop: 28 }}>
            {steps.map((label, i) => {
              const done = i < phaseIdx; const active = i === phaseIdx;
              return (
                <div key={label} style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: done ? "#A8E890" : active ? "#fff" : "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: done ? "#2D6A2D" : active ? "#2D6A2D" : "rgba(255,255,255,0.5)", transition: "all 0.4s" }}>
                      {done ? "✓" : i + 1}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: active ? 600 : 400, color: active ? "#fff" : done ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.45)" }}>{label}</span>
                  </div>
                  {i < steps.length - 1 && <div style={{ width: 40, height: 1, margin: "0 14px", background: done ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.2)" }} />}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
