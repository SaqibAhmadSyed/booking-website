import React from "react";

/**
 * Confirmation modal component - Generic modal for confirmations and alerts
 * Features:
 * - Customizable icon (React element or predefined types)
 * - Configurable message and styling
 * - Confirm and cancel actions
 * - Backdrop click to close
 * - Support for different icon types (info, success, danger)
 */
export default function Modal({
  booking,
  message = "Are you sure?",
  // icon can be: a React node (custom SVG/component) OR a string: 'info' | 'success' | 'danger'
  icon = "info",
  // Tailwind classes controlling icon color and size
  iconColor = "text-gray-800",
  iconSize = "w-12 h-12",
  onConfirm = () => {},
  onClose = () => {},
}) {
  const renderIcon = () => {
    // if user passed a React element, render it inside wrapper
    if (React.isValidElement(icon)) {
      return (
        <div
          className={`mx-auto mb-4 ${iconSize} ${iconColor} flex items-center justify-center`}
        >
          {icon}
        </div>
      );
    }

    // otherwise treat icon as a keyword and render built-in SVGs
    switch (icon) {
      case "success":
        return (
          <svg
            className={`mx-auto mb-4 ${iconSize} ${iconColor}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m1 7a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "danger":
      case "error":
        return (
          <svg
            className={`mx-auto mb-4 ${iconSize} ${iconColor}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        );
      case "info":
      default:
        return (
          <svg
            className={`mx-auto mb-4 ${iconSize} ${iconColor}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 11V6m0 8h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/50"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md mx-5 bg-white rounded-lg shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 text-center">
          {renderIcon()}

          <h3 className="mb-5 text-lg font-normal text-gray-800">
            {message}
          </h3>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={() => onConfirm(booking)}
              className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-800 focus:outline-none font-medium transition"
            >
              Yes, I'm sure
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-white bg-gray-600 border rounded-lg hover:bg-gray-500 focus:outline-none font-medium transition"
            >
              No, cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
