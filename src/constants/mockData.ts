import { BrandDataMap } from "@/types/brand";

export const mockData: BrandDataMap = {
  brand1: {
    totalCalls: 12458,
    successfulCalls: 11982,
    failedCalls: 476,
    errorRate: 3.82,
    dailyUsage: [
      { date: "2024-03-21", total: 1245, successful: 1198, failed: 47 },
      { date: "2024-03-22", total: 1356, successful: 1302, failed: 54 },
      { date: "2024-03-23", total: 1102, successful: 1067, failed: 35 },
      { date: "2024-03-24", total: 1432, successful: 1375, failed: 57 },
      { date: "2024-03-25", total: 1523, successful: 1462, failed: 61 },
      { date: "2024-03-26", total: 1689, successful: 1621, failed: 68 },
      { date: "2024-03-27", total: 1578, successful: 1512, failed: 66 },
      { date: "2024-03-28", total: 1533, successful: 1445, failed: 88 },
    ],
  },
  brand2: {
    totalCalls: 8765,
    successfulCalls: 7889,
    failedCalls: 876,
    errorRate: 10.01,
    dailyUsage: [
      { date: "2024-03-21", total: 945, successful: 850, failed: 95 },
      { date: "2024-03-22", total: 1056, successful: 950, failed: 106 },
      { date: "2024-03-23", total: 902, successful: 812, failed: 90 },
      { date: "2024-03-24", total: 1132, successful: 1019, failed: 113 },
      { date: "2024-03-25", total: 1223, successful: 1101, failed: 122 },
      { date: "2024-03-26", total: 1189, successful: 1070, failed: 119 },
      { date: "2024-03-27", total: 1178, successful: 1060, failed: 118 },
      { date: "2024-03-28", total: 1140, successful: 1027, failed: 113 },
    ],
  },
};
