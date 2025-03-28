"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-blue-950">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  API Usage Dashboard
                </h1>
                <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-[700px] mx-auto leading-relaxed">
                  Track your API usage, monitor performance, and analyze trends
                  with our comprehensive dashboard.
                </p>
              </div>
              <div className="flex gap-4 flex-wrap justify-center">
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg transform transition-all hover:scale-105">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    variant="outline"
                    className="text-blue-600 dark:text-blue-400 border-blue-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-800 px-8 py-3 rounded-lg transform transition-all hover:scale-105"
                  >
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 bg-white dark:bg-slate-800/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              {[
                {
                  title: "Real-time Monitoring",
                  description:
                    "Track your API usage in real-time with comprehensive metrics and visualizations.",
                },
                {
                  title: "Brand-specific Access",
                  description:
                    "Secure access ensures each brand only sees their own API usage data.",
                },
                {
                  title: "Detailed Analytics",
                  description:
                    "Gain insights with detailed analytics on API performance, errors, and usage patterns.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-xl bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-shadow border border-blue-100 dark:border-slate-700"
                >
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                      {feature.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
