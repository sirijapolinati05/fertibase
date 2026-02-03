import { InlineWidget } from "react-calendly";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Calendar } from "lucide-react";
import supabase from "../lib/supabaseClient";

export default function Contact() {
  const [showScheduling, setShowScheduling] = useState(false);
  const [formData, setFormData] = useState({
  full_name: "",
  email: "",
  phone: "",
  message: "",
});
const [submitting, setSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    // 1. Save message
    const { error } = await supabase.from("contact_messages").insert([
      {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      },
    ]);

    if (error) throw error;

    // 2. Trigger auto-reply email
    await fetch(
  "https://ekseutpxbtlbcbjxalna.supabase.co/functions/v1/send-contact-reply",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      full_name: formData.full_name,
      email: formData.email,
    }),
  }
);

    alert("Message sent successfully 🌱");
    setFormData({ full_name: "", email: "", phone: "", message: "" });
  } catch (err) {
    console.error(err);
    alert("Failed to send message");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="bg-soil-light min-h-screen flex flex-col items-center justify-center py-20 px-6 text-text-base">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#6B412E]">
          Contact <span className="text-primary-600">FertiBase</span>
        </h1>
        <p className="text-lg text-text-base mt-4 max-w-2xl mx-auto font-medium">
          We're here to help you grow better — reach out to us anytime for product
          inquiries, collaborations, or partnerships.
        </p>
      </motion.div>

      {/* Contact Container */}
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-12 items-stretch">
        {/* Left - Info */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="
  group relative
  bg-white/70 backdrop-blur-2xl
  border border-primary-200/60
  rounded-3xl p-10 h-full flex flex-col
  shadow-xl
  transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
  hover:-translate-y-2
  hover:shadow-[0_30px_60px_-20px_rgba(116,26,28,0.35)]
  overflow-hidden
"
        >
          <div className="
  absolute inset-0 opacity-0 group-hover:opacity-100
  transition-opacity duration-700
  bg-[radial-gradient(circle_at_20%_10%,rgba(116,26,28,0.08),transparent_60%)]
  pointer-events-none
" />
          <ul className="space-y-6 text-text-base">
            <li className="
  group flex items-center gap-4
  transition-all duration-500
  hover:-translate-y-1
">
              <div className="
  p-3 rounded-full
  bg-primary-100 text-primary-700
  transition-all duration-500
  group-hover:bg-primary-200
  group-hover:rotate-6
  group-hover:scale-110
">
                <Phone size={22} />
              </div>
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p>8977729535</p>
              </div>
            </li>
            <li className="
  group flex items-center gap-4
  transition-all duration-500
  hover:-translate-y-1
">
              <div className="
  p-3 rounded-full
  bg-primary-100 text-primary-700
  transition-all duration-500
  group-hover:bg-primary-200
  group-hover:rotate-6
  group-hover:scale-110
">
                <Mail size={22} />
              </div>
              <div>
                <h4 className="font-semibold">Email</h4>
                <p>info@fertibase.in , sales@fertibase.in</p>
              </div>
            </li>
            <li className="
  group flex items-center gap-4
  transition-all duration-500
  hover:-translate-y-1
">
              <div className="
  p-3 rounded-full
  bg-primary-100 text-primary-700
  transition-all duration-500
  group-hover:bg-primary-200
  group-hover:rotate-6
  group-hover:scale-110
">
                <MapPin size={22} />
              </div>
              <div>
                <h4 className="font-semibold">Head Office</h4>
                <p>Sy No. 81, Sultanpur, Hyderabad, India</p>
              </div>
            </li>
            <li className="
  group flex items-center gap-4
  transition-all duration-500
  hover:-translate-y-1
">
              <div className="
  p-3 rounded-full
  bg-primary-100 text-primary-700
  transition-all duration-500
  group-hover:bg-primary-200
  group-hover:rotate-6
  group-hover:scale-110
">
                <Clock size={22} />
              </div>
              <div>
                <h4 className="font-semibold">Working Hours</h4>
                <p>Mon – Sat, 9:00 AM – 6:00 PM</p>
              </div>
            </li>
          </ul>

          <div className="mt-10">
            <iframe
              title="FertiBase Location"
              className="
    w-full h-64 rounded-2xl
    shadow-lg
    transition-all duration-700
    hover:shadow-[0_30px_60px_-20px_rgba(116,26,28,0.35)]
  "
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.496332107397!2d78.4747!3d17.3850!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9751b2c9b6f5%3A0x3a4b36ea122223b!2sHyderabad!5e0!3m2!1sen!2sin!4v1683712233441"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>

        {/* Right - Form */}
        <motion.form
        onSubmit={handleSubmit}
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="
  group relative
  bg-white/70 backdrop-blur-2xl
  border border-primary-200/60
  rounded-3xl shadow-xl p-10 h-full flex flex-col
  transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
  hover:-translate-y-2
  hover:shadow-[0_35px_70px_-25px_rgba(116,26,28,0.4)]
  overflow-hidden
"
        >
          <div className="
  absolute inset-0 opacity-0 group-hover:opacity-100
  transition-opacity duration-700
  bg-[radial-gradient(circle_at_80%_20%,rgba(116,26,28,0.06),transparent_60%)]
  pointer-events-none
" />
          <h2 className="text-2xl font-bold text-primary-700 mb-8">
            Send Us a Message
          </h2>

          <div className="space-y-6">
  {/* Full Name */}
<div>
  <label className="block text-sm font-medium text-text-base mb-2">
    Full Name
  </label>
  <input
    type="text"
    placeholder="John Doe"
    required
    value={formData.full_name}
    onChange={(e) =>
      setFormData({ ...formData, full_name: e.target.value })
    }
    className="
  w-full px-4 py-3 rounded-xl
  bg-white/90 backdrop-blur
  border border-primary-300
  transition-all duration-300
  focus:ring-2 focus:ring-primary-500/40
  focus:border-primary-500
  hover:border-primary-400
  outline-none text-text-base
"
  />
</div>

{/* Email */}
<div>
  <label className="block text-sm font-medium text-text-base mb-2">
    Email Address
  </label>
  <input
    type="email"
    placeholder="john@example.com"
    required
    value={formData.email}
    onChange={(e) =>
      setFormData({ ...formData, email: e.target.value })
    }
    className="
  w-full px-4 py-3 rounded-xl
  bg-white/90 backdrop-blur
  border border-primary-300
  transition-all duration-300
  focus:ring-2 focus:ring-primary-500/40
  focus:border-primary-500
  hover:border-primary-400
  outline-none text-text-base
"
  />
</div>

{/* Phone Number */}
<div>
  <label className="block text-sm font-medium text-text-base mb-2">
    Phone Number
  </label>
  <input
    type="tel"
    placeholder="10-digit mobile number"
    required
    inputMode="numeric"
    pattern="[0-9]{10}"
    title="Enter a valid 10-digit phone number"
    value={formData.phone}
    onChange={(e) =>
      setFormData({ ...formData, phone: e.target.value })
    }
    className="
  w-full px-4 py-3 rounded-xl
  bg-white/90 backdrop-blur
  border border-primary-300
  transition-all duration-300
  focus:ring-2 focus:ring-primary-500/40
  focus:border-primary-500
  hover:border-primary-400
  outline-none text-text-base
"
  />
</div>

{/* Message */}
<div>
  <label className="block text-sm font-medium text-text-base mb-2">
    Message
  </label>
  <textarea
    rows="5"
    placeholder="Write your message here..."
    required
    value={formData.message}
    onChange={(e) =>
      setFormData({ ...formData, message: e.target.value })
    }
    className="w-full px-3 py-3 border border-primary-300 rounded-xl
               focus:ring-2 focus:ring-primary-500 focus:border-primary-500
               outline-none bg-white text-text-base"
  />
</div>

  {/* Submit */}
  <motion.button
  type="submit"
  disabled={submitting}
  className="
  w-full py-3 mt-4
  bg-[#6B412E] text-white rounded-xl
  font-semibold
  shadow-lg
  transition-all duration-300
  hover:bg-[#5e1416]
  hover:shadow-[0_20px_40px_-15px_rgba(116,26,28,0.5)]
  hover:-translate-y-[1px]
  active:scale-[0.98]
"
>
  {submitting ? "Sending..." : "Send Message"}
</motion.button>
</div>
        </motion.form>
      </div>
      {/* Schedule Meeting – Full Width */}
<section className="py-20 bg-soil-light">
  <div className="max-w-4xl mx-auto px-6 text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="
  group relative
  bg-white/70 backdrop-blur-2xl
  border border-[#E8D5C9]/60
  rounded-3xl p-10
  shadow-xl
  transition-all duration-700
  hover:-translate-y-2
  hover:shadow-[0_40px_80px_-30px_rgba(116,26,28,0.4)]
  overflow-hidden
"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#6B412E] mb-4">
        Schedule a Meeting
      </h2>

      <p className="text-black text-lg font-medium mb-8 max-w-2xl mx-auto">
        Book a time that works best for you. Our agricultural experts are ready to help.
      </p>

      <div className="flex justify-center">
        <button
          onClick={() => setShowScheduling(true)}
          className="
            bg-[#6B412E]
            hover:bg-[#5e1416]
            text-white
            px-10 py-4
            rounded-xl
            font-semibold
            shadow-md
            transition-all
            flex items-center gap-3
          "
        >
          <Calendar className="h-6 w-6" />
          Schedule Meeting Now
        </button>
      </div>
    </motion.div>
  </div>
</section>
      {showScheduling && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div className="relative w-full max-w-4xl h-[600px] bg-white rounded-2xl shadow-2xl overflow-hidden">

      {/* Close Button */}
      <button
        onClick={() => setShowScheduling(false)}
        className="absolute top-4 right-4 z-10
        bg-[#6B412E] hover:bg-[#5e1416]
        text-white rounded-full w-9 h-9
        flex items-center justify-center
        shadow-md transition"
      >
        ×
      </button>

      {/* Calendly Widget */}
      <InlineWidget
        url="https://calendly.com/krishnakishore-k777/new-meeting"
        styles={{ height: "100%", width: "100%" }}
        pageSettings={{
          backgroundColor: "ffffff",
          hideEventTypeDetails: false,
          hideLandingPageDetails: false,
          primaryColor: "741A1C",
          textColor: "1a1a1a",
        }}
      />
    </div>
  </div>
)}
    </div>
  );
}
