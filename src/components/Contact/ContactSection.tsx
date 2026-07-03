"use client";

import { FormEvent, useRef, useState } from "react";
import {
  CONTACT_EMAIL,
  CONTACT_MAP_EMBED,
  CONTACT_MOBILE_PHONES,
  CONTACT_OFFICES,
  CONTACT_OFFICE_PHONE,
  CONTACT_SECTION,
  CONTACT_WHATSAPP,
} from "./contact-data";
import styles from "./Contact.module.css";
import { useOurServicesAnimation } from "../OurServices/useOurServicesAnimation";
import { useTranslations } from "@/contexts/TranslationsContext";

function MapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8c1.5 2.9 3.7 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.1 21 3 13.9 3 5c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5L4 8V6l8 5 8-5v2z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export default function ContactSection() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  useOurServicesAnimation(sectionRef);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const subject = String(data.get("subject") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const body = [
      name ? `Name: ${name}` : "",
      phone ? `Phone: ${phone}` : "",
      email ? `Email: ${email}` : "",
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${CONTACT_EMAIL.value}?subject=${encodeURIComponent(subject || "Contact from zakher.travel")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSubmitted(true);
    form.reset();
  };

  return (
    <section ref={sectionRef} className="section">
      <div className="space-8-small" />
      <div className="w-layout-blockcontainer container w-container">
        <div className="service-wrapper">
          <div className="section-title-wrapper" data-services-reveal>
            <div className="max-width-52" style={{ margin: "0 auto" }}>
              <h1 className="section-heading night center">
                <span className="text-gradient-orange">
                  {t("nav.links.5.label", "Contact Us")}
                </span>
              </h1>
            </div>
            <div className="space-1-normal" />
            <div className="max-width-41" style={{ margin: "0 auto" }}>
              <p className="font-1-extra-small" style={{ textAlign: "center" }}>
                {t("contact.section.description", CONTACT_SECTION.description)}
              </p>
            </div>
          </div>

          <div className="space-3-medium" />

          <div className={styles.grid} data-experience-card>
            <div className={styles.infoColumn}>
              <div className={styles.infoBlock}>
                <div className={styles.iconWrap}>
                  <MapIcon />
                </div>
                <div className={styles.infoContent}>
                  <p className={styles.infoLabel}>{t("ui.office", "Office")}</p>
                  {CONTACT_OFFICES.map((office, index) => (
                    <div key={office.label} style={{ marginBottom: "0.85rem" }}>
                      <h2 className={styles.officeTitle}>
                        {t(`contact.offices.${index}.label`, office.label)}
                      </h2>
                      <p className={styles.infoText}>
                        {t(`contact.offices.${index}.address`, office.address)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.iconWrap}>
                  <PhoneIcon />
                </div>
                <div className={styles.infoContent}>
                  <p className={styles.infoLabel}>{t("ui.officePhone", "Office Phone")}</p>
                  <a href={CONTACT_OFFICE_PHONE.href} className={styles.infoLink}>
                    {CONTACT_OFFICE_PHONE.value}
                  </a>
                </div>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.iconWrap}>
                  <PhoneIcon />
                </div>
                <div className={styles.infoContent}>
                  <p className={styles.infoLabel}>{t("ui.mobile", "Mobile")}</p>
                  {CONTACT_MOBILE_PHONES.map((phone) => (
                    <a key={phone.href} href={phone.href} className={styles.infoLink}>
                      {phone.value}
                    </a>
                  ))}
                </div>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.iconWrap}>
                  <WhatsAppIcon />
                </div>
                <div className={styles.infoContent}>
                  <p className={styles.infoLabel}>{t("ui.whatsapp", "WhatsApp")}</p>
                  <a
                    href={CONTACT_WHATSAPP.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.infoLink}
                  >
                    {CONTACT_WHATSAPP.value}
                  </a>
                </div>
              </div>

              <div className={styles.infoBlock}>
                <div className={styles.iconWrap}>
                  <MailIcon />
                </div>
                <div className={styles.infoContent}>
                  <p className={styles.infoLabel}>{t("ui.email", "Email")}</p>
                  <a href={CONTACT_EMAIL.href} className={styles.infoLink}>
                    {CONTACT_EMAIL.value}
                  </a>
                </div>
              </div>
            </div>

            <div className={styles.mapWrap}>
              <iframe
                title={t("ui.contactMapTitle", "Zakher Travel office location")}
                src={CONTACT_MAP_EMBED}
                className={styles.mapIframe}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className={styles.formCard}>
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="contact-name">
                      {t("ui.yourName", "Your Name")}
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className={styles.input}
                      placeholder={t("ui.yourName", "Your Name")}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="contact-phone">
                      {t("ui.yourPhone", "Your Phone")}
                    </label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      className={styles.input}
                      placeholder={t("ui.yourPhone", "Your Phone")}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-email">
                    {t("ui.yourEmail", "Your Email")}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    className={styles.input}
                    placeholder={t("ui.yourEmail", "Your Email")}
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-subject">
                    {t("ui.subject", "Subject")}
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    className={styles.input}
                    placeholder={t("ui.subject", "Subject")}
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label} htmlFor="contact-message">
                    {t("ui.message", "Message")}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className={styles.textarea}
                    placeholder={t("ui.messagePlaceholder", "Leave a message here")}
                    required
                  />
                </div>

                <button type="submit" className={styles.submit}>
                  {t("ui.sendMessage", "Send Message")}
                </button>

                {submitted ? (
                  <p className={styles.infoText}>
                    {t(
                      "ui.contactFormSuccess",
                      "Your email client should open with your message ready to send.",
                    )}
                  </p>
                ) : null}
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="space-8-small" />
    </section>
  );
}
