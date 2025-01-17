"use client";

import { useEffect, useState } from "react";

export function LoadingSpinner() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoadComplete = () => setIsLoading(false);

    if (document.readyState === "complete") {
      handleLoadComplete();
    } else {
      window.addEventListener("load", handleLoadComplete);
    }

    return () => window.removeEventListener("load", handleLoadComplete);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="spinner">
        <div className="spinnerin"></div>
      </div>
    </div>
  );
}
