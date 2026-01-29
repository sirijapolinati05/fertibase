// Products.jsx – Supabase powered (UPDATED)
import React, { useState, useEffect, useMemo } from "react";
import { ArrowRight, Loader2, Search } from "lucide-react";
import supabase from "../lib/supabaseClient";
import ProductModal from "../components/ProductModal";

const FIXED_CATEGORIES = [
  "Biofertilizer",
  "Organic Biofertilizer",
  "Liquid Fertilizer",
  "Straight Micronutrient",
  "Beneficial Element Fertilizer",
];

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /* ---------------- FETCH FROM SUPABASE ---------------- */

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ---------------- CATEGORIES WITH COUNT ---------------- */

  const categories = useMemo(() => {
    const countMap = {};

    FIXED_CATEGORIES.forEach((cat) => {
      countMap[cat] = 0;
    });

    products.forEach((p) => {
      if (countMap[p.category] !== undefined) {
        countMap[p.category]++;
      }
    });

    return [
      { name: "All", count: products.length },
      ...FIXED_CATEGORIES.map((cat) => ({
        name: cat,
        count: countMap[cat],
      })),
    ];
  }, [products]);

  /* ---------------- FILTER + SEARCH ---------------- */

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
          p.description?.toLowerCase().includes(q) ||
          p.sub_category?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [products, activeCategory, searchQuery]);

  /* ---------------- HANDLERS ---------------- */

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="w-10 h-10 animate-spin text-[#741A1C]" />
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-[#741A1C]">Our Products</h1>
        <p className="text-slate-600 mt-2">
          High-quality solutions for modern agriculture
        </p>
      </div>

      {/* SEARCH */}
      <div className="flex justify-center mb-10">
        <div className="relative w-full max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-[#741A1C]/30"
          />
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setActiveCategory(cat.name)}
            className={`px-5 py-3 rounded-full text-sm font-semibold border-2 transition-all
              ${
                activeCategory === cat.name
                  ? "bg-[#741A1C] text-white border-[#741A1C] shadow-lg"
                  : "bg-white text-[#741A1C] border-[#E8D5C9] hover:bg-[#F5E9E2]"
              }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* GRID / EMPTY STATE */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="group cursor-pointer"
            >
              <div
                className="relative rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border border-[#E8D5C9]"
                style={{ backgroundColor: "#F5E9E2" }}
              >
                <div className="absolute top-5 right-5 bg-white rounded-full p-3 shadow-lg group-hover:bg-[#741A1C] transition">
                  <ArrowRight className="w-5 h-5 text-[#741A1C] group-hover:text-white" />
                </div>

                <div className="rounded-2xl h-64 flex items-center justify-center mb-6 bg-white border">
                  <img
                    src={product.image_url || "/placeholder.png"}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110"
                  />
                </div>

                <h3 className="text-xl font-bold mb-3 text-[#4A2E1F]">
                  {product.name}
                </h3>

                <div className="inline-flex px-4 py-2 rounded-full bg-white border text-sm font-semibold text-[#8B4513]">
                  {product.category}
                </div>

                <div className="flex justify-between text-sm mt-4 text-[#8B4513]">
                  <span className="font-semibold">View Details</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-slate-500 text-lg font-medium">
          No products available in{" "}
          <span >
            {activeCategory}
          </span>
        </div>
      )}

      {/* MODAL */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={closeModal}
        productData={selectedProduct}
      />
    </div>
  );
}
