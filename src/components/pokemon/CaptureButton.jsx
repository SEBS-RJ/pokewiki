import React, { useState } from "react";
import { FiCheck, FiLoader } from "react-icons/fi";

const CaptureButton = ({ pokemon, isCaptured, onCapture, size = "medium" }) => {
  const [isCapturing, setIsCapturing] = useState(false);

  const sizeClasses = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  };

  const handleCapture = async () => {
    if (isCaptured || isCapturing) return;

    setIsCapturing(true);
    await onCapture(pokemon);
    setIsCapturing(false);
  };

  return (
    <button
      onClick={handleCapture}
      disabled={isCaptured || isCapturing}
      className={`${
        sizeClasses[size]
      } rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 ${
        isCaptured
          ? "bg-green-500 text-white cursor-not-allowed"
          : isCapturing
          ? "bg-blue-400 text-white cursor-wait"
          : "bg-blue-500 hover:bg-blue-600 text-white active:scale-95"
      }`}
    >
      {isCapturing ? (
        <>
          <FiLoader className="animate-spin" />
          <span>Capturando...</span>
        </>
      ) : isCaptured ? (
        <>
          <FiCheck />
          <span>Capturado</span>
        </>
      ) : (
        <span>Capturar</span>
      )}
    </button>
  );
};

export default CaptureButton;
