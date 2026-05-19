import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock,
  Heart,
  Leaf,
  Loader2,
  MessageCircle,
  TrendingUp,
  Users,
} from "lucide-react";
import careerService from "../api/careerService";
import Img1 from "../assets/fertibase-1.png";
import Img2 from "../assets/fertibase-2.png";
import Img3 from "../assets/fertibase-3.png";
import Img4 from "../assets/About.png";

const HERO_BACKGROUNDS = [Img2, Img3, Img1, Img4];

const BENEFITS = [
  {
    icon: Leaf,
    title: "Sustainable Mission",
    description:
      "Make a real impact on sustainable agriculture and environmental conservation",
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description:
      "Clear growth paths with regular promotions and skill development programs",
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description:
      "Work alongside passionate experts in agriculture and biotechnology",
  },
  {
    icon: Clock,
    title: "Work-Life Balance",
    description: "Flexible hours, remote options, and generous leave policies",
  },
  {
    icon: BookOpen,
    title: "Learning Opportunities",
    description:
      "Sponsored training, workshops, and global conference participation",
  },
  {
    icon: Heart,
    title: "Comprehensive Benefits",
    description: "Health insurance, retirement plans, bonuses, and wellness programs",
  },
];

const APPLICATION_STEPS = [
  {
    step: "01",
    title: "Apply Online",
    desc: "Submit your application and resume through our portal",
  },
  {
    step: "02",
    title: "Initial Review",
    desc: "Our HR team reviews your application and qualifications",
  },
  {
    step: "03",
    title: "Interview",
    desc: "Meet with our team to discuss your role and fit",
  },
  {
    step: "04",
    title: "Onboarding",
    desc: "Receive your offer and join the FertiBase family",
  },
];

