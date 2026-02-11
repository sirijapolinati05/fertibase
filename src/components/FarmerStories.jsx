import { useEffect, useState, useMemo } from "react";
import { Loader2, PlayCircle } from "lucide-react";
import { motion } from "framer-motion";
import supabase from "../lib/supabaseClient";

export default function FarmerStories() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedState, setSelectedState] = useState("All");
  const [playingId, setPlayingId] = useState(null);

  /* ---------------- HELPERS ---------------- */

  const normalize = (val = "") =>
    val.toLowerCase().replace(/\./g, "").trim();

  const getYoutubeEmbed = (url) => {
    if (!url) return null;
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtu.be"))
        return `https://www.youtube.com/embed/${u.pathname.slice(1)}?autoplay=1&mute=1`;
      if (u.searchParams.get("v"))
        return `https://www.youtube.com/embed/${u.searchParams.get("v")}?autoplay=1&mute=1`;
      if (u.pathname.includes("/shorts/")) {
        const id = u.pathname.split("/shorts/")[1];
        return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1`;
      }
      return null;
    } catch {
      return null;
    }
  };

  /* ---------------- FETCH ---------------- */

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { data, error } = await supabase
          .from("testimonials")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setTestimonials(data || []);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    setPlayingId(null);
  }, [selectedState]);

  /* ---------------- FILTERED DATA ---------------- */

  const filteredTestimonials = useMemo(() => {
    if (selectedState === "All") return testimonials;

    return testimonials.filter((t) => {
      if (!t.state) return false;
      const dbState = normalize(t.state);
      const selected = normalize(selectedState);
      if (selected === "ap") return dbState.includes("andhra");
      return dbState === selected;
    });
  }, [testimonials, selectedState]);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-10 h-10 animate-spin text-[#6B412E]" />
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#6B412E] mb-4">
            Farmer Success Stories
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real experiences from farmers who trust FertiBase
          </p>
        </div>

        {/* FILTER TABS – PREMIUM */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            "All",
            "Andhra Pradesh",
            "Telangana",
            "Maharashtra",
            "Karnataka",
            "Gujarat",
          ].map((state) => {
            const active = selectedState === state;
            return (
              <motion.button
                key={state}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedState(state)}
                className={`relative px-5 py-2 rounded-full text-sm font-semibold border
                  transition-all duration-300 overflow-hidden
                  ${active
                    ? "bg-[#6B412E] text-white border-[#6B412E] shadow-lg"
                    : "bg-white border-gray-300 hover:bg-[#f3ede6]"
                  }`}
              >
                {/* Active glow */}
                {active && (
                  <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.35),transparent_60%)]" />
                )}
                <span className="relative z-10">
                  {state === "Andhra Pradesh" ? "A.P" : state}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="text-lg font-semibold">
              No testimonials available
              {selectedState !== "All" && ` in ${selectedState}`}
            </p>
          </div>
        )}

        {/* GRID */}
        {filteredTestimonials.length > 0 && (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredTestimonials.map((t) => {
              const embedUrl = getYoutubeEmbed(t.video_url);

              return (
                <motion.div
                  key={t.id}
                  whileHover={{
                    y: -10,
                    rotateX: 4,
                    rotateY: -4,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="
                    group bg-white rounded-3xl shadow-lg border
                    overflow-hidden transition-all duration-500
                    hover:shadow-2xl
                  "
                >
                  {/* IMAGE / VIDEO */}
                  <div
                    className="relative bg-[#F4EADF] flex justify-center items-center py-10 cursor-pointer"
                    onClick={() => {
                      if (!t.video_url) return;
                      setPlayingId((prev) => (prev === t.id ? null : t.id));
                    }}
                  >
                    <div className="relative w-[260px] aspect-[9/16] rounded-2xl overflow-hidden shadow-xl bg-black">
                      {playingId === t.id && embedUrl ? (
                        <iframe
                          src={embedUrl}
                          className="w-full h-full"
                          allow="autoplay; encrypted-media"
                          allowFullScreen
                        />
                      ) : (
                        <>
                          <img
                            src={t.image_url || t.image_src}
                            alt={t.name}
                            className="
                              w-full h-full object-cover
                              transition-transform duration-700
                              group-hover:scale-110
                            "
                          />

                          {t.video_url && (
                            <div className="absolute inset-0 flex items-center justify-center
                                            bg-black/30 group-hover:bg-black/40 transition">
                              <motion.div
                                whileHover={{ scale: 1.15 }}
                                className="w-16 h-16 rounded-full bg-white/90
                                           flex items-center justify-center
                                           shadow-xl"
                              >
                                <PlayCircle className="w-10 h-10 text-[#6B412E]" />
                              </motion.div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-slate-900">
                      {t.title}
                    </h3>

                    <p className="text-slate-600 text-sm line-clamp-3">
                      “{t.description}”
                    </p>

                    <div className="pt-3 border-t">
                      <p className="font-semibold text-slate-800">
                        {t.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {t.state}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
