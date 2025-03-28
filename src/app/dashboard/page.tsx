"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { AlertCircle, Database } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ApiCallsChart,
  ErrorRateChart,
  StatusDistributionChart,
  DailyUsageTable,
  PDFDownloadButton,
  Header,
  Footer,
} from "@/components";

import { toast } from "sonner";
import { BrandData } from "@/types/brand";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const [brandData, setBrandData] = useState<BrandData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChart, setActiveChart] = useState("apiCalls");
  const router = useRouter();

  const { data: session } = useSession();

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        const brandId = session?.user?.id as string;
        if (!brandId) {
          toast.error("Unauthorized access");
          return;
        }
        const response = await axios.get(`/api/usage`, {
          params: {
            brandId,
          },
        });
        if (response.data.success) {
          setBrandData(response.data.data);
          setIsLoading(false);
        } else {
          toast.error(response.data.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching brand data:", error);
        toast.error("Failed to fetch brand data");
        setIsLoading(false);
      }
    };

    fetchBrandData();
  }, [session]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-blue-950">
        <div className="text-center">
          <div className="animate-spin mb-4 mx-auto w-16 h-16 border-t-4 border-b-4 border-blue-500 rounded-full"></div>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400">
            Loading Dashboard
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Fetching your API usage data...
          </p>
        </div>
      </div>
    );
  }

  if (!brandData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-blue-950">
        <div className="text-center max-w-md p-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
          <Database className="mx-auto mb-4 w-16 h-16 text-blue-500 dark:text-blue-400" />
          <h2 className="text-2xl font-bold mb-2 text-blue-600 dark:text-blue-400">
            No Data Available
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            It seems there is no API usage data for your brand at the moment.
            Check back later or contact support if this persists.
          </p>
          <Button
            onClick={() => router.push("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Back to home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-blue-950">
      <Header />
      <main className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              API Usage Overview
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Welcome, {session?.user?.name || "Brand"}
            </p>
          </div>
          {brandData && (
            <PDFDownloadButton brandData={brandData} session={session} />
          )}
        </div>
        {brandData.errorRate > 10 && (
          <Alert
            variant="destructive"
            className="bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-800"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>High Error Rate</AlertTitle>
            <AlertDescription>
              Your API error rate is above 10%. Please check your API endpoints
              for issues.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total API Calls
              </CardTitle>
              <div className="rounded-full bg-white/20 px-2 py-1 text-xs font-semibold">
                Last 7 days
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {brandData.totalCalls.toLocaleString()}
              </div>
              <p className="text-xs text-blue-100">
                +{Math.floor(Math.random() * 10) + 1}% from last week
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Successful Calls
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-white/20 text-white border-none"
              >
                Success
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {brandData.successfulCalls.toLocaleString()}
              </div>
              <p className="text-xs text-green-100">
                {(
                  (brandData.successfulCalls / brandData.totalCalls) *
                  100
                ).toFixed(2)}
                % success rate
              </p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white border-none shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Failed Calls
              </CardTitle>
              <Badge
                variant="outline"
                className="bg-white/20 text-white border-none"
              >
                Error
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {brandData.failedCalls.toLocaleString()}
              </div>
              <p className="text-xs text-red-100">
                {((brandData.failedCalls / brandData.totalCalls) * 100).toFixed(
                  2
                )}
                % error rate
              </p>
            </CardContent>
          </Card>
          <Card
            className={`bg-gradient-to-br ${
              brandData.errorRate > 10
                ? "from-orange-500 to-red-500"
                : "from-purple-500 to-purple-600"
            } text-white border-none shadow-lg hover:shadow-xl transition-shadow`}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Error Rate</CardTitle>
              <Badge
                variant="outline"
                className="bg-white/20 text-white border-none"
              >
                {brandData.errorRate > 10 ? "High" : "Normal"}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{brandData.errorRate}%</div>
              <p className="text-xs text-purple-100">
                {brandData.errorRate > 10
                  ? "Above acceptable threshold"
                  : "Within acceptable threshold"}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">
                  Data Visualization
                </CardTitle>
              </div>

              <div className="hidden md:flex space-x-2">
                {[
                  "apiCalls",
                  "statusDistribution",
                  "errorRate",
                  "dailyUsage",
                ].map((chart) => (
                  <Button
                    key={chart}
                    variant={activeChart === chart ? "default" : "outline"}
                    onClick={() => setActiveChart(chart)}
                    className={`${
                      activeChart === chart
                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                        : "border-blue-200 dark:border-slate-700 text-blue-600 dark:text-blue-400"
                    }`}
                  >
                    {chart === "apiCalls"
                      ? "API Calls"
                      : chart === "statusDistribution"
                      ? "Status Distribution"
                      : chart === "errorRate"
                      ? "Error Rate"
                      : "Daily Usage"}
                  </Button>
                ))}
              </div>

              <div className="md:hidden">
                <select
                  value={activeChart}
                  onChange={(e) => setActiveChart(e.target.value)}
                  className="w-full p-2 border rounded-md text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-800 border-blue-200 dark:border-slate-700"
                >
                  <option value="apiCalls">API Calls</option>
                  <option value="statusDistribution">
                    Status Distribution
                  </option>
                  <option value="errorRate">Error Rate</option>
                  <option value="dailyUsage">Daily Usage</option>
                </select>
              </div>

              <CardDescription className="text-blue-600/70 dark:text-blue-400/70">
                {activeChart === "apiCalls" &&
                  "Daily API usage for the past 7 days"}
                {activeChart === "statusDistribution" &&
                  "Breakdown of API call statuses"}
                {activeChart === "errorRate" && "Daily error rate percentage"}
                {activeChart === "dailyUsage" &&
                  "Detailed breakdown of daily API usage"}
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="pt-6 h-[400px]">
            {activeChart === "apiCalls" && (
              <ApiCallsChart data={brandData.dailyUsage} />
            )}
            {activeChart === "statusDistribution" && (
              <StatusDistributionChart
                successful={brandData.successfulCalls}
                failed={brandData.failedCalls}
              />
            )}
            {activeChart === "errorRate" && (
              <ErrorRateChart data={brandData.dailyUsage} />
            )}
            {activeChart === "dailyUsage" && (
              <DailyUsageTable data={brandData.dailyUsage} />
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
