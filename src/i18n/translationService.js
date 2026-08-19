import { defaultTranslations } from "./defaultTranslations";
import { bundledTranslations } from "./bundledTranslations";
import { DEFAULT_LANGUAGE } from "./constants";

export async function fetchTranslations() {
  try {
    const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
    const response = await fetch(`${apiUrl}/translations`);
    if (response.ok) {
      const data = await response.json();
      return (data || []).reduce((accumulator, row) => {
        accumulator[row.key] = {
          en: row.en || defaultTranslations[row.key] || "",
          te: row.te || "",
          hi: row.hi || "",
          mr: row.mr || "",
        };
        return accumulator;
      }, {});
    }
  } catch (error) {
    console.warn("Translations fetch failed, falling back to local", error);
  }
  return {};
}

export function resolveTranslation({
  key,
  language,
  translations,
  fallback,
}) {
  const entry = translations[key];

  if (!entry) {
    return (
      bundledTranslations[language]?.[key] ||
      fallback ||
      defaultTranslations[key] ||
      key
    );
  }

  const localizedValue = entry[language];
  if (localizedValue) {
    return localizedValue;
  }

  return (
    bundledTranslations[language]?.[key] ||
    entry[DEFAULT_LANGUAGE] ||
    fallback ||
    defaultTranslations[key] ||
    key
  );
}
