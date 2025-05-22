"use client";

import React, { useState } from "react";

export default function DownloadableCV() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = () => {
    setIsDownloading(true);

    // In a real implementation, this could be a direct link to your hosted PDF
    // For now, it's a placeholder to demonstrate the UI component

    setTimeout(() => {
      // Simulate download completion
      setIsDownloading(false);

      // You can replace this with a real CV download when you have the file
      // window.open('/path-to-your-cv.pdf', '_blank');

      // For now, just alert the user
      alert(
        "This is a placeholder. Replace with your actual CV file when ready.",
      );
    }, 1500);
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isDownloading}
      className="btn bg-white hover:bg-gray-100 text-primary-600 font-semibold py-2 px-6 border border-primary-300 rounded-lg shadow-sm flex items-center gap-2 transition-all"
    >
      {isDownloading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-2 h-5 w-5 text-primary-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Preparing CV...
        </>
      ) : (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download CV
        </>
      )}
    </button>
  );
}
