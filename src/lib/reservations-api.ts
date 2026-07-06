const REMOTE_API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const API_URL = typeof window !== "undefined" ? "/api/cms" : REMOTE_API_URL;

export type ReservationSubmitPayload = {
  firstName: string;
  lastName: string;
  phone?: string;
  email?: string;
  subject: string;
  dateFrom: string;
  dateTo: string;
  tourTitle: string;
  countrySlug: string;
  tourSlug: string;
  locale?: string;
};

export async function submitTourReservation(payload: ReservationSubmitPayload) {
  const res = await fetch(`${API_URL}/api/reservations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error ?? "Reservation failed");
  }
  return data as { ok: true; id: string };
}
