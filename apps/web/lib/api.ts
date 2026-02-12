/**
 * Backend API base URL for the Data Dictionary / Bastion API.
 * Set NEXT_PUBLIC_API_URL in Vercel (or .env.local) to override.
 */
export const API_BASE_URL =
  typeof window !== "undefined"
    ? (process.env.NEXT_PUBLIC_API_URL ?? "https://bastion1.onrender.com")
    : (process.env.NEXT_PUBLIC_API_URL ?? "https://bastion1.onrender.com");

/** Full URL for the analyze endpoint (POST, SSE). */
export const ANALYZE_URL = `${API_BASE_URL}/api/analyze`;

/** Health check URL. */
export const HEALTH_URL = `${API_BASE_URL}/health`;
