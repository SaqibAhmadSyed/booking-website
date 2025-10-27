"use client";
import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BarChart() {
  // Series data
  const series = [
    {
      name: "This Week",
      data: [
        { x: "Mon", y: 231 },
        { x: "Tue", y: 122 },
        { x: "Wed", y: 63 },
        { x: "Thu", y: 421 },
        { x: "Fri", y: 122 },
        { x: "Sat", y: 323 },
        { x: "Sun", y: 111 },
      ],
    },
    {
      name: "Last Week",
      data: [
        { x: "Mon", y: 232 },
        { x: "Tue", y: 113 },
        { x: "Wed", y: 341 },
        { x: "Thu", y: 224 },
        { x: "Fri", y: 522 },
        { x: "Sat", y: 411 },
        { x: "Sun", y: 243 },
      ],
    },
  ];

  // Chart options
  const options = {
    colors: ["#1A56DB", "#FDBA8C"],
    chart: {
      type: "bar",
      height: 200,
      fontFamily: "Inter, sans-serif",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        borderRadiusApplication: "end",
        borderRadius: 6,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      style: { fontFamily: "Inter, sans-serif" },
    },
    stroke: { show: true, width: 0, colors: ["transparent"] },
    grid: { show: false, padding: { left: 0, right: 0, top: -8, bottom: -8 } },
    dataLabels: { enabled: false },
    legend: { show: true },
    xaxis: {
      labels: { style: { fontSize: "10px", fontFamily: "Inter, sans-serif" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: false },
    fill: { opacity: 1 },
  };

  return (
      <div className="max-w-sm w-full bg-white rounded-lg shadow p-3">
        <div className="flex justify-between items-center pb-2 mb-2 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
              <svg
                className="w-4 h-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 19"
              >
                <path d="M14.5 0A3.987 3.987 0 0 0 11 2.1a4.977 4.977 0 0 1 3.9 5.858A3.989 3.989 0 0 0 14.5 0ZM9 13h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z" />
                <path d="M5 19h10v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2ZM5 7a5.008 5.008 0 0 1 4-4.9 3.988 3.988 0 1 0-3.9 5.859A4.974 4.974 0 0 1 5 7Zm5 3a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm5-1h-.424a5.016 5.016 0 0 1-1.942 2.232A6.007 6.007 0 0 1 17 17h2a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5ZM5.424 9H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h2a6.007 6.007 0 0 1 4.366-5.768A5.016 5.016 0 0 1 5.424 9Z" />
              </svg>
            </div>
            <div>
              <h5 className="leading-none text-sm font-bold text-gray-900">
                +13 reservations
              </h5>
              <p className="text-xs font-normal text-gray-500">
                This week
              </p>
            </div>
          </div>
          <span className="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-1.5 py-0.5 rounded">
            <svg
              className="w-2 h-2 me-1"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13V1m0 0L1 5m4-4 4 4"
              />
            </svg>
            42.5%
          </span>
        </div>

      <Chart series={series} options={options} type="bar" height={200} />
    </div>
  );
}
