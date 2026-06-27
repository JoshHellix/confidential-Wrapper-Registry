"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", maxWidth: "40rem" }}>
        <h1>Something went wrong</h1>
        <p style={{ color: "#57534e" }}>
          The Wrapper Registry app hit an error while loading. Try refreshing, or connect your wallet after the page
          loads.
        </p>
        <pre style={{ fontSize: "0.75rem", overflow: "auto", padding: "1rem", background: "#f5f5f4" }}>
          {error.message}
        </pre>
        <button type="button" onClick={() => reset()} style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}>
          Try again
        </button>
      </body>
    </html>
  );
}
