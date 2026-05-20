import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import About1 from "../assets/Why-Choose-Fertibase.png";
import { useTranslation } from "../i18n/useTranslation";

export default function About() {
  const { t } = useTranslation();

  const aboutSections = [
    {
      title: t("about_card_quality_title", "High-Quality Fertilizers"),
      desc: t(
        "about_card_quality_desc",
        "Scientifically driven microbial formulations that enhance soil health naturally"
      ),
    },
    {
      title: t(
        "about_card_tested_title",
        "Scientifically Tested Formulas"
      ),
      desc: t(
        "about_card_tested_desc",
        "Proven products that boost nutrient availability and improve crop performance"
      ),
    },
    {
      title: t(
        "about_card_affordable_title",
        "Affordable & Farmer-Friendly Pricing"
      ),
      desc: t(
        "about_card_affordable_desc",
        "Sustainable, residue-free solutions that support long-term soil fertility"
      ),
    },
    {
      title: t(
        "about_card_sustainable_title",
        "Sustainable & Eco-Friendly Solutions"
      ),
      desc: t(
        "about_card_sustainable_desc",
        "Farmer-focused innovations designed for all AGRO-CLIMATIC conditions"
      ),
    },
  ];

  return (
    // BOTTOM SPACE REDUCED
    <section id="about" className="bg-[#fff3eb] px-4 pt-8 pb-2 sm:px-5">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl rounded-[2rem] border border-[#b98f7b] bg-white px-5 py-8 shadow-sm sm:px-6 md:rounded-[2.25rem] md:px-10 md:py-10 lg:px-12"
      >
        <div className="grid items-start gap-8 lg:grid-cols-[0.95fr_1.2fr_1fr] lg:gap-10">
          <div className="flex h-full flex-col justify-between text-center lg:text-left">
            <div>
              <h2 className="text-[32px] font-bold leading-tight text-[#7b4a33] sm:text-4xl md:text-5xl">
                {t("about_why_choose_line_1", "Why Choose")}
                <br />
                {t("about_why_choose_line_2", "Fertibase?")}
              </h2>

              <p className="mx-auto mt-5 max-w-[32rem] text-[15px] leading-[1.5] text-black sm:text-[16px] md:mt-6 md:text-[17px] md:leading-[1.35] lg:mx-0 lg:max-w-[290px] lg:leading-[1.25]">
                {t(
                  "about_intro",
                  "Fertibase provides biofertilizers that boost soil health and strengthen crop growth. Our innovative solutions are designed to bring life back to the soil, one microbe at a time."
                )}
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              className="flex justify-center lg:justify-start"
            >
              <Link
                to="/aboutus"
                className="mt-7 inline-flex min-h-[52px] w-full max-w-[280px] items-center justify-center rounded-full bg-[#7b4a33] px-6 text-base font-medium text-white shadow-md sm:max-w-fit sm:px-10 sm:text-xl"
              >
                {t("about_learn_more", "Learn More About Us")}
              </Link>
            </motion.div>
          </div>

          <div className="flex justify-center">
            <img
              src={About1}
              alt="Seedling growing in soil"
              className="h-[280px] w-full max-w-[340px] rounded-[1.75rem] object-cover sm:h-[340px] md:h-[420px] md:max-w-[380px] md:rounded-[2rem]"
            />
          </div>

          <div className="space-y-6 pt-2 sm:pt-4 md:space-y-8 md:pt-6">
            {aboutSections.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 rounded-[1.25rem] bg-[#fff8f3] p-4 sm:bg-transparent sm:p-0"
              >
                <Check className="mt-1 h-6 w-6 text-[#7b4a33]" strokeWidth={2.3} />

                <div>
                  <h3 className="text-[17px] font-semibold leading-tight text-black sm:text-[18px]">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-[320px] text-[14px] leading-[1.4] text-[#2f2f2f] sm:leading-[1.2]">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
