
// CareerPage.jsx — Option C (Select Dropdown + Search + See More + Auto Scroll)

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ArrowLeft, Loader2, Mail, ArrowRight, Leaf, TrendingUp, Users, Clock, BookOpen, Heart, FileText, CheckCircle, MessageCircle, Send } from "lucide-react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import careerService from "../api/careerService";
import Img3 from "../assets/fertibase-3.png";
import Img1 from "../assets/fertibase-1.png";
import Img2 from "../assets/fertibase-2.png";
import Img4 from "../assets/About.png";
const HERO_BACKGROUNDS = [Img2, Img3, Img1, Img4];





export default function CareerPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCards, setVisibleCards] = useState({});
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollRef = useRef(null);

  const navigate = useNavigate();
// Inside CareerPage component
const [bgIndex, setBgIndex] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setBgIndex((prev) => (prev + 1) % HERO_BACKGROUNDS.length);
  }, 5000);
  return () => clearInterval(interval);
}, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3200,
    arrows: true,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
  const fetchCareers = async () => {
    try {
      setLoading(true);
      const data = await careerService.getCareers();

      const grouped = data.reduce((acc, job) => {
        const category = job.category || 'Other';
        if (!acc[category]) acc[category] = [];
        acc[category].push(job);
        return acc;
      }, {});

      const formattedJobs = Object.keys(grouped).map(category => ({
        category,
        cards: grouped[category],
      }));

      setJobs(formattedJobs);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  fetchCareers();
}, []);


  const categories = ["All", ...jobs.map((g) => g.category)];

  const filteredJobs = jobs
    .filter((g) => (selectedCategory === "All" ? true : g.category === selectedCategory))
    .map((g) => ({
      ...g,
      cards: g.cards.filter((c) => c.title.toLowerCase().includes(search.toLowerCase())),
    }));

  const handleSeeMore = (cat) => {
    setVisibleCards((prev) => ({
      ...prev,
      [cat]: (prev[cat] || 3) + 3,
    }));
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [openIndex]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-soil-light">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    );
  }

  // Only show error if we have no jobs and an error occurred
  if (error && jobs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-soil-light text-center px-4">
        <h2 className="text-2xl font-bold text-primary-700 mb-2">Oops! Something went wrong.</h2>
        <p className="text-text-light mb-6">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-primary-600 text-soil-base rounded-lg hover:bg-primary-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soil-light">
      {/* Page Title */}
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Image */}
       <AnimatePresence>
  <motion.div
    key={bgIndex}
    initial={{ opacity: 0, scale: 1.05 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1 }}
    className="absolute inset-0"
    style={{
      backgroundImage: `url(${HERO_BACKGROUNDS[bgIndex]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  />
</AnimatePresence>

        

        {/* Content */}
        <div className="relative z-10 text-center px-6 lg:px-8 py-20 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* We're hiring badge */}
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-primary-600 text-white rounded-full md:text-6xl font-semibold">
                We're hiring!
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              Grow Your Career at{" "}
              <span className="text-primary-400">FertiBase</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Join us in revolutionizing sustainable agriculture through innovative biological solutions.
            </p>

            
          </motion.div>
        </div>

        
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-soil-light">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-primary-600 font-semibold text-lg mb-2">WHY CHOOSE US</p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#6B412E] mb-4">
              Why Join FertiBase?
            </h2>
            <p className="text-xl text-text-light max-w-3xl mx-auto">
              Be part of a mission-driven team that's transforming agriculture while building meaningful careers
            </p>
          </motion.div>

          {/* Benefit Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sustainable Mission */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg border border-primary-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Leaf className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-text-base mb-3">Sustainable Mission</h3>
              <p className="text-text-light leading-relaxed">
                Make a real impact on sustainable agriculture and environmental conservation
              </p>
            </motion.div>

            {/* Career Growth */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg border border-primary-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <TrendingUp className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-text-base mb-3">Career Growth</h3>
              <p className="text-text-light leading-relaxed">
                Clear growth paths with regular promotions and skill development programs
              </p>
            </motion.div>

            {/* Collaborative Culture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg border border-primary-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Users className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-text-base mb-3">Collaborative Culture</h3>
              <p className="text-text-light leading-relaxed">
                Work alongside passionate experts in agriculture and biotechnology
              </p>
            </motion.div>

            {/* Work-Life Balance */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg border border-primary-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-text-base mb-3">Work-Life Balance</h3>
              <p className="text-text-light leading-relaxed">
                Flexible hours, remote options, and generous leave policies
              </p>
            </motion.div>

            {/* Learning Opportunities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg border border-primary-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-text-base mb-3">Learning Opportunities</h3>
              <p className="text-text-light leading-relaxed">
                Sponsored training, workshops, and global conference participation
              </p>
            </motion.div>

            {/* Comprehensive Benefits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-8 shadow-lg border border-primary-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-14 h-14 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-7 w-7 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-text-base mb-3">Comprehensive Benefits</h3>
              <p className="text-text-light leading-relaxed">
                Health insurance, retirement plans, bonuses, and wellness programs
              </p>
            </motion.div>
          </div>
        </div>
      </section>
{/* Job Openings Section */}
<section id="openings" className="py-20 px-4 bg-soil-light">
  <div className="max-w-7xl mx-auto">

    {/* Heading */}
    <div className="text-center mb-12">
      <p className="text-primary-600 font-semibold text-lg mb-2">CAREERS</p>
      <h2 className="text-4xl md:text-5xl font-bold text-[#6B412E] mb-4">
        Current Job Openings
      </h2>
      <p className="text-xl text-text-light max-w-3xl mx-auto">
        Explore opportunities available at FertiBase
      </p>
    </div>

    {/* Search */}
    <div className="flex justify-center mb-12">
      <input
        type="text"
        placeholder="Search roles..."
        className="w-full max-w-lg px-5 py-3 rounded-xl border border-primary-300 focus:ring-2 focus:ring-primary-500 outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* Jobs Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {jobs
  .flatMap(group => group.cards)
  .filter(job =>
    job.title?.toLowerCase().includes(search.toLowerCase())
  )
  .map(job => {
    console.log(job);

    const hasDeadline =
      job.daysLeft !== null &&
      job.daysLeft !== undefined;

    const hasSalary =
      !!job.salary_range || !!job.salary;

    return (
      <motion.div
        key={job.id}
        whileHover={{ y: -6 }}
        className="bg-white rounded-3xl p-8 shadow-lg border border-primary-100 hover:shadow-2xl transition"
      >

        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl font-bold text-text-base">
              {job.title}
            </h3>
            <p className="text-primary-600 font-medium">
              {job.category || "General"}
            </p>
          </div>

          {job.type && (
            <span className="px-4 py-1.5 text-sm rounded-full bg-primary-100 text-primary-700 font-semibold">
              {job.type}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-4 text-sm text-text-light mb-4">
          {job.location && <span>📍 {job.location}</span>}
          {job.experience && <span>🧑‍💼 {job.experience}</span>}
          {job.mode && <span>🏢 {job.mode}</span>}
        </div>

        {/* Short Preview */}
        {job.short_preview && (
          <p className="text-text-base mb-4 line-clamp-3">
            {job.short_preview}
          </p>
        )}

        {/* Key Skills */}
        {Array.isArray(job.skills) && job.skills.length > 0 && (
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-primary-700 mb-2">
              Key Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 6).map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-xs rounded-full bg-primary-50 text-primary-700 border border-primary-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Footer Meta — schema driven */}
        {(hasDeadline || hasSalary || job.positions) && (
          <div className="flex flex-wrap items-center justify-between gap-4 text-sm mt-4">

            <div className="text-primary-700 font-semibold">
              {job.positions && `${job.positions} positions`}
              {job.positions && hasDeadline && " • "}
              {hasDeadline && `${job.daysLeft} days left`}
            </div>

            {hasSalary && (
              <div className="text-primary-700 font-semibold">
                💰 {job.salary_range || job.salary}
              </div>
            )}

          </div>
        )}

        {/* Actions */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() =>
              navigate(`/Careers/${job.id}`, { state: job })
            }
            className="flex items-center gap-1 text-primary-700 font-semibold hover:underline"
          >
            View Details <ArrowRight size={18} />
          </button>

          <button
            onClick={() =>
              navigate(`/Careers/${job.id}`, { state: job })
            }
            className="px-6 py-2.5 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition"
          >
            Apply Now
          </button>
        </div>

      </motion.div>
    );
  })}


    </div>

    {/* Empty State */}
    {jobs.length === 0 && (
      <p className="text-center text-text-light mt-10">
        No job openings available at the moment.
      </p>
    )}
  </div>
</section>


      {/* Application Process Section */}
      <section className="py-20 bg-soil-light">
  <div className="max-w-7xl mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-12"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-[#6B412E] mb-4">
        Our Application Process
      </h2>
      <p className="text-xl text-text-light max-w-3xl mx-auto">
        Simple steps to join the FertiBase team
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
      {[
        { step: "01", title: "Apply Online", desc: "Submit your application and resume through our portal" },
        { step: "02", title: "Initial Review", desc: "Our HR team reviews your application and qualifications" },
        { step: "03", title: "Interview", desc: "Meet with our team to discuss your role and fit" },
        { step: "04", title: "Onboarding", desc: "Receive your offer and join the FertiBase family" }
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="relative text-center"
        >
          {/* Step Circle */}
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-primary-600">
              {item.step}
            </span>
          </div>

          <h3 className="text-xl font-bold text-text-base mb-2">
            {item.title}
          </h3>
          <p className="text-text-light">{item.desc}</p>

          {/* Arrow (desktop only, except last step) */}
          {index < 3 && (
            <div className="hidden md:flex absolute top-10 -right-6 items-center justify-center">
              <ArrowRight className="w-8 h-8 text-primary-400" />
            </div>
          )}
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#6B412E] mb-4">
              Ready to Grow with FertiBase?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Don't see a role that fits? We're always looking for talented individuals passionate about sustainable agriculture.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.98 }}
>
  <Link
    to="/contactus"
    className="inline-flex items-center justify-center bg-white text-[#6B412E] px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-2xl transition-all"
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
