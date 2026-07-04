"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  bulkSaveTranslations,
  clearAdminToken,
  getAdminMe,
  type AdminUser,
} from "@/lib/admin/api";
import type { Locale } from "@/lib/i18n/language-data";
import type { TranslationDictionary } from "@/lib/i18n/create-translator";

const EDIT_MODE_SESSION_KEY = "zakher-edit-mode";

export type LocaleDrafts = Partial<Record<Locale, TranslationDictionary>>;

export type ActiveEditField = {
  key: string;
  fallback: string;
};

type EditModeContextValue = {
  isAdmin: boolean;
  user: AdminUser | null;
  isEditMode: boolean;
  activeField: ActiveEditField | null;
  drafts: LocaleDrafts;
  unsavedCount: number;
  saving: boolean;
  saveError: string | null;
  saveSuccess: boolean;
  setDraft: (key: string, value: string) => void;
  getDraftValue: (key: string, current: string) => string;
  isDraftDirty: (key: string) => boolean;
  selectField: (key: string, fallback: string) => void;
  clearField: () => void;
  saveAll: () => Promise<void>;
  discardAll: () => void;
  exitEditMode: () => void;
  enterEditMode: () => void;
  onSaved: (callback: () => Promise<void>) => void;
};

const EditModeContext = createContext<EditModeContextValue | null>(null);

function getNamespaceFromKey(key: string) {
  return key.split(".")[0] ?? "general";
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  const { locale } = useLanguage();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [drafts, setDrafts] = useState<LocaleDrafts>({});
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeField, setActiveField] = useState<ActiveEditField | null>(null);
  const reloadRef = useRef<(() => Promise<void>) | null>(null);
  const saveSuccessTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    getAdminMe()
      .then((data) => {
        setUser(data.user);
        setIsAdmin(true);
      })
      .catch(() => {
        setUser(null);
        setIsAdmin(false);
        clearAdminToken();
      });
  }, []);

  useEffect(() => {
    if (!isAdmin) return;

    const wantsEdit = searchParams.get("edit") === "1";
    const sessionEdit = sessionStorage.getItem(EDIT_MODE_SESSION_KEY) === "1";

    if (wantsEdit || sessionEdit) {
      setIsEditMode(true);
      sessionStorage.setItem(EDIT_MODE_SESSION_KEY, "1");
    }
  }, [isAdmin, searchParams]);

  const localeDrafts = drafts[locale] ?? {};

  const unsavedCount = useMemo(() => Object.keys(localeDrafts).length, [localeDrafts]);

  const setDraft = useCallback(
    (key: string, value: string) => {
      setDrafts((current) => ({
        ...current,
        [locale]: {
          ...(current[locale] ?? {}),
          [key]: value,
        },
      }));
      setSaveError(null);
    },
    [locale],
  );

  const getDraftValue = useCallback(
    (key: string, current: string) => {
      if (key in localeDrafts) {
        return localeDrafts[key] ?? "";
      }
      return current;
    },
    [localeDrafts],
  );

  const isDraftDirty = useCallback(
    (key: string) => key in localeDrafts,
    [localeDrafts],
  );

  const selectField = useCallback((key: string, fallback: string) => {
    setActiveField({ key, fallback });
    setSaveError(null);
  }, []);

  const clearField = useCallback(() => {
    setActiveField(null);
  }, []);

  const discardAll = useCallback(() => {
    setDrafts((current) => {
      const next = { ...current };
      delete next[locale];
      return next;
    });
    setSaveError(null);
  }, [locale]);

  const exitEditMode = useCallback(() => {
    setIsEditMode(false);
    sessionStorage.removeItem(EDIT_MODE_SESSION_KEY);
    setDrafts({});
    setActiveField(null);
    setSaveError(null);
    setSaveSuccess(false);
  }, []);

  const enterEditMode = useCallback(() => {
    if (!isAdmin) return;
    setIsEditMode(true);
    sessionStorage.setItem(EDIT_MODE_SESSION_KEY, "1");
  }, [isAdmin]);

  const onSaved = useCallback((callback: () => Promise<void>) => {
    reloadRef.current = callback;
  }, []);

  const saveAll = useCallback(async () => {
    const currentDrafts = drafts[locale];
    if (!currentDrafts || !Object.keys(currentDrafts).length) return;

    setSaving(true);
    setSaveError(null);

    try {
      const items = Object.entries(currentDrafts).map(([key, value]) => ({
        key,
        locale,
        value,
        namespace: getNamespaceFromKey(key),
      }));

      await bulkSaveTranslations(items);

      setDrafts((current) => {
        const next = { ...current };
        delete next[locale];
        return next;
      });

      if (reloadRef.current) {
        await reloadRef.current();
      }

      setSaveSuccess(true);
      if (saveSuccessTimerRef.current) clearTimeout(saveSuccessTimerRef.current);
      saveSuccessTimerRef.current = setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }, [drafts, locale]);

  const value = useMemo(
    () => ({
      isAdmin,
      user,
      isEditMode,
      activeField,
      drafts,
      unsavedCount,
      saving,
      saveError,
      saveSuccess,
      setDraft,
      getDraftValue,
      isDraftDirty,
      selectField,
      clearField,
      saveAll,
      discardAll,
      exitEditMode,
      enterEditMode,
      onSaved,
    }),
    [
      isAdmin,
      user,
      isEditMode,
      activeField,
      drafts,
      unsavedCount,
      saving,
      saveError,
      saveSuccess,
      setDraft,
      getDraftValue,
      isDraftDirty,
      selectField,
      clearField,
      saveAll,
      discardAll,
      exitEditMode,
      enterEditMode,
      onSaved,
    ],
  );

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>;
}

export function useEditMode() {
  const context = useContext(EditModeContext);
  if (!context) {
    throw new Error("useEditMode must be used within EditModeProvider");
  }
  return context;
}

export function useEditModeOptional() {
  return useContext(EditModeContext);
}

export function getLocaleDrafts(
  drafts: LocaleDrafts,
  locale: Locale,
): TranslationDictionary {
  return drafts[locale] ?? {};
}
