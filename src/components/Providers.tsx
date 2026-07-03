"use client";

import type { ReactNode } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TranslationsProvider } from "@/contexts/TranslationsContext";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <TranslationsProvider>{children}</TranslationsProvider>
    </LanguageProvider>
  );
}
