"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          padding: "2rem",
          background: "#08080B",
          color: "#F5F5F7",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ maxWidth: 520, textAlign: "center" }}>
          <div
            style={{
              fontSize: 12,
              opacity: 0.5,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Fatal error
          </div>
          <h1
            style={{ fontSize: 48, margin: "16px 0", lineHeight: 1.02, letterSpacing: "-0.025em" }}
          >
            Something broke at the root.
          </h1>
          <p style={{ opacity: 0.6, lineHeight: 1.6 }}>
            {error.message || "An unexpected error occurred."}
          </p>
          <button
            onClick={() => reset()}
            style={{
              marginTop: 24,
              padding: "12px 24px",
              borderRadius: 999,
              border: "none",
              background: "#C7F284",
              color: "#0A1500",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
