"use client";

import { useState, useEffect } from "react";

interface PerformanceMetrics {
  fcp: number | null;
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  ttfb: number | null;
}

export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fcp: null, // First Contentful Paint
    lcp: null, // Largest Contentful Paint
    fid: null, // First Input Delay
    cls: null, // Cumulative Layout Shift
    ttfb: null, // Time to First Byte
  });
  const [showMetrics, setShowMetrics] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("performance" in window)) return;

    // Only collect metrics in development mode or if specifically enabled
    const isDev = process.env.NODE_ENV === "development";
    if (!isDev && !localStorage.getItem("enablePerformanceMetrics")) return;

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType(
      "navigation",
    )[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      setMetrics((prev) => ({
        ...prev,
        ttfb: Math.round(
          navigationEntry.responseStart - navigationEntry.requestStart,
        ),
      }));
    }

    // First Contentful Paint
    const fcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const fcp = entries[0];
        setMetrics((prev) => ({
          ...prev,
          fcp: Math.round(fcp.startTime),
        }));
      }
    });

    try {
      fcpObserver.observe({ type: "paint", buffered: true });
    } catch (e) {
      console.error("FCP observation not supported", e);
    }

    // Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      if (lastEntry) {
        setMetrics((prev) => ({
          ...prev,
          lcp: Math.round(lastEntry.startTime),
        }));
      }
    });

    try {
      lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
    } catch (e) {
      console.error("LCP observation not supported", e);
    }

    // First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        const firstInput = entries[0];
        setMetrics((prev) => ({
          ...prev,
          fid: Math.round(
            (firstInput as any).processingStart - firstInput.startTime,
          ),
        }));
      }
    });

    try {
      fidObserver.observe({ type: "first-input", buffered: true });
    } catch (e) {
      console.error("FID observation not supported", e);
    }

    // Cumulative Layout Shift
    const clsObserver = new PerformanceObserver((entryList) => {
      let clsValue = 0;
      for (const entry of entryList.getEntries()) {
        clsValue += (entry as any).value;
      }
      setMetrics((prev) => ({
        ...prev,
        cls: Math.round(clsValue * 1000) / 1000,
      }));
    });

    try {
      clsObserver.observe({ type: "layout-shift", buffered: true });
    } catch (e) {
      console.error("CLS observation not supported", e);
    }

    return () => {
      try {
        fcpObserver.disconnect();
        lcpObserver.disconnect();
        fidObserver.disconnect();
        clsObserver.disconnect();
      } catch (e) {
        // Ignore disconnection errors
      }
    };
  }, []);

  if (!showMetrics) {
    return (
      <div className="fixed bottom-2 right-2 z-50">
        <button
          onClick={() => setShowMetrics(true)}
          className="p-2 bg-secondary-200 dark:bg-secondary-800 rounded-full shadow-md text-secondary-700 dark:text-secondary-300 opacity-75 hover:opacity-100 transition-opacity"
          aria-label="Show performance metrics"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    );
  }

  const getMetricStatus = (
    metric: string,
    value: number | null,
  ): "good" | "needs-improvement" | "poor" | "unknown" => {
    if (value === null) return "unknown";

    switch (metric) {
      case "fcp":
        return value < 1800
          ? "good"
          : value < 3000
            ? "needs-improvement"
            : "poor";
      case "lcp":
        return value < 2500
          ? "good"
          : value < 4000
            ? "needs-improvement"
            : "poor";
      case "fid":
        return value < 100
          ? "good"
          : value < 300
            ? "needs-improvement"
            : "poor";
      case "cls":
        return value < 0.1
          ? "good"
          : value < 0.25
            ? "needs-improvement"
            : "poor";
      case "ttfb":
        return value < 200
          ? "good"
          : value < 500
            ? "needs-improvement"
            : "poor";
      default:
        return "unknown";
    }
  };

  const getStatusColor = (
    status: "good" | "needs-improvement" | "poor" | "unknown",
  ) => {
    switch (status) {
      case "good":
        return "bg-green-500";
      case "needs-improvement":
        return "bg-yellow-500";
      case "poor":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="fixed bottom-2 right-2 z-50 bg-white dark:bg-secondary-800 p-4 rounded-lg shadow-xl border border-secondary-200 dark:border-secondary-700 max-w-xs">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-secondary-900 dark:text-white">
          Performance Metrics
        </h3>
        <button
          onClick={() => setShowMetrics(false)}
          className="text-secondary-500 hover:text-secondary-700 dark:text-secondary-400 dark:hover:text-secondary-200"
          aria-label="Close performance metrics"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-secondary-600 dark:text-secondary-400">
            FCP:
          </span>
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(getMetricStatus("fcp", metrics.fcp))}`}
            ></div>
            <span>
              {metrics.fcp !== null ? `${metrics.fcp}ms` : "Measuring..."}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-secondary-600 dark:text-secondary-400">
            LCP:
          </span>
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(getMetricStatus("lcp", metrics.lcp))}`}
            ></div>
            <span>
              {metrics.lcp !== null ? `${metrics.lcp}ms` : "Measuring..."}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-secondary-600 dark:text-secondary-400">
            FID:
          </span>
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(getMetricStatus("fid", metrics.fid))}`}
            ></div>
            <span>
              {metrics.fid !== null
                ? `${metrics.fid}ms`
                : "Waiting for input..."}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-secondary-600 dark:text-secondary-400">
            CLS:
          </span>
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(getMetricStatus("cls", metrics.cls))}`}
            ></div>
            <span>{metrics.cls !== null ? metrics.cls : "Measuring..."}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-secondary-600 dark:text-secondary-400">
            TTFB:
          </span>
          <div className="flex items-center">
            <div
              className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(getMetricStatus("ttfb", metrics.ttfb))}`}
            ></div>
            <span>
              {metrics.ttfb !== null ? `${metrics.ttfb}ms` : "Measuring..."}
            </span>
          </div>
        </div>
      </div>
      <div className="mt-2 pt-2 border-t border-secondary-200 dark:border-secondary-700 text-xs text-secondary-500 dark:text-secondary-400">
        <p>Dev mode only. Based on Core Web Vitals.</p>
      </div>
    </div>
  );
}
