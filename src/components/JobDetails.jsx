// src/pages/JobDetails.jsx
import { useParams, useNavigate } from "react-router-dom";
import careerService from "../api/careerService";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import ApplyForm from "./ApplyForm";

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
        <Loader2 className="w-12 h-12 animate-spin text-[#6B412E]" />
      </div>
    );
  }

  if (!job || error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-[#6B412E] text-white rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const deadline =
    job.daysLeft != null
      ? new Date(Date.now() + job.daysLeft * 86400000).toLocaleDateString("en-IN")
      : "N/A";

  return (
    <section className="min-h-screen bg-[#F5E9E2] py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-[#6B412E] font-medium"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Card */}
        <motion.div className="bg-white rounded-3xl p-8 shadow-xl border border-[#E8D5C9]">

          {/* HEADER */}
          <h1 className="text-4xl font-bold text-[#6B412E]">
            {job.title}
          </h1>
          <p className="mt-2 text-[#6B4A3A]">
            {job.short_preview}
          </p>

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
            {job.salary_range && (
              <Info label="Salary" value={job.salary_range} />
            )}
          </div>

          <Divider />

          {job.description && (
            <Section title="Job Description">
              <p>{job.description}</p>
            </Section>
          )}

          {Array.isArray(job.responsibilities) && (
            <Section title="Responsibilities">
              <List items={job.responsibilities} />
            </Section>
          )}

          {Array.isArray(job.requirements) && (
            <Section title="Requirements">
              <List items={job.requirements} />
            </Section>
          )}

          {Array.isArray(job.skills) && (
            <Section title="Skills">
              <TagList items={job.skills} />
            </Section>
          )}

          {Array.isArray(job.tools) && (
            <Section title="Tools">
              <TagList items={job.tools} />
            </Section>
          )}

          {Array.isArray(job.nice_to_have) && (
            <Section title="Nice to Have">
              <List items={job.nice_to_have} />
            </Section>
          )}

          {job.application_note && (
            <Section title="Application Note">
              <p>{job.application_note}</p>
            </Section>
          )}

          <Divider />

          {/* APPLY */}
          <button
            onClick={() => setShowForm(true)}
            className="
              w-full md:w-auto
              px-8 py-3
              bg-[#6B412E]
              hover:bg-[#5e1416]
              text-white
              rounded-xl
              font-semibold
              shadow-md
              transition-all
            "
          >
            Apply Now
          </button>

        </motion.div>
      </div>

      {showForm && (
  <ApplyForm
    close={() => setShowForm(false)}
    jobId={job.id}
  />
)}
    </section>
  );
}

/* ================= COMPONENTS ================= */

const Badge = ({ children }) => (
  <span className="px-4 py-1 bg-[#F5E9E2] text-[#6B412E] rounded-full font-medium border border-[#E8D5C9]">
    {children}
  </span>
);

const Divider = () => (
  <div className="h-px bg-[#E8D5C9] my-8" />
);

const Info = ({ label, value }) => (
  <div>
    <div className="text-[#6B4A3A]">{label}</div>
    <div className="font-semibold text-[#3B2418]">
      {value || "—"}
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="mt-8">
    <h3 className="text-xl font-semibold text-[#6B412E] mb-2">
      {title}
    </h3>
    <div className="text-[#3B2418]">{children}</div>
  </div>
);

const List = ({ items }) => (
  <ul className="list-disc pl-6 space-y-1 text-[#3B2418]">
    {items.map((i, idx) => (
      <li key={idx}>{i}</li>
    ))}
  </ul>
);

const TagList = ({ items }) => (
  <div className="flex flex-wrap gap-2">
    {items.map((i, idx) => (
      <span
        key={idx}
        className="px-3 py-1 border border-[#E8D5C9] rounded-full text-sm text-[#6B412E] bg-[#F5E9E2]"
      >
        {i}
      </span>
    ))}
  </div>
);

/* ================= APPLY FORM ================= */

// function ApplyForm({ close }) {
//   return (
//     <div className="fixed inset-0 bg-black/40 overflow-y-auto px-4 py-8 z-50">
//       <div className="bg-white max-w-lg mx-auto rounded-2xl p-6 relative">
//         <button onClick={close} className="absolute top-4 right-4">
//           <X />
//         </button>

//         <h2 className="text-xl font-bold mb-4">Apply</h2>

//         <form className="space-y-4">
//           <input className="input" placeholder="Full Name" />
//           <input className="input" placeholder="Email" />
//           <input className="input" placeholder="Phone" />
//           <input className="input" placeholder="Expected Salary" />
//           <input type="file" className="input" />
//           <button className="w-full bg-emerald-600 text-white py-3 rounded-lg">
//             Submit
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
