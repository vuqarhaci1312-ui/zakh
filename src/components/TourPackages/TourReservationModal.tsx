"use client";

import { FormEvent, useEffect, useState } from "react";
import T from "@/components/edit-mode/EditableText";
import { useTranslations, useTranslationsState } from "@/contexts/TranslationsContext";
import { submitTourReservation } from "@/lib/reservations-api";
import styles from "./TourReservationModal.module.css";

export type TourReservationTarget = {
  countrySlug: string;
  tourSlug: string;
  tourTitle: string;
  countryName: string;
};

type TourReservationModalProps = {
  target: TourReservationTarget | null;
  onClose: () => void;
};

export default function TourReservationModal({ target, onClose }: TourReservationModalProps) {
  const t = useTranslations();
  const { locale } = useTranslationsState();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!target) return;
    setFirstName("");
    setLastName("");
    setPhone("");
    setEmail("");
    setSubject("");
    setDateFrom("");
    setDateTo("");
    setError("");
    setSuccess(false);
    setSubmitting(false);
  }, [target]);

  useEffect(() => {
    if (!target) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [target, onClose]);

  if (!target) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!phone.trim() && !email.trim()) {
      setError(t("reservation.errors.contactRequired", "Please enter a phone number or email."));
      return;
    }

    if (dateFrom && dateTo && dateTo < dateFrom) {
      setError(t("reservation.errors.dateRange", "End date must be on or after start date."));
      return;
    }

    setSubmitting(true);
    try {
      await submitTourReservation({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        subject: subject.trim(),
        dateFrom,
        dateTo,
        tourTitle: target.tourTitle,
        countrySlug: target.countrySlug,
        tourSlug: target.tourSlug,
        locale,
      });
      setSuccess(true);
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : t("reservation.errors.submitFailed", "Could not send reservation. Please try again."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={styles.overlay}
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.sheet} role="dialog" aria-modal="true" aria-labelledby="tour-reservation-title">
        <div className={styles.sheetHandle} aria-hidden="true" />
        <div className={styles.sheetHeader}>
          <div>
            <h2 id="tour-reservation-title" className={styles.sheetTitle}>
              <T k="reservation.title" fallback="Tour reservation" />
            </h2>
            <p className={styles.sheetSubtitle}>
              {target.tourTitle} · {target.countryName}
            </p>
          </div>
          <button type="button" className={styles.closeButton} onClick={onClose} aria-label={t("ui.close", "Close")}>
            ×
          </button>
        </div>

        <div className={styles.sheetBody}>
          {success ? (
            <p className={styles.success}>
              <T
                k="reservation.success"
                fallback="Your reservation request has been sent. Our team will contact you soon."
              />
            </p>
          ) : (
            <form className={styles.formGrid} onSubmit={(event) => void handleSubmit(event)}>
              <div className={styles.fieldRow}>
                <label className={styles.field}>
                  <span className={styles.label}>
                    <T k="reservation.firstName" fallback="First name" />
                  </span>
                  <input
                    className={styles.input}
                    value={firstName}
                    onChange={(event) => setFirstName(event.target.value)}
                    required
                    autoComplete="given-name"
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>
                    <T k="reservation.lastName" fallback="Last name" />
                  </span>
                  <input
                    className={styles.input}
                    value={lastName}
                    onChange={(event) => setLastName(event.target.value)}
                    required
                    autoComplete="family-name"
                  />
                </label>
              </div>

              <label className={styles.field}>
                <span className={styles.label}>
                  <T k="reservation.phone" fallback="Phone" />
                </span>
                <input
                  className={styles.input}
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  autoComplete="tel"
                  inputMode="tel"
                />
              </label>

              <label className={styles.field}>
                <span className={styles.label}>
                  <T k="reservation.email" fallback="Email" />
                </span>
                <input
                  className={styles.input}
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </label>

              <p className={styles.hint}>
                <T k="reservation.contactHint" fallback="Enter at least a phone number or email." />
              </p>

              <label className={styles.field}>
                <span className={styles.label}>
                  <T k="reservation.subject" fallback="Subject" />
                </span>
                <input
                  className={styles.input}
                  value={subject}
                  onChange={(event) => setSubject(event.target.value)}
                  required
                />
              </label>

              <div className={styles.fieldRow}>
                <label className={styles.field}>
                  <span className={styles.label}>
                    <T k="reservation.dateFrom" fallback="Travel from" />
                  </span>
                  <input
                    className={styles.input}
                    type="date"
                    value={dateFrom}
                    onChange={(event) => setDateFrom(event.target.value)}
                    required
                  />
                </label>
                <label className={styles.field}>
                  <span className={styles.label}>
                    <T k="reservation.dateTo" fallback="Travel to" />
                  </span>
                  <input
                    className={styles.input}
                    type="date"
                    value={dateTo}
                    onChange={(event) => setDateTo(event.target.value)}
                    min={dateFrom || undefined}
                    required
                  />
                </label>
              </div>

              {error ? <p className={styles.error}>{error}</p> : null}

              <button type="submit" className={styles.submitButton} disabled={submitting}>
                <T k="reservation.submit" fallback="Send" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