export default function CareerPage() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        setLoading(true);
        const data = await careerService.getCareers();
        setJobs(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Failed to load jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchCareers();
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const query = search.trim().toLowerCase();
    if (!query) return true;

    const haystack = [
      job.title,
      job.category,
      job.location,
      job.experience,
      job.mode,
      job.type,
      job.preview,
      Array.isArray(job.skills) ? job.skills.join(" ") : "",
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return haystack.includes(query);
  });

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-soil-light">
        <Loader2 className="h-12 w-12 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error && jobs.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-soil-light px-4 text-center">
        <h2 className="mb-2 text-2xl font-bold text-primary-700">
          Oops! Something went wrong.
        </h2>
        <p className="mb-6 text-text-light">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-primary-600 px-6 py-2 text-soil-base transition hover:bg-primary-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soil-light">
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `linear-gradient(rgba(44,26,17,0.55), rgba(44,26,17,0.55)), url(${HERO_BACKGROUNDS[bgIndex]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </AnimatePresence>

        <div className="relative z-10 mx-auto max-w-5xl px-6 py-20 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 inline-block">
              <span className="rounded-full bg-[#6B412E] px-5 py-2 text-sm font-semibold text-white shadow-lg md:text-base">
                We&apos;re hiring!
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
              Grow Your Career at{" "}
              <span className="text-[#f1d5bf]">FertiBase</span>
            </h1>

            <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-gray-100 md:text-xl">
              Join us in revolutionizing sustainable agriculture through innovative
              biological solutions.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-soil-light py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <p className="mb-2 text-lg font-semibold text-primary-600">WHY CHOOSE US</p>
            <h2 className="mb-4 text-4xl font-bold text-[#6B412E] md:text-5xl">
              Why Join FertiBase?
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-text-light">
              Be part of a mission-driven team that&apos;s transforming agriculture
              while building meaningful careers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="rounded-xl border border-primary-100 bg-white p-8 shadow-lg transition-shadow hover:shadow-xl"
                >
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary-100">
                    <Icon className="h-7 w-7 text-primary-600" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-text-base">
                    {benefit.title}
                  </h3>
                  <p className="leading-relaxed text-text-light">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="openings" className="bg-soil-light px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="mb-2 text-lg font-semibold text-primary-600">CAREERS</p>
            <h2 className="mb-4 text-4xl font-bold text-[#6B412E] md:text-5xl">
              Current Job Openings
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-text-light">
              Explore opportunities available at FertiBase
            </p>
          </div>

          <div className="mb-12 flex justify-center">
            <input
              type="text"
              placeholder="Search roles..."
              className="w-full max-w-lg rounded-xl border border-primary-300 px-5 py-3 outline-none focus:ring-2 focus:ring-primary-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {filteredJobs.map((job) => {
              const hasDeadline = job.daysLeft !== null && job.daysLeft !== undefined;
              const hasSalary = !!job.salary;
              const isClosed = job.role === "Closed";
              const isFilled = job.role === "Filled";

              return (
                <motion.div
                  key={job.id}
                  whileHover={!isClosed ? { y: -6 } : {}}
                  className={`rounded-3xl border p-8 transition ${
                    isClosed
                      ? "border-red-200 bg-red-50/60 shadow-sm"
                      : isFilled
                      ? "border-blue-200 bg-blue-50/40 shadow-sm hover:shadow-md"
                      : "border-primary-100 bg-white shadow-lg hover:shadow-2xl"
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className={`text-2xl font-bold ${isClosed ? "text-red-900" : "text-text-base"}`}>{job.title}</h3>
                      <p className={`font-medium ${isClosed ? "text-red-600" : "text-primary-600"}`}>
                        {job.category || "General"}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {isClosed && (
                        <span className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-red-300 bg-red-600 px-5 py-2 text-sm font-semibold tracking-[0.01em] text-white shadow-[0_8px_18px_rgba(220,38,38,0.24)] animate-pulse">
                          CLOSED
                        </span>
                      )}
                      {isFilled && (
                        <span className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-blue-300 bg-blue-600 px-5 py-2 text-sm font-semibold tracking-[0.01em] text-white shadow-[0_8px_18px_rgba(37,99,235,0.24)]">
                          FILLED
                        </span>
                      )}
                      {job.type && (
                        <span className={`inline-flex min-h-[42px] items-center justify-center rounded-full border px-5 py-2 text-sm font-semibold tracking-[0.01em] text-white shadow-[0_8px_18px_rgba(107,65,46,0.24)] ${
                          isClosed
                            ? "border-red-400 bg-red-800"
                            : isFilled
                            ? "border-blue-400 bg-blue-800"
                            : "border-[#8b5a3c] bg-[#6B412E]"
                        }`}>
                          {job.type}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`mb-4 flex flex-wrap gap-4 text-sm ${isClosed ? "text-red-700/80" : "text-text-light"}`}>
                    {job.location && <span>Location: {job.location}</span>}
                    {job.experience && <span>Experience: {job.experience}</span>}
                    {job.mode && <span>Mode: {job.mode}</span>}
                  </div>

                  {job.preview && (
                    <p className={`mb-4 line-clamp-3 text-base ${isClosed ? "text-red-900/70" : "text-text-base"}`}>{job.preview}</p>
                  )}

                  {Array.isArray(job.skills) && job.skills.length > 0 && (
                    <div className="mb-5">
                      <h4 className={`mb-2 text-sm font-semibold ${isClosed ? "text-red-800" : "text-primary-700"}`}>
                        Key Skills
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.slice(0, 6).map((skill) => (
                          <span
                            key={`${job.id}-${skill}`}
                            className={`inline-flex min-h-[38px] items-center justify-center rounded-full border px-4 py-2 text-xs font-medium shadow-sm transition-colors duration-200 ${
                              isClosed
                                ? "border-red-200 bg-red-100/50 text-red-800"
                                : "border-[#d8c2b2] bg-white text-[#6B412E] hover:border-[#cba58c] hover:bg-[#f3e4d8]"
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {(hasDeadline || hasSalary || job.positions) && (
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-sm">
                      <div className={`font-semibold ${isClosed ? "text-red-800" : "text-primary-700"}`}>
                        {job.positions ? `${job.positions} positions` : ""}
                        {job.positions && hasDeadline ? " • " : ""}
                        {hasDeadline && !isClosed ? `${job.daysLeft} days left` : ""}
                      </div>

                      {hasSalary && (
                        <div className={`font-semibold ${isClosed ? "text-red-800" : "text-primary-700"}`}>
                          Salary: {job.salary}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between">
                    <button
                      onClick={() => navigate(`/careers/${job.id}`, { state: job })}
                      className={`flex items-center gap-1 font-semibold hover:underline ${
                        isClosed ? "text-red-700 hover:text-red-900" : "text-primary-700"
                      }`}
                    >
                      View Details <ArrowRight size={18} />
                    </button>

                    {isClosed ? (
                      <button
                        disabled
                        className="rounded-xl border border-red-200 bg-red-100 px-6 py-2.5 font-semibold text-red-500 cursor-not-allowed shadow-inner"
                      >
                        Closed
                      </button>
                    ) : isFilled ? (
                      <button
                        disabled
                        className="rounded-xl border border-slate-300 bg-slate-200 px-6 py-2.5 font-semibold text-slate-500 cursor-not-allowed"
                      >
                        Filled
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/careers/${job.id}`, { state: job })}
                        className="rounded-xl bg-primary-600 px-6 py-2.5 font-semibold text-white transition hover:bg-primary-700"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredJobs.length === 0 && (
            <p className="mt-10 text-center text-text-light">
              No job openings available at the moment.
            </p>
          )}
        </div>
      </section>

      <section className="bg-soil-light py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-[#6B412E] md:text-5xl">
              Our Application Process
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-text-light">
              Simple steps to join the FertiBase team
            </p>
          </motion.div>

          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
            {APPLICATION_STEPS.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary-100">
                  <span className="text-2xl font-bold text-primary-600">{item.step}</span>
                </div>

                <h3 className="mb-2 text-xl font-bold text-text-base">{item.title}</h3>
                <p className="text-text-light">{item.desc}</p>

                {index < APPLICATION_STEPS.length - 1 && (
                  <div className="absolute top-10 -right-6 hidden items-center justify-center md:flex">
                    <ArrowRight className="h-8 w-8 text-primary-400" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 text-4xl font-bold text-[#6B412E] md:text-5xl">
              Ready to Grow with FertiBase?
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-primary-100">
              Don&apos;t see a role that fits? We&apos;re always looking for talented
              individuals passionate about sustainable agriculture.
            </p>
            <div className="flex justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contactus"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-[#6B412E] shadow-lg transition-all hover:shadow-2xl"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get in Touch
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
