/* eslint-disable no-unused-vars */
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Check, HelpCircle, Table as TableIcon,
  Image as ImageIcon, FileText, Droplet, Sprout, ShieldCheck, Leaf, ArrowLeft,
  ChevronDown, ChevronUp
} from "lucide-react";
import { useState, useEffect } from "react";

import productService from "../api/productService";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showImageDetails, setShowImageDetails] = useState(false);

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductById(id);
        console.log('COMPONENT RECEIVED DATA:', data); // DEBUG: Check component data
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Failed to load product');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soil-light">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mx-auto mb-4"></div>
          <p className="text-text-base font-semibold text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-soil-light">
        <h2 className="text-4xl font-bold text-text-base mb-4">Product Not Found</h2>
        <Link
          to="/products"
          className="px-6 py-3 bg-primary-600 text-soil-base rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  // Helpers - benefits and dosage are now arrays of strings
  const isRichBenefits = false; // Backend sends array of strings
  const isRichDosage = false; // Backend sends array of strings
  const isRichCrops = Array.isArray(product.crops);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-soil-light font-sans text-text-base">
      {/* Hero Section - Red Soil Theme */}
      <div className="relative bg-gradient-to-br from-soil-light via-white to-primary-50 overflow-hidden">

        {/* Back Button - Below Header, Top Left */}
        <div className="absolute top-6 left-6 z-40 mt-12 ml-5">
          <Link to="/products" className="inline-flex items-center text-primary-700 font-semibold hover:text-primary-800 transition-all hover:shadow-xl hover:scale-105">
            <ArrowLeft size={18} className="mr-2" /> Back to Products
          </Link>
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 flex flex-col md:flex-row items-center md:items-stretch gap-12">

          {/* Text Content */}
          <motion.div
            className="flex-1 space-y-8 z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div>
              <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-bold tracking-wide mb-4">
                {product.category || "Biofertilizer"}
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-text-base drop-shadow-sm">
                {product.name}
              </h1>
            </div>

            <p className="text-xl text-text-light max-w-2xl leading-relaxed">
              {product.overview}
            </p>


          </motion.div>

          {/* Image */}
          <motion.div
            className="flex-1 w-full max-w-md lg:max-w-lg relative z-10 flex flex-col"
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div
              className="relative aspect-square bg-white rounded-[2.5rem] p-8 shadow-2xl flex items-center justify-center group border border-primary-100 cursor-pointer"
              role="button"
              tabIndex={0}
              onClick={() => setShowImageDetails((s) => !s)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setShowImageDetails((s) => !s); }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-50 to-transparent rounded-[2.5rem] opacity-50"></div>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain drop-shadow-xl transform transition-transform duration-500 group-hover:scale-105 relative z-10"
                />
              ) : (
                <ImageIcon size={80} className="text-gray-300" />
              )} 
            </div>

            {showImageDetails && (
              <div className="mt-4 bg-white rounded-xl p-4 border border-primary-100 shadow-sm text-text-base">
                <h4 className="font-bold text-primary-700 mb-2">Quick overview</h4>
                <p className="text-text-light text-sm">{product.overview ? product.overview : 'No additional details available.'}</p>
                <div className="mt-3 text-xs text-text-muted">Full dosage & pack information is available in the Dosage & Application section below.</div>
              </div>
            )}

            <div className="mt-6 md:mt-auto space-y-4">
              {product.dosage && product.dosage.length > 0 && (
                <div className="bg-white rounded-xl p-4 border border-primary-100 shadow-sm">
                  <h4 className="font-bold text-primary-700 mb-2">Suggested dosage</h4>
                  <p className="text-text-light text-sm">{typeof product.dosage[0] === 'string' ? product.dosage[0] : (product.dosage[0].dosage || product.dosage[0].details)}</p>
                </div>
              )}

              {product.packSizes && product.packSizes.length > 0 && (
                <div className="bg-white rounded-xl p-4 border border-primary-100 shadow-sm">
                  <h4 className="font-bold text-primary-700 mb-2">Available Packs</h4>
                  <div className="flex gap-3">
                    {product.packSizes.map((size,i)=>(
                      <span key={i} className="px-3 py-1 bg-white border border-primary-200 rounded-lg text-sm font-bold text-primary-700 shadow-sm">
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-20">

        {/* Suitable Crops */}
        {product.crops && product.crops.length > 0 && (
          <div className="mb-20">
            <h3 className="text-2xl font-bold text-text-base mb-6 flex items-center gap-2">
              <Sprout className="text-primary-600" /> Suitable Crops
            </h3>
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-primary-100">
              {isRichCrops ? (
                <div className="flex flex-wrap gap-3">
                  {product.crops.map((crop, i) => (
                    <span key={i} className="px-5 py-2.5 bg-primary-50 text-primary-700 rounded-full font-semibold border border-primary-200 hover:bg-primary-100 hover:scale-105 transition-all cursor-default shadow-sm">
                      {crop}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-text-light text-lg font-medium">{product.crops}</p>
              )}
            </div>
          </div>
        )}

        {/* Info Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* What Is It? */}
          {product.whatIs && (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-primary-600 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                <FileText size={24} />
              </div>
              <h3 className="text-xl font-bold text-text-base mb-3">What Is It?</h3>
              <p className="text-text-light leading-relaxed">
                {product.whatIs}
              </p>
            </motion.div>
          )}

          {/* How It Works? */}
          {product.howItWorks && (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-primary-500 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                <Leaf size={24} />
              </div>
              <h3 className="text-xl font-bold text-text-base mb-3">How It Works?</h3>
              <p className="text-text-light leading-relaxed">
                {product.howItWorks}
              </p>
            </motion.div>
          )}

          {/* Why Choose? */}
          {product.whyChoose && (
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-8 border-t-4 border-primary-700 hover:-translate-y-1 transition-transform duration-300">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center text-primary-600 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-text-base mb-3">Why Choose?</h3>
              <p className="text-text-light leading-relaxed">
                {product.whyChoose}
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Benefits Section */}
        {product.benefits && product.benefits.length > 0 && (
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-base">Key Benefits</h2>
              <div className="w-20 h-1 bg-primary-600 mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="col-span-full bg-white p-10 rounded-3xl shadow-lg border border-primary-100">
              <ul className="grid md:grid-cols-2 gap-6">
                {product.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="mt-1 w-6 h-6 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center flex-shrink-0">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <div>
                      {typeof b === 'string' ? (
                        <span className="text-text-light text-lg">{b}</span>
                      ) : (
                        <>
                          <span className="block text-text-base font-bold text-lg">{b.title}</span>
                          <span className="text-text-light">{b.desc}</span>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Dosage & Application */}
        {product.dosage && product.dosage.length > 0 && (
          <div className="mb-20 bg-white rounded-3xl shadow-xl overflow-hidden border border-primary-100">
            <div className="bg-primary-700 text-soil-base p-8 md:p-10 flex flex-col md:flex-row justify-between items-center gap-6">
              <div>
                <h3 className="text-3xl font-bold flex items-center gap-3">
                  <TableIcon className="text-primary-300" /> Dosage & Application
                </h3>
                <p className="text-primary-100 mt-2">Recommended usage for optimal results.</p>
              </div>
              {/* Decorative element */}
              <div className="hidden md:block opacity-20">
                <Droplet size={80} />
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="bg-white rounded-2xl border border-primary-100">
                <ul className="divide-y divide-primary-100">
                  {product.dosage.map((item, i) => (
                    <li key={i} className="p-6 hover:bg-primary-50 transition-colors">
                      {typeof item === 'string' ? (
                        <p className="text-text-light text-lg leading-relaxed">{item}</p>
                      ) : (
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <span className="block text-sm font-bold text-primary-600 uppercase tracking-wide">Method</span>
                            <span className="text-text-base font-semibold">{item.method}</span>
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-primary-600 uppercase tracking-wide">Dosage</span>
                            <span className="text-text-light">{item.dosage}</span>
                          </div>
                          <div>
                            <span className="block text-sm font-bold text-primary-600 uppercase tracking-wide">Timing/Details</span>
                            <span className="text-text-muted">{item.timing || item.details}</span>
                          </div>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tech Specs & FAQs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Tech Specs - Light Theme */}
          {product.techInfo && product.techInfo.length > 0 && (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-primary-100">
              <div className="p-8 border-b border-primary-100 bg-soil-light">
                <h3 className="text-2xl font-bold text-text-base">Technical Specifications</h3>
              </div>
              <div className="p-8 space-y-6">
                {product.techInfo.map((info, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-primary-100 pb-4 last:border-0 last:pb-0 group">
                    <span className="text-text-muted font-medium group-hover:text-primary-600 transition-colors">{info.label || info.key}</span>
                    <span className="font-bold text-lg text-text-base text-right">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {product.faqs && product.faqs.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-text-base mb-6">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {product.faqs.map((faq, i) => (
                  <FAQItem key={i} question={faq.question} answer={faq.answer} />
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white border border-primary-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="font-bold text-text-base text-lg">{question}</span>
        {isOpen ? <ChevronUp className="text-primary-600" /> : <ChevronDown className="text-text-muted" />}
      </button>
      <div
        className={`px-6 pb-6 text-text-light leading-relaxed transition-all duration-300 ${isOpen ? 'block opacity-100' : 'hidden opacity-0'}`}
      >
        {answer}
      </div>
    </div>
  );
}
