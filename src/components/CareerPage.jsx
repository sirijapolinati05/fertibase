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
import { useTranslation } from "../i18n/useTranslation";
import {
  getLocalizedEntityField,
  getLocalizedEntityList,
} from "../i18n/entityTranslations";

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

const CAREER_UI_COPY = {
  te: {
    career_hiring_badge: "మేము నియామకాలు చేస్తున్నాం!",
    career_hero_heading_prefix: "Grow Your Career at",
    career_hero_subtitle:
      "నవీన జీవ పరిష్కారాలతో సుస్థిర వ్యవసాయంలో మార్పు తీసుకురావడానికి మాతో చేరండి.",
    career_why_choose_badge: "మమ్మల్ని ఎందుకు ఎంచుకోవాలి",
    career_why_join_subtitle:
      "అర్థవంతమైన కెరీర్‌ను నిర్మిస్తూ వ్యవసాయంలో మార్పు తీసుకువచ్చే లక్ష్యపూరిత బృందంలో భాగం కండి",
    career_openings_badge: "కెరీర్స్",
    career_openings_subtitle:
      "FertiBase లో అందుబాటులో ఉన్న అవకాశాలను అన్వేషించండి",
    career_process_subtitle:
      "FertiBase బృందంలో చేరడానికి సరళమైన దశలు",
    career_cta_subtitle:
      "మీకు సరిపోయే పాత్ర కనిపించలేదా? సుస్థిర వ్యవసాయం పట్ల ఆసక్తి ఉన్న ప్రతిభావంతుల కోసం మేము ఎల్లప్పుడూ చూస్తూనే ఉంటాం.",
    career_benefit_title_0: "సుస్థిర లక్ష్యం",
    career_benefit_description_0:
      "సుస్థిర వ్యవసాయం మరియు పర్యావరణ సంరక్షణపై నిజమైన ప్రభావం చూపండి",
    career_benefit_title_1: "కెరీర్ అభివృద్ధి",
    career_benefit_description_1:
      "నియమిత ప్రమోషన్లు మరియు నైపుణ్య అభివృద్ధి కార్యక్రమాలతో స్పష్టమైన ఎదుగుదల మార్గాలు",
    career_benefit_title_2: "సహకార సంస్కృతి",
    career_benefit_description_2:
      "వ్యవసాయం మరియు బయోటెక్నాలజీలో నిపుణులైన ఉత్సాహభరితులైన జట్టుతో కలిసి పని చేయండి",
    career_benefit_title_3: "పని-జీవిత సమతుల్యత",
    career_benefit_description_3:
      "సౌకర్యవంతమైన పని గంటలు, రిమోట్ అవకాశాలు మరియు ఉదారమైన సెలవు విధానాలు",
    career_benefit_title_4: "నేర్చుకునే అవకాశాలు",
    career_benefit_description_4:
      "స్పాన్సర్ చేసిన శిక్షణలు, వర్క్‌షాప్‌లు మరియు గ్లోబల్ కాన్ఫరెన్సుల్లో పాల్గొనే అవకాశం",
    career_benefit_title_5: "సమగ్ర ప్రయోజనాలు",
    career_benefit_description_5:
      "హెల్త్ ఇన్సూరెన్స్, రిటైర్మెంట్ ప్లాన్లు, బోనస్లు మరియు వెల్నెస్ కార్యక్రమాలు",
    career_process_title_0: "ఆన్‌లైన్‌లో అప్లై చేయండి",
    career_process_desc_0:
      "మా పోర్టల్ ద్వారా మీ అప్లికేషన్ మరియు రెజ్యూమే సమర్పించండి",
    career_process_title_1: "ప్రారంభ సమీక్ష",
    career_process_desc_1:
      "మా HR బృందం మీ అప్లికేషన్ మరియు అర్హతలను పరిశీలిస్తుంది",
    career_process_title_2: "ఇంటర్వ్యూ",
    career_process_desc_2:
      "మీ పాత్ర మరియు అనుకూలత గురించి చర్చించడానికి మా బృందాన్ని కలవండి",
    career_process_title_3: "ఆన్‌బోర్డింగ్",
    career_process_desc_3:
      "మీ ఆఫర్ స్వీకరించి FertiBase కుటుంబంలో చేరండి",
  },
  hi: {
    career_hiring_badge: "हम भर्ती कर रहे हैं!",
    career_hero_heading_prefix: "Grow Your Career at",
    career_hero_subtitle:
      "नवोन्मेषी जैविक समाधानों के माध्यम से टिकाऊ कृषि में क्रांति लाने के हमारे मिशन में शामिल हों।",
    career_why_choose_badge: "हमें क्यों चुनें",
    career_why_join_subtitle:
      "एक उद्देश्यपूर्ण टीम का हिस्सा बनें जो अर्थपूर्ण करियर बनाते हुए कृषि में बदलाव ला रही है",
    career_openings_badge: "करियर",
    career_openings_subtitle:
      "FertiBase में उपलब्ध अवसरों को एक्सप्लोर करें",
    career_process_subtitle:
      "FertiBase टीम में शामिल होने के सरल कदम",
    career_cta_subtitle:
      "क्या आपको अपने लिए उपयुक्त भूमिका नहीं दिखी? हम हमेशा टिकाऊ कृषि के प्रति जुनूनी प्रतिभाओं की तलाश में रहते हैं।",
    career_benefit_title_0: "टिकाऊ मिशन",
    career_benefit_description_0:
      "टिकाऊ कृषि और पर्यावरण संरक्षण पर वास्तविक प्रभाव डालें",
    career_benefit_title_1: "करियर वृद्धि",
    career_benefit_description_1:
      "नियमित प्रमोशन और कौशल विकास कार्यक्रमों के साथ स्पष्ट विकास पथ",
    career_benefit_title_2: "सहयोगी संस्कृति",
    career_benefit_description_2:
      "कृषि और जैवप्रौद्योगिकी के उत्साही विशेषज्ञों के साथ काम करें",
    career_benefit_title_3: "काम-जीवन संतुलन",
    career_benefit_description_3:
      "लचीले समय, रिमोट विकल्प और उदार अवकाश नीतियां",
    career_benefit_title_4: "सीखने के अवसर",
    career_benefit_description_4:
      "प्रायोजित प्रशिक्षण, वर्कशॉप और वैश्विक सम्मेलन में भागीदारी",
    career_benefit_title_5: "व्यापक लाभ",
    career_benefit_description_5:
      "स्वास्थ्य बीमा, रिटायरमेंट प्लान, बोनस और वेलनेस कार्यक्रम",
    career_process_title_0: "ऑनलाइन आवेदन करें",
    career_process_desc_0:
      "हमारे पोर्टल के माध्यम से अपना आवेदन और रिज्यूमे जमा करें",
    career_process_title_1: "प्रारंभिक समीक्षा",
    career_process_desc_1:
      "हमारी HR टीम आपके आवेदन और योग्यताओं की समीक्षा करती है",
    career_process_title_2: "इंटरव्यू",
    career_process_desc_2:
      "अपनी भूमिका और उपयुक्तता पर चर्चा करने के लिए हमारी टीम से मिलें",
    career_process_title_3: "ऑनबोर्डिंग",
    career_process_desc_3:
      "अपना ऑफर प्राप्त करें और FertiBase परिवार में शामिल हों",
  },
  mr: {
    career_hiring_badge: "आम्ही भरती करत आहोत!",
    career_hero_heading_prefix: "Grow Your Career at",
    career_hero_subtitle:
      "नाविन्यपूर्ण जैविक उपायांद्वारे शाश्वत शेतीत क्रांती घडवण्याच्या आमच्या ध्येयात सहभागी व्हा.",
    career_why_choose_badge: "आम्हाला का निवडावे",
    career_why_join_subtitle:
      "अर्थपूर्ण करिअर घडवत शेतीत बदल घडवणाऱ्या ध्येयवेड्या टीमचा भाग बना",
    career_openings_badge: "करिअर्स",
    career_openings_subtitle: "FertiBase मधील उपलब्ध संधी शोधा",
    career_process_subtitle:
      "FertiBase टीममध्ये सामील होण्यासाठी सोप्या पायऱ्या",
    career_cta_subtitle:
      "तुमच्यासाठी योग्य भूमिका दिसत नाही? आम्ही नेहमीच शाश्वत शेतीबद्दल उत्साही प्रतिभावान व्यक्तींच्या शोधात असतो.",
    career_benefit_title_0: "शाश्वत ध्येय",
    career_benefit_description_0:
      "शाश्वत शेती आणि पर्यावरण संरक्षणावर खरा प्रभाव पाडा",
    career_benefit_title_1: "करिअर वाढ",
    career_benefit_description_1:
      "नियमित बढती आणि कौशल्य विकास कार्यक्रमांसह स्पष्ट प्रगतीचे मार्ग",
    career_benefit_title_2: "सहकारी संस्कृती",
    career_benefit_description_2:
      "शेती आणि जैवतंत्रज्ञानातील उत्साही तज्ज्ञांसोबत काम करा",
    career_benefit_title_3: "काम-जीवन समतोल",
    career_benefit_description_3:
      "लवचिक कामाचे तास, रिमोट पर्याय आणि उदार रजा धोरणे",
    career_benefit_title_4: "शिकण्याच्या संधी",
    career_benefit_description_4:
      "प्रायोजित प्रशिक्षण, वर्कशॉप्स आणि जागतिक परिषदांमध्ये सहभाग",
    career_benefit_title_5: "समग्र लाभ",
    career_benefit_description_5:
      "आरोग्य विमा, निवृत्ती योजना, बोनस आणि वेलनेस कार्यक्रम",
    career_process_title_0: "ऑनलाइन अर्ज करा",
    career_process_desc_0:
      "आमच्या पोर्टलवरून तुमचा अर्ज आणि रेझ्युमे सबमिट करा",
    career_process_title_1: "प्रारंभिक पडताळणी",
    career_process_desc_1:
      "आमची HR टीम तुमचा अर्ज आणि पात्रता तपासते",
    career_process_title_2: "मुलाखत",
    career_process_desc_2:
      "तुमची भूमिका आणि सुसंगतता यावर चर्चा करण्यासाठी आमच्या टीमला भेटा",
    career_process_title_3: "ऑनबोर्डिंग",
    career_process_desc_3:
      "तुमची ऑफर मिळवा आणि FertiBase कुटुंबाचा भाग बना",
  },
};

