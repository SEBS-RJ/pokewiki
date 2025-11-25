import React from "react";

const Loading = ({ message = "Cargando...", size = "medium" }) => {
  const sizeClasses = {
    small: "w-8 h-8 border-2",
    medium: "w-16 h-16 border-4",
    large: "w-24 h-24 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
      <div
        className={`${sizeClasses[size]} border-blue-500 border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Cargando"
      />
      {message && (
        <p className="text-gray-600 dark:text-gray-400 text-center">
          {message}
        </p>
      )}
    </div>
  );
};

export default Loading;