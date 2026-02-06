import { useState } from "react";
import supabase from "../lib/supabaseClient";
import { X, Loader2 } from "lucide-react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

export default function ApplyForm({ close, jobId }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    expected_salary: "",
    cover_note: "",
  });

  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!resume) {
      setError("Resume is required");
      return;
    }

    try {
      setLoading(true);

      /* 1️⃣ Upload Resume */
      const fileExt = resume.name.split(".").pop();
      const fileName = `${Date.now()}-${form.full_name.replace(/\s/g, "_")}.${fileExt}`;
      const filePath = `job-applications/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, resume);

      if (uploadError) throw uploadError;

      const { data: resumeUrl } = supabase.storage
        .from("resumes")
        .getPublicUrl(filePath);

      /* 2️⃣ Insert Application */
      const { error: insertError } = await supabase
        .from("job_applications")
        .insert([
          {
            job_id: jobId,
            full_name: form.full_name,
            email: form.email,
            phone: form.phone,
            expected_salary: form.expected_salary,
            cover_note: form.cover_note,
            resume_url: resumeUrl.publicUrl,
          },
        ]);

      if (insertError) throw insertError;

      /* 3️⃣ Send Auto-Reply Email (EmailJS) */
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          full_name: form.full_name,
          email: form.email,
          job_id: jobId,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      /* 4️⃣ Success + Redirect */
      alert("Application submitted successfully");
      close();
      navigate("/careerPage");

    } catch (err) {
      console.error(err);
      setError("Failed to submit application. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 overflow-y-auto px-4 pt-[96px] pb-8">
      <div className="bg-white max-w-lg mx-auto rounded-3xl p-6 relative mt-6">

        {/* Close */}
        <button onClick={close} className="absolute top-4 right-4 text-[#6B412E]">
          <X />
        </button>

        <h2 className="text-2xl font-bold text-[#6B412E] mb-6">
          Apply for this Job
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <Input label="Full Name" name="full_name" value={form.full_name} onChange={handleChange} required />
          <Input label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} required />
          <Input label="Expected Salary" name="expected_salary" value={form.expected_salary} onChange={handleChange} />

          <div>
            <label className="block text-sm font-medium mb-1 text-[#3B2418]">
              Resume (PDF/DOC) *
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              required
              onChange={(e) => setResume(e.target.files[0])}
              className="w-full border border-[#E8D5C9] rounded-xl px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-[#3B2418]">
              Cover Note
            </label>
            <textarea
              rows="4"
              name="cover_note"
              value={form.cover_note}
              onChange={handleChange}
              className="w-full border border-[#E8D5C9] rounded-xl px-3 py-2"
              placeholder="Why should we hire you?"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#6B412E] hover:bg-[#5e1416] text-white font-semibold shadow-md transition flex justify-center items-center gap-2"
          >
            {loading && <Loader2 className="w-5 h-5 animate-spin" />}
            Submit Application
          </button>

        </form>
      </div>
    </div>
  );
}

/* ---------------- INPUT COMPONENT ---------------- */

function Input({ label, ...props }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1 text-[#3B2418]">
        {label}
      </label>
      <input
        {...props}
        className="w-full px-4 py-2 border border-[#E8D5C9] rounded-xl focus:ring-2 focus:ring-[#6B412E]/30 outline-none"
      />
    </div>
  );
}
