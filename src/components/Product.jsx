// Products.jsx – Supabase powered (FINAL)
import React, { useState, useEffect, useMemo, useRef } from "react";
import { ArrowRight, Loader2, Search } from "lucide-react";
import supabase from "../lib/supabaseClient";
import ProductModal from "../components/ProductModal";

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
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [mobileExpanded, setMobileExpanded] = useState(false);

  const scrollRef = useRef(null);
const isPausedRef = useRef(false);
const sectionRef = useRef(null);

  /* ---------------- FETCH PRODUCTS ---------------- */

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error) setProducts(data || []);
      setLoading(false);
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
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
    );
  }

  return list;
}, [products, activeCategory, searchQuery]);

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
        <h1 className="text-4xl font-black text-[#6B412E]">Our Products</h1>
        <p className="text-slate-600 mt-2">
          High-quality solutions for modern agriculture
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-8">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search products..."
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
                onClick={() => setActiveCategory(cat.name)}
                className={`px-3 py-2 rounded-full border text-sm font-semibold
                  ${
                    activeCategory === cat.name
                      ? "bg-[#6B412E] text-white border-[#6B412E]"
                      : "bg-white text-[#6B412E] border-[#E5CFC2]"
                  }`}
              >
                {cat.name} ({cat.count})
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
              {mobileExpanded ? "− View Less" : "+ View More"}
            </button>
          </div>
        )}
      </div>

      {/* DESKTOP FILTER BAR */}
      <div className="hidden md:flex sticky top-[72px] z-40 bg-[#F5E9E2] py-7 mb-12 flex-wrap gap-3 justify-center shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-5 py-3 rounded-full text-sm font-semibold border-2
              ${
                activeCategory === cat.name
                  ? "bg-[#6B412E] text-white border-[#6B412E]"
                  : "bg-white text-[#6B412E] border-[#E8D5C9]"
              }`}
          >
            {cat.name} ({cat.count})
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
              mb-6 bg-white border
              overflow-hidden
            "
          >
            <img
              src={product.image_url || "/placeholder.png"}
              alt={product.name}
              className="
                max-h-full max-w-full object-contain
                transition-all duration-500 ease-out
                group-hover:brightness-105
                group-hover:contrast-105
                group-hover:translate-y-[-2px]
              "
            />
          </div>

          {/* CONTENT */}
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-3 text-[#4A2E1F]">
              {product.name}
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
              {product.category}
            </div>

            <div className="flex items-center justify-between text-sm font-semibold text-[#6B412E]">
              <span>View Details</span>
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
    No products available in <strong>{activeCategory}</strong>
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
