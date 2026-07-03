"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDt } from "@/lib/i18n/use-data-translation";
import { ABOUT_CERTIFICATES, CERTIFICATE_IMAGES } from "./about-data";
import styles from "./About.module.css";
import {
  CERTIFICATE_LOOP_COPIES,
  useCertificateCarousel,
} from "./useCertificateCarousel";

export default function AboutCertificates() {
  const dt = useDt();
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { viewportRef, trackRef, suppressClickRef } = useCertificateCarousel(
    CERTIFICATE_IMAGES.length,
  );

  const loopedCertificates = useMemo(
    () =>
      Array.from({ length: CERTIFICATE_LOOP_COPIES }, (_, copyIndex) =>
        CERTIFICATE_IMAGES.map((src, index) => ({
          src,
          key: `${src}-${copyIndex}-${index}`,
        })),
      ).flat(),
    [],
  );

  const closeLightbox = useCallback(() => setActiveImage(null), []);

  const openCertificate = useCallback((src: string) => {
    if (suppressClickRef.current) {
      return;
    }
    setActiveImage(src);
  }, [suppressClickRef]);

  useEffect(() => {
    if (!activeImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [activeImage, closeLightbox]);

  return (
    <section className={`${styles.section} ${styles.aboutCertificatesSection}`}>
      <div className={`${styles.container} ${styles.aboutCertificates}`}>
        <h2 className={`${styles.h2Heading} ${styles.sectionTitleCenter}`}>
          <span className="text-gradient-orange">
            {dt("about.ABOUT_CERTIFICATES.title", ABOUT_CERTIFICATES.title)}
          </span>
        </h2>

        <div
          ref={viewportRef}
          className={styles.certificatesViewport}
          aria-label={dt("ui.certificates.carousel", "Certificates carousel")}
        >
          <div ref={trackRef} className={styles.certificatesTrack}>
            {loopedCertificates.map((item) => (
              <button
                key={item.key}
                type="button"
                className={styles.certificateCard}
                aria-label={dt("ui.certificates.open", "Open certificate")}
                onClick={() => openCertificate(item.src)}
              >
                <Image
                  src={item.src}
                  alt=""
                  width={220}
                  height={300}
                  className={styles.certificateImage}
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {activeImage ? (
        <div
          className={styles.certificateLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={dt("ui.certificates.preview", "Certificate preview")}
          onClick={closeLightbox}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={activeImage} alt="" className={styles.certificateLightboxImage} />
        </div>
      ) : null}
    </section>
  );
}
