import type { ElementType } from "react";
import T from "@/components/edit-mode/EditableText";
import { useTranslations } from "@/contexts/TranslationsContext";

export { T };

/** Resolve a translation key with English fallback text from data files. */
export function useDataTranslation() {
  const t = useTranslations();
  return (key: string, fallback: string) => t(key, fallback);
}

/** Shorthand alias used across section components. */
export function useDt() {
  return useDataTranslation();
}

/** Render editable translated text on the live site. */
export function Dt({
  k,
  fallback,
  as,
  className,
  ...rest
}: {
  k: string;
  fallback: string;
  as?: ElementType;
  className?: string;
} & Record<string, unknown>) {
  return <T k={k} fallback={fallback} as={as ?? "span"} className={className} {...rest} />;
}
