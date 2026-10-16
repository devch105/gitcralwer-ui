const url = process.env.NEXT_PUBLIC_BACKEND_URL;

if (!url && process.env.NODE_ENV === "production") {
  throw new Error("NEXT_PUBLIC_BACKEND_URL must be set at build time");
}

export const BACKEND_HOST_URL = url ?? "http://localhost:8080";