import { useEffect, useMemo, useState } from "react";
import { Loader2, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import FarmerImage from "../assets/Farmer.png";
import { useTranslation } from "../i18n/useTranslation";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/api$/, "");

const getImageUrl = (url) => {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

const filterOptions = [
  { value: "All", label: "All" },
  { value: "Andhra Pradesh", label: "AP" },
  { value: "Telangana", label: "Telangana" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Tamil Nadu", label: "Tamilnadu" },
  { value: "Maharashtra", label: "Maharastra" },
  { value: "Uttar Pradesh", label: "UP" },
];

export default function FarmerStories() {
  const { language, t, td } = useTranslation();
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("All");
  const [playingId, setPlayingId] = useState(null);

  const normalize = (value = "") =>
    value.toLowerCase().replace(/\./g, "").trim();

  const getYoutubeEmbed = (url) => {
    if (!url) return null;

    try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtu.be")) {
        return `https://www.youtube.com/embed/${parsedUrl.pathname.slice(1)}?autoplay=1&mute=1`;
      }

      if (parsedUrl.searchParams.get("v")) {
        return `https://www.youtube.com/embed/${parsedUrl.searchParams.get("v")}?autoplay=1&mute=1`;
      }

      if (parsedUrl.pathname.includes("/shorts/")) {
        const shortId = parsedUrl.pathname.split("/shorts/")[1];
        return `https://www.youtube.com/embed/${shortId}?autoplay=1&mute=1`;
      }

      return null;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const apiUrl =
          import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/testimonials`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTestimonials(data || []);
      } catch (error) {
        console.warn("API failed to fetch testimonials", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    setPlayingId(null);
  }, [selectedState]);

  const getLocalizedField = (testimonial, field, fallback = "") => {
    const directLocalizedValue =
      testimonial?.[`${field}_${language}`] ||
      testimonial?.[`${field}${language.toUpperCase()}`];

    if (directLocalizedValue) {
      return directLocalizedValue;
    }

    return td(
      "testimonial",
      testimonial.id,
      field,
      testimonial?.[field] || fallback
    );
  };

  const filteredTestimonials = useMemo(() => {
    if (selectedState === "All") return testimonials;

    return testimonials.filter((testimonial) => {
      const stateValue = testimonial.state || testimonial.area || "";
      if (!stateValue) return false;

      const dbState = normalize(stateValue);
      const selected = normalize(selectedState);

      if (selected === "andhra pradesh") {
        return dbState.includes("andhra");
      }

      if (selected === "uttar pradesh") {
        return dbState.includes("uttar");
      }

      return dbState === selected;
    });
  }, [selectedState, testimonials]);

  const displayedTestimonials = useMemo(
    () =>
      filteredTestimonials.map((testimonial, index) => ({
        ...testimonial,
        renderKey: `${testimonial.id}-${index}`,
      })),
    [filteredTestimonials]
  );

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-10 w-10 animate-spin text-[#6B412E]" />
      </div>
    );
  }

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-5 md:px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-[32px] font-bold leading-[1.08] text-[#7b4a33] sm:text-[40px] md:text-[56px]">
            {t("stories_heading", "Farmer Success Stories")}
          </h2>
          <p className="mt-3 text-[16px] text-[#2e2621] sm:text-[18px] md:text-[24px]">
            {t(
              "stories_subtitle",
              "Real experiences from farmers who trust FertiBase"
            )}
          </p>
        </div>

        <div className="mb-10 flex gap-3 overflow-x-auto pb-2 md:mb-12 md:flex-wrap md:gap-4 md:overflow-visible md:pb-0">
          {filterOptions.map((option) => {
            const isActive = selectedState === option.value;

            return (
              <motion.button
                key={option.value}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedState(option.value)}
                className={`shrink-0 rounded-[10px] border px-5 py-2 text-[14px] font-medium transition-all duration-300 md:px-6 md:text-[15px] ${
                  isActive
                    ? "border-[#7b4a33] bg-[#7b4a33] text-white shadow-[0_10px_24px_rgba(123,74,51,0.18)]"
                    : "border-[#bc9985] bg-white text-[#7b4a33] hover:bg-[#faf3ed]"
                }`}
              >
                {option.value === "All"
                  ? t("stories_filter_all", option.label)
                  : option.label}
              </motion.button>
            );
          })}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="py-16 text-center text-slate-500">
            <p className="text-lg font-semibold">
              {t("stories_empty", "No testimonials available")}
              {selectedState !== "All" &&
                ` ${t("stories_empty_in", "in")} ${selectedState}`}
            </p>
          </div>
        )}

        {displayedTestimonials.length > 0 && (
          <div className="overflow-hidden">
            <div className="mb-4 px-1 md:hidden">
              <p className="text-sm font-medium text-[#7b4a33]">
                {t("stories_swipe_more", "Swipe to view more stories")}
              </p>
            </div>

            <div className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:gap-10 no-scrollbar">
              {displayedTestimonials.map((testimonial) => {
                const embedUrl = getYoutubeEmbed(testimonial.video_url);
                const title = getLocalizedField(testimonial, "title", "");
                const description = getLocalizedField(
                  testimonial,
                  "description",
                  testimonial.story || testimonial.season || ""
                );
                const farmerName = getLocalizedField(
                  testimonial,
                  "name",
                  title
                );

                return (
                  <motion.article
                    key={testimonial.renderKey}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="group w-[85vw] min-w-[85vw] shrink-0 snap-center md:w-[45vw] md:min-w-[45vw] lg:w-[500px] lg:min-w-[500px]"
                  >
                    <div
                      className="relative aspect-[1.1/1] cursor-pointer overflow-hidden border border-[#b58d78] bg-[#d8d0c8] sm:aspect-[1.25/1] md:aspect-[1.48/1]"
                      onClick={() => {
                        if (!testimonial.video_url) return;
                        setPlayingId((current) =>
                          current === testimonial.id ? null : testimonial.id
                        );
                      }}
                    >
                      {playingId === testimonial.id && embedUrl ? (
                        <iframe
                          src={embedUrl}
                          title={title}
                          className="h-full w-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : (
                        <>
                          <img
                            src={
                              getImageUrl(testimonial.image_url) ||
                              getImageUrl(testimonial.image_src) ||
                              getImageUrl(testimonial.image) ||
                              FarmerImage
                            }
                            alt={farmerName}
                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />

                          <div className="absolute inset-0 bg-black/20" />

                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-12 w-12 items-center justify-center border-2 border-white/95 bg-black/20 backdrop-blur-[2px]">
                              <PlayCircle className="h-8 w-8 text-white" />
                            </div>
                          </div>

                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/38 to-transparent px-4 pb-4 pt-16 text-white sm:px-6 sm:pb-5 sm:pt-20">
                            <h3 className="text-[20px] font-bold leading-none md:text-[24px]">
                              {title}
                            </h3>
                            <p className="mt-2 text-[13px] leading-snug text-white/90 md:text-[15px]">
                              {description}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
