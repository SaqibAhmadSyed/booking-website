import React from "react";

export default function LoadingSpinner({
  size = "md",
  color = "red",
  fullScreen = false,
  message = "",
  inline = false,
}) {
  const Spinner = () => {
    const sizeClasses = {
      sm: "w-4 h-4 border-2",
      md: "w-5 h-5 border-2.5",
      lg: "w-6 h-6 border-3",
      xl: "w-8 h-8 border-4",
    };

    const colorClasses = {
      red: "border-red-800 border-t-transparent",
      blue: "border-blue-600 border-t-transparent",
      green: "border-green-600 border-t-transparent",
      gray: "border-gray-600 border-t-transparent",
      white: "border-white border-t-transparent",
    };

    return (
      <div
        className={`animate-spin rounded-full border-solid ${sizeClasses[size]} ${colorClasses[color]}`}
      />
    );
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center">
          <Spinner />
          {message && (
            <p className="mt-4 text-gray-700 font-medium text-center">
              {message}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (inline) {
    return (
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Spinner />
      {message && (
        <p className="mt-4 text-gray-600 font-medium text-center">{message}</p>
      )}
    </div>
  );
}
