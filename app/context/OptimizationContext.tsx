"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { OptResult } from "../types/dashboard";

interface OptimizationContextType {
  result: OptResult | null;
  setResult: (result: OptResult | null) => void;
}

const OptimizationContext = createContext<OptimizationContextType | undefined>(undefined);

const STORAGE_KEY = "optimization_result";

export function OptimizationProvider({ children }: { children: ReactNode }) {
  const [result, setResultState] = useState<OptResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setResultState(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load optimization result from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage when result changes
  const setResult = (newResult: OptResult | null) => {
    setResultState(newResult);
    if (newResult) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newResult));
      } catch (error) {
        console.error("Failed to save optimization result to localStorage:", error);
      }
    } else {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (error) {
        console.error("Failed to clear optimization result from localStorage:", error);
      }
    }
  };

  return (
    <OptimizationContext.Provider value={{ result, setResult }}>
      {children}
    </OptimizationContext.Provider>
  );
}

export function useOptimization() {
  const context = useContext(OptimizationContext);
  if (context === undefined) {
    throw new Error("useOptimization must be used within OptimizationProvider");
  }
  return context;
}
