import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from "./constants";
import { defaultTranslations } from "./defaultTranslations";
import {
  fetchTranslations,
  resolveTranslation,
} from "./translationService";

export const LanguageContext = createContext(null);

function getStoredLanguage() {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const storedLanguage = window.localStorage.getItem(
    LANGUAGE_STORAGE_KEY
  );

  return SUPPORTED_LANGUAGES.some(
    ({ code }) => code === storedLanguage
  )
    ? storedLanguage
    : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getStoredLanguage);
  const [translations, setTranslations] = useState({});
  const [isLoadingTranslations, setIsLoadingTranslations] = useState(true);
  const [translationError, setTranslationError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadTranslations() {
      try {
        setIsLoadingTranslations(true);
        const data = await fetchTranslations();

        if (!isMounted) {
          return;
        }

        setTranslations(data);
        setTranslationError(null);
      } catch (error) {
        if (!isMounted) {
          return;
        }

        console.error("Failed to load translations:", error);
        setTranslations({});
        setTranslationError(error);
      } finally {
        if (isMounted) {
          setIsLoadingTranslations(false);
        }
      }
    }

    loadTranslations();

    return () => {
      isMounted = false;
    };
  }, []);

  const setLanguage = useCallback((nextLanguage) => {
    setLanguageState(nextLanguage);

    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        LANGUAGE_STORAGE_KEY,
        nextLanguage
      );
    }
  }, []);

  const t = useCallback(
    (key, fallback = "") =>
      resolveTranslation({
        key,
        language,
        translations,
        fallback,
      }),
    [language, translations]
  );

  const td = useCallback(
    (namespace, identifier, field, fallback = "") =>
      t(`${namespace}.${identifier}.${field}`, fallback),
    [t]
  );

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      td,
      translations,
      supportedLanguages: SUPPORTED_LANGUAGES,
      isLoadingTranslations,
      translationError,
      defaultTranslations,
    }),
    [
      language,
      setLanguage,
      t,
      td,
      translations,
      isLoadingTranslations,
      translationError,
    ]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

