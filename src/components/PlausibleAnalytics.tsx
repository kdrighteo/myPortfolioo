"use client";

import Script from "next/script";

export default function PlausibleAnalytics() {
  // Replace with your actual domain when you deploy your portfolio
  const domain = "gilbertdanso.com";

  return (
    <Script
      data-domain={domain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}
