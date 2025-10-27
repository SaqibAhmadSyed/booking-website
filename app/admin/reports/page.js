"use client";
import React from "react";
import BarChart from "@/app/components/bar-chart";

export default function Reports() {
  return (
    <main className="p-6 space-y-6">
      {/* header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">
          View various reports and statistics related to reservations
        </p>
      </div>

      {/* First row: 3 spark charts */}
      <div className="container mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 pb-10">
        <div className=""><BarChart id="spark1" /></div>
        <div className=""><BarChart id="spark2" /></div>
        <div className=""><BarChart id="spark3" /></div>
      </div>

      {/* Second row: 2 charts (bar and donut) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mx-auto"><BarChart /></div>
        <div className=""><BarChart /></div>
      </div>
      </div>
    </main>
  );
}
