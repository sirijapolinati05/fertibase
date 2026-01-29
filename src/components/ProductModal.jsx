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

  /* 🔒 Disable background scroll when modal opens */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 rounded-2xl p-6 border">
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <Leaf className="text-[#741A1C]" /> Product Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {description || "No description available."}
              </p>
            </div>

            {application_timing && (
              <div className="bg-white rounded-2xl p-6 border flex items-center gap-4">
                <div className="w-10 h-10 bg-[#741A1C] text-white rounded-full flex items-center justify-center">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Application Stage</p>
                  <p className="font-semibold text-[#741A1C]">
                    {application_timing}
                  </p>
                </div>
              </div>
            )}

            {key_highlights.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Key Highlights</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {key_highlights.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-3 p-4 bg-white rounded-xl border"
                    >
                      <Check className="text-[#741A1C]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "benefits":
        return (
          <div className="space-y-6">
            {crop_benefits.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Sprout className="text-[#741A1C]" /> Crop Benefits
                </h3>
                <ul className="space-y-3 bg-gray-50 p-6 rounded-2xl border">
                  {crop_benefits.map((b, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-2 h-2 bg-[#741A1C] rounded-full mt-2" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product_advantages.length > 0 && (
              <div>
                <h3 className="text-xl font-bold mb-4">Product Advantages</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {product_advantages.map((a, i) => (
                    <div key={i} className="p-5 bg-white rounded-xl border">
                      <Check className="text-[#741A1C] mb-2" />
                      <p>{a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "usage":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Droplet className="text-[#741A1C]" /> Recommended Dosage
              </h3>
              <div className="bg-gray-50 p-6 rounded-2xl border">
                <p>{recommended_dosage || "As per recommendation"}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Application Details</h3>
              <div className="bg-white rounded-2xl border">
                {application_details ? (
                  <div className="p-5 flex gap-3">
                    <ArrowRight className="text-[#741A1C]" />
                    <span>{application_details}</span>
                  </div>
                ) : (
                  <div className="p-5">Standard application procedure</div>
                )}
              </div>
            </div>
          </div>
        );

      case "crops":
        return (
          <div>
            <h3 className="text-xl font-bold mb-4">Recommended Crops</h3>
            {recommended_crops.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {recommended_crops.map((crop, i) => (
                  <div
                    key={i}
                    className="p-4 bg-white border rounded-xl text-center"
                  >
                    🌾 {crop}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Suitable for all crops</p>
            )}

            <div className="mt-8">
  <h3 className="text-xl font-bold mb-4">Application Timing</h3>

  <div className="bg-white rounded-2xl p-6 border flex items-center gap-4">
    <div className="w-12 h-12 bg-[#741A1C] text-white rounded-full flex items-center justify-center">
      <Calendar size={20} />
    </div>

    <div>
      <p className="font-semibold text-gray-900">
        Best Application Stage
      </p>
      <p className="text-[#741A1C] font-bold">
        {application_timing || "Initial Stage"}
      </p>
    </div>
  </div>
</div>
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
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
          >
            <div
              className="bg-white rounded-3xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 🔒 Sticky Header */}
              <div className="bg-[#741A1C] text-white px-8 py-6 flex justify-between sticky top-0 z-10">
                <div>
                  <div className="flex items-center gap-2 text-sm mb-2">
                    <Package size={14} /> {category}
                  </div>
                  <h2 className="text-3xl font-bold">{name}</h2>
                  {sub_category && (
                    <p className="text-white/80">{sub_category}</p>
                  )}
                </div>
                <button onClick={onClose}>
                  <X size={28} />
                </button>
              </div>

              {/* 🔄 Scrollable Content */}
              <div className="flex flex-col lg:flex-row overflow-y-auto">
                <div className="lg:w-2/5 p-8 border-r space-y-6">
  {/* Product Image */}
  <div className="bg-gray-50 rounded-2xl p-6 border flex justify-center">
    <img
      src={image_url}
      alt={name}
      className="max-h-64 object-contain"
    />
  </div>

  {/* Category */}
{category && (
  <div className="bg-white rounded-2xl p-5 border flex gap-4 items-start">
    <div className="w-10 h-10 bg-[#741A1C] text-white rounded-lg flex items-center justify-center">
      <Package size={18} />
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-900">Category</p>
      <p className="text-[#741A1C] font-bold">{category}</p>
      {sub_category && (
        <p className="text-sm text-gray-600">{sub_category}</p>
      )}
    </div>
  </div>
)}

{/* Application Stage */}
{application_timing && (
  <div className="bg-white rounded-2xl p-5 border flex gap-4 items-start">
    <div className="w-10 h-10 bg-[#741A1C] text-white rounded-lg flex items-center justify-center">
      <Calendar size={18} />
    </div>
    <div>
      <p className="text-sm font-semibold text-gray-900">
        Application Stage
      </p>
      <p className="text-[#741A1C] font-bold">
        {application_timing}
      </p>
    </div>
  </div>
)}
</div>


                <div className="lg:w-3/5 p-8">
                  <div className="flex gap-2 mb-6 flex-wrap">
                    {tabs.map((t) => (
                      <button
                        key={t.id}
                        onClick={() => setActiveTab(t.id)}
                        className={`px-4 py-2 rounded-xl font-semibold ${
                          activeTab === t.id
                            ? "bg-[#741A1C] text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        {t.icon} {t.label}
                      </button>
                    ))}
                  </div>

                  {renderTabContent()}
                </div>
              </div>
              {/* Footer Close Button */}
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
