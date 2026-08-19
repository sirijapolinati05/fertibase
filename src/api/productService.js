const BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api").replace(/\/api$/, "");

const getImageUrl = (url) => {
  if (!url) return "/placeholder.png";
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
};

const transformProduct = (p) => {
  // Parse JSON strings back to arrays if needed
  const parseJson = (val) => {
    try { return typeof val === 'string' ? JSON.parse(val) : val; }
    catch(e) { return []; }
  };

  return {
    id: p.id,
    name: p.name,
    category: p.category,
    status: 'Active', // Assume active if coming from backend, or map it if it exists
    price: null, // Backend doesn't have price currently
    stock: null,

    image: getImageUrl(p.image_url),
    video: null,

    metaTitle: p.name,
    metaKeywords: p.category,

    overview: p.description,
    whatIs: p.description, // Map to what fits best
    howItWorks: p.application_details,
    whyChoose: p.product_advantages,

    benefits: parseJson(p.crop_benefits),
    dosage: [{ method: p.application_timing, dose: p.recommended_dosage }],
    crops: parseJson(p.recommended_crops),
    techInfo: parseJson(p.key_highlights),
    packSizes: [],
    faqs: [],

    createdAt: p.created_at,
  };
};

const productService = {
  async getProducts() {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/products`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.map(transformProduct);
    } catch (error) {
      console.error('API products error:', error);
      throw error;
    }
  },

  async getProductById(id) {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/products/${id}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return transformProduct(data);
    } catch (error) {
      console.error('API product error:', error);
      throw error;
    }
  },
};

export default productService;
