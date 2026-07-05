export type AdminLoginMode = "language" | "normal";

export const ADMIN_MODE_KEY = "zakher-admin-mode";

export function setAdminMode(mode: AdminLoginMode) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(ADMIN_MODE_KEY, mode);
  }
}

export function getAdminMode(): AdminLoginMode | null {
  if (typeof window === "undefined") return null;
  const value = sessionStorage.getItem(ADMIN_MODE_KEY);
  return value === "language" || value === "normal" ? value : null;
}

export function clearAdminMode() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(ADMIN_MODE_KEY);
  }
}
