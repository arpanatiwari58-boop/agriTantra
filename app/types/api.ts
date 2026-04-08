/**
 * CROP OPTIMIZATION API TYPESCRIPT INTERFACES
 * 
 * This file contains the type definitions for communicating with the Python API.
 */

// --- GLOBAL CROP LIST ---
export type CropName = 
  | "LR Rice (Sub1)"
  | "HR Rice (Basmati)"
  | "Maize"
  | "Soybean"
  | "Kodo Millet"
  | "Black Gram (Urad)"
  | "Moong Dal";

/**
 * Endpoint: POST /solve
 * Description: Request a new optimization calculation based on farm parameters.
 */
export interface SolveRequest {
  land?: number;    // Available land in hectares (default: 1.0)
  budget?: number;  // Available budget in Rs (default: 900000.0)
  epsilon?: number; // Robustness/Risk parameter (default: 20000.0)
}

/**
 * Success Response for /solve
 */
export interface SolveResponse {
  status: "optimal" | "optimal_inaccurate" | "infeasible" | "unbounded";
  allocation: Partial<Record<CropName, number>>; // Maps crop names to allocated hectares
  metrics: {
    min_profit: number;      // Worst-case profit among scenarios
    mean_profit: number;     // Average profit among scenarios
    max_profit: number;      // Best-case profit among scenarios
    objective_value: number; // Optimization objective result
  };
}

/**
 * Endpoint: GET /test-validation
 * Description: Retrieve 200 simulation scenarios for stress-testing.
 */
export interface ScenarioData {
  rainfall_mm: number;
  yields: Record<CropName, number>;
  prices: Record<CropName, number>;
}

export interface ValidationResponse {
  total_scenarios: number;
  scenarios: ScenarioData[];
}

/**
 * Error Response Format
 */
export interface ApiErrorResponse {
  error?: string;   // Python exception message
  status?: string;  // Solver status if infeasible
  message?: string; // Human-readable failure message
}
