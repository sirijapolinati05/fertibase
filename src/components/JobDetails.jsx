import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";
import careerService from "../api/careerService";
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
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Job not found or failed to load.");
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-[#6B412E]" />
      </div>
    );
  }

  if (!job || error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg bg-[#6B412E] px-6 py-3 text-white"
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

  const status = job.role || "Open";
  const canApply = status !== "Closed" && status !== "Filled";

  return (
    <section className="min-h-screen bg-[#F5E9E2] px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 font-medium text-[#6B412E]"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <motion.div className="rounded-3xl border border-[#E8D5C9] bg-white p-8 shadow-xl">
          <h1 className="text-4xl font-bold text-[#6B412E]">{job.title}</h1>
          <p className="mt-2 text-[#6B4A3A]">{job.preview}</p>

          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            {status !== "Open" && <StatusBadge status={status} />}
            {job.category && <Badge>{job.category}</Badge>}
            {job.type && <Badge>{job.type}</Badge>}
            {job.mode && <Badge>{job.mode}</Badge>}
            {job.experience && <Badge>{job.experience}</Badge>}
          </div>

          <div className="mt-6 grid gap-6 text-sm md:grid-cols-3">
            <Info label="Location" value={job.location} />
            <Info label="Positions" value={job.positions} />
            <Info label="Deadline" value={deadline} />
            {job.salary && <Info label="Salary" value={job.salary} />}
          </div>

          <Divider />

          {job.about && (
            <Section title="Job Description">
              <p>{job.about}</p>
            </Section>
          )}

          <Section title="Responsibilities">
            {Array.isArray(job.responsibilities) && job.responsibilities.length > 0 ? (
              <List items={job.responsibilities} />
            ) : (
              <EmptyText text="No responsibilities required." />
            )}
          </Section>

          <Section title="Requirements">
            {Array.isArray(job.requirements) && job.requirements.length > 0 ? (
              <List items={job.requirements} />
            ) : (
              <EmptyText text="No requirements needed." />
            )}
          </Section>

          <Section title="Skills">
            {Array.isArray(job.skills) && job.skills.length > 0 ? (
              <TagList items={job.skills} />
            ) : (
              <EmptyText text="No skills required." />
            )}
          </Section>

          <Section title="Tools">
            {Array.isArray(job.tools) && job.tools.length > 0 ? (
              <TagList items={job.tools} />
            ) : (
              <EmptyText text="No tools required." />
            )}
          </Section>

          {Array.isArray(job.nice_to_have) && job.nice_to_have.length > 0 && (
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

          {canApply ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full rounded-xl bg-[#6B412E] px-8 py-3 font-semibold text-white shadow-md transition-all hover:bg-[#5e1416] md:w-auto"
            >
              Apply Now
            </button>
          ) : (
            <button
              disabled
              className={`w-full rounded-xl px-8 py-3 font-semibold md:w-auto ${
                status === "Closed"
                  ? "cursor-not-allowed border border-red-200 bg-red-50 text-red-500"
                  : "cursor-not-allowed border border-slate-300 bg-slate-200 text-slate-500"
              }`}
            >
              {status}
            </button>
          )}
        </motion.div>
      </div>

      {showForm && (
        <ApplyForm close={() => setShowForm(false)} jobId={job.id} job={job} />
      )}
    </section>
  );
}

function StatusBadge({ status }) {
  const className =
    status === "Closed"
      ? "border-red-200 bg-red-100 text-red-700"
      : "border-blue-200 bg-blue-100 text-blue-700";

  return (
    <span
      className={`flex items-center justify-center rounded-full border px-4 py-1 text-xs font-bold tracking-wider ${className}`}
    >
      {status.toUpperCase()}
    </span>
  );
}

function Badge({ children }) {
  return (
    <span className="rounded-full border border-[#E8D5C9] bg-[#F5E9E2] px-4 py-1 font-medium text-[#6B412E]">
      {children}
    </span>
  );
}

function Divider() {
  return <div className="my-8 h-px bg-[#E8D5C9]" />;
}

function Info({ label, value }) {
  return (
    <div>
      <div className="text-[#6B4A3A]">{label}</div>
      <div className="font-semibold text-[#3B2418]">{value || "-"}</div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mt-8">
      <h3 className="mb-2 text-xl font-semibold text-[#6B412E]">{title}</h3>
      <div className="text-[#3B2418]">{children}</div>
    </div>
  );
}

function EmptyText({ text }) {
  return <p className="italic text-[#6B4A3A]">{text}</p>;
}

function List({ items }) {
  return (
    <ul className="list-disc space-y-1 pl-6 text-[#3B2418]">
      {items.map((item, index) => (
        <li key={`${item}-${index}`}>{item}</li>
      ))}
    </ul>
  );
}

function TagList({ items }) {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => (
        <span
          key={`${item}-${index}`}
          className="rounded-full border border-[#E8D5C9] bg-[#F5E9E2] px-3 py-1 text-sm text-[#6B412E]"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
