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
    const match = url.match(
      /(?:youtu.be\/|youtube.com\/(?:watch\?v=|embed\/))([^&]+)/
    );
    return match
      ? `https://www.youtube.com/embed/${match[1]}?autoplay=1`
      : null;
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

  /* Stop video on filter change */
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

      // Handle A.P / Andhra Pradesh
      if (selected === "ap") {
        return dbState.includes("Andhra");
      }

      return dbState === selected;
    });
  }, [testimonials, selectedState]);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="w-10 h-10 animate-spin text-[#741A1C]" />
      </div>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-bold text-[#741A1C] mb-4">
            Farmer Success Stories
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real experiences from farmers who trust FertiBase
          </p>
        </div>

        {/* FILTER */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            "All",
            "Andhra Pradesh",
            "Telangana",
            "Maharashtra",
            "Karnataka",
            "Gujarat",
          ].map((state) => (
            <button
              key={state}
              onClick={() => setSelectedState(state)}
              className={`px-5 py-2 rounded-full text-sm font-medium border transition
                ${
                  selectedState === state
                    ? "bg-[#f3ede6] border-[#741A1C]"
                    : "bg-white border-gray-300 hover:bg-[#f3ede6]"
                }`}
            >
              {state === "Andhra Pradesh" ? "A.P" : state}
            </button>
          ))}
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
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-3xl shadow-lg border overflow-hidden"
                >
                  {/* IMAGE / VIDEO */}
                  <div className="relative bg-[#F4EADF] flex justify-center items-center py-10">
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
                            className="w-full h-full object-cover"
                          />

                          {t.video_url && (
                            <button
                              onClick={() => setPlayingId(t.id)}
                              className="absolute inset-0 flex items-center justify-center
                                         bg-black/30 hover:bg-black/40 transition"
                            >
                              <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                                <PlayCircle className="w-10 h-10 text-[#741A1C]" />
                              </div>
                            </button>
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
                        FertiBase Farmer
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
