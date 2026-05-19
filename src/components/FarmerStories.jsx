import { useEffect, useMemo, useState } from "react";
import { Loader2, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import supabase from "../lib/supabaseClient";
import FarmerImage from "../assets/Farmer.png";

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
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (error) {
        console.error("Failed to load testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    setPlayingId(null);
  }, [selectedState]);

  const filteredTestimonials = useMemo(() => {
    if (selectedState === "All") return testimonials;

    return testimonials.filter((testimonial) => {
      if (!testimonial.state) return false;

      const dbState = normalize(testimonial.state);
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

  const displayedTestimonials = useMemo(() => {
    if (filteredTestimonials.length === 0) return [];

    if (filteredTestimonials.length === 1) {
      return [
        { ...filteredTestimonials[0], renderKey: `${filteredTestimonials[0].id}-primary` },
        { ...filteredTestimonials[0], renderKey: `${filteredTestimonials[0].id}-duplicate` },
      ];
    }

    return filteredTestimonials.slice(0, 2).map((testimonial, index) => ({
      ...testimonial,
      renderKey: `${testimonial.id}-${index}`,
    }));
  }, [filteredTestimonials]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="h-10 w-10 animate-spin text-[#6B412E]" />
      </div>
    );
  }

  return (
    <section className="bg-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-6">
        <div className="mb-10 max-w-2xl">
          <h2 className="text-[40px] font-bold leading-[1.05] text-[#7b4a33] md:text-[56px]">
            Farmer Success Stories
          </h2>
          <p className="mt-3 text-[18px] text-[#2e2621] md:text-[24px]">
            Real experiences from farmers who trust FertiBase
          </p>
        </div>

        <div className="mb-12 flex flex-wrap gap-4">
          {filterOptions.map((option) => {
            const isActive = selectedState === option.value;

            return (
              <motion.button
                key={option.value}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedState(option.value)}
                className={`rounded-[10px] border px-6 py-2 text-[15px] font-medium transition-all duration-300 ${
                  isActive
                    ? "border-[#7b4a33] bg-[#7b4a33] text-white shadow-[0_10px_24px_rgba(123,74,51,0.18)]"
                    : "border-[#bc9985] bg-white text-[#7b4a33] hover:bg-[#faf3ed]"
                }`}
              >
                {option.label}
              </motion.button>
            );
          })}
        </div>

        {filteredTestimonials.length === 0 && (
          <div className="py-16 text-center text-slate-500">
            <p className="text-lg font-semibold">
              No testimonials available
              {selectedState !== "All" && ` in ${selectedState}`}
            </p>
          </div>
        )}

        {displayedTestimonials.length > 0 && (
          <div className="grid gap-10 md:grid-cols-2">
            {displayedTestimonials.map((testimonial) => {
              const embedUrl = getYoutubeEmbed(testimonial.video_url);
              const title = testimonial.title || "copious NPK";
              const description =
                testimonial.description ||
                '"This is the most commonly used product"';

              return (
                <motion.article
                  key={testimonial.renderKey}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="group"
                >
                  <div
                    className="relative aspect-[1.48/1] cursor-pointer overflow-hidden bg-[#d8d0c8]"
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
                          src={FarmerImage}
                          alt={testimonial.name || title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />

                        <div className="absolute inset-0 bg-black/20" />

                        {testimonial.video_url && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-md border-2 border-white/95 bg-black/20 backdrop-blur-[2px]">
                              <PlayCircle className="h-8 w-8 text-white" />
                            </div>
                          </div>
                        )}

                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/38 to-transparent px-6 pb-5 pt-20 text-white">
                          <h3 className="text-[22px] font-bold leading-none md:text-[24px]">
                            {title}
                          </h3>
                          <p className="mt-2 text-[14px] leading-tight text-white/90 md:text-[15px]">
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
        )}
      </div>
    </section>
  );
}
