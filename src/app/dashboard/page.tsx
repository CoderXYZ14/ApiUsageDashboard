"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  AlertCircle,
  Calendar,
  ChevronDown,
  Download,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useTheme } from "next-themes";

import ApiCallsChart from "@/components/api-calls-chart";
import ErrorRateChart from "@/components/error-rate-chart";
import StatusDistributionChart from "@/components/status-distribution-chart";
import { DailyUsageTable } from "@/components/daily-usage-table";
import { toast } from "sonner";
import { BrandData } from "@/types/brand";

export default function DashboardPage() {
  const [brandData, setBrandData] = useState<BrandData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeChart, setActiveChart] = useState("apiCalls");
  const router = useRouter();

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchBrandData = async () => {
      try {
        // Assuming the brandId is the same as the user's id
        const brandId = "brand1"; // This could come from props, context, or router
        const response = await axios.get(`/api/usage/${brandId}`);
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
  }, []);

  const handleLogout = () => {
    toast.success("You have been logged out successfully");
    router.push("/");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!brandData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>No brand data available</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-900 dark:to-blue-950">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md dark:bg-slate-900/80 dark:border-slate-800 px-4 md:px-6">
        <div className="flex items-center gap-2 font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
          <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          <span className="text-xl">API Dashboard</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-800"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
            <span className="sr-only">Toggle theme</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-slate-800"
              >
                <Settings className="h-5 w-5" />
                <span className="sr-only">Settings</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-white dark:bg-slate-800 border-blue-200 dark:border-slate-700"
            >
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            API Usage Overview
          </h1>
          <Button
            onClick={() => toast.success("Data exported successfully")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none"
          >
            <Download className="mr-2 h-4 w-4" />
            Export Data
          </Button>
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
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-bold text-blue-600 dark:text-blue-400">
                Data Visualization
              </CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant={activeChart === "apiCalls" ? "default" : "outline"}
                  onClick={() => setActiveChart("apiCalls")}
                  className={
                    activeChart === "apiCalls"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-blue-200 dark:border-slate-700 text-blue-600 dark:text-blue-400"
                  }
                >
                  API Calls
                </Button>
                <Button
                  variant={
                    activeChart === "statusDistribution" ? "default" : "outline"
                  }
                  onClick={() => setActiveChart("statusDistribution")}
                  className={
                    activeChart === "statusDistribution"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-blue-200 dark:border-slate-700 text-blue-600 dark:text-blue-400"
                  }
                >
                  Status Distribution
                </Button>
                <Button
                  variant={activeChart === "errorRate" ? "default" : "outline"}
                  onClick={() => setActiveChart("errorRate")}
                  className={
                    activeChart === "errorRate"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-blue-200 dark:border-slate-700 text-blue-600 dark:text-blue-400"
                  }
                >
                  Error Rate
                </Button>
                <Button
                  variant={activeChart === "dailyUsage" ? "default" : "outline"}
                  onClick={() => setActiveChart("dailyUsage")}
                  className={
                    activeChart === "dailyUsage"
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "border-blue-200 dark:border-slate-700 text-blue-600 dark:text-blue-400"
                  }
                >
                  Daily Usage
                </Button>
              </div>
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
      <footer className="border-t border-blue-200 dark:border-slate-800 py-4 px-6 bg-white/80 backdrop-blur-md dark:bg-slate-900/80">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-blue-600/70 dark:text-blue-400/70">
            © 2024 API Dashboard Inc. All rights reserved.
          </p>
          <p className="text-xs text-blue-600/70 dark:text-blue-400/70">
            Version 1.0.0
          </p>
        </div>
      </footer>
    </div>
  );
}
