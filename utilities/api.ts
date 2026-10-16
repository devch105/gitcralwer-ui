// utilities/api.ts
export async function apiFetch(input: string, init: RequestInit = {}) {
  const res = await fetch(input, { ...init, credentials: "include" });

  if (
    res.status === 401 &&
    typeof window !== "undefined" &&
    !window.location.pathname.startsWith("/auth")
  ) {
    window.location.href = "/auth/login?error=session";
  }

  return res;
}