import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Loader2,
  MapPin,
  Upload,
  X,
} from "lucide-react";
import supabase from "../lib/supabaseClient";

const INITIAL_FORM = {
  full_name: "",
  email: "",
  phone: "",
  current_company: "",
  experience_years: "",
  linkedin_url: "",
  course: "",
  course_other: "",
  domain: "",
  skills: "",
  languages_known: "",
  location: "",
  referred_by: "",
  cover_letter: "",
};

const DEGREE_OPTIONS = [
  "B.Tech",
  "M.Tech",
  "B.Sc",
  "M.Sc",
  "MBA",
  "PhD",
  "Other",
];

const getMinExperience = (expStr) => {
  if (!expStr) return 0;
  const match = expStr.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : 0;
};

export default function ApplyForm({ close, jobId, job }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [resume, setResume] = useState(null);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [otpCooldown, setOtpCooldown] = useState(0);
  const toastTimeoutRef = useRef(null);

  useEffect(() => {
    if (otpCooldown <= 0) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setOtpCooldown((prev) => prev - 1);
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [otpCooldown]);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "email") {
      setEmailVerified(false);
      setShowOtpInput(false);
      setOtp("");
    }
  };

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 5000);
  };

  const handleSendOtp = async () => {
    const normalizedEmail = form.email.trim().toLowerCase();

    if (!normalizedEmail) {
      showToast("Please enter your email first.");
      return;
    }

    if (otpCooldown > 0) {
      showToast(`Please wait ${otpCooldown}s before requesting another OTP.`);
      return;
    }

    try {
      setEmailLoading(true);
      const { error } = await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: {
          shouldCreateUser: true,
        },
      });

      if (error) {
        throw error;
      }

      setForm((prev) => ({ ...prev, email: normalizedEmail }));
      setShowOtpInput(true);
      setOtpCooldown(60);
      showToast("OTP sent to your email!", "success");
    } catch (err) {
      console.error(err);
      const errorMessage =
        err.message?.toLowerCase().includes("rate limit")
          ? "Email rate limit exceeded. Please wait a minute and try again."
          : err.message || "Failed to send OTP. Please try again.";
      setOtpCooldown(60);
      showToast(errorMessage);
    } finally {
      setEmailLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    const normalizedEmail = form.email.trim().toLowerCase();

    if (!otp.trim()) {
      return;
    }

    try {
      setVerifyLoading(true);
      const { error } = await supabase.auth.verifyOtp({
        email: normalizedEmail,
        token: otp.trim(),
        type: "email",
      });

      if (error) {
        throw error;
      }

      setEmailVerified(true);
      setShowOtpInput(false);
      setOtp("");
      showToast("Email verified successfully!", "success");
    } catch (err) {
      console.error(err);
      showToast(err.message || "Invalid or expired OTP.");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedEmail = form.email.trim().toLowerCase();
    const minimumExperience = getMinExperience(job?.experience);

    if (!emailVerified) {
      showToast("Verify email first.");
      return;
    }

    if (!resume) {
      showToast("Resume is required.");
      return;
    }

    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      showToast("Unable to validate your session. Please try again.");
      return;
    }

    const sessionEmail = session?.user?.email?.toLowerCase() || "";
    if (!session || sessionEmail !== normalizedEmail) {
      setEmailVerified(false);
      showToast("Please verify the same email address again.");
      return;
    }

    try {
      setLoading(true);

      const fileExt = resume.name.split(".").pop();
      const safeName = form.full_name.trim().replace(/\s+/g, "_") || "candidate";
      const fileName = `${Date.now()}-${safeName}.${fileExt}`;
      const filePath = `job-applications/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(filePath, resume);

      if (uploadError) {
        throw uploadError;
      }

      const { data: resumeUrl } = supabase.storage
        .from("resumes")
        .getPublicUrl(filePath);

      const additionalDetails = [
        form.current_company && `Current Company: ${form.current_company}`,
        form.experience_years &&
          `Years of Experience: ${form.experience_years}`,
        minimumExperience > 0 &&
          `Minimum Required Experience: ${minimumExperience} years`,
        form.linkedin_url && `LinkedIn URL: ${form.linkedin_url}`,
        form.course &&
          `Highest Course / Degree: ${
            form.course === "Other" ? form.course_other : form.course
          }`,
        form.domain && `Professional Domain: ${form.domain}`,
        form.languages_known && `Languages Known: ${form.languages_known}`,
        form.location && `Your Location: ${form.location}`,
        form.skills && `Key Skills: ${form.skills}`,
        form.referred_by && `Referred By: ${form.referred_by}`,
      ]
        .filter(Boolean)
        .join("\n");

      const finalCoverNote = [form.cover_letter, additionalDetails]
        .filter(Boolean)
        .join("\n\n");

      const { error: insertError } = await supabase
        .from("job_applications")
        .insert([
          {
            job_id: jobId,
            full_name: form.full_name.trim(),
            email: normalizedEmail,
            phone: form.phone.trim(),
            cover_note: finalCoverNote,
            resume_url: resumeUrl.publicUrl,
          },
        ]);

      if (insertError) {
        throw insertError;
      }

      showToast(
        "Application submitted successfully! You will receive a confirmation shortly.",
        "success"
      );

      window.setTimeout(() => {
        close();
        navigate("/CareerPage");
      }, 1200);
    } catch (err) {
      console.error(err);
      showToast(err.message || "Failed to submit application. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 px-4 pt-[72px] pb-8 backdrop-blur-sm">
        <div className="relative mx-auto my-8 max-w-5xl rounded-[32px] bg-white p-6 shadow-2xl md:p-8">
          <button
            onClick={close}
            className="absolute right-5 top-5 rounded-full bg-[#f4efe9] p-3 text-[#6B412E] transition hover:bg-[#eadfd4]"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="mb-8">
            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b5a3c]">
              Apply For
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#1f2937] md:text-4xl">
              {job?.title || "This Role"}
            </h2>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-[#6b7280]">
              {job?.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {job.location}
                </span>
              )}
              {job?.location && job?.type && <span>|</span>}
              {job?.type && (
                <span className="inline-flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4" /> {job.type}
                </span>
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label="Full Name"
                required
                value={form.full_name}
                onChange={(e) => setField("full_name", e.target.value)}
              />

              <div>
                <Label required>Email Address</Label>
                <div className="flex gap-2">
                  <input
                    required
                    type="email"
                    disabled={emailVerified}
                    value={form.email}
                    onChange={(e) => setField("email", e.target.value)}
                    className={`w-full rounded-[18px] border px-5 py-4 text-lg text-[#1c2537] outline-none transition focus:border-[#6B412E] focus:ring-2 focus:ring-[#6B412E]/20 ${
                      emailVerified
                        ? "border-[#d8dee8] bg-[#f4f4f5] text-[#9ca3af]"
                        : "border-[#d8dee8] bg-white"
                    }`}
                  />
                  {!emailVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={emailLoading || otpCooldown > 0}
                      className="min-w-[124px] rounded-[18px] bg-[#ead8ca] px-4 py-4 text-base font-semibold text-[#6B412E] transition hover:bg-[#dfc7b6] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {emailLoading
                        ? "Sending..."
                        : otpCooldown > 0
                        ? `Retry in ${otpCooldown}s`
                        : showOtpInput
                        ? "Resend"
                        : "Verify"}
                    </button>
                  )}
                  {emailVerified && (
                    <span className="inline-flex items-center gap-1 rounded-[18px] bg-[#f5ede7] px-4 py-4 text-sm font-semibold text-[#6B412E]">
                      <CheckCircle2 className="h-4 w-4" />
                      Verified
                    </span>
                  )}
                </div>

                {showOtpInput && !emailVerified && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={6}
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                      className="w-full rounded-[18px] border border-[#d9c1ad] px-5 py-4 text-center text-lg font-semibold tracking-[0.35em] text-[#1c2537] outline-none transition focus:border-[#6B412E] focus:ring-2 focus:ring-[#6B412E]/20"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={verifyLoading || otp.length < 6}
                      className="min-w-[124px] rounded-[18px] bg-[#6B412E] px-4 py-4 text-base font-semibold text-white transition hover:bg-[#5a3626] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {verifyLoading ? "Checking..." : "Confirm"}
                    </button>
                  </div>
                )}
              </div>

              <Input
                label="Phone Number"
                required
                type="tel"
                value={form.phone}
                onChange={(e) => setField("phone", e.target.value)}
              />

              <Input
                label="Current Company"
                value={form.current_company}
                onChange={(e) => setField("current_company", e.target.value)}
              />

              <div>
                <Input
                  label="Years of Experience"
                  required
                  type="number"
                  min="0"
                  placeholder="Enter years"
                  value={form.experience_years}
                  onChange={(e) => setField("experience_years", e.target.value)}
                />
                {getMinExperience(job?.experience) > 0 && (
                  <p className="mt-1 text-xs italic text-[#7a5a46]">
                    Minimum requirement for this job is {getMinExperience(job?.experience)} years
                  </p>
                )}
                {form.experience_years &&
                  Number(form.experience_years) < getMinExperience(job?.experience) && (
                    <p className="mt-1 text-xs font-medium text-red-600">
                      You have less than the required minimum experience.
                    </p>
                  )}
              </div>

              <Input
                label="LinkedIn URL"
                type="url"
                placeholder="https://linkedin.com/in/..."
                value={form.linkedin_url}
                onChange={(e) => setField("linkedin_url", e.target.value)}
              />

              <div>
                <Label required>Resume / CV</Label>
                <label className="flex cursor-pointer items-center gap-3 rounded-[18px] border border-dashed border-[#d7dfe7] px-5 py-5 text-[18px] text-[#5b6472] transition hover:border-[#8b5a3c] hover:bg-[#faf7f4]">
                  <Upload className="h-5 w-5 text-[#6B412E]" />
                  <span className="truncate">
                    {resume ? resume.name : "Upload PDF or DOC"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    required
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <Label>Highest Course / Degree</Label>
                <select
                  value={form.course}
                  onChange={(e) => setField("course", e.target.value)}
                  className="w-full rounded-[18px] border border-[#d8dee8] px-5 py-4 text-lg text-[#1c2537] outline-none transition focus:border-[#6B412E] focus:ring-2 focus:ring-[#6B412E]/20"
                >
                  <option value="">Select Course</option>
                  {DEGREE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {form.course === "Other" && (
                  <textarea
                    rows={2}
                    value={form.course_other}
                    onChange={(e) => setField("course_other", e.target.value)}
                    placeholder="Enter your course details..."
                    className="mt-2 w-full rounded-[18px] border border-[#d8dee8] px-5 py-4 text-base text-[#1c2537] outline-none transition focus:border-[#6B412E] focus:ring-2 focus:ring-[#6B412E]/20"
                  />
                )}
              </div>

              <Input
                label="Professional Domain"
                placeholder="e.g. Developer, Designer, Research"
                value={form.domain}
                onChange={(e) => setField("domain", e.target.value)}
              />

              <Input
                label="Languages Known"
                required
                placeholder="e.g. English, Telugu, Hindi"
                value={form.languages_known}
                onChange={(e) => setField("languages_known", e.target.value)}
              />

              <Input
                label="Your Location"
                required
                placeholder="City, State"
                value={form.location}
                onChange={(e) => setField("location", e.target.value)}
              />

              <div className="md:col-span-2">
                <Input
                  label="Key Skills"
                  required
                  placeholder="e.g. React, Python, SQL, Project Management"
                  value={form.skills}
                  onChange={(e) => setField("skills", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>Referred By</Label>
              <textarea
                rows={2}
                value={form.referred_by}
                onChange={(e) => setField("referred_by", e.target.value)}
                placeholder="Name of person who referred you..."
                className="mb-4 w-full rounded-[18px] border border-[#d8dee8] px-5 py-4 text-base text-[#1c2537] outline-none transition focus:border-[#6B412E] focus:ring-2 focus:ring-[#6B412E]/20"
              />

              <Label>Cover Letter / Note</Label>
              <textarea
                rows={4}
                value={form.cover_letter}
                onChange={(e) => setField("cover_letter", e.target.value)}
                placeholder="Tell us why you are a great fit..."
                className="w-full rounded-[18px] border border-[#d8dee8] px-5 py-4 text-base text-[#1c2537] outline-none transition focus:border-[#6B412E] focus:ring-2 focus:ring-[#6B412E]/20"
              />
            </div>

            <div className="flex flex-col justify-end gap-3 pt-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={close}
                className="px-6 py-3 font-semibold text-[#4b5563] transition hover:bg-[#f7f4f1]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || !emailVerified}
                className="inline-flex min-w-[240px] items-center justify-center gap-2 rounded-[18px] bg-[#6B412E] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#5a3626] disabled:cursor-not-allowed disabled:bg-[#c7b7ab]"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>{resume ? "Uploading & Submitting..." : "Submitting..."}</span>
                  </>
                ) : emailVerified ? (
                  "Submit Application"
                ) : (
                  "Verify Email First"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {toast.message && (
        <div
          className={`fixed bottom-6 right-6 z-[9999] flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-4 shadow-2xl ${
            toast.type === "error"
              ? "border-red-200 bg-red-50 text-red-800"
              : "border-[#d9c1ad] bg-[#f9f2eb] text-[#6B412E]"
          }`}
        >
          <div className="mt-0.5">
            {toast.type === "error" ? (
              <X className="h-5 w-5" />
            ) : (
              <CheckCircle2 className="h-5 w-5" />
            )}
          </div>
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      )}
    </>
  );
}

function Label({ children, required = false }) {
  return (
    <label className="mb-2 block text-[16px] font-semibold text-[#3f4a5d]">
      {children} {required ? "*" : ""}
    </label>
  );
}

function Input({ label, required = false, ...props }) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <input
        {...props}
        required={required}
        className="w-full rounded-[18px] border border-[#d8dee8] px-5 py-4 text-lg text-[#1c2537] outline-none transition placeholder:text-[#94a3b8] focus:border-[#6B412E] focus:ring-2 focus:ring-[#6B412E]/20"
      />
    </div>
  );
}
