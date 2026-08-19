// Products.jsx – Supabase powered (FINAL)
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ArrowRight, Loader2, Search } from "lucide-react";
import ProductModal from "../components/ProductModal";
import { useTranslation } from "../i18n/useTranslation";
import { getLocalizedEntityField } from "../i18n/entityTranslations";

const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/api$/, "");

const getImageUrl = (url) => {
  if (!url) return "/placeholder.png";
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

/* ---------------- CONSTANTS ---------------- */

const FIXED_CATEGORIES = [
  "Biofertilizer",
  "Organic Biofertilizer",
  "Liquid Fertilizer",
  "Straight Micronutrient",
  "Beneficial Element Fertilizer",
];

const MAX_MOBILE_FILTERS = 4;

/* ---------------- MAIN COMPONENT ---------------- */

export default function Products() {
  const { language, t, td } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categoryOptions = useMemo(
    () => ["All", ...FIXED_CATEGORIES],
    []
  );
  const requestedCategory = searchParams.get("category");
  const initialCategory = categoryOptions.includes(requestedCategory)
    ? requestedCategory
    : "All";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [mobileExpanded, setMobileExpanded] = useState(false);

  const scrollRef = useRef(null);
const isPausedRef = useRef(false);
const sectionRef = useRef(null);

  const getCategoryLabel = (categoryName) => {
    const categoryKeyMap = {
      All: "products_filter_all",
      Biofertilizer: "products_category_biofertilizer",
      "Organic Biofertilizer": "products_category_organic_biofertilizer",
      "Liquid Fertilizer": "products_category_liquid_fertilizer",
      "Straight Micronutrient": "products_category_straight_micronutrient",
      "Beneficial Element Fertilizer":
        "products_category_beneficial_element_fertilizer",
    };

    return t(categoryKeyMap[categoryName] || "", categoryName);
  };

  const handleCategoryChange = (categoryName) => {
    setActiveCategory(categoryName);
    setSearchParams(
      categoryName === "All" ? {} : { category: categoryName },
      { replace: true }
    );
  };

  useEffect(() => {
    const nextCategory = categoryOptions.includes(requestedCategory)
      ? requestedCategory
      : "All";

    setActiveCategory((currentCategory) =>
      currentCategory === nextCategory ? currentCategory : nextCategory
    );
  }, [categoryOptions, requestedCategory]);

  /* ---------------- FETCH PRODUCTS ---------------- */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/products`);
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- CATEGORY COUNTS ---------------- */

  const categories = useMemo(() => {
    const map = {};
    FIXED_CATEGORIES.forEach((c) => (map[c] = 0));
    products.forEach((p) => {
      if (map[p.category] !== undefined) map[p.category]++;
    });

    return [
      { name: "All", count: products.length },
      ...FIXED_CATEGORIES.map((c) => ({ name: c, count: map[c] })),
    ];
  }, [products]);

  /* ---------------- FILTER ---------------- */

const filteredProducts = useMemo(() => {
  let list = [...products];

  if (activeCategory !== "All") {
    list = list.filter((p) => p.category === activeCategory);
  }

  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    list = list.filter(
      (p) => {
        const localizedName =
          getLocalizedEntityField({
            item: p,
            field: "name",
            language,
            td,
            namespace: "product",
            fallback: p.name,
          }) || "";

        const localizedDescription =
          getLocalizedEntityField({
            item: p,
            field: "description",
            language,
            td,
            namespace: "product",
            fallback: p.description,
          }) || "";

        const localizedCategory =
          getLocalizedEntityField({
            item: p,
            field: "category",
            language,
            td,
            namespace: "product",
            fallback: getCategoryLabel(p.category),
          }) || "";

        return (
          localizedName.toLowerCase().includes(q) ||
          localizedDescription.toLowerCase().includes(q) ||
          localizedCategory.toLowerCase().includes(q)
        );
      }
    );
  }

  return list;
}, [products, activeCategory, searchQuery, language, td, t]);

/* ---------------- AUTO SCROLL WHEN SECTION IS VISIBLE ---------------- */

useEffect(() => {
  const container = scrollRef.current;
  const section = sectionRef.current;

  if (!container || !section) return;

  let animationId;
  let isVisible = false;
  const speed = 0.4;

  const autoScroll = () => {
    if (isVisible && !isPausedRef.current) {
      container.scrollLeft += speed;

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth - 1
      ) {
        container.scrollLeft = 0;
      }
    }
    animationId = requestAnimationFrame(autoScroll);
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
    },
    { threshold: 0.3 } // starts when 30% visible
  );

  observer.observe(section);
  animationId = requestAnimationFrame(autoScroll);

  return () => {
    observer.disconnect();
    cancelAnimationFrame(animationId);
  };
}, [filteredProducts]);

/* ---------------- PAUSE WHEN MODAL OPEN ---------------- */

useEffect(() => {
  isPausedRef.current = isModalOpen;
}, [isModalOpen]);

/* ---------------- LOADING ---------------- */

if (loading) {
  return (
    <div className="flex justify-center py-20">
      <Loader2 className="w-10 h-10 animate-spin text-[#6B412E]" />
    </div>
  );
}

//   useEffect(() => {
//   const container = scrollRef.current;
//   if (!container) return;

//   let animationId;
//   const speed = 0.4;

//   const autoScroll = () => {
//     if (!isPausedRef.current) {
//       container.scrollLeft += speed;

//       if (
//         container.scrollLeft + container.clientWidth >=
//         container.scrollWidth - 1
//       ) {
//         container.scrollLeft = 0;
//       }
//     }
//     animationId = requestAnimationFrame(autoScroll);
//   };

//   // auto-scroll only on mobile
//   if (window.innerWidth < 640) {
//     animationId = requestAnimationFrame(autoScroll);
//   }

//   return () => cancelAnimationFrame(animationId);
// }, [filteredProducts]);

  return (
    <div
  ref={sectionRef}
  className="max-w-7xl mx-auto px-4 py-12"
>

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-[#6B412E]">
          {t("products_listing_heading", "Our Products")}
        </h1>
        <p className="text-slate-600 mt-2">
          {t(
            "products_listing_subtitle",
            "High-quality solutions for modern agriculture"
          )}
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder={t(
              "products_listing_search_placeholder",
              "Search products..."
            )}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#6B412E]/30"
          />
        </div>
      </div>

      {/* MOBILE FILTER BAR */}
      <div className="md:hidden sticky top-[48px] z-50 bg-[#F7EDE5] rounded-2xl p-4 mb-8 shadow-sm">
        <div className="grid grid-cols-2 gap-3">
          {(mobileExpanded ? categories : categories.slice(0, MAX_MOBILE_FILTERS)).map(
            (cat) => (
              <button
                key={cat.name}
                onClick={() => handleCategoryChange(cat.name)}
                className={`px-3 py-2 rounded-full border text-sm font-semibold
                  ${
                    activeCategory === cat.name
                      ? "bg-[#6B412E] text-white border-[#6B412E]"
                      : "bg-white text-[#6B412E] border-[#E5CFC2]"
                  }`}
              >
                {getCategoryLabel(cat.name)} ({cat.count})
              </button>
            )
          )}
        </div>

        {categories.length > MAX_MOBILE_FILTERS && (
          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setMobileExpanded(!mobileExpanded)}
              className="text-sm font-semibold text-[#6B412E]"
            >
              {mobileExpanded
                ? t("common_view_less", "View Less")
                : t("common_view_more", "View More")}
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP FILTER BAR */}
      <div className="hidden md:flex sticky top-[72px] z-40 bg-[#F5E9E2] py-7 mb-12 flex-wrap gap-3 justify-center shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => handleCategoryChange(cat.name)}
            className={`px-5 py-3 rounded-full text-sm font-semibold border-2
              ${
                activeCategory === cat.name
                  ? "bg-[#6B412E] text-white border-[#6B412E]"
                  : "bg-white text-[#6B412E] border-[#E8D5C9]"
              }`}
          >
            {getCategoryLabel(cat.name)} ({cat.count})
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
{filteredProducts.length > 0 ? (
  <div
  ref={scrollRef}
  onMouseEnter={() => (isPausedRef.current = true)}
  onMouseLeave={() => (isPausedRef.current = false)}
  className="
    flex gap-6 pb-6
    overflow-x-auto
    snap-x snap-mandatory
    scrollbar-hide

    sm:grid sm:grid-cols-2
    lg:grid-cols-4
    sm:overflow-visible
  "
>
    {filteredProducts.map((product) => (
      <div
        key={product.id}
        onClick={() => {
          setSelectedProduct(product);
          setIsModalOpen(true);
        }}
        className="
    group cursor-pointer
    min-w-[280px] sm:min-w-0
    snap-start
  "
      >
        <div
          className="
            relative rounded-3xl p-6
            bg-[#F5E9E2]
            border border-[#E6D1C3]
            shadow-lg
            transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]
            hover:-translate-y-2
            hover:shadow-[0_30px_60px_-20px_rgba(107,65,46,0.45)]
            overflow-hidden
          "
        >
          {/* Premium glow */}
          <div
            className="
              absolute inset-0 opacity-0 group-hover:opacity-100
              transition-opacity duration-500
              bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_60%)]
              pointer-events-none
            "
          />

          {/* IMAGE */}
          <div
            className="
              relative rounded-2xl h-56
              flex items-center justify-center
              mb-6 bg-[#fbf5f0] border border-[#ead8cc]
              overflow-hidden
            "
          >
            <img
              src={getImageUrl(product.image_url)}
              alt={product.name}
              className="
                h-full w-full scale-[1.08] object-cover object-center
                transition-all duration-500 ease-out
                group-hover:brightness-105
                group-hover:contrast-105
                group-hover:scale-[1.12]
                group-hover:translate-y-[-2px]
              "
            />
          </div>

          {/* CONTENT */}
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-3 text-[#4A2E1F]">
              {getLocalizedEntityField({
                item: product,
                field: "name",
                language,
                td,
                namespace: "product",
                fallback: product.name,
              })}
            </h3>

            <div
              className="
                inline-flex px-4 py-2 rounded-full
                bg-white/80 backdrop-blur
                border border-[#E6D1C3]
                text-xs font-semibold text-[#8B4513]
                mb-5
              "
            >
              {getLocalizedEntityField({
                item: product,
                field: "category",
                language,
                td,
                namespace: "product",
                fallback: getCategoryLabel(product.category),
              })}
            </div>

            <div className="flex items-center justify-between text-sm font-semibold text-[#6B412E]">
              <span>{t("products_view_details", "View Details")}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Bottom accent */}
          <div
            className="
              absolute bottom-0 left-0 w-full h-[3px]
              bg-gradient-to-r from-transparent via-[#6B412E] to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity duration-500
            "
          />
        </div>
      </div>
    ))}
  </div>
) : (
  <div className="text-center py-20 text-slate-500 text-lg font-medium">
    {t("products_empty_prefix", "No products available in")}{" "}
    <strong>{getCategoryLabel(activeCategory)}</strong>
  </div>
)}

      {/* MODAL */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productData={selectedProduct}
      />
    </div>
  );
}
