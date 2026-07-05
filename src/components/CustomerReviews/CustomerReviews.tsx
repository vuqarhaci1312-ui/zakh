"use client";

import Script from "next/script";
import { useRef } from "react";
import T from "@/components/edit-mode/EditableText";
import {
  CUSTOMER_REVIEWS_SECTION,
  ELFSIGHT_GOOGLE_REVIEWS_APP_ID,
  ELFSIGHT_PLATFORM_SCRIPT,
} from "./customer-reviews-data";
import "./customer-reviews.css";
import { useCustomerReviewsAnimation } from "./useCustomerReviewsAnimation";

export default function CustomerReviews() {
  const sectionRef = useRef<HTMLElement>(null);
  useCustomerReviewsAnimation(sectionRef);

  return (
    <div className="avenora-customer-reviews avenora-page">
      <div className="page-wrapper">
        <section
          ref={sectionRef}
          className="section"
          aria-labelledby="customer-reviews-title"
        >
          <div className="space-8-small" />
          <div className="w-layout-blockcontainer container w-container">
            <div className="section-title-wrapper" data-customer-reviews-reveal>
              <div className="max-width-38">
                <h2 id="customer-reviews-title" className="section-heading night center">
                  <T
                    k="reviews.CUSTOMER_REVIEWS_SECTION.titleBefore"
                    fallback={CUSTOMER_REVIEWS_SECTION.titleBefore}
                  />{" "}
                  <span className="text-gradient-orange">
                    <T
                      k="reviews.CUSTOMER_REVIEWS_SECTION.titleAccent"
                      fallback={CUSTOMER_REVIEWS_SECTION.titleAccent}
                    />
                  </span>
                </h2>
              </div>
            </div>

            <div className="space-3-medium" />

            <div className="customer-reviews-widget" data-customer-reviews-reveal>
              <div className={`elfsight-app-${ELFSIGHT_GOOGLE_REVIEWS_APP_ID}`} />
            </div>
          </div>
          <div className="space-8-small" />
        </section>
      </div>

      <Script src={ELFSIGHT_PLATFORM_SCRIPT} strategy="afterInteractive" />
    </div>
  );
}
