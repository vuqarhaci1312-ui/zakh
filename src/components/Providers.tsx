"use client";

import { Suspense, type ReactNode } from "react";
import EditModeToolbar from "@/components/edit-mode/EditModeToolbar";
import EditFieldPanel from "@/components/edit-mode/EditFieldPanel";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TranslationsProvider } from "@/contexts/TranslationsContext";
import type { Locale } from "@/lib/i18n/language-data";

function EditModeShell({ children }: { children: ReactNode }) {
  return (
    <EditModeProvider>
      <TranslationsProvider>
        {children}
        <EditModeToolbar />
        <EditFieldPanel />
      </TranslationsProvider>
    </EditModeProvider>
  );
}

export default function Providers({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  return (
    <LanguageProvider initialLocale={initialLocale}>
      <Suspense fallback={null}>
        <EditModeShell>{children}</EditModeShell>
      </Suspense>
    </LanguageProvider>
  );
}
