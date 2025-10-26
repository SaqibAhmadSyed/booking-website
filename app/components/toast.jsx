"use client";
import React, { useEffect } from "react";

export default function Toast({ visible, message, type = "info", duration = 3500, onClose }) {
  useEffect(() => {
    if (!visible) return;
    const t = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(t);
  }, [visible, duration, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed right-4 bottom-6 z-[9999] max-w-sm w-full" aria-live="polite">
      <div
        className={`flex items-start space-x-3 rounded shadow-lg p-3 border ${
          type === "success"
            ? "bg-green-50 border-green-200 text-green-800"
            : type === "error"
            ? "bg-red-50 border-red-200 text-red-800"
            : "bg-slate-50 border-slate-200 text-slate-800"
        }`}
      >
        <div className="flex-shrink-0">
          {type === "success" ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          ) : type === "error" ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          )}
        </div>

        <div className="flex-1 text-sm">{message}</div>

        <button className="text-slate-500 hover:text-slate-700 ml-2" onClick={onClose} aria-label="Dismiss">
          ✕
        </button>
      </div>
    </div>
  );
}