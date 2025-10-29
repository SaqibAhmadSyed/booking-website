import React, { useState } from "react";

/**
 * Calendar component - Interactive date picker for booking system
 * Features:
 * - Month navigation with previous/next buttons
 * - Today highlighting and selected date indication
 * - Clickable date selection
 * - Selected date display with formatted output
 * - Responsive grid layout for calendar days
 * - Disabled state for empty cells
 */
export default function Calendar({ selectedDate, setSelectedDate }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const generateCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startingDayOfWeek = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days = Array(startingDayOfWeek).fill(null);
    for (let i = 1; i <= totalDays; i++) days.push(new Date(year, month, i));
    return days;
  };

  const days = generateCalendar();
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const handlePrevMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
    );
  const handleNextMonth = () =>
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
    );

  const isToday = (date) =>
    date ? date.toDateString() === new Date().toDateString() : false;
  const isSameDay = (d1, d2) =>
    d1 && d2 && d1.toDateString() === d2.toDateString();

  return (
    <div className="bg-white rounded-lg shadow p-6 text-sm w-[400px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={handlePrevMonth}
          className="p-1.5 hover:bg-gray-100 rounded"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <span className="font-semibold text-lg">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button
          onClick={handleNextMonth}
          className="p-1.5 hover:bg-gray-100 rounded"
        >
          <svg
            className="w-4 h-4 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Weekdays */}
      <div className="grid grid-cols-7 gap-1 mb-2 text-center text-gray-500 font-medium text-xs">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((day, idx) => (
          <button
            key={idx}
            onClick={() => day && setSelectedDate(day)}
            disabled={!day}
            className={`
              aspect-square flex items-center justify-center rounded-lg text-sm transition
              ${!day ? "invisible" : ""}
              ${isSameDay(day, selectedDate) ? "bg-red-700 text-white" : ""}
              ${
                isToday(day) && !isSameDay(day, selectedDate)
                  ? "bg-red-100 text-red-900 font-semibold"
                  : ""
              }
              ${
                !isSameDay(day, selectedDate) && !isToday(day) && day
                  ? "hover:bg-gray-100 text-gray-700"
                  : ""
              }
            `}
          >
            {day ? day.getDate() : ""}
          </button>
        ))}
      </div>

      {selectedDate && (
        <div className="mt-7 p-3 bg-red-50 rounded-lg border border-red-200">
          <p className="text-xs text-gray-600">Selected Date:</p>
          <p className="text-base font-semibold text-red-900">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      )}
    </div>
  );
}
