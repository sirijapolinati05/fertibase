// components/ProductModal.jsx
import React, { useState, useEffect } from "react";
import {
  X,
  Check,
  ArrowRight,
  Droplet,
  Leaf,
  Sprout,
  Calendar,
  Package,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductModal({ isOpen, onClose, productData }) {
  const [activeTab, setActiveTab] = useState("overview");

  /* 🔒 Disable background scroll */
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [isOpen]);

  if (!isOpen || !productData) return null;

  const {
    name,
    category,
    sub_category,
    description,
    key_highlights = [],
    crop_benefits = [],
    product_advantages = [],
    recommended_crops = [],
    application_timing,
    recommended_dosage,
    application_details,
    image_url,
  } = productData;

  const tabs = [
    { id: "overview", label: "Overview", icon: "📋" },
    { id: "benefits", label: "Benefits", icon: "🌟" },
    { id: "usage", label: "Usage", icon: "🌱" },
    { id: "crops", label: "Crops", icon: "🌾" },
  ];

  /* ---------------- TAB CONTENT ---------------- */

  const Card = ({ children }) => (
    <div
      className="
        group relative p-6 rounded-2xl border bg-white
        transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
        hover:-translate-y-1 hover:shadow-[0_25px_45px_-15px_rgba(116,26,28,0.35)]
        overflow-hidden
      "
    >
      {/* Glow layer */}
      <div className="
        absolute inset-0 opacity-0 group-hover:opacity-100
        transition-opacity duration-500
        bg-[radial-gradient(circle_at_30%_20%,rgba(116,26,28,0.12),transparent_60%)]
        pointer-events-none
      " />
      <div className="relative z-10">{children}</div>
    </div>
  );

  const EmptyState = ({ text }) => (
  <Card>
    <p className="text-gray-500 italic text-center">{text}</p>
  </Card>
);

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Leaf className="text-[#6B412E]" /> Product Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {description || "No description available."}
              </p>
            </Card>

            {application_timing && (
              <Card>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 bg-[#6B412E] text-white rounded-full flex items-center justify-center">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Application Stage</p>
                    <p className="font-semibold text-[#6B412E]">
                      {application_timing}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {key_highlights.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Key Highlights</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {key_highlights.map((item, i) => (
                    <Card key={i}>
                      <div className="flex gap-3">
                        <Check className="text-[#6B412E]" />
                        <span>{item}</span>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "benefits":
  if (
    crop_benefits.length === 0 &&
    product_advantages.length === 0
  ) {
    return <EmptyState text="No benefits available for this product." />;
  }

  return (
    <div className="space-y-6">
      {crop_benefits.length > 0 && (
        <Card>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sprout className="text-[#6B412E]" /> Crop Benefits
          </h3>
          <ul className="space-y-3">
            {crop_benefits.map((b, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-2 h-2 bg-[#6B412E] rounded-full mt-2" />
                {b}
              </li>
            ))}
          </ul>
        </Card>
      )}

      {product_advantages.length > 0 && (
        <div className="grid md:grid-cols-2 gap-4">
          {product_advantages.map((a, i) => (
            <Card key={i}>
              <Check className="text-[#6B412E] mb-2" />
              <p>{a}</p>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  case "usage":
  if (!recommended_dosage && !application_details) {
    return <EmptyState text="Usage information is not available yet." />;
  }

  return (
    <div className="space-y-6">
      {recommended_dosage && (
        <Card>
          <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
            <Droplet className="text-[#6B412E]" /> Recommended Dosage
          </h3>
          <p>{recommended_dosage}</p>
        </Card>
      )}

      {application_details && (
        <Card>
          <h3 className="text-xl font-bold mb-3">
            Application Details
          </h3>
          <div className="flex gap-3">
            <ArrowRight className="text-[#6B412E]" />
            <span>{application_details}</span>
          </div>
        </Card>
      )}
    </div>
  );

  case "crops":
  if (recommended_crops.length === 0 && !application_timing) {
    return <EmptyState text="No crop recommendations available." />;
  }

  return (
    <div className="space-y-6">
      {recommended_crops.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {recommended_crops.map((crop, i) => (
            <Card key={i}>
              🌾 <span className="ml-1">{crop}</span>
            </Card>
          ))}
        </div>
      )}

      {application_timing && (
        <Card>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#6B412E] text-white rounded-full flex items-center justify-center">
              <Calendar size={20} />
            </div>
            <div>
              <p className="font-semibold">Best Application Stage</p>
              <p className="text-[#6B412E] font-bold">
                {application_timing}
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );

      default:
        return null;
    }
  };

  /* ---------------- MODAL ---------------- */

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100]"
            onClick={onClose}
          />

          <motion.div
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div
              className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="bg-[#6B412E] text-white px-8 py-6 flex justify-between sticky top-0 z-10">
                <div>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Package size={14} /> {category}
                  </div>
                  <h2 className="text-3xl font-bold">{name}</h2>
                  {sub_category && <p className="text-white/80">{sub_category}</p>}
                </div>
                <button onClick={onClose}>
                  <X size={28} />
                </button>
              </div>

              {/* BODY */}
              <div className="flex flex-col lg:flex-row overflow-y-auto">
                <div className="lg:w-2/5 p-8 border-r space-y-6">

  {/* Product Image */}
  <div
    className="
      group relative bg-gray-50 rounded-2xl p-6 border
      flex justify-center overflow-hidden
      transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
      hover:shadow-[0_30px_60px_-20px_rgba(116,26,28,0.35)]
    "
  >
    <img
      src={image_url}
      alt={name}
      className="
        max-h-64 object-contain
        transition-all duration-700 ease-out
        group-hover:brightness-105
        group-hover:contrast-105
        group-hover:-translate-y-1
      "
    />
  </div>

  {/* CATEGORY CARD (DO NOT REMOVE) */}
  {category && (
    <div
      className="
        group relative bg-white rounded-2xl p-5 border
        flex gap-4 items-start
        transition-all duration-500 ease-out
        hover:-translate-y-1
        hover:shadow-[0_20px_40px_-15px_rgba(116,26,28,0.25)]
        overflow-hidden
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                      bg-[radial-gradient(circle_at_30%_20%,rgba(116,26,28,0.08),transparent_60%)]" />

      <div className="relative w-11 h-11 bg-[#6B412E] text-white rounded-xl
                      flex items-center justify-center shadow-md">
        <Package size={18} />
      </div>

      <div className="relative">
        <p className="text-sm font-semibold text-gray-900">Category</p>
        <p className="text-[#6B412E] font-bold">{category}</p>
        {sub_category && (
          <p className="text-sm text-gray-600">{sub_category}</p>
        )}
      </div>
    </div>
  )}

  {/* APPLICATION STAGE CARD (DO NOT REMOVE) */}
  {application_timing && (
    <div
      className="
        group relative bg-white rounded-2xl p-5 border
        flex gap-4 items-start
        transition-all duration-500 ease-out
        hover:-translate-y-1
        hover:shadow-[0_20px_40px_-15px_rgba(116,26,28,0.25)]
        overflow-hidden
      "
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition
                      bg-[radial-gradient(circle_at_30%_20%,rgba(116,26,28,0.08),transparent_60%)]" />

      <div className="relative w-11 h-11 bg-[#6B412E] text-white rounded-xl
                      flex items-center justify-center shadow-md">
        <Calendar size={18} />
      </div>

      <div className="relative">
        <p className="text-sm font-semibold text-gray-900">
          Application Stage
        </p>
        <p className="text-[#6B412E] font-bold">
          {application_timing}
        </p>
      </div>
    </div>
  )}

</div>

                <div className="lg:w-3/5 p-8">
                  {/* Tabs */}
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {tabs.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`px-4 py-2 rounded-xl font-semibold
                          transition-all duration-300
                          ${
                            activeTab === t.id
                              ? "bg-[#6B412E] text-white shadow-md"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                      >
                        {t.icon} {t.label}
                      </button>
                    ))}
                  </div>
                  
                  {renderTabContent()}
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex justify-end px-6 py-4 border-t bg-white">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded-xl border border-gray-300
                             text-gray-700 font-semibold
                             hover:bg-gray-100 transition"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
