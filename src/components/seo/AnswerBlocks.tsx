import type { ReactNode } from "react";

type FactItem = { label: string; value: string };

export function DefinitionBlock({
  term,
  definition,
}: {
  term: string;
  definition: string;
}) {
  return (
    <div className="resort_amenities" data-seo-summary data-detail-reveal>
      <p className="margin-0 tone-medium">
        <strong>{term}</strong>
        {": "}
        {definition}
      </p>
    </div>
  );
}

export function KeyFactsBlock({
  title,
  facts,
}: {
  title: ReactNode;
  facts: FactItem[];
}) {
  if (!facts.length) return null;
  return (
    <div className="resort_amenities" data-detail-reveal>
      <div className="text-size-large text_body-bold">{title}</div>
      <ul className="margin-0 tone-medium" style={{ paddingLeft: "1.25rem" }}>
        {facts.map((fact) => (
          <li key={`${fact.label}-${fact.value}`}>
            <strong>{fact.label}:</strong> {fact.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SummaryBlock({
  title,
  children,
}: {
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="resort_amenities" data-seo-summary data-detail-reveal>
      {title ? <div className="text-size-large text_body-bold">{title}</div> : null}
      <div className="margin-0 tone-medium">{children}</div>
    </div>
  );
}
