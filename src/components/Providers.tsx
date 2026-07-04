"use client";

import { Suspense, type ReactNode } from "react";
import LocaleDocumentMeta from "@/components/LocaleDocumentMeta";
import EditModeToolbar from "@/components/edit-mode/EditModeToolbar";
import EditFieldPanel from "@/components/edit-mode/EditFieldPanel";
import { EditModeProvider } from "@/contexts/EditModeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { TranslationsProvider } from "@/contexts/TranslationsContext";

function EditModeShell({ children }: { children: ReactNode }) {
  return (
    <EditModeProvider>
      <TranslationsProvider>
        <LocaleDocumentMeta />
        {children}
        <EditModeToolbar />
        <EditFieldPanel />
      </TranslationsProvider>
    </EditModeProvider>
  );
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <Suspense fallback={null}>
        <EditModeShell>{children}</EditModeShell>
      </Suspense>
    </LanguageProvider>
  );
}
