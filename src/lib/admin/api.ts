const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

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

async function adminFetch(path: string, init?: RequestInit) {
  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error ?? `Request failed: ${res.status}`);
  }
  return data;
}

export function loginAdmin(email: string, password: string) {
  return adminFetch("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logoutAdmin() {
  return adminFetch("/api/auth/logout", { method: "POST" });
}

export function getAdminMe() {
  return adminFetch("/api/auth/me") as Promise<{ user: AdminUser }>;
}

export function listTranslations(params: {
  search?: string;
  namespace?: string;
  page?: number;
  pageSize?: number;
}) {
  const query = new URLSearchParams();
  if (params.search) query.set("search", params.search);
  if (params.namespace) query.set("namespace", params.namespace);
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
