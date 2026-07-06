import type { LocalizedText, Locale } from "@/lib/content/localized";

const REMOTE_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const API_URL = typeof window !== "undefined" ? "/api/cms" : REMOTE_API_URL;
const ADMIN_TOKEN_KEY = "zakher-admin-token";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

async function contentFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken();
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
  if (!res.ok) throw new Error(data.error ?? `Request failed: ${res.status}`);
  return data as T;
}

export async function uploadAdminFile(file: File, folder: string) {
  const token = getToken();
  const form = new FormData();
  form.append("file", file);
  form.append("folder", folder);
  const res = await fetch(`${API_URL}/api/admin/uploads`, {
    method: "POST",
    credentials: "include",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error ?? "Upload failed");
  return data as { url: string };
}

export type PublishResult = { ok: true } | { error: string; fields?: string[] };

export const contentAdminApi = {
  stats: () => contentFetch<Record<string, number>>("/api/content/admin/stats"),

  brochures: {
    list: () => contentFetch<{ section: unknown; items: unknown[] }>("/api/content/admin/brochures"),
    create: (body: unknown) => contentFetch("/api/content/admin/brochures", { method: "POST", body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => contentFetch(`/api/content/admin/brochures/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    remove: (id: string) => contentFetch(`/api/content/admin/brochures/${id}`, { method: "DELETE" }),
    publish: (id: string) => contentFetch<PublishResult>(`/api/content/admin/brochures/${id}/publish`, { method: "POST" }),
    updateSection: (body: unknown) => contentFetch("/api/content/admin/brochures/section", { method: "PATCH", body: JSON.stringify(body) }),
  },

  certificates: {
    list: () => contentFetch<{ section: unknown; items: unknown[] }>("/api/content/admin/certificates"),
    create: (body: unknown) => contentFetch("/api/content/admin/certificates", { method: "POST", body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => contentFetch(`/api/content/admin/certificates/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    remove: (id: string) => contentFetch(`/api/content/admin/certificates/${id}`, { method: "DELETE" }),
    publish: (id: string) => contentFetch(`/api/content/admin/certificates/${id}/publish`, { method: "POST" }),
    updateSection: (body: unknown) => contentFetch("/api/content/admin/certificates/section", { method: "PATCH", body: JSON.stringify(body) }),
  },

  events: {
    list: () => contentFetch<{ section: unknown; items: unknown[] }>("/api/content/admin/events"),
    create: (body: unknown) => contentFetch("/api/content/admin/events", { method: "POST", body: JSON.stringify(body) }),
    update: (id: string, body: unknown) => contentFetch(`/api/content/admin/events/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    remove: (id: string) => contentFetch(`/api/content/admin/events/${id}`, { method: "DELETE" }),
    publish: (id: string) => contentFetch(`/api/content/admin/events/${id}/publish`, { method: "POST" }),
    updateSection: (body: unknown) => contentFetch("/api/content/admin/events/section", { method: "PATCH", body: JSON.stringify(body) }),
  },

  social: {
    list: () => contentFetch<{ sections: unknown[]; links: unknown[]; instagram: unknown[] }>("/api/content/admin/social"),
    updateSection: (key: string, body: unknown) =>
      contentFetch(`/api/content/admin/social/sections/${key}`, { method: "PATCH", body: JSON.stringify(body) }),
    createLink: (body: unknown) => contentFetch("/api/content/admin/social/links", { method: "POST", body: JSON.stringify(body) }),
    updateLink: (id: string, body: unknown) => contentFetch(`/api/content/admin/social/links/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    removeLink: (id: string) => contentFetch(`/api/content/admin/social/links/${id}`, { method: "DELETE" }),
    publishLink: (id: string) => contentFetch(`/api/content/admin/social/links/${id}/publish`, { method: "POST" }),
    createInstagram: (body: unknown) => contentFetch("/api/content/admin/social/instagram", { method: "POST", body: JSON.stringify(body) }),
    updateInstagram: (id: string, body: unknown) => contentFetch(`/api/content/admin/social/instagram/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    removeInstagram: (id: string) => contentFetch(`/api/content/admin/social/instagram/${id}`, { method: "DELETE" }),
    publishInstagram: (id: string) => contentFetch(`/api/content/admin/social/instagram/${id}/publish`, { method: "POST" }),
  },

  tours: {
    list: () => contentFetch<{ section: unknown; countries: unknown[] }>("/api/content/admin/tours"),
    updateSection: (body: unknown) => contentFetch("/api/content/admin/tours/section", { method: "PATCH", body: JSON.stringify(body) }),
    createCountry: (body: unknown) => contentFetch("/api/content/admin/tours/countries", { method: "POST", body: JSON.stringify(body) }),
    updateCountry: (id: string, body: unknown) => contentFetch(`/api/content/admin/tours/countries/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    removeCountry: (id: string) => contentFetch(`/api/content/admin/tours/countries/${id}`, { method: "DELETE" }),
    publishCountry: (id: string) => contentFetch(`/api/content/admin/tours/countries/${id}/publish`, { method: "POST" }),
    createTour: (countryId: string, body: unknown) =>
      contentFetch(`/api/content/admin/tours/countries/${countryId}/tours`, { method: "POST", body: JSON.stringify(body) }),
    updateTour: (id: string, body: unknown) => contentFetch(`/api/content/admin/tours/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
    removeTour: (id: string) => contentFetch(`/api/content/admin/tours/${id}`, { method: "DELETE" }),
    publishTour: (id: string) => contentFetch(`/api/content/admin/tours/${id}/publish`, { method: "POST" }),
    getTour: (id: string) => contentFetch(`/api/content/admin/tours/detail/${id}`),
  },

  reservations: {
    list: () => contentFetch<{ items: ReservationRecord[] }>("/api/reservations/admin"),
    updateStatus: (id: string, status: ReservationStatus) =>
      contentFetch<ReservationRecord>(`/api/reservations/admin/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      }),
    remove: (id: string) => contentFetch(`/api/reservations/admin/${id}`, { method: "DELETE" }),
  },
};

export type ReservationStatus = "new" | "contacted" | "confirmed" | "cancelled";

export type ReservationRecord = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  email: string | null;
  subject: string;
  dateFrom: string;
  dateTo: string;
  tourTitle: string;
  countrySlug: string;
  tourSlug: string;
  locale: string;
  status: ReservationStatus;
  createdAt: string;
  updatedAt: string;
};

export type { LocalizedText, Locale };
