"use client";

import { gsap } from "gsap";
import { useEffect, useRef, useState, type ReactNode } from "react";

export default function FaqAccordion({
  items,
}: {
  items: { question: ReactNode; answer: ReactNode }[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const bottomRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    items.forEach((_, index) => {
      const panel = bottomRefs.current[index];
      if (!panel) {
        return;
      }

      const isOpen = openIndex === index;
      gsap.killTweensOf(panel);

      if (isOpen) {
        gsap.set(panel, { display: "flex", overflow: "hidden" });
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
          }
        );
        return;
      }

      gsap.to(panel, {
        height: 0,
        opacity: 0,
        duration: 0.35,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(panel, { display: "none" });
        },
      });
    });
  }, [items, openIndex]);

  return (
    <div className="list_faq">
      <div className="faq-slot">
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <button
              key={String(index)}
              type="button"
              className={`expandable-single ${isOpen ? "is-open" : "is-closed"}`}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <div className="expandable-top">
                <div className="name_faq">
                  <div className="text_body-bold">{item.question}</div>
                </div>
                <div className="faq_animation-box">
                  <div className="faq-line" />
                  <div className="faq-line vertical" />
                </div>
              </div>
              <div
                ref={(element) => {
                  bottomRefs.current[index] = element;
                }}
                className="expandable-bottom"
                style={{
                  display: index === 0 ? "flex" : "none",
                  overflow: "hidden",
                }}
              >
                <p className="faq_p" style={{ whiteSpace: "pre-line" }}>
                  {item.answer}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
