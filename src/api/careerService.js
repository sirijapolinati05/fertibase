import { supabase } from './supabaseClient';

/**
 * 🔁 Map Supabase job → UI job format
 */
const transformJob = (job) => ({
  id: job.id,

  title: job.title,
  category: job.category || 'Other',
  type: job.type || 'Full-time',
  mode: job.mode || 'Onsite',

  location: job.location,
  experience: job.experience,

  preview: job.short_preview || '',
  about: job.description || '',

  responsibilities: job.responsibilities || [],
  requirements: job.requirements || [],
  skills: job.skills || [],
  tools: job.tools || [],
  niceToHave: job.nice_to_have || [],

  daysLeft: job.days_left ?? 30,
  salary: job.salary_range || null,
  positions: job.positions ?? 1,

  createdAt: job.created_at,
});

const careerService = {
  // 🔹 Get all jobs
  async getCareers() {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return data.map(transformJob);
  },

  // 🔹 Get single job
  async getJobById(id) {
    const { data, error } = await supabase
      .from('jobs')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    return transformJob(data);
  },
};

export default careerService;
