"use client";
import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

/**
 * Pie chart component - Booking status distribution visualization
 * Features:
 * - ApexCharts pie chart with booking status breakdown
 * - Color-coded segments (approved, pending, rejected)
 * - Data labels with percentages
 * - Responsive design with mobile breakpoints
 * - Custom styling and legend positioning
 */
export default function PieChart() {
  const [state, setState] = React.useState({
    series: [45, 30, 25], // Approved, Pending, Rejected
    options: {
      chart: {
        width: 250,
        type: "pie",
      },
      labels: ["Approved", "Pending", "Rejected"],
      colors: ["#22C55E", "#EAB308", "#EF4444"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: { width: 200 },
            legend: { position: "bottom" },
          },
        },
      ],
      legend: { 
        position: "bottom",
        fontSize: "12px"
      },
      dataLabels: { 
        enabled: true,
        style: {
          fontSize: "11px",
          fontFamily: "Inter, Helvetica, Arial, sans-serif",
          fontWeight: "600",
          colors: ["#fff"]
        },
        dropShadow: {
          enabled: false
        },
        formatter: function (val) {
          return val.toFixed(1) + "%";
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            offset: -10, // Moves labels closer to center (negative) or further out (positive)
            minAngleToShowLabel: 10
          }
        }
      },
      title: {
        text: "Booking Status",
        align: "center",
        style: { 
          fontSize: "14px", 
          fontWeight: "bold", 
          color: "#111827" 
        },
      },
    },
  });

  return (
    <div className="h-63 w-80 flex justify-center bg-white rounded-lg shadow p-4">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="pie"
        width={250}
      />
    </div>
  );
}