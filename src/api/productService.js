import { supabase } from './supabaseClient';

/**
 * 🔁 Map Supabase product → UI-friendly product
 */
const transformProduct = (p) => ({
  id: p.id,

  // Basic
  name: p.name,
  category: p.category,
  status: p.status,
  price: p.price,
  stock: p.stock,

  // Media
  image: p.image,
  video: p.video,

  // SEO
  metaTitle: p.metaTitle,
  metaKeywords: p.metaKeywords,

  // Content sections
  overview: p.overview,
  whatIs: p.whatIs,
  howItWorks: p.howItWorks,
  whyChoose: p.whyChoose,

  // Structured data
  benefits: p.benefits || [],
  dosage: p.dosage || [],
  crops: p.crops || [],
  techInfo: p.techInfo || [],
  packSizes: p.packSizes || [],
  faqs: p.faqs || [],

  createdAt: p.created_at,
});

const productService = {
  // 🔹 Get all active products
  async getProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('status', 'Active')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase products error:', error);
      throw error;
    }

    return data.map(transformProduct);
  },

  // 🔹 Get single product by ID
  async getProductById(id) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase product error:', error);
      throw error;
    }

    return transformProduct(data);
  },
};

export default productService;
