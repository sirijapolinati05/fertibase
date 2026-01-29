import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Loader2 } from "lucide-react";
import productService from "../api/productService";
import { products as fallbackProducts } from "../../data/productsData";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productService.getAllProducts();
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          // Use fallback data if API returns empty
          setProducts(fallbackProducts);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        // Use fallback data on error
        setProducts(fallbackProducts);
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soil-light">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soil-light py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold">
              Red Soil Solutions
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary-700 mb-4">
            Our <span className="text-primary-600">Products</span>
          </h1>
          <p className="text-xl text-text-base max-w-3xl mx-auto font-medium">
            Discover our range of innovative biological solutions for sustainable agriculture
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-primary-500" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-primary-200 shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-600 outline-none bg-white text-text-base placeholder:text-primary-600 hover:border-primary-300 transition-colors"
            />
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id || index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-primary-200 hover:border-primary-400 group"
            >
              <Link to={`/products/${product.id}`} className="block">
                <div className="aspect-square bg-gradient-to-br from-soil-light to-primary-50 flex items-center justify-center p-4 group-hover:from-primary-50 group-hover:to-primary-100 transition-all duration-300">
                  <img
                    src={product.image || product.img}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-800 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-primary-600 mb-3 font-medium">{product.category}</p>
                  <p className="text-text-base text-sm line-clamp-3 font-medium">
                    {product.desc || product.overview || product.description}
                  </p>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-base text-lg font-semibold">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

