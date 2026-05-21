import { InlineWidget } from "react-calendly";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Calendar } from "lucide-react";
import supabase from "../lib/supabaseClient";
import { useTranslation } from "../i18n/useTranslation";

const CONTACT_UI_COPY = {
  te: {
    contact_heading_full: "FertiBase ను సంప్రదించండి",
    contact_subtitle:
      "మీ ఎదుగుదలకు మేము తోడుంటాం. ఉత్పత్తి వివరాలు, భాగస్వామ్యాలు లేదా సహకారాల కోసం ఎప్పుడైనా మమ్మల్ని సంప్రదించండి.",
    contact_phone: "ఫోన్",
    contact_email: "ఇమెయిల్",
    contact_head_office: "ప్రధాన కార్యాలయం",
    contact_head_office_address: "సై. నం. 81, సుల్తాన్పూర్, హైదరాబాద్, భారతదేశం",
    contact_working_hours: "పని వేళలు",
    contact_working_hours_value: "సోమ - శని, ఉదయం 9:00 - సాయంత్రం 6:00",
    contact_send_message: "మాకు సందేశం పంపండి",
    contact_form_full_name: "పూర్తి పేరు",
    contact_form_full_name_placeholder: "మీ పూర్తి పేరు",
    contact_form_email: "ఇమెయిల్ చిరునామా",
    contact_form_phone: "ఫోన్ నంబర్",
    contact_form_phone_placeholder: "10 అంకెల మొబైల్ నంబర్",
    contact_form_phone_title: "సరైన 10 అంకెల ఫోన్ నంబర్ నమోదు చేయండి",
    contact_form_message: "సందేశం",
    contact_form_message_placeholder: "మీ సందేశాన్ని ఇక్కడ రాయండి...",
    contact_form_sending: "పంపుతోంది...",
    contact_form_submit: "సందేశం పంపండి",
    contact_form_error: "సందేశం పంపడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.",
    contact_schedule_heading: "ఒక సమావేశం షెడ్యూల్ చేయండి",
    contact_schedule_subtitle:
      "మీకు అనుకూలమైన సమయాన్ని బుక్ చేసుకోండి. మా వ్యవసాయ నిపుణులు మీకు సహాయం చేయడానికి సిద్ధంగా ఉన్నారు.",
    contact_schedule_cta: "ఇప్పుడే సమావేశం బుక్ చేయండి",
  },
  hi: {
    contact_heading_full: "FertiBase से संपर्क करें",
    contact_subtitle:
      "हम आपकी बेहतर वृद्धि में मदद के लिए यहां हैं। उत्पाद जानकारी, सहयोग या साझेदारी के लिए कभी भी हमसे संपर्क करें।",
    contact_phone: "फ़ोन",
    contact_email: "ईमेल",
    contact_head_office: "मुख्य कार्यालय",
    contact_head_office_address: "सर्वे नं. 81, सुल्तानपुर, हैदराबाद, भारत",
    contact_working_hours: "कार्य समय",
    contact_working_hours_value: "सोम - शनि, सुबह 9:00 - शाम 6:00",
    contact_send_message: "हमें संदेश भेजें",
    contact_form_full_name: "पूरा नाम",
    contact_form_full_name_placeholder: "अपना पूरा नाम",
    contact_form_email: "ईमेल पता",
    contact_form_phone: "फोन नंबर",
    contact_form_phone_placeholder: "10 अंकों का मोबाइल नंबर",
    contact_form_phone_title: "मान्य 10 अंकों का फोन नंबर दर्ज करें",
    contact_form_message: "संदेश",
    contact_form_message_placeholder: "अपना संदेश यहां लिखें...",
    contact_form_sending: "भेजा जा रहा है...",
    contact_form_submit: "संदेश भेजें",
    contact_form_error: "संदेश भेजा नहीं जा सका। कृपया फिर से प्रयास करें।",
    contact_schedule_heading: "एक मीटिंग शेड्यूल करें",
    contact_schedule_subtitle:
      "अपने लिए सबसे उपयुक्त समय बुक करें। हमारे कृषि विशेषज्ञ आपकी मदद के लिए तैयार हैं।",
    contact_schedule_cta: "अभी मीटिंग बुक करें",
  },
  mr: {
    contact_heading_full: "FertiBase शी संपर्क साधा",
    contact_subtitle:
      "तुमच्या चांगल्या वाढीसाठी आम्ही मदतीला आहोत. उत्पादन चौकशी, सहकार्य किंवा भागीदारीसाठी कधीही आमच्याशी संपर्क साधा.",
    contact_phone: "फोन",
    contact_email: "ईमेल",
    contact_head_office: "मुख्य कार्यालय",
    contact_head_office_address: "सर्वे क्र. 81, सुलतानपूर, हैदराबाद, भारत",
    contact_working_hours: "कामाचे तास",
    contact_working_hours_value: "सोम - शनि, सकाळी 9:00 - संध्याकाळी 6:00",
    contact_send_message: "आम्हाला संदेश पाठवा",
    contact_form_full_name: "पूर्ण नाव",
    contact_form_full_name_placeholder: "तुमचे पूर्ण नाव",
    contact_form_email: "ईमेल पत्ता",
    contact_form_phone: "फोन नंबर",
    contact_form_phone_placeholder: "10 अंकी मोबाईल नंबर",
    contact_form_phone_title: "वैध 10 अंकी फोन नंबर टाका",
    contact_form_message: "संदेश",
    contact_form_message_placeholder: "तुमचा संदेश येथे लिहा...",
    contact_form_sending: "पाठवत आहे...",
    contact_form_submit: "संदेश पाठवा",
    contact_form_error: "संदेश पाठवता आला नाही. कृपया पुन्हा प्रयत्न करा.",
    contact_schedule_heading: "एक बैठक शेड्यूल करा",
    contact_schedule_subtitle:
      "तुमच्यासाठी योग्य वेळ बुक करा. आमचे कृषी तज्ज्ञ मदतीसाठी तयार आहेत.",
    contact_schedule_cta: "आत्ताच बैठक बुक करा",
  },
};

