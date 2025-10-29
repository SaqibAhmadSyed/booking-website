"use client";
import React from "react";
import BarChart from "@/app/components/bar-chart";
import PieChart from "@/app/components/pie-chart";
import RadarChart from "@/app/components/radar-chart";

/**
 * Admin reports page - Analytics and statistics dashboard
 * Features:
 * - Multiple chart types (bar, pie, radar) for data visualization
 * - Booking statistics and trends
 * - Building-wise booking distribution
 * - Booking status breakdown
 * - Responsive grid layout for charts
 */
export default function Reports() {
  return (
    <main className="p-6">
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">
          View various reports and statistics related to reservations
        </p>
      </div>

      {/* content centered */}
      <div className="mt-6 flex justify-center">
        <div className="grid grid-cols-2 items-center">
          <BarChart />
          <div className="flex flex-col gap-6 items-center">
            <PieChart />
            <RadarChart />
          </div>
        </div>
      </div>
    </main>
  );
}
