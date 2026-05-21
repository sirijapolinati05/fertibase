export function getLocalizedEntityField({
  item,
  field,
  language,
  td,
  namespace,
  fallback = "",
}) {
  if (!item) {
    return fallback;
  }

  const directLocalizedValue =
    item[`${field}_${language}`] ||
    item[`${field}${language.toUpperCase()}`];

  if (directLocalizedValue) {
    return directLocalizedValue;
  }

  if (item.id != null && typeof td === "function") {
    return td(namespace, item.id, field, item[field] || fallback);
  }

  return item[field] || fallback;
}

export function getLocalizedEntityList({
  item,
  field,
  language,
  td,
  namespace,
  fallback = [],
}) {
  if (!item) {
    return fallback;
  }

  const directLocalizedValue =
    item[`${field}_${language}`] ||
    item[`${field}${language.toUpperCase()}`];

  if (Array.isArray(directLocalizedValue) && directLocalizedValue.length > 0) {
    return directLocalizedValue;
  }

  const baseList = Array.isArray(item[field]) ? item[field] : fallback;

  return baseList.map((entry, index) => {
    if (item.id != null && typeof td === "function") {
      return td(namespace, item.id, `${field}_${index}`, entry);
    }

    return entry;
  });
}
