import supabase from "../lib/supabaseClient";
import { defaultTranslations } from "./defaultTranslations";
import { bundledTranslations } from "./bundledTranslations";
import { DEFAULT_LANGUAGE } from "./constants";

export async function fetchTranslations() {
  const { data, error } = await supabase
    .from("translations")
    .select("key, en, te, hi, mr");

  if (error) {
    throw error;
  }

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
