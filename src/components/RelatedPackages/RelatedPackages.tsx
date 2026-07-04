"use client";

import Image from "next/image";
import { useRef } from "react";
import T from "@/components/edit-mode/EditableText";
import { useTranslations } from "@/contexts/TranslationsContext";
import PackageExploreButton from "./PackageExploreButton";
import {
  RELATED_PACKAGES,
} from "./related-packages-data";
import { useRelatedPackagesAnimation } from "./useRelatedPackagesAnimation";
import "./related-packages.css";

export default function RelatedPackages() {
  const t = useTranslations();
  const sectionRef = useRef<HTMLElement>(null);
  useRelatedPackagesAnimation(sectionRef);

  return (
    <div className="avenora-related-packages avenora-page">
      <div className="page-wrapper">
        <section
          ref={sectionRef}
          className="section"
          aria-labelledby="related-packages-title"
        >
          <div className="space-8-small" />
          <div className="w-layout-blockcontainer container w-container">
            <div className="section-title-wrapper" data-related-packages-reveal>
              <div className="max-width-38">
                <h2 id="related-packages-title" className="section-heading night center">
                  <T k="packages.RELATED_PACKAGES_SECTION.title" fallback="Popular" />{" "}
                  <span className="text-gradient-orange">
                    <T k="ui.tours" fallback="Tours" />
                  </span>
                </h2>
              </div>
            </div>
            <div className="space-3-medium" />
            <div className="collection-item-wrap">
              {RELATED_PACKAGES.map((pkg, index) => (
                <div
                  key={pkg.id}
                  className="collection-wrap"
                  data-related-package-card
                >
                  <div className="w-dyn-list">
                    <div
                      role="list"
                      className="releted-packeges-collection-list w-dyn-items"
                    >
                      <div role="listitem" className="packeges-item w-dyn-item">
                        <div className="releted-packeges-card">
                          <div className="releted-packeges-card-left">
                            <div className="max-width-17">
                              <div className="packeges-card-title text-gradient-orange">
                                <T
                                  k={`packages.RELATED_PACKAGES.${index}.title`}
                                  fallback={pkg.title}
                                />
                              </div>
                            </div>
                            <div className="space-1-exta-small hide-mobile" />
                            <p>
                              <T
                                k={`packages.RELATED_PACKAGES.${index}.description`}
                                fallback={pkg.description}
                              />
                            </p>
                            <div className="space-1-large hide-mobile" />
                            <PackageExploreButton href={pkg.href} />
                          </div>
                          <div className="packeges-card-img-wrap">
                            <Image
                              src={pkg.image}
                              alt={t(`packages.RELATED_PACKAGES.${index}.alt`, pkg.alt)}
                              width={1920}
                              height={1280}
                              sizes="(max-width: 767px) 100vw, (max-width: 991px) 95vw, 939px"
                              className="packeges-card-img"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-8-small" />
        </section>
      </div>
    </div>
  );
}
