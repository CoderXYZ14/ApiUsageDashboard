import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-indigo-50 to-white">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-8 text-center">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-blue-500 to-indigo-400 bg-clip-text text-transparent animate-gradient">
                  API Usage Dashboard
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-[700px] mx-auto leading-relaxed">
                  Track your API usage, monitor performance, and analyze trends
                  with our comprehensive dashboard.
                </p>
              </div>
              <div className="flex gap-4 flex-wrap justify-center">
                <Link href="/login">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white px-8 py-3 rounded-lg transform transition-all hover:scale-105">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button className="bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg transform transition-all hover:scale-105">
                    View Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-16 bg-gradient-to-b from-white to-indigo-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Real-time Monitoring
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Track your API usage in real-time with comprehensive metrics
                    and visualizations.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Brand-specific Access
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Secure access ensures each brand only sees their own API
                    usage data.
                  </p>
                </div>
              </div>
              <div className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="space-y-4">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                    Detailed Analytics
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Gain insights with detailed analytics on API performance,
                    errors, and usage patterns.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-8 w-full bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2025 API Dashboard Inc. All rights reserved.
            </p>
            <nav className="flex gap-6">
              <Link
                className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                href="#"
              >
                Terms of Service
              </Link>
              <Link
                className="text-sm text-gray-600 hover:text-purple-600 transition-colors"
                href="#"
              >
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
