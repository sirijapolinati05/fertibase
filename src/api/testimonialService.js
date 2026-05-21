import { supabase } from './supabaseClient';

/**
 * Transform Supabase testimonial → UI-friendly format
 */
const transformTestimonial = (t) => ({
  id: t.id,
  title: t.title,
  name: t.name,
  videoUrl: t.video_url,
  image: t.image_src,
  area: t.area,
  story: t.season,        // Farmer story / description
  platform: t.platform,
  createdAt: t.created_at,
});

const testimonialService = {
  async getTestimonials() {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/testimonials`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.map(transformTestimonial);
    } catch (error) {
      console.error('API testimonials error:', error);
      throw error;
    }
  },
};

export default testimonialService;
