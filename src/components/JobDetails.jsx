// src/pages/JobDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import careerService from "../api/careerService";
import { motion } from "framer-motion";
import { ArrowLeft, X, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const data = await careerService.getJobById(id);
        setJob(data);
      } catch (err) {
        setError("Job not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-600" />
      </div>
    );
  }

  if (!job || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button onClick={() => navigate(-1)} className="btn-primary">
          Go Back
        </button>
      </div>
    );
  }

  const deadline =
    job.days_left != null
      ? new Date(Date.now() + job.days_left * 86400000).toLocaleDateString("en-IN")
      : "N/A";

  return (
    <section className="min-h-screen bg-emerald-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 mb-6 text-emerald-700">
          <ArrowLeft size={18} /> Back
        </button>

        {/* Card */}
        <motion.div className="bg-white rounded-3xl p-8 shadow-xl">

          {/* HEADER */}
          <h1 className="text-4xl font-bold text-emerald-900">{job.title}</h1>
          <p className="mt-2 text-gray-700">{job.short_preview}</p>

          <div className="flex flex-wrap gap-3 mt-4 text-sm">
            {job.category && <Badge>{job.category}</Badge>}
            {job.type && <Badge>{job.type}</Badge>}
            {job.mode && <Badge>{job.mode}</Badge>}
            {job.experience && <Badge>{job.experience}</Badge>}
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-6 text-sm">
            <Info label="Location" value={job.location} />
            <Info label="Positions" value={job.positions} />
            <Info label="Deadline" value={deadline} />
            {job.salary_range && <Info label="Salary" value={job.salary_range} />}
          </div>

          <Divider />

          {/* DESCRIPTION */}
          {job.description && (
            <Section title="Job Description">
              <p>{job.description}</p>
            </Section>
          )}

          {/* RESPONSIBILITIES */}
          {Array.isArray(job.responsibilities) && (
            <Section title="Responsibilities">
              <List items={job.responsibilities} />
            </Section>
          )}

          {/* REQUIREMENTS */}
          {Array.isArray(job.requirements) && (
            <Section title="Requirements">
              <List items={job.requirements} />
            </Section>
          )}

          {/* SKILLS */}
          {Array.isArray(job.skills) && (
            <Section title="Skills">
              <TagList items={job.skills} />
            </Section>
          )}

          {/* TOOLS */}
          {Array.isArray(job.tools) && (
            <Section title="Tools">
              <TagList items={job.tools} />
            </Section>
          )}

          {/* NICE TO HAVE */}
          {Array.isArray(job.nice_to_have) && (
            <Section title="Nice to Have">
              <List items={job.nice_to_have} />
            </Section>
          )}

          {/* APPLICATION NOTE */}
          {job.application_note && (
            <Section title="Application Note">
              <p>{job.application_note}</p>
            </Section>
          )}

          <Divider />

          {/* APPLY */}
          <button
            onClick={() => setShowForm(true)}
            className="w-full md:w-auto px-8 py-3 bg-emerald-600 text-white rounded-lg"
          >
            Apply Now
          </button>

        </motion.div>
      </div>

      {showForm && <ApplyForm close={() => setShowForm(false)} />}
    </section>
  );
}

/* ================= COMPONENTS ================= */

const Badge = ({ children }) => (
  <span className="px-4 py-1 bg-emerald-100 rounded-full">{children}</span>
);

const Divider = () => <div className="h-px bg-gray-200 my-8" />;

const Info = ({ label, value }) => (
  <div>
    <div className="text-gray-500">{label}</div>
    <div className="font-semibold">{value || "—"}</div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mt-8">
    <h3 className="text-xl font-semibold text-emerald-700 mb-2">{title}</h3>
    {children}
  </div>
);

const List = ({ items }) => (
  <ul className="list-disc pl-6 space-y-1">
    {items.map((i, idx) => <li key={idx}>{i}</li>)}
  </ul>
);

const TagList = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((i, idx) => (
      <span key={idx} className="px-3 py-1 border rounded-full text-sm">{i}</span>
    ))}
  </div>
);

/* ================= APPLY FORM ================= */

function ApplyForm({ close }) {
  return (
    <div className="fixed inset-0 bg-black/40 overflow-y-auto px-4 py-8 z-50">
      <div className="bg-white max-w-lg mx-auto rounded-2xl p-6 relative">
        <button onClick={close} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4">Apply</h2>

        <form className="space-y-4">
          <input className="input" placeholder="Full Name" />
          <input className="input" placeholder="Email" />
          <input className="input" placeholder="Phone" />
          <input className="input" placeholder="Expected Salary" />
          <input type="file" className="input" />
          <button className="w-full bg-emerald-600 text-white py-3 rounded-lg">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
