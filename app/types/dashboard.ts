import { CropName } from "./api";

export interface CropAllocation {
  name: CropName;
  area: number;
  color: string;
  emoji: string;
}

export interface OptResult {
  crops: CropAllocation[];
  minProfit: number;
  meanProfit: number;
  maxProfit: number;
  totalLand: number;
  status: string;
  allocationMap: Partial<Record<CropName, number>>;
  allocationArray: number[];
}

export interface ValResult {
  profits: number[];
  mean: number;
  min: number;
  max: number;
  std: number;
  successRate: number;
}
