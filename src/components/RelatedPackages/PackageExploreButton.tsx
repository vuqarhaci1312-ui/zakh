"use client";

import LocaleLink from "@/components/LocaleLink";
import { Dt } from "@/lib/i18n/use-data-translation";

function ButtonArrow() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      viewBox="0 0 21 21"
      fill="none"
      className="button-arrow"
      aria-hidden="true"
    >
      <path
        d="M3.5 9.625V11.375H14V13.125H15.75V11.375H17.5V9.625H15.75V7.875H14V9.625H3.5ZM12.25 6.125H14V7.875H12.25V6.125ZM12.25 6.125H10.5V4.375H12.25V6.125ZM12.25 14.875H14V13.125H12.25V14.875ZM12.25 14.875H10.5V16.625H12.25V14.875Z"
        fill="currentColor"
      />
    </svg>
  );
}

type PackageExploreButtonProps = {
  href: string;
};

export default function PackageExploreButton({ href }: PackageExploreButtonProps) {
  return (
    <LocaleLink
      href={href}
      dir="ltr"
      className="primary-button w-variant-b04b30b8-312c-20b6-324a-d08432c0f8eb w-inline-block"
    >
      <div className="button-item-main">
        <div className="button-text-pill">
          <div className="primay-button-text">
            <Dt k="ui.readMore" fallback="Read More" />
          </div>
          <div className="primay-button-text">
            <Dt k="ui.readMore" fallback="Read More" />
          </div>
        </div>
        <div className="button-arrow-pill">
          <div className="arrow-wrapper">
            <ButtonArrow />
            <ButtonArrow />
          </div>
        </div>
        <div className="button-animated-color" />
      </div>
    </LocaleLink>
  );
}
