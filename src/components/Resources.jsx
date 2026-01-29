import React, { useState, useMemo, useEffect } from "react";
import {
  FiDownload,
  FiArrowRight,
  FiX,
  FiPlay,
  FiShare2,
} from "react-icons/fi";
import supabase from "../lib/supabaseClient";

/* ----------------------------- HELPERS ----------------------------- */

const normalize = (v) => (v ?? "").toLowerCase().replace(/\s|_/g, "");

/* ----------------------------- COMPONENT ----------------------------- */

export default function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedType, setSelectedType] = useState("All");
  const [selectedMarketingType, setSelectedMarketingType] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [readMoreItem, setReadMoreItem] = useState(null);

  /* ----------------------------- FETCH ----------------------------- */

  useEffect(() => {
    const fetchResources = async () => {
      const { data, error } = await supabase
        .from("resources")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (!error) setResources(data || []);
      setLoading(false);
    };

    fetchResources();
  }, []);

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
        (r) =>
          r.title?.toLowerCase().includes(q) ||
          r.description?.toLowerCase().includes(q) ||
          r.detailed_description?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [resources, selectedType, selectedMarketingType, searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center py-20 text-slate-500">
        Loading resources…
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

  const marketingTabs = ["All", "Banner", "Brochure", "Flyer", "Standee"];

  /* ----------------------------- UI ----------------------------- */

  return (
    <div className="min-h-screen bg-[#FDFDFD]">
      <main className="max-w-7xl mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-[#741A1C]">Resources</h1>
          <p className="text-slate-600 mt-2">
            Webinars, guides, marketing materials & knowledge assets
          </p>
        </div>

        {/* TOP TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {topTabs.map((t) => (
            <button
              key={t}
              onClick={() => {
                setSelectedType(t);
                setSelectedMarketingType("All");
              }}
              className={`px-5 py-2 rounded-full text-sm font-semibold border flex items-center gap-2
                ${
                  selectedType === t
                    ? "bg-[#741A1C] text-white border-[#741A1C]"
                    : "bg-white text-[#741A1C] border-slate-200 hover:border-[#741A1C]"
                }`}
            >
              {t}
              <span className="text-xs bg-white/20 px-2 rounded-full">
                {categoryCounts[t] || 0}
              </span>
            </button>
          ))}
        </div>

        {/* MARKETING SUB FILTER */}
        {selectedType === "Marketing Materials" && (
          <div className="flex justify-center gap-3 mb-8 flex-wrap">
            {marketingTabs.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedMarketingType(m)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border
                  ${
                    selectedMarketingType === m
                      ? "bg-emerald-600 text-white"
                      : "bg-white border-slate-200 text-slate-600 hover:border-emerald-600"
                  }`}
              >
                {m} ({marketingCounts[m] || 0})
              </button>
            ))}
          </div>
        )}

        {/* SEARCH */}
        <div className="flex justify-center mb-10">
          <input
            placeholder="Search resources..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full max-w-xl px-5 py-3 rounded-xl border focus:ring-2 focus:ring-[#741A1C]/30 outline-none"
          />
        </div>

        {/* GRID */}
        {filteredResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredResources.map((item) => {
              const isWebinar =
                normalize(item.category) === "webinars";

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl border shadow-sm hover:shadow-lg transition flex flex-col overflow-hidden"
                >
                  {/* IMAGE */}
                  <div className="relative h-56">
                    <img
                      src={item.image_url || "/placeholder.png"}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />

                    {isWebinar && item.video_url && (
                      <button
                        onClick={() => setSelectedVideo(item.video_url)}
                        className="absolute inset-0 flex items-center justify-center bg-black/40"
                      >
                        <div className="w-14 h-14 bg-[#741A1C] text-white rounded-full flex items-center justify-center">
                          <FiPlay />
                        </div>
                      </button>
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="p-6 flex flex-col gap-3 flex-grow">
                    <span className="text-xs font-bold bg-slate-100 px-3 py-1 rounded-full w-fit">
                      {item.category}
                      {item.material_type && ` • ${item.material_type}`}
                    </span>

                    <h3 className="text-lg font-bold">{item.title}</h3>

                    <p className="text-slate-600 text-sm line-clamp-3">
                      {item.description}
                    </p>

                    <div className="pt-4 mt-auto border-t flex justify-between items-center">
                      {isWebinar ? (
                        <button
                          onClick={() => setSelectedVideo(item.video_url)}
                          className="text-[#741A1C] font-semibold flex items-center gap-2"
                        >
                          Watch Now <FiArrowRight />
                        </button>
                      ) : (
                        <button
                          onClick={() => setReadMoreItem(item)}
                          className="text-[#741A1C] font-semibold flex items-center gap-2"
                        >
                          Read More <FiArrowRight />
                        </button>
                      )}

                      <div className="flex gap-3 text-slate-400">
                        <FiShare2 />
                        {!isWebinar && item.file_url && (
                          <a href={item.file_url} download>
                            <FiDownload />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-slate-500">
            No resources found
          </div>
        )}
      </main>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6">
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

      {/* READ MORE MODAL */}
      {readMoreItem && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6">
          <div className="bg-white max-w-2xl w-full rounded-2xl p-8 relative">
            <button
              onClick={() => setReadMoreItem(null)}
              className="absolute top-4 right-4"
            >
              <FiX />
            </button>

            <h2 className="text-2xl font-black mb-2">
              {readMoreItem.title}
            </h2>

            <p className="text-sm text-slate-500 mb-4">
              {readMoreItem.category}
              {readMoreItem.material_type &&
                ` • ${readMoreItem.material_type}`}
            </p>

            <p className="text-slate-700 leading-relaxed mb-6">
              {readMoreItem.detailed_description ||
                readMoreItem.description}
            </p>

            {readMoreItem.file_url && (
              <a
                href={readMoreItem.file_url}
                download
                className="inline-flex items-center gap-2 bg-[#741A1C] text-white px-5 py-2 rounded-xl font-semibold"
              >
                <FiDownload /> Download
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
