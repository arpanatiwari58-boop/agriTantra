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

export interface ValidationRequest {
  rain_shift?: number;
  yield_shift?: number;
  price_shift?: number;
  volatility?: number;
  p_drought?: number;
  p_normal?: number;
  p_flood?: number;
  swan_yield_drop?: number;
  swan_price_drop?: number;
}

export interface ValidationResponse {
  baseline_shift: ScenarioData[];
  volatility: ScenarioData[];
  regime_shift: ScenarioData[];
  black_swan: ScenarioData[];
}

/**
 * Error Response Format
 */
export interface ApiErrorResponse {
  error?: string;   // Python exception message
  status?: string;  // Solver status if infeasible
  message?: string; // Human-readable failure message
}



/**
 * ---------------------------------------------------------
 * BACKTEST VALIDATION API
 * ---------------------------------------------------------
 * Endpoint: POST /evaluate-backtest
 * Description: Runs a 3-Layer Validation (Out-of-sample, Historical, and Regime-Stratified)
 * on a given crop allocation to prove its robustness and historical performance.
 */

/**
 * The Request Body
 * Pass the exact allocation dictionary you received from the /solve endpoint.
 */
export interface BacktestRequest {
  allocation: Partial<Record<CropName, number>>; // e.g., {"Maize": 1.5, "Soybean": 2.0}
}

/**
 * The Response Body
 * Contains the 3 layers of validation data for dashboard charts and metrics.
 */
export interface BacktestResponse {
  
  // LAYER 1: Monte Carlo Simulation (Generalization test)
  layer1_outofsample: {
    train_mean: number;         // Average profit on the 100 scenarios the model trained on
    train_min: number;
    train_max: number;
    train_std: number;
    val_mean: number;           // Average profit on 500 brand new, unseen scenarios
    val_min: number;
    val_max: number;
    val_std: number;
    generalization_gap: number; // Difference between train_mean and val_mean (lower is better)
  };

  // LAYER 2: Historical Backtest (Real-world what-if)
  layer2_historical: {
    years: {
      year: number;             // e.g., 2014
      regime: string;           // "Drought", "Normal", or "Flood"
      profit: number;           // Exact profit the farmer would have made that year with this allocation
    }[];
    summary: {                  // Aggregate stats across the 10 historical years (2014-2023)
      mean: number;
      min: number;
      max: number;
      std: number;
    };
  };

  // LAYER 3: Out-of-Sample Regime Breakdown
  // Shows how the allocation behaves strictly during specific weather patterns
  layer3_regimes: Record<string, { // Keys will be "Drought", "Normal", "Flood"
    count: number;              // Number of generated scenarios that fell into this regime
    mean: number;               // Average profit during this weather pattern
    min: number;                // Worst-case profit during this weather pattern
    max: number;                // Best-case profit during this weather pattern
  }>;
}