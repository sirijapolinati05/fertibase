import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  FiDownload,
  FiArrowRight,
  FiX,
  FiPlay,
  FiShare2,
} from "react-icons/fi";
import { useTranslation } from "../i18n/useTranslation";
import { getLocalizedEntityField } from "../i18n/entityTranslations";

/* ----------------------------- HELPERS ----------------------------- */

const normalize = (v) => (v ?? "").toLowerCase().replace(/\s|_/g, "");

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/api$/, "");

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

/* ----------------------------- COMPONENT ----------------------------- */

export default function Resources() {
  const { language, t, td } = useTranslation();
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const [expandedItemId, setExpandedItemId] = useState(null);

  const [selectedType, setSelectedType] = useState("All");
  const [selectedMarketingType, setSelectedMarketingType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [readMoreItem, setReadMoreItem] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const [mobileTabsExpanded, setMobileTabsExpanded] = useState(false);
  const [mobileMarketingExpanded, setMobileMarketingExpanded] = useState(false);

  const [playingVideoId, setPlayingVideoId] = useState(null);

  const MAX_MOBILE_TABS = 4; // 2 rows × 2 columns

  const scrollRef = useRef(null);
  const isPausedRef = useRef(false);

  const selectedLanguage = "Marathi";

  const getLanguageImage = (item) => {
    let url = null;
    switch (selectedLanguage) {
      case "Telugu":
        url = item.image_url_telugu || item.image_url_te || item.image_url; break;
      case "Marathi":
        url = item.image_url_marathi || item.image_url_mr || item.image_url_telugu || item.image_url; break;
      case "Kannada":
        url = item.image_url_kannada || item.image_url_kn || item.image_url_telugu || item.image_url; break;
      case "Gujarati":
        url = item.image_url_gujarati || item.image_url_gu || item.image_url_telugu || item.image_url; break;
      case "en":
        url = item.image_url_english || item.image_url || item.image_url_telugu; break;
      case "hi":
        url = item.image_url_hindi || item.image_url_hi || item.image_url_telugu; break;
      case "mr":
        url = item.image_url_marathi || item.image_url_mr || item.image_url_telugu; break;
      case "te":
      default:
        url = item.image_url_telugu || item.image_url_te || item.image_url; break;
    }
    return getImageUrl(url);
  };

  const localizeResourceField = (item, field, fallback = "") =>
    getLocalizedEntityField({
      item,
      field,
      language,
      td,
      namespace: "resource",
      fallback,
    });

  const getSafeResourceText = (item, field, fallback = "") => {
    const value = localizeResourceField(item, field, fallback);

    if (
      typeof value === "string" &&
      item?.id &&
      value.trim() === `resource.${item.id}.${field}`
    ) {
      return fallback;
    }

    return value;
  };

  const getResourceCategoryLabel = (category) => {
    const categoryKeyMap = {
      All: "resources_tab_all",
      Webinars: "resources_tab_webinars",
      "Technical Guides": "resources_tab_technical_guides",
      "Marketing Materials": "resources_tab_marketing_materials",
      Posters: "resources_tab_posters",
      PPTs: "resources_tab_ppts",
    };

    return t(categoryKeyMap[category] || "", category);
  };

  const getMarketingTypeLabel = (materialType) => {
    const materialKeyMap = {
      All: "resources_tab_all",
      Banners: "resources_material_banners",
      Brochures: "resources_material_brochures",
      Flyers: "resources_material_flyers",
      Standees: "resources_material_standees",
      Other: "resources_material_other",
    };

    return t(materialKeyMap[materialType] || "", materialType);
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;

    // YouTube
    if (url.includes("youtube.com/watch")) {
      const id = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }

    if (url.includes("youtu.be")) {
      const id = url.split("/").pop();
      return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    }

    return url; // fallback
  };

  const handleShare = async (item) => {
    const langImage = getLanguageImage(item);

    const url =
      langImage ||
      item.file_url ||
      item.video_url ||
      window.location.href;

    if (navigator.share) {
      await navigator.share({
        title: item.title,
        text: item.description || item.title,
        url,
      });
    } else {
      await navigator.clipboard.writeText(url);
      alert("Link copied to clipboard");
    }
  };

  // const langImage = getLanguageImage(img);

  /* ----------------------------- FETCH ----------------------------- */

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/resources`);
        if (!response.ok) throw new Error("Failed to fetch resources");
        const data = await response.json();
        setResources(data || []);
      } catch (err) {
        console.error("Resources fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  useEffect(() => {
    if (!selectedImage) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  /* ----------------------------- COUNTS ----------------------------- */

  const categoryCounts = useMemo(() => {
    const counts = { All: resources.length };
    resources.forEach((r) => {
      if (!r.category) return;
      counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts;
  }, [resources]);

  const marketingCounts = useMemo(() => {
    const counts = { All: 0 };
    resources.forEach((r) => {
      if (normalize(r.category) !== "marketingmaterials") return;
      const t = r.material_type || "Other";
      counts[t] = (counts[t] || 0) + 1;
      counts.All++;
    });
    return counts;
  }, [resources]);

  /* ----------------------------- FILTER ----------------------------- */

  const filteredResources = useMemo(() => {
    let list = [...resources];

    if (selectedType !== "All") {
      list = list.filter(
        (r) => normalize(r.category) === normalize(selectedType)
      );
    }

    if (
      selectedType === "Marketing Materials" &&
      selectedMarketingType !== "All"
    ) {
      list = list.filter(
        (r) =>
          normalize(r.material_type) ===
          normalize(selectedMarketingType)
      );
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) => {
          const localizedTitle = getSafeResourceText(r, "title", r.title || "");
          const localizedDescription = getSafeResourceText(
            r,
            "description",
            r.description || ""
          );
          const localizedDetailedDescription = getSafeResourceText(
            r,
            "detailed_description",
            r.detailed_description || ""
          );
          const localizedCategory = getResourceCategoryLabel(r.category || "");
          const localizedMaterialType = getMarketingTypeLabel(
            r.material_type || ""
          );

          return (
            localizedTitle.toLowerCase().includes(q) ||
            localizedDescription.toLowerCase().includes(q) ||
            localizedDetailedDescription.toLowerCase().includes(q) ||
            localizedCategory.toLowerCase().includes(q) ||
            localizedMaterialType.toLowerCase().includes(q)
          );
        }
      );
    }

    return list;
  }, [resources, selectedType, selectedMarketingType, searchQuery, language, td, t]);

  /* ---------------- MOBILE AUTO SCROLL ---------------- */

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let rafId;
    const speed = 0.35;

    const autoScroll = () => {
      if (!isPausedRef.current && window.innerWidth < 640) {
        container.scrollLeft += speed;

        if (
          container.scrollLeft + container.clientWidth >=
          container.scrollWidth - 1
        ) {
          container.scrollLeft = 0;
        }
      }
      rafId = requestAnimationFrame(autoScroll);
    };

    rafId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(rafId);
  }, [filteredResources]);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-slate-500">
        {t("resources_loading", "Loading resources...")}
      </div>
    );
  }

  const topTabs = [
    "All",
    "Webinars",
    "Technical Guides",
    "Marketing Materials",
    "Posters",
    "PPTs",
  ];

  const marketingTabs = ["All", "Banners", "Brochures", "Flyers", "Standees"];

  const downloadResource = async (resource, langImage) => {
    try {
      const res = await fetch(langImage);
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;

      a.download = `${resource.title
        .replace(/\s+/g, "_")
        .toLowerCase()}_${selectedLanguage.toLowerCase()}.jpg`;

      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download resource");
    }
  };

  /* ----------------------------- UI ----------------------------- */

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <main className="max-w-7xl mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="mb-10">
          <div className="text-center">
            <h1 className="text-4xl font-black text-[#6B412E]">
              {t("resources_heading", "Resources")}
            </h1>
            <p className="text-slate-600 mt-2">
              {t(
                "resources_subtitle",
                "Webinars, guides, marketing materials & knowledge assets"
              )}
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="flex justify-center mb-10">
          <input
            placeholder={t("resources_search_placeholder", "Search resources...")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xl px-5 py-3 rounded-xl border focus:ring-2 focus:ring-[#6B412E]/30 outline-none"
          />
        </div>

        {/* ---------------- MOBILE TOP FILTERS (STICKY) ---------------- */}
        <div className="
  md:hidden
  sticky top-[56px]
  z-50
  bg-[#F7EDE5]
  rounded-b-2xl
  pb-4
  mb-4
  shadow-sm
">
          <div className="grid grid-cols-2 gap-3">
            {(mobileTabsExpanded ? topTabs : topTabs.slice(0, MAX_MOBILE_TABS)).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setSelectedType(t);
                  setSelectedMarketingType("All");
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition
          ${selectedType === t
                    ? "bg-[#6B412E] text-white border-[#6B412E]"
                    : "bg-white text-[#6B412E] border-[#E5CFC2]"
                  }`}
              >
                {getResourceCategoryLabel(t)} ({categoryCounts[t] || 0})
              </button>
            ))}
          </div>

          {topTabs.length > MAX_MOBILE_TABS && (
            <div className="mt-4 text-center">
              <button
                onClick={() => setMobileTabsExpanded(!mobileTabsExpanded)}
                className="text-sm font-semibold text-[#6B412E]"
              >
                    {mobileTabsExpanded
                      ? t("common_view_less", "View Less")
                      : t("common_view_more", "View More")}
              </button>
            </div>
          )}
        </div>

        {/* ---------------- DESKTOP TOP TABS (UNCHANGED) ---------------- */}
        <div className="hidden md:block sticky top-[72px] pt-6 z-40 bg-[#FDFDFD] pb-4">
          <div className="flex flex-wrap justify-center gap-3">
            {topTabs.map((t) => (
              <button
                key={t}
                onClick={() => {
                  setSelectedType(t);
                  setSelectedMarketingType("All");
                }}
                className={`px-5 py-2 rounded-full text-sm font-semibold border flex items-center gap-2
          ${selectedType === t
                    ? "bg-[#6B412E] text-white border-[#6B412E]"
                    : "bg-white text-[#6B412E] border-slate-200 hover:border-[#6B412E]"
                  }`}
              >
                {getResourceCategoryLabel(t)}
                <span className="text-xs bg-white/20 px-2 rounded-full">
                  {categoryCounts[t] || 0}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ---------------- MOBILE MARKETING FILTERS (STICKY) ---------------- */}
        {selectedType === "Marketing Materials" && (
          <>
            <div className="md:hidden sticky top-[240px] z-40 bg-[#F7EDE5] rounded-2xl pt-2 mb-8 shadow-sm">
              <div className="grid grid-cols-2 gap-3">
                {(mobileMarketingExpanded
                  ? marketingTabs
                  : marketingTabs.slice(0, MAX_MOBILE_TABS)
                ).map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMarketingType(m)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold border transition
              ${selectedMarketingType === m
                        ? "bg-[#6B412E] text-white border-[#6B412E]"
                        : "bg-white text-[#6B412E] border-[#E5CFC2]"
                      }`}
                  >
                    {getMarketingTypeLabel(m)} ({marketingCounts[m] || 0})
                  </button>
                ))}
              </div>

              {marketingTabs.length > MAX_MOBILE_TABS && (
                <div className="mt-4 text-center">
                  <button
                    onClick={() => setMobileMarketingExpanded(!mobileMarketingExpanded)}
                    className="text-sm font-semibold text-[#6B412E]"
                  >
                    {mobileMarketingExpanded
                      ? t("common_view_less", "View Less")
                      : t("common_view_more", "View More")}
                  </button>
                </div>
              )}
            </div>

            {/* DESKTOP MARKETING FILTERS */}
            <div className="hidden md:block sticky top-[140px] z-30 pt-6 pb-2 bg-[#FDFDFD]">
              <div className="flex justify-center gap-3 mb-2 flex-wrap">
                {marketingTabs.map((m) => (
                  <button
                    key={m}
                    onClick={() => setSelectedMarketingType(m)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold border
              ${selectedMarketingType === m
                        ? "bg-[#6B412E] text-white border-[#6B412E]"
                        : "bg-white text-[#6B412E] border-slate-200 hover:border-[#6B412E]"
                      }`}
                  >
                    {getMarketingTypeLabel(m)} ({marketingCounts[m] || 0})
                  </button>
                ))}
              </div>
            </div>
          </>
        )}


        {/* GRID */}
        {filteredResources.length === 0 ? (
          <div className="text-center py-20 text-slate-500">
            {t("resources_empty_prefix", "No resources found in")}{" "}
            {getResourceCategoryLabel(selectedType)}
          </div>
        ) : selectedType === "Posters" ? (

          /* 🖼️ POSTERS VIEW */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredResources.map((img) => {
              const langImage = getLanguageImage(img);

              return (
                <div
                  key={img.id}
                  className="group relative rounded-2xl flex flex-col
      border-2 border-[#E8D5C9] bg-[#EFE3D8] shadow-lg overflow-hidden"
                >
                  {/* IMAGE */}
                  <div className="flex items-center justify-center m-6 mb-4 h-48 rounded-xl bg-white">
                    <img
                      src={langImage || "/placeholder.png"}
                      alt={localizeResourceField(img, "title", img.title)}
                      className="max-h-40 max-w-40 w-full cursor-zoom-in object-contain"
                      onClick={() =>
                        langImage &&
                        setSelectedImage({
                          src: langImage,
                          alt: img.title,
                        })
                      }
                    />
                  </div>

                  {/* FOOTER */}
                  <div className="px-6 pb-6 mt-auto flex items-center justify-between">
                    <div className="text-sm font-semibold truncate">
                      {localizeResourceField(img, "title", img.title)}
                    </div>

                    {langImage && (
                      <button
                        onClick={() => downloadResource(img, langImage)}
                        className="px-4 py-2 rounded-lg text-sm font-semibold bg-white text-[#6B412E] hover:bg-slate-100 transition"
                      >
                        <FiDownload size={16} />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        ) : (

          /* 📄 DEFAULT RESOURCES VIEW */
          <div
            ref={scrollRef}
            onMouseEnter={() => (isPausedRef.current = true)}
            onMouseLeave={() => (isPausedRef.current = false)}
            onTouchStart={() => (isPausedRef.current = true)}
            onTouchEnd={() => (isPausedRef.current = false)}
            className="
    flex gap-6 pb-6
    overflow-x-auto
    snap-x snap-mandatory
    scrollbar-hide

    md:grid md:grid-cols-2
    lg:grid-cols-3
    md:overflow-visible
  "
          >
            {filteredResources.map((item) => {
              const isWebinar = normalize(item.category) === "webinars";
              const isMarketing = normalize(item.category) === "marketingmaterials";
              const isTechnical = normalize(item.category) === "technicalguides";
              const isPoster = normalize(item.category) === "posters";
              const isPPT = normalize(item.category) === "ppts";

              const isExpanded = expandedItemId === item.id;
              const isPlaying = playingVideoId === item.id;

              // const langImage = getLanguageImage(img);
              const langImage = getLanguageImage(item);

              return (
                <div
                  key={item.id}
                  className="
    group relative bg-white rounded-2xl border
    min-w-[280px] md:min-w-0
    snap-start
    shadow-sm
    transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
    hover:-translate-y-2
    hover:shadow-[0_25px_45px_-15px_rgba(116,26,28,0.35)]
    overflow-hidden
  "
                >
                  {/* IMAGE / VIDEO */}
                  {!isPPT && (
                    <div className="relative h-56 overflow-hidden bg-[#f6efe8]">
                      {isWebinar && isPlaying ? (
                        <iframe
                          src={getEmbedUrl(item.video_url)}
                          className="w-full h-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : (
                        <>
                          <img
                            src={langImage || "/placeholder.png"}
                            alt={localizeResourceField(item, "title", item.title)}
                            onClick={() =>
                              langImage &&
                              setSelectedImage({
                                src: langImage,
                                alt: item.title,
                              })
                            }
                            className="
  w-full h-full object-cover
  cursor-zoom-in
  transition-all duration-700 ease-out
  group-hover:brightness-105
  group-hover:contrast-105
  group-hover:scale-[1.03]
"
                          />

                          {isWebinar && (
                            <button
                              onClick={() => setPlayingVideoId(item.id)}
                              className="absolute inset-0 flex items-center justify-center bg-black/40"
                            >
                              <div className="w-14 h-14 bg-[#6B412E] text-white rounded-full flex items-center justify-center">
                                <FiPlay />
                              </div>
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full w-fit">
                      {getResourceCategoryLabel(item.category)}
                      {item.material_type &&
                        ` • ${getMarketingTypeLabel(item.material_type)}`}
                    </span>

                    <h3 className="text-lg font-bold">
                      {getSafeResourceText(item, "title", item.title)}
                    </h3>

                    <p className="text-slate-600 text-sm">
                      {getSafeResourceText(item, "description", "")}
                    </p>

                    {/* EXPAND DETAILS */}
                    {(isMarketing || isTechnical) && isExpanded && (
                      <p className="text-slate-700 text-sm leading-relaxed">
                        {localizeResourceField(
                          item,
                          "detailed_description",
                          item.detailed_description
                        )}
                      </p>
                    )}

                    <div className="pt-4 mt-auto border-t flex justify-between items-center">
                      {/* LEFT ACTION */}
                      {isWebinar ? (
                        <button
                          onClick={() => setPlayingVideoId(item.id)}
                          className="text-[#6B412E] font-semibold flex items-center gap-2"
                        >
                          {t("resources_watch_now", "Watch Now")} <FiArrowRight />
                        </button>
                      ) : !isPPT ? (
                        <button
                          onClick={() =>
                            setExpandedItemId(isExpanded ? null : item.id)
                          }
                          className="text-[#6B412E] font-semibold flex items-center gap-2"
                        >
                          {isExpanded
                            ? t("resources_hide_details", "Hide Details")
                            : t("resources_read_more", "Read More")}
                          <FiArrowRight />
                        </button>
                      ) : (
                        <span className="text-sm text-slate-500 font-semibold">
                          {t("resources_ppt_file", "PPT File")}
                        </span>
                      )}

                      {/* RIGHT ACTIONS */}
                      <div className="flex gap-4 text-slate-400">
                        <button onClick={() => handleShare(item)}>
                          <FiShare2 />
                        </button>

                        {langImage && (
                          <button onClick={() => downloadResource(item, langImage)}>
                            <FiDownload />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[200] bg-black/80 flex items-center justify-center p-6">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl">
            <iframe
              src={`${selectedVideo}?autoplay=1&rel=0`}
              className="w-full h-full"
              allowFullScreen
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute top-4 right-4 bg-white rounded-full p-2"
            >
              <FiX />
            </button>
          </div>
        </div>
      )}

      {/* IMAGE MODAL */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 sm:p-6"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute right-4 top-4 rounded-full bg-white p-2 text-[#6B412E] shadow-lg"
            aria-label="Close image preview"
          >
            <FiX />
          </button>

          <img
            src={selectedImage.src}
            alt={selectedImage.alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[90vh] max-w-[95vw] rounded-2xl bg-white object-contain shadow-2xl"
          />
        </div>
      )}

      {/* READ MORE MODAL */}
      {readMoreItem && (
        <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-6">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-8 relative">
            <button
              onClick={() => setReadMoreItem(null)}
              className="absolute top-4 right-4"
            >
              <FiX />
            </button>

            <h2 className="text-2xl font-black mb-2">
              {getSafeResourceText(
                readMoreItem,
                "title",
                readMoreItem.title
              )}
            </h2>

            <p className="text-sm text-slate-500 mb-4">
              {getResourceCategoryLabel(readMoreItem.category)}
              {readMoreItem.material_type &&
                ` • ${getMarketingTypeLabel(readMoreItem.material_type)}`}
            </p>

            <p className="text-slate-700 leading-relaxed mb-6">
              {getSafeResourceText(
                readMoreItem,
                "detailed_description",
                readMoreItem.detailed_description ||
                  readMoreItem.description
              )}
            </p>

            {readMoreItem.file_url && (
              <a
                href={readMoreItem.file_url}
                download
                className="inline-flex items-center gap-2 bg-[#6B412E] text-white px-5 py-2 rounded-xl font-semibold"
              >
                <FiDownload />{t("common_download", "Download")}
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
