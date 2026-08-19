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
import { useTranslation } from "../i18n/useTranslation";
import { getLocalizedEntityField } from "../i18n/entityTranslations";

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
  const { language, t, td } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [resume, setResume] = useState(null);
  
  // Email verification state
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpError, setOtpError] = useState("");
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", type: "" });
  const toastTimeoutRef = useRef(null);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Helper to localize job fields
  const localizeJobField = (field, fallback = "") =>
    getLocalizedEntityField({
      item: job,
      field,
      language,
      td,
      namespace: "career",
      fallback,
    });

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    window.clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = window.setTimeout(() => {
      setToast({ message: "", type: "" });
    }, 5000);
  };

  const handleSendOtp = async () => {
    if (!form.email || !form.email.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    
    setOtpError("");
    setIsVerifyingEmail(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email.trim().toLowerCase() }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || "Failed to send OTP");
      }
      
      setOtpSent(true);
      showToast("Verification code sent to your email.", "success");
    } catch (err) {
      showToast(err.message, "error");
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otpCode || otpCode.length !== 6) {
      setOtpError("Please enter a valid 6-digit code.");
      return;
    }
    
    setOtpError("");
    setIsVerifyingEmail(true);
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          email: form.email.trim().toLowerCase(),
          otp_code: otpCode 
        }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || "Invalid code");
      }
      
      setIsEmailVerified(true);
      setOtpSent(false);
      showToast("Email verified successfully!", "success");
    } catch (err) {
      setOtpError(err.message);
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    const requiredFields = ["full_name", "email", "phone", "experience_years", "languages_known", "location", "skills"];
    const missingFields = requiredFields.filter(f => !form[f] || form[f].toString().trim() === "");

    if (missingFields.length > 0 || !resume) {
      showToast(t("apply_fill_all_required", "Please fill all required details correctly."), "error");
      return;
    }

    if (!isEmailVerified) {
      showToast(t("apply_please_verify_email", "Please verify your email before submitting."), "error");
      return;
    }

    const normalizedEmail = form.email.trim().toLowerCase();
    const minimumExperience = getMinExperience(job?.experience);

    try {
      setLoading(true);

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

      const formData = new FormData();
      formData.append("job_id", jobId);
      formData.append("full_name", form.full_name.trim());
      formData.append("email", normalizedEmail);
      formData.append("phone", form.phone.trim());
      formData.append("cover_note", finalCoverNote);
      formData.append("resume", resume);

      const apiUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
      const response = await fetch(`${apiUrl}/applications/apply`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
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
              {t("apply_for", "Apply For")}
            </span>
            <h2 className="mt-2 text-3xl font-bold text-[#1f2937] md:text-4xl">
              {localizeJobField("title", job?.title || t("apply_this_role", "This Role"))}
            </h2>
            <p className="mt-3 flex flex-wrap items-center gap-2 text-[#6b7280]">
              {job?.location && (
                <span className="inline-flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {localizeJobField("location", job.location)}
                </span>
              )}
              {job?.location && job?.type && <span>|</span>}
              {job?.type && (
                <span className="inline-flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4" /> {localizeJobField("type", job.type)}
                </span>
              )}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <Input
                label={t("apply_full_name", "Full Name")}
                required
                value={form.full_name}
                error={attemptedSubmit && !form.full_name.trim()}
                onChange={(e) => setField("full_name", e.target.value)}
              />

              <div>
                <Label required error={attemptedSubmit && !form.email.trim()}>{t("apply_email_address", "Email Address")}</Label>
                <div className="flex gap-2">
                  <input
                    required
                    type="email"
                    value={form.email}
                    disabled={isEmailVerified}
                    onChange={(e) => {
                      setField("email", e.target.value);
                      setIsEmailVerified(false);
                      setOtpSent(false);
                      setOtpCode("");
                    }}
                    className={`w-full rounded-[18px] border px-5 py-4 text-lg outline-none transition focus:ring-2 ${
                      attemptedSubmit && !form.email.trim()
                        ? "border-red-500 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500/20"
                        : "border-[#d8dee8] bg-white text-[#1c2537] focus:border-[#6B412E] focus:ring-[#6B412E]/20"
                    } ${isEmailVerified ? "opacity-70 bg-gray-50" : ""}`}
                  />
                  {!isEmailVerified && (
                    <button
                      type="button"
                      onClick={handleSendOtp}
                      disabled={isVerifyingEmail || !form.email}
                      className="shrink-0 rounded-[18px] bg-[#D4F2DE] px-6 text-[#0A6C35] font-semibold transition hover:bg-[#BCEAC8] disabled:opacity-50 flex items-center justify-center min-w-[100px]"
                    >
                      {isVerifyingEmail ? <Loader2 className="h-5 w-5 animate-spin" /> : (otpSent ? "Resend" : "Verify")}
                    </button>
                  )}
                </div>
                
                {otpSent && !isEmailVerified && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter 6-digit code"
                      maxLength={6}
                      value={otpCode}
                      onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full rounded-[18px] border border-[#d8dee8] px-5 py-4 tracking-[0.3em] font-mono outline-none focus:border-[#6B412E] text-center"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={isVerifyingEmail || otpCode.length !== 6}
                      className="shrink-0 rounded-[18px] bg-[#65B792] px-6 text-white font-semibold transition hover:bg-[#52a07c] disabled:opacity-50 min-w-[100px]"
                    >
                      Confirm
                    </button>
                  </div>
                )}
                {otpError && <p className="mt-2 text-sm font-medium text-red-500">{otpError}</p>}
                {isEmailVerified && <p className="mt-2 text-sm font-medium text-[#0A6C35] flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4"/> Email Verified</p>}
              </div>

              <Input
                label={t("apply_phone_number", "Phone Number")}
                required
                type="tel"
                value={form.phone}
                error={attemptedSubmit && !form.phone.trim()}
                onChange={(e) => setField("phone", e.target.value)}
              />

              <Input
                label={t("apply_current_company", "Current Company")}
                value={form.current_company}
                onChange={(e) => setField("current_company", e.target.value)}
              />

              <div>
                <Input
                  label={t("apply_experience_years", "Years of Experience")}
                  required
                  type="number"
                  min="0"
                  placeholder={t("apply_experience_placeholder", "Enter years")}
                  value={form.experience_years}
                  error={attemptedSubmit && !form.experience_years.trim()}
                  onChange={(e) => setField("experience_years", e.target.value)}
                />
                {getMinExperience(job?.experience) > 0 && (
                  <p className="mt-1 text-xs italic text-[#7a5a46]">
                    {t("apply_min_requirement_prefix", "Minimum requirement for this job is")} {getMinExperience(job?.experience)} {t("apply_years", "years")}
                  </p>
                )}
                {form.experience_years &&
                  Number(form.experience_years) < getMinExperience(job?.experience) && (
                    <p className="mt-1 text-xs font-medium text-red-600">
                      {t("apply_less_experience", "You have less than the required minimum experience.")}
                    </p>
                  )}
              </div>

              <Input
                label={t("apply_linkedin_url", "LinkedIn URL")}
                type="url"
                placeholder={t("apply_linkedin_placeholder", "https://linkedin.com/in/...")}
                value={form.linkedin_url}
                onChange={(e) => setField("linkedin_url", e.target.value)}
              />

              <div>
                <Label required error={attemptedSubmit && !resume}>{t("apply_resume", "Resume / CV")}</Label>
                <label className={`flex cursor-pointer items-center gap-3 rounded-[18px] border border-dashed px-5 py-5 text-[18px] transition ${
                  attemptedSubmit && !resume
                    ? "border-red-500 bg-red-50 text-red-700 hover:border-red-600 hover:bg-red-100"
                    : "border-[#d7dfe7] text-[#5b6472] hover:border-[#8b5a3c] hover:bg-[#faf7f4]"
                }`}>
                  <Upload className={`h-5 w-5 ${attemptedSubmit && !resume ? "text-red-500" : "text-[#6B412E]"}`} />
                  <span className="truncate">
                    {resume ? resume.name : t("apply_upload_resume", "Upload PDF or DOC")}
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
                <Label>{t("apply_course", "Highest Course / Degree")}</Label>
                <select
                  value={form.course}
                  onChange={(e) => setField("course", e.target.value)}
                  className="w-full rounded-[18px] border border-[#d8dee8] px-5 py-4 text-lg text-[#1c2537] outline-none transition focus:border-[#6B412E] focus:ring-2 focus:ring-[#6B412E]/20"
                >
                  <option value="">{t("apply_select_course", "Select Course")}</option>
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
                    placeholder={t("apply_course_details", "Enter your course details...")}
                    className="mt-2 w-full rounded-[18px] border border-[#d8dee8] px-5 py-4 text-base text-[#1c2537] outline-none transition focus:border-[#6B412E] focus:ring-2 focus:ring-[#6B412E]/20"
                  />
                )}
              </div>

              <Input
                label={t("apply_professional_domain", "Professional Domain")}
                placeholder={t("apply_domain_placeholder", "e.g. Developer, Designer, Research")}
                value={form.domain}
                onChange={(e) => setField("domain", e.target.value)}
              />

              <Input
                label={t("apply_languages_known", "Languages Known")}
                required
                placeholder={t("apply_languages_placeholder", "e.g. English, Telugu, Hindi")}
                value={form.languages_known}
                error={attemptedSubmit && !form.languages_known.trim()}
                onChange={(e) => setField("languages_known", e.target.value)}
              />

              <Input
                label={t("apply_your_location", "Your Location")}
                required
                placeholder={t("apply_location_placeholder", "City, State")}
                value={form.location}
                error={attemptedSubmit && !form.location.trim()}
                onChange={(e) => setField("location", e.target.value)}
              />

              <div className="md:col-span-2">
                <Input
                  label={t("apply_key_skills", "Key Skills")}
                  required
                  placeholder={t("apply_skills_placeholder", "e.g. React, Python, SQL, Project Management")}
                  value={form.skills}
                  error={attemptedSubmit && !form.skills.trim()}
                  onChange={(e) => setField("skills", e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label>{t("apply_referred_by", "Referred By")}</Label>
              <textarea
                rows={2}
                value={form.referred_by}
                onChange={(e) => setField("referred_by", e.target.value)}
                placeholder={t("apply_referred_by_placeholder", "Name of person who referred you...")}
                className="mb-4 w-full rounded-[18px] border border-[#d8dee8] px-5 py-4 text-base text-[#1c2537] outline-none transition focus:border-[#6B412E] focus:ring-2 focus:ring-[#6B412E]/20"
              />

              <Label>{t("apply_cover_letter", "Cover Letter / Note")}</Label>
              <textarea
                rows={4}
                value={form.cover_letter}
                onChange={(e) => setField("cover_letter", e.target.value)}
                placeholder={t("apply_cover_letter_placeholder", "Tell us why you are a great fit...")}
                className="w-full rounded-[18px] border border-[#d8dee8] px-5 py-4 text-base text-[#1c2537] outline-none transition focus:border-[#6B412E] focus:ring-2 focus:ring-[#6B412E]/20"
              />
            </div>

            <div className="flex flex-col justify-end gap-3 pt-2 sm:flex-row sm:items-center">
              <button
                type="button"
                onClick={close}
                className="px-6 py-3 font-semibold text-[#4b5563] transition hover:bg-[#f7f4f1]"
              >
                {t("common_cancel", "Cancel")}
              </button>

              <button
                type="submit"
                disabled={loading}
                className={`inline-flex min-w-[240px] items-center justify-center gap-2 rounded-[18px] px-8 py-4 text-lg font-semibold text-white transition disabled:cursor-not-allowed ${
                  !isEmailVerified ? "bg-[#52a07c] hover:bg-[#52a07c]" : "bg-[#6B412E] hover:bg-[#5a3626] disabled:bg-[#c7b7ab]"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>
                      {resume
                        ? t("apply_uploading_submitting", "Uploading & Submitting...")
                        : t("apply_submitting", "Submitting...")}
                    </span>
                  </>
                ) : !isEmailVerified ? (
                  t("apply_verify_email_first", "Verify Email First")
                ) : (
                  t("apply_submit_application", "Submit Application")
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

function Label({ children, required = false, error = false }) {
  return (
    <label className={`mb-2 block text-[16px] font-semibold ${error ? "text-red-600" : "text-[#3f4a5d]"}`}>
      {children} {required ? <span className={error ? "text-red-500" : "text-red-500"}>*</span> : ""}
    </label>
  );
}

function Input({ label, required = false, error = false, ...props }) {
  return (
    <div>
      <Label required={required} error={error}>{label}</Label>
      <input
        {...props}
        required={required}
        className={`w-full rounded-[18px] border px-5 py-4 text-lg outline-none placeholder:text-[#94a3b8] focus:ring-2 transition ${
          error 
            ? "border-red-500 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-500/20" 
            : "border-[#d8dee8] text-[#1c2537] focus:border-[#6B412E] focus:ring-[#6B412E]/20"
        }`}
      />
    </div>
  );
}
