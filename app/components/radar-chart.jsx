"use client";
import React from "react";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function BuildingBookingsRadar() {
  const [state, setState] = React.useState({
    series: [
      {
        name: "Rooms Booked",
        data: [35, 25, 20, 10, 10], // H, LB, JMSB, GN, FB
      },
    ],
    options: {
      chart: {
        width: 300,
        height: 220,
        type: "radar",
        toolbar: { show: false },
      },
      labels: [
        "H",
        "LB",
        "JMSB",
        "GN",
        "FB",
      ],
      colors: ["#2563EB"],
      stroke: { 
        width: 3,
        colors: ["#2563EB"]
      },
      fill: { 
        opacity: 0.4,
        colors: ["#2563EB"]
      },
      markers: {
        size: 5,
        colors: ["#2563EB"],
        strokeColor: "#fff",
        strokeWidth: 2,
      },
      yaxis: {
        show: true,
        tickAmount: 4,
        labels: {
          style: {
            colors: "#9CA3AF",
            fontSize: "10px"
          },
          formatter: function(val) {
            return val.toFixed(0);
          }
        }
      },
      xaxis: {
        labels: {
          show: true,
          style: { 
            fontSize: "10px", 
            colors: ["#374151", "#374151", "#374151", "#374151", "#374151"],
            fontWeight: "500"
          },
        },
      },
      plotOptions: {
        radar: {
          size: 90,
          polygons: {
            strokeColors: "#E5E7EB",
            strokeWidth: 1,
            connectorColors: "#E5E7EB",
            fill: {
              colors: ["#F9FAFB", "#F3F4F6"]
            }
          }
        }
      },
      title: {
        text: "Rooms Booked per Building",
        align: "center",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          color: "#111827",
        },
      },
      legend: { show: false },
    },
  });
  
  return (
    <div className="h-63 w-80 flex justify-center bg-white rounded-lg shadow p-4">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="radar"
        width={300}
        height={220}
      />
    </div>
  );
}