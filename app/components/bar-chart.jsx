"use client";
import React, { useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

/**
 * Bar chart component - Interactive chart with tabbed views
 * Features:
 * - Weekly reservations area chart
 * - Peak booking hours bar chart
 * - Tabbed interface for switching between views
 * - Responsive design with ApexCharts
 * - Gradient fills and smooth animations
 */
export default function ReportsChartTabs() {
  const [activeTab, setActiveTab] = useState("weekly"); // 'weekly' or 'peak'

  // WEEKLY BOOKINGS (same data, now an AREA chart)
  const weeklySeries = [
    {
      name: "This Week",
      data: [231, 122, 63, 421, 122, 323, 111],
    },
    {
      name: "Last Week",
      data: [232, 113, 341, 224, 522, 411, 243],
    },
  ];

  const weeklyOptions = {
    chart: { type: "area", height: 430, toolbar: { show: false } },
    stroke: { curve: "smooth", width: 2 },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    yaxis: { labels: { style: { fontSize: "12px" } } },
    colors: ["#2563EB", "#EB9825"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 100],
      },
    },
    grid: { borderColor: "#e0e0e0" },
    legend: { show: true },
    title: {
      text: "Weekly Reservations",
      align: "center",
      style: { fontSize: "16px", fontWeight: "bold", color: "#111827" },
    },
  };

  // PEAK BOOKING HOURS (same data, now a BAR chart)
  const peakSeries = [
    {
      name: "Bookings",
      data: [5, 8, 12, 18, 25, 32, 40, 36, 28, 20, 12, 8, 4],
    },
  ];

  const peakOptions = {
    chart: { type: "bar", height: 430, toolbar: { show: false } },
    plotOptions: {
      bar: { horizontal: false, columnWidth: "55%", borderRadius: 5 },
    },
    dataLabels: { enabled: false },
    title: {
      text: "Peak Booking Hours",
      align: "center",
      style: { fontSize: "16px", fontWeight: "bold", color: "#111827" },
    },
    subtitle: {
      text: "Hourly booking activity throughout the day",
      align: "center",
      style: { fontSize: "12px", color: "#6B7280" },
    },
    xaxis: {
      categories: [
        "6 AM",
        "7 AM",
        "8 AM",
        "9 AM",
        "10 AM",
        "11 AM",
        "12 PM",
        "1 PM",
        "2 PM",
        "3 PM",
        "4 PM",
        "5 PM",
        "6 PM",
      ],
      labels: { style: { fontSize: "12px", colors: "#6B7280" } },
    },
    yaxis: {
      title: { text: "Number of Bookings" },
      labels: { style: { fontSize: "12px", colors: "#6B7280" } },
    },
    colors: ["#672CD4"],
    grid: { borderColor: "#E5E7EB" },
    legend: { show: false },
  };

  return (
    <div className="w-200 bg-white rounded-lg shadow p-4">
      {/* Tabs */}
      <div className="flex border-b border-gray-200 mb-4">
        <button
          onClick={() => setActiveTab("weekly")}
          className={`px-4 py-2 -mb-px font-semibold ${
            activeTab === "weekly"
              ? "border-b-2 border-red-800 text-red-800"
              : "text-gray-500"
          }`}
        >
          Weekly Reservations
        </button>
        <button
          onClick={() => setActiveTab("peak")}
          className={`px-4 py-2 -mb-px font-semibold ${
            activeTab === "peak"
              ? "border-b-2 border-red-800 text-red-800"
              : "text-gray-500"
          }`}
        >
          Peak Booking Hours
        </button>
      </div>

      {/* Chart */}
      {activeTab === "weekly" && (
        <Chart options={weeklyOptions} series={weeklySeries} type="area" height={430} />
      )}
      {activeTab === "peak" && (
        <Chart options={peakOptions} series={peakSeries} type="bar" height={430} />
      )}
    </div>
  );
}
