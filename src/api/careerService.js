const transformJob = (job) => ({
  id: job.id,

  title: job.title,
  category: job.category || 'Other',
  type: job.type || 'Full-time',
  mode: job.mode || 'Onsite',

  location: job.location,
  experience: job.experience,

  preview: job.short_preview || '',
  short_preview: job.short_preview || '',
  about: job.description || '',
  description: job.description || '',

  responsibilities: typeof job.responsibilities === 'string' ? job.responsibilities.split('\n') : (job.responsibilities || []),
  requirements: typeof job.requirements === 'string' ? job.requirements.split('\n') : (job.requirements || []),
  skills: typeof job.skills === 'string' ? job.skills.split('\n') : (job.skills || []),
  tools: typeof job.tools === 'string' ? job.tools.split('\n') : (job.tools || []),
  niceToHave: typeof job.nice_to_have === 'string' ? job.nice_to_have.split('\n') : (job.nice_to_have || []),
  application_note: job.application_note || '',

  daysLeft: job.days_left ?? 30,
  salary: job.salary_range || job.salary || null,
  salary_range: job.salary_range || job.salary || null,
  positions: job.positions ?? 1,

  role: job.role || 'Open',
  createdAt: job.created_at,
});

const careerService = {
  async getCareers() {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/jobs`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.map(transformJob);
    } catch (error) {
      console.error('API jobs error:', error);
      throw error;
    }
  },

  async getJobById(id) {
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/jobs/${id}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return transformJob(data);
    } catch (error) {
      console.error('API job error:', error);
      throw error;
    }
  },
};

export default careerService;
