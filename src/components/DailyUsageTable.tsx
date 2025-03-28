"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DailyUsage {
  date: string;
  total: number;
  successful: number;
  failed: number;
}

interface DailyUsageTableProps {
  data: DailyUsage[];
}

export default function DailyUsageTable({ data }: DailyUsageTableProps) {
  return (
    <div className="rounded-md border border-blue-200 dark:border-slate-700 overflow-hidden h-full overflow-y-auto">
      <Table>
        <TableHeader className="bg-blue-50 dark:bg-slate-700/50">
          <TableRow className="hover:bg-blue-100/50 dark:hover:bg-slate-700">
            <TableHead className="font-bold text-blue-700 dark:text-blue-300">
              Date
            </TableHead>
            <TableHead className="text-right font-bold text-blue-700 dark:text-blue-300">
              Total Calls
            </TableHead>
            <TableHead className="text-right font-bold text-green-600 dark:text-green-400">
              Successful
            </TableHead>
            <TableHead className="text-right font-bold text-red-600 dark:text-red-400">
              Failed
            </TableHead>
            <TableHead className="text-right font-bold text-purple-600 dark:text-purple-400">
              Error Rate
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((day) => {
            const errorRate = ((day.failed / day.total) * 100).toFixed(2);
            const formattedDate = new Date(day.date).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            );

            return (
              <TableRow
                key={day.date}
                className="hover:bg-blue-50 dark:hover:bg-slate-800/50"
              >
                <TableCell className="font-medium">{formattedDate}</TableCell>
                <TableCell className="text-right font-semibold text-blue-600 dark:text-blue-400">
                  {day.total.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-semibold text-green-600 dark:text-green-400">
                  {day.successful.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-semibold text-red-600 dark:text-red-400">
                  {day.failed.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  <span
                    className={
                      Number.parseFloat(errorRate) > 10
                        ? "font-semibold text-red-600 dark:text-red-400"
                        : "font-semibold text-purple-600 dark:text-purple-400"
                    }
                  >
                    {errorRate}%
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