export default function CareerPage() {
  const { language, t, td } = useTranslation();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [bgIndex, setBgIndex] = useState(0);

  const careerText = (key, fallback = "") =>
    CAREER_UI_COPY[language]?.[key] || t(key, fallback);

  const heroHeadingPrefix = careerText(
    "career_hero_heading_prefix",
    "Grow Your Career at"
  );
  const heroHeadingText =
    language === "te"
      ? "FertiBase లో మీ కెరీర్‌ను పెంచుకోండి"
      : language === "hi"
        ? "FertiBase में अपना करियर बढ़ाइए"
        : language === "mr"
          ? "FertiBase मध्ये तुमचे करिअर वाढवा"
          : `${heroHeadingPrefix} FertiBase`;
  const openingsHeadingText =
    language === "te"
      ? "ప్రస్తుత ఉద్యోగ అవకాశాలు"
      : language === "hi"
        ? "वर्तमान नौकरी के अवसर"
        : language === "mr"
          ? "सध्याच्या नोकरीच्या संधी"
          : t("career_openings_heading", "Current Job Openings");
  const whyJoinHeadingText =
    language === "te"
      ? "FertiBase లో ఎందుకు చేరాలి?"
      : language === "hi"
        ? "FertiBase से क्यों जुड़ें?"
        : language === "mr"
          ? "FertiBase मध्ये का सामील व्हावे?"
          : t("career_why_join_heading", "Why Join FertiBase?");
  const processHeadingText =
    language === "te"
      ? "మా దరఖాస్తు ప్రక్రియ"
      : language === "hi"
        ? "हमारी आवेदन प्रक्रिया"
        : language === "mr"
          ? "आमची अर्ज प्रक्रिया"
          : t("career_process_heading", "Our Application Process");
  const ctaHeadingText =
    language === "te"
      ? "FertiBase తో కలిసి ఎదగడానికి సిద్ధమా?"
      : language === "hi"
        ? "क्या आप FertiBase के साथ आगे बढ़ने के लिए तैयार हैं?"
        : language === "mr"
          ? "FertiBase सोबत वाढण्यासाठी तयार आहात का?"
          : t("career_cta_heading", "Ready to Grow with FertiBase?");
  const errorHeadingText =
    language === "te"
      ? "అయ్యో! ఏదో తప్పు జరిగింది."
      : language === "hi"
        ? "अरे! कुछ गलत हो गया।"
        : language === "mr"
          ? "अरेरे! काहीतरी चूक झाली."
          : t("career_error_heading", "Oops! Something went wrong.");
  const tryAgainText =
    language === "te"
      ? "మళ్లీ ప్రయత్నించండి"
      : language === "hi"
        ? "फिर से कोशिश करें"
        : language === "mr"
          ? "पुन्हा प्रयत्न करा"
          : t("career_try_again", "Try Again");
  const searchPlaceholderText =
    language === "te"
      ? "పాత్రలను వెతకండి..."
      : language === "hi"
        ? "भूमिकाएँ खोजें..."
        : language === "mr"
          ? "भूमिका शोधा..."
          : t("career_search_placeholder", "Search roles...");
  const viewDetailsText =
    language === "te"
      ? "వివరాలు చూడండి"
      : language === "hi"
        ? "विवरण देखें"
        : language === "mr"
          ? "तपशील पहा"
          : t("career_view_details", "View Details");
  const applyNowText =
    language === "te"
      ? "ఇప్పుడే దరఖాస్తు చేయండి"
      : language === "hi"
        ? "अभी आवेदन करें"
        : language === "mr"
          ? "आत्ताच अर्ज करा"
          : t("career_apply_now", "Apply Now");
  const closedText =
    language === "te"
      ? "మూసివేయబడింది"
      : language === "hi"
        ? "बंद"
        : language === "mr"
          ? "बंद"
          : t("career_status_closed", "Closed");
  const filledText =
    language === "te"
      ? "భర్తీ అయింది"
      : language === "hi"
        ? "भर चुका"
        : language === "mr"
          ? "भरले गेले"
          : t("career_status_filled", "Filled");
  const noOpeningsText =
    language === "te"
      ? "ప్రస్తుతం ఉద్యోగ అవకాశాలు లేవు."
      : language === "hi"
        ? "फिलहाल कोई नौकरी उपलब्ध नहीं है।"
        : language === "mr"
          ? "सध्या कोणत्याही नोकरीच्या संधी उपलब्ध नाहीत."
          : t("career_no_openings", "No job openings available at the moment.");
  const getInTouchText =
    language === "te"
      ? "మమ్మల్ని సంప్రదించండి"
      : language === "hi"
        ? "संपर्क करें"
        : language === "mr"
          ? "संपर्क साधा"
          : t("career_get_in_touch", "Get in Touch");
  const keySkillsText =
    language === "te"
      ? "ప్రధాన నైపుణ్యాలు"
      : language === "hi"
        ? "मुख्य कौशल"
        : language === "mr"
          ? "मुख्य कौशल्ये"
          : t("career_key_skills", "Key Skills");

  const localizeJobField = (job, field, fallback = "") =>
    getLocalizedEntityField({
      item: job,
      field,
      language,
      td,
      namespace: "career",
      fallback,
    });

  const localizeJobList = (job, field, fallback = []) =>
    getLocalizedEntityList({
      item: job,
      field,
      language,
      td,
      namespace: "career",
      fallback,
    });

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
        setError(t("career_error_load_jobs", "Failed to load jobs"));
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
          {errorHeadingText}
        </h2>
        <p className="mb-6 text-text-light">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-primary-600 px-6 py-2 text-soil-base transition hover:bg-primary-700"
        >
          {tryAgainText}
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
                {careerText("career_hiring_badge", "We're hiring!")}
              </span>
            </div>

            <h1 className="mb-6 text-4xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
              {language === "en" ? (
                <>
                  {heroHeadingPrefix}{" "}
                  <span className="text-[#f1d5bf]">FertiBase</span>
                </>
              ) : (
                heroHeadingText
              )}
            </h1>

            <p className="mx-auto mb-10 max-w-3xl text-lg leading-relaxed text-gray-100 md:text-xl">
              {careerText(
                "career_hero_subtitle",
                "Join us in revolutionizing sustainable agriculture through innovative biological solutions."
              )}
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
            <p className="mb-2 text-lg font-semibold text-primary-600">
              {careerText("career_why_choose_badge", "WHY CHOOSE US")}
            </p>
            <h2 className="mb-4 text-4xl font-bold text-[#6B412E] md:text-5xl">
              {whyJoinHeadingText}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-text-light">
              {careerText(
                "career_why_join_subtitle",
                "Be part of a mission-driven team that's transforming agriculture while building meaningful careers"
              )}
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
                    {careerText(`career_benefit_title_${index}`, benefit.title)}
                  </h3>
                  <p className="leading-relaxed text-text-light">
                    {careerText(`career_benefit_description_${index}`, benefit.description)}
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
            <p className="mb-2 text-lg font-semibold text-primary-600">
              {careerText("career_openings_badge", "CAREERS")}
            </p>
            <h2 className="mb-4 text-4xl font-bold text-[#6B412E] md:text-5xl">
              {openingsHeadingText}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-text-light">
              {careerText(
                "career_openings_subtitle",
                "Explore opportunities available at FertiBase"
              )}
            </p>
          </div>

          <div className="mb-12 flex justify-center">
            <input
              type="text"
              placeholder={searchPlaceholderText}
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
                      <h3 className={`text-2xl font-bold ${isClosed ? "text-red-900" : "text-text-base"}`}>
                        {localizeJobField(job, "title", job.title)}
                      </h3>
                      <p className={`font-medium ${isClosed ? "text-red-600" : "text-primary-600"}`}>
                        {localizeJobField(job, "category", job.category || t("career_job_general", "General"))}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      {isClosed && (
                        <span className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-red-300 bg-red-600 px-5 py-2 text-sm font-semibold tracking-[0.01em] text-white shadow-[0_8px_18px_rgba(220,38,38,0.24)] animate-pulse">
                          {closedText}
                        </span>
                      )}
                      {isFilled && (
                        <span className="inline-flex min-h-[42px] items-center justify-center rounded-full border border-blue-300 bg-blue-600 px-5 py-2 text-sm font-semibold tracking-[0.01em] text-white shadow-[0_8px_18px_rgba(37,99,235,0.24)]">
                          {filledText}
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
                          {localizeJobField(job, "type", job.type)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={`mb-4 flex flex-wrap gap-4 text-sm ${isClosed ? "text-red-700/80" : "text-text-light"}`}>
                    {job.location && <span>{t("career_label_location", "Location")}: {localizeJobField(job, "location", job.location)}</span>}
                    {job.experience && <span>{t("career_label_experience", "Experience")}: {localizeJobField(job, "experience", job.experience)}</span>}
                    {job.mode && <span>{t("career_label_mode", "Mode")}: {localizeJobField(job, "mode", job.mode)}</span>}
                  </div>

                  {job.preview && (
                    <p className={`mb-4 line-clamp-3 text-base ${isClosed ? "text-red-900/70" : "text-text-base"}`}>
                      {localizeJobField(job, "preview", job.preview)}
                    </p>
                  )}

                  {Array.isArray(job.skills) && job.skills.length > 0 && (
                    <div className="mb-5">
                      <h4 className={`mb-2 text-sm font-semibold ${isClosed ? "text-red-800" : "text-primary-700"}`}>
                          {keySkillsText}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {localizeJobList(job, "skills", job.skills).slice(0, 6).map((skill) => (
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
                        {job.positions ? `${job.positions} ${t("career_positions", "positions")}` : ""}
                        {job.positions && hasDeadline ? " • " : ""}
                        {hasDeadline && !isClosed ? `${job.daysLeft} ${t("career_days_left", "days left")}` : ""}
                      </div>

                      {hasSalary && (
                        <div className={`font-semibold ${isClosed ? "text-red-800" : "text-primary-700"}`}>
                          {t("career_label_salary", "Salary")}: {localizeJobField(job, "salary", job.salary)}
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
                      {viewDetailsText} <ArrowRight size={18} />
                    </button>

                    {isClosed ? (
                      <button
                        disabled
                        className="rounded-xl border border-red-200 bg-red-100 px-6 py-2.5 font-semibold text-red-500 cursor-not-allowed shadow-inner"
                      >
                        {closedText}
                      </button>
                    ) : isFilled ? (
                      <button
                        disabled
                        className="rounded-xl border border-slate-300 bg-slate-200 px-6 py-2.5 font-semibold text-slate-500 cursor-not-allowed"
                      >
                        {filledText}
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate(`/careers/${job.id}`, { state: job })}
                        className="rounded-xl bg-primary-600 px-6 py-2.5 font-semibold text-white transition hover:bg-primary-700"
                      >
                        {applyNowText}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredJobs.length === 0 && (
            <p className="mt-10 text-center text-text-light">
              {noOpeningsText}
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
              {processHeadingText}
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-text-light">
              {careerText("career_process_subtitle", "Simple steps to join the FertiBase team")}
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

                <h3 className="mb-2 text-xl font-bold text-text-base">
                  {careerText(`career_process_title_${index}`, item.title)}
                </h3>
                <p className="text-text-light">
                  {careerText(`career_process_desc_${index}`, item.desc)}
                </p>

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
              {ctaHeadingText}
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-primary-100">
              {careerText(
                "career_cta_subtitle",
                "Don't see a role that fits? We're always looking for talented individuals passionate about sustainable agriculture."
              )}
            </p>
            <div className="flex justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contactus"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 font-semibold text-[#6B412E] shadow-lg transition-all hover:shadow-2xl"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {getInTouchText}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
