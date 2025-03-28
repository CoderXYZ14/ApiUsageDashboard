export interface DailyUsage {
  date: string;
  total: number;
  successful: number;
  failed: number;
}

export interface BrandData {
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  errorRate: number;
  dailyUsage: DailyUsage[];
}

export interface BrandDataMap {
  [key: string]: BrandData;
}
