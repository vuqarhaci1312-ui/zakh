"use client";

import {
  type ComponentPropsWithoutRef,
  type ElementType,
  type MouseEvent,
} from "react";
import { useEditMode } from "@/contexts/EditModeContext";
import { useTranslationsState } from "@/contexts/TranslationsContext";
import styles from "./edit-mode.module.css";

type EditableTextProps<T extends ElementType = "span"> = {
  k: string;
  fallback?: string;
  as?: T;
  children?: never;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

function isGradientClass(className?: string) {
  if (!className) return false;
  return (
    className.includes("text-gradient") ||
    className.includes("statTextAccent") ||
    className.includes("lagoon-title-accent")
  );
}

export default function T<T extends ElementType = "span">({
  k,
  fallback = "",
  as,
  className,
  onClick,
  ...rest
}: EditableTextProps<T>) {
  const Tag = (as ?? "span") as ElementType;
  const { t, locale } = useTranslationsState();
  const { isEditMode, selectField, activeField, isDraftDirty } = useEditMode();

  const savedValue = t(k, fallback);
  const isEmptySaved = !savedValue.trim();

  const displayValue = isEditMode
    ? savedValue || fallback
    : savedValue || (locale === "en" ? fallback : "");

  const isActive = activeField?.key === k;
  const dirty = isDraftDirty(k);
  const gradient = isGradientClass(className);

  if (!isEditMode) {
    return (
      <Tag className={className} onClick={onClick} {...rest}>
        {displayValue}
      </Tag>
    );
  }

  const editableClassName = [
    styles.editable,
    gradient ? styles.editableGradientText : "",
    gradient ? styles.editableGradient : "",
    isActive ? styles.editableActive : "",
    dirty ? styles.editableDirty : "",
    isEmptySaved && !fallback ? styles.editableEmpty : "",
    isEmptySaved && fallback ? styles.editablePreview : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  function handleClick(event: MouseEvent<HTMLElement>) {
    event.stopPropagation();
    selectField(k, fallback);
    onClick?.(event as never);
  }

  return (
    <Tag
      className={editableClassName}
      onClick={handleClick}
      data-editable-key={k}
      title={isEmptySaved ? "Boş tərcümə — redaktə etmək üçün klikləyin" : undefined}
      {...rest}
    >
      {displayValue || (
        <span className={styles.editablePlaceholder}>
          {fallback ? fallback : "Boş — klikləyin"}
        </span>
      )}
    </Tag>
  );
}

/** Helper for dynamic keys from tour/branch translators */
export function TDynamic({
  translationKey,
  fallback,
  as,
  className,
  ...rest
}: {
  translationKey: string;
  fallback: string;
  as?: ElementType;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"span">, "children">) {
  return (
    <T
      k={translationKey}
      fallback={fallback}
      as={as ?? "span"}
      className={className}
      {...rest}
    />
  );
}
