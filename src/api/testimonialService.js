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
    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase testimonials error:', error);
      throw error;
    }

    return data.map(transformTestimonial);
  },
};

export default testimonialService;