export default function Contact() {
  const { language, t } = useTranslation();
  const [showScheduling, setShowScheduling] = useState(false);
  const [formData, setFormData] = useState({
  full_name: "",
  email: "",
  phone: "",
  message: "",
});
const [submitting, setSubmitting] = useState(false);

const contactText = (key, fallback = "") =>
  CONTACT_UI_COPY[language]?.[key] || t(key, fallback);

const contactHeadingText =
  language === "en"
    ? null
    : contactText("contact_heading_full", "Contact FertiBase");

const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  try {
    // 1. Save message in database
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
    // await fetch(
    //   "https://ekseutpxbtlbcbjxalna.supabase.co/functions/v1/send-contact-reply",
    //   {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
    //     },
    //     body: JSON.stringify({
    //       full_name: formData.full_name,
    //       email: formData.email,
    //     }),
    //   }
    // );

    // 3. Reset form
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      message: "",
    });

    // 4. Open Schedule Meeting (Calendly)
    setShowScheduling(true);
  } catch (err) {
      console.error(err);
      alert(
      contactText(
        "contact_form_error",
        "Failed to send message. Please try again."
      )
    );
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
          {language === "en" ? (
            <>
              {t("contact_heading_prefix", "Contact")}{" "}
              <span className="text-primary-600">FertiBase</span>
            </>
          ) : (
            contactHeadingText
          )}
        </h1>
        <p className="text-lg text-text-base mt-4 max-w-2xl mx-auto font-medium">
          {contactText(
            "contact_subtitle",
            "We're here to help you grow better - reach out to us anytime for product inquiries, collaborations, or partnerships."
          )}
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
                <h4 className="font-semibold">{contactText("contact_phone", "Phone")}</h4>
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
                <h4 className="font-semibold">{contactText("contact_email", "Email")}</h4>
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
                <h4 className="font-semibold">
                  {contactText("contact_head_office", "Head Office")}
                </h4>
                <p>
                  {contactText(
                    "contact_head_office_address",
                    "Sy No. 81, Sultanpur, Hyderabad, India"
                  )}
                </p>
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
                <h4 className="font-semibold">
                  {contactText("contact_working_hours", "Working Hours")}
                </h4>
                <p>
                  {contactText(
                    "contact_working_hours_value",
                    "Mon - Sat, 9:00 AM - 6:00 PM"
                  )}
                </p>
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
            {contactText("contact_send_message", "Send Us a Message")}
          </h2>

          <div className="space-y-6">
  {/* Full Name */}
<div>
  <label className="block text-sm font-medium text-text-base mb-2">
    {contactText("contact_form_full_name", "Full Name")}
  </label>
  <input
    type="text"
    placeholder={contactText("contact_form_full_name_placeholder", "John Doe")}
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
    {contactText("contact_form_email", "Email Address")}
  </label>
  <input
    type="email"
    placeholder={t("contact_form_email_placeholder", "john@example.com")}
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
    {contactText("contact_form_phone", "Phone Number")}
  </label>
  <input
    type="tel"
    placeholder={contactText(
      "contact_form_phone_placeholder",
      "10-digit mobile number"
    )}
    required
    inputMode="numeric"
    pattern="[0-9]{10}"
    title={contactText(
      "contact_form_phone_title",
      "Enter a valid 10-digit phone number"
    )}
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
    {contactText("contact_form_message", "Message")}
  </label>
  <textarea
    rows="5"
    placeholder={contactText(
      "contact_form_message_placeholder",
      "Write your message here..."
    )}
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
  {submitting
    ? contactText("contact_form_sending", "Sending...")
    : contactText("contact_form_submit", "Send Message")}
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
        {contactText("contact_schedule_heading", "Schedule a Meeting")}
      </h2>

      <p className="text-black text-lg font-medium mb-8 max-w-2xl mx-auto">
        {contactText(
          "contact_schedule_subtitle",
          "Book a time that works best for you. Our agricultural experts are ready to help."
        )}
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
          {contactText("contact_schedule_cta", "Schedule Meeting Now")}
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
        url="https://calendly.com/shriyafertibase/new-meeting"
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
