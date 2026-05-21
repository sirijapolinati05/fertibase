import { motion, AnimatePresence } from "framer-motion";
import {
  Leaf,
  Users,
  Map,
  Globe,
  Award,
  Target,
  Lightbulb,
  Handshake,
  Smartphone,
} from "lucide-react";
import About from "../assets/About.png";
import Img1 from "../assets/fertibase-1.png";
import Img2 from "../assets/fertibase-2.png";
import Img3 from "../assets/fertibase-3.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "../i18n/useTranslation";

export default function Aboutus() {
  const { t } = useTranslation();
  const images = [About, Img1, Img2, Img3];
  const [current, setCurrent] = useState(0);
  const location = useLocation();

  const introCards = [
    {
      icon: <Award className="w-12 h-12" />,
      title: t("about_intro_card_1_title", "Leading Innovation"),
      description: t(
        "about_intro_card_1_desc",
        "A leading agricultural innovation company dedicated to empowering farmers with high-quality crop nutrition solutions and advanced farming technologies."
      ),
    },
    {
      icon: <Target className="w-12 h-12" />,
      title: t("about_intro_card_2_title", "Sustainable Focus"),
      description: t(
        "about_intro_card_2_desc",
        "Strong commitment to sustainable agriculture, delivering scientifically formulated Biofertilizers, biological products, and soil-enhancing inputs."
      ),
    },
    {
      icon: <Lightbulb className="w-12 h-12" />,
      title: t("about_intro_card_3_title", "Research-Based"),
      description: t(
        "about_intro_card_3_desc",
        "Transform farming practices through reliable, research-based, and result-oriented products with consistent performance and unmatched field support."
      ),
    },
  ];

  const partnershipCards = [
    {
      icon: <Users className="w-8 h-8" />,
      title: t("about_partner_card_1_title", "Dealer Network"),
      desc: t(
        "about_partner_card_1_desc",
        "Strong network of trusted dealers"
      ),
    },
    {
      icon: <Leaf className="w-8 h-8" />,
      title: t("about_partner_card_2_title", "Field Teams"),
      desc: t(
        "about_partner_card_2_desc",
        "Dedicated field support teams"
      ),
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: t("about_partner_card_3_title", "Agronomists"),
      desc: t(
        "about_partner_card_3_desc",
        "Expert agricultural guidance"
      ),
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: t("about_partner_card_4_title", "Digital Agri App"),
      desc: t(
        "about_partner_card_4_desc",
        "Digital farming solutions"
      ),
    },
  ];

  const impactStats = [
    {
      icon: <Map className="w-12 h-12" />,
      num: "98",
      label: t("about_impact_stat_1_label", "Districts"),
      desc: t(
        "about_impact_stat_1_desc",
        "Operating across multiple States"
      ),
    },
    {
      icon: <Users className="w-12 h-12" />,
      num: "1000+",
      label: t("about_impact_stat_2_label", "Dealers"),
      desc: t(
        "about_impact_stat_2_desc",
        "Strong distribution network"
      ),
    },
    {
      icon: <Globe className="w-12 h-12" />,
      num: "1L+",
      label: t("about_impact_stat_3_label", "Acres"),
      desc: t(
        "about_impact_stat_3_desc",
        "Farmland transformed"
      ),
    },
  ];

  const valueCards = [
    {
      icon: t("about_value_card_1_icon", "Quality"),
      title: t("about_value_card_1_title", "Quality Assurance"),
      desc: t(
        "about_value_card_1_desc",
        "Premium products tested and proven in real-world farming conditions"
      ),
    },
    {
      icon: t("about_value_card_2_icon", "Farmer"),
      title: t("about_value_card_2_title", "Farmer-First Approach"),
      desc: t(
        "about_value_card_2_desc",
        "Prioritizing farmers needs with direct support and field training"
      ),
    },
    {
      icon: t("about_value_card_3_icon", "R&D"),
      title: t("about_value_card_3_title", "Innovation & Research"),
      desc: t(
        "about_value_card_3_desc",
        "Continuous development of advanced biological solutions"
      ),
    },
    {
      icon: t("about_value_card_4_icon", "Trust"),
      title: t("about_value_card_4_title", "Integrity & Trust"),
      desc: t(
        "about_value_card_4_desc",
        "Transparent business processes and long-term relationships"
      ),
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="bg-soil-light text-text-base">
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <AnimatePresence>
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${images[current]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </AnimatePresence>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Leaf className="w-16 h-16 mx-auto text-white mb-6" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6"
          >
            {t("about_hero_line_1", "Empowering Farmers,")}
            <br />
            {t("about_hero_line_2", "Growing the Future")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-white max-w-4xl mx-auto font-light"
          >
            {t(
              "about_hero_subtitle",
              "Leading agricultural innovation through science, technology, and partnership"
            )}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-soil-light">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#6B412E] mb-6">
              {t("about_heading_prefix", "About")}{" "}
              <span className="text-primary-600">Fertibase</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-500 mx-auto mb-8" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {introCards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-primary-100"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-500 rounded-2xl flex items-center justify-center text-soil-base mb-6 mx-auto">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-text-base mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-text-light leading-relaxed text-center">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-soil-base relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Handshake className="w-16 h-16 mx-auto mb-6 text-primary-200" />
            <h2 className="text-4xl md:text-5xl text-[#6B412E] font-bold mb-6">
              {t("about_partnership_heading", "Growth Through Partnership")}
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              {t(
                "about_partnership_copy",
                "We believe that true growth lies in partnership. Through our strong network, we work closely with farmers to ensure better guidance, improved yield, and profitable farming."
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {partnershipCards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center hover:bg-white/20 transition-all border border-white/20"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-primary-200">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-primary-100 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-soil-light">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#6B412E] mb-4">
              {t("about_impact_heading_prefix", "Our")}{" "}
              <span className="text-primary-600">
                {t("about_impact_heading_suffix", "Impact")}
              </span>
            </h2>
            <p className="text-xl text-text-light">
              {t(
                "about_impact_subtitle",
                "Transforming agriculture across regions with measurable results"
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="bg-gradient-to-br from-soil-light to-primary-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-2xl transition-all border border-primary-200 group-hover:scale-105 transform duration-300">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-600 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 text-soil-base group-hover:rotate-12 transition-transform">
                    {stat.icon}
                  </div>
                  <h3 className="text-5xl font-extrabold text-primary-600 mb-2">
                    {stat.num}
                  </h3>
                  <p className="text-xl font-bold text-text-base mb-2">
                    {stat.label}
                  </p>
                  <p className="text-text-light">{stat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-soil-light">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#6B412E] mb-6">
              {t("about_values_heading_prefix", "Our Core")}{" "}
              <span className="text-primary-600">
                {t("about_values_heading_suffix", "Values")}
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-primary-500 mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valueCards.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all text-center border border-primary-100 hover:border-primary-300"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-sm font-bold uppercase tracking-[0.08em] text-primary-700">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-text-base mb-3">
                  {value.title}
                </h3>
                <p className="text-text-light leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white" id="mission-vision">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary-100 rounded-full opacity-50" />
              <div className="relative bg-gradient-to-br from-primary-50 to-soil-light rounded-2xl p-10 shadow-lg border border-primary-200 h-full flex flex-col">
                <Target className="w-16 h-16 text-primary-600 mb-6" />
                <h2 className="text-3xl font-bold text-text-base mb-4">
                  {t("about_vision_heading", "Our Vision")}
                </h2>
                <p className="text-lg text-text-light leading-relaxed">
                  {t(
                    "about_vision_copy",
                    "To be a leading research-driven agricultural brand in India by advancing soil science, plant nutrition, and biological innovations through continuous R&D, field-validated technologies, and data-backed solutions-enhancing nutrient use efficiency, crop resilience, and sustainable yield growth for long-term farmer prosperity."
                  )}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full opacity-50" />
              <div className="relative bg-gradient-to-br from-primary-50 to-soil-light rounded-2xl p-10 shadow-lg border border-primary-200 h-full flex flex-col">
                <Lightbulb className="w-16 h-16 text-primary-600 mb-6" />
                <h2 className="text-3xl font-bold text-text-base mb-4">
                  {t("about_mission_heading", "Our Mission")}
                </h2>
                <p className="text-lg text-text-light leading-relaxed">
                  {t(
                    "about_mission_copy",
                    "To advance farmer productivity and profitability through continuous agricultural research, precision-based formulations, and field-validated technologies that improve crop physiology, optimize nutrient efficiency, and promote sustainable, climate-resilient farming systems."
                  )}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
