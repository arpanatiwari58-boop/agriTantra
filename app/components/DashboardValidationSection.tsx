"use client";

import { useState, useEffect } from "react";
import { ArrowDown, Activity, CloudRain, AlertTriangle } from "lucide-react";
import { OptResult, ValResult } from "../types/dashboard";
import { CropName } from "../types/api";

import BaselineValidation from "./validation/BaselineValidation";
import VolatilityValidation from "./validation/VolatilityValidation";
import RegimeValidation from "./validation/RegimeValidation";
import BlackSwanValidation from "./validation/BlackSwanValidation";

type ValidationMode = "baseline" | "volatility" | "regime" | "swan";

const CROPS: Array<{ name: CropName; cost: number; color: string; emoji: string }> = [
  { name: "LR Rice (Sub1)", cost: 50000, color: "#E8A045", emoji: "🌾" },
  { name: "HR Rice (Basmati)", cost: 62000, color: "#D4893A", emoji: "🌾" },
  { name: "Maize", cost: 40000, color: "#F2C94C", emoji: "🌽" },
  { name: "Soybean", cost: 36000, color: "#6BAF5C", emoji: "🫘" },
  { name: "Kodo Millet", cost: 22000, color: "#A0C878", emoji: "🌿" },
  { name: "Black Gram (Urad)", cost: 26000, color: "#8B7355", emoji: "🫘" },
  { name: "Moong Dal", cost: 27000, color: "#9DC45A", emoji: "🌱" },
];

export default function DashboardValidationSection({
  result,
  onComplete,
}: {
  result: OptResult | null;
  onComplete?: (res: ValResult) => void;
}) {
  const [activeMode, setActiveMode] = useState<ValidationMode>("baseline");

  if (!result) return null;

  const MODES = [
    { id: "baseline", label: "Baseline Shift", icon: ArrowDown, color: "#D4893A" },
    { id: "volatility", label: "Volatility", icon: Activity, color: "#4A6FA5" },
    { id: "regime", label: "Climate Regimes", icon: CloudRain, color: "#5A8F74" },
    { id: "swan", label: "Black Swan", icon: AlertTriangle, color: "#B33939" },
  ] as const;

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "0 40px 40px" }}>
      <h3 style={{ fontSize: 18, fontWeight: 700, color: "#1C2B1A", marginBottom: 16 }}>Stress Testing & Validation</h3>
      
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16 }}>
        {MODES.map(mode => {
          const Icon = mode.icon;
          const isActive = activeMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id as ValidationMode)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 16px",
                borderRadius: 20,
                border: `1px solid ${isActive ? mode.color : "#E8E2D8"}`,
                background: isActive ? `${mode.color}15` : "#fff",
                color: isActive ? mode.color : "#6B7A69",
                fontWeight: isActive ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all 0.2s"
              }}
            >
              <Icon size={16} />
              {mode.label}
            </button>
          );
        })}
      </div>

      <div style={{ minHeight: 300 }}>
        {activeMode === "baseline" && (
          <BaselineValidation result={result} cropsMeta={CROPS} onComplete={onComplete || (() => {})} />
        )}
        {activeMode === "volatility" && (
          <VolatilityValidation result={result} cropsMeta={CROPS} onComplete={onComplete || (() => {})} />
        )}
        {activeMode === "regime" && (
          <RegimeValidation result={result} cropsMeta={CROPS} onComplete={onComplete || (() => {})} />
        )}
        {activeMode === "swan" && (
          <BlackSwanValidation result={result} cropsMeta={CROPS} onComplete={onComplete || (() => {})} />
        )}
      </div>
    </div>
  );
}
