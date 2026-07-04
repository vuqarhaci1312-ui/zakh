const REMOTE_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
/** Same-origin proxy in browser avoids cross-origin cookie/CORS issues with Cloud Run. */
const API_URL = typeof window !== "undefined" ? "/api/cms" : REMOTE_API_URL;
const ADMIN_TOKEN_KEY = "zakher-admin-token";
export type AdminUser = {
  id: string;
  email: string;
  role: string;
};

export type TranslationRow = {
  key: string;
  namespace: string;
  translations: {
    id?: string;
    locale: string;
    value: string;
    updatedAt?: string;
  }[];
};

function getStoredToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token: string) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

async function adminFetch(path: string, init?: RequestInit) {
  const token = getStoredToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error ?? `Request failed: ${res.status}`);
  }
  return data;
}

export async function loginAdmin(email: string, password: string) {
  const data = (await adminFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  })) as { token: string; user: AdminUser };

  if (data.token) {
    setAdminToken(data.token);
  }

  return data;
}

export async function logoutAdmin() {
  try {
    await adminFetch("/api/auth/logout", { method: "POST" });
  } finally {
    clearAdminToken();
  }
}

export function getAdminMe() {
  return adminFetch("/api/auth/me") as Promise<{ user: AdminUser }>;
}

export function listTranslations(params: {
  search?: string;
  namespace?: string;
  namespaces?: string[];
  page?: number;
  pageSize?: number;
}) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.namespace) query.set("namespace", params.namespace);
  if (params.namespaces?.length) query.set("namespaces", params.namespaces.join(","));
  if (params.page) query.set("page", String(params.page));
  if (params.pageSize) query.set("pageSize", String(params.pageSize));

  return adminFetch(`/api/translations/admin?${query.toString()}`) as Promise<{
    items: TranslationRow[];
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  }>;
}

/** Loads translations for a page section, with fallback when API lacks multi-namespace support. */
export async function listTranslationsForSection(params: {
  namespaces: string[];
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const page = params.page ?? 1;
  const pageSize = params.pageSize ?? 20;

  if (params.namespaces.length === 1) {
    return listTranslations({
      search: params.search,
      namespace: params.namespaces[0],
      page,
      pageSize,
    });
  }

  try {
    const direct = await listTranslations({
      search: params.search,
      namespaces: params.namespaces,
      page,
      pageSize,
    });
    if (direct.items.some((item) => params.namespaces.includes(item.namespace))) {
      return direct;
    }
  } catch {
    // Fall through to per-namespace merge below.
  }

  const merged: TranslationRow[] = [];
  for (const namespace of params.namespaces) {
    let currentPage = 1;
    let totalPages = 1;
    while (currentPage <= totalPages) {
      const batch = await listTranslations({
        search: params.search,
        namespace,
        page: currentPage,
        pageSize: 100,
      });
      merged.push(...batch.items);
      totalPages = batch.totalPages;
      currentPage += 1;
    }
  }

  const unique = new Map<string, TranslationRow>();
  for (const item of merged) {
    unique.set(item.key, item);
  }

  const sorted = [...unique.values()].sort((a, b) => a.key.localeCompare(b.key));
  const total = sorted.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;

  return {
    items: sorted.slice(start, start + pageSize),
    page,
    pageSize,
    total,
    totalPages,
  };
}

export function getNamespaces() {
  return adminFetch("/api/translations/admin/namespaces") as Promise<{
    namespaces: string[];
  }>;
}

export function saveTranslation(payload: {
  key: string;
  locale: string;
  value: string;
  namespace?: string;
}) {
  return adminFetch("/api/translations/admin", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function bulkSaveTranslations(
  items: { key: string; locale: string; value: string; namespace?: string }[],
) {
  return adminFetch("/api/translations/admin/bulk", {
    method: "POST",
    body: JSON.stringify({ items }),
  });
}

export function deleteTranslationKey(key: string) {
  return adminFetch(`/api/translations/admin/key/${encodeURIComponent(key)}`, {
    method: "DELETE",
  });
}

export function exportTranslations(namespace?: string) {
  const query = namespace ? `?namespace=${encodeURIComponent(namespace)}` : "";
  return adminFetch(`/api/translations/admin/export${query}`);
}
