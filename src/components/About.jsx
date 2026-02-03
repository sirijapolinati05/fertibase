/* eslint-disable no-unused-vars */

import { motion } from "framer-motion";
import About1 from "../assets/About1.png";
import About2 from "../assets/About2.png";
import About3 from "../assets/About3.png";
import About4 from "../assets/About4.png";

export default function About() {
  const aboutSections = [
    {
      title: "High-Quality Fertilizers",
      desc:
        "Scientifically driven microbial formulations that enhance soil health naturally",
      image: About1,
    },
    {
      title: "Scientifically Tested Formulas",
      desc:
        "Proven products that boost nutrient availability and improve crop performance",
      image: About2,
    },
    {
      title: "Affordable & Farmer-Friendly Pricing",
      desc:
        "Sustainable, residue-free solutions that support long-term soil fertility",
      image: About3,
    },
    {
      title: "Sustainable & Eco-Friendly Solutions",
      desc:
        "Farmer-focused innovations designed for all AGRO-CLIMATIC conditions",
      image: About4,
    },
  ];

  return (
    <section id="about" className="relative py-8 bg-soil-light overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-extrabold text-[#6B412E] text-center mb-3">
            Why Choose{" "}
            <span className="bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
              Fertibase?
            </span>
          </h2>

          <p className="text-lg text-text-light text-center max-w-3xl mx-auto">
            Fertibase provides biofertilizers that boost soil health and strengthen crop growth.
            Our innovative solutions are designed to bring life back to the soil, one microbe at a time.
          </p>
        </motion.div>

        {/* Sections */}
        <div className="mt-10 space-y-10">
          {aboutSections.map((item, index) => {
            const isDark = index % 2 === 0;
            const isReverse = index % 2 !== 0;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`group flex flex-col md:flex-row items-center gap-6 md:gap-8 ${
                  isReverse ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Image */}
                <div
                  className="relative transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
                             group-hover:scale-[1.08] group-hover:-rotate-2"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-52 h-52 md:w-56 md:h-56 rounded-full object-cover
                               shadow-lg ring-4 ring-[#6B412E]/20
                               transition-all duration-700
                               group-hover:ring-[#6B412E]/50
                               group-hover:shadow-[0_30px_60px_-15px_rgba(107,65,46,0.6)]"
                  />
                </div>

                {/* Content */}
                <div
                  className={`relative group max-w-xl px-6 py-4 rounded-2xl border overflow-hidden
                    transition-all duration-700 ease-[cubic-bezier(.22,1,.36,1)]
                    group-hover:-translate-y-2
                    ${
                      isDark
                        ? "bg-gradient-to-br from-[#6B412E] via-[#5A3626] to-[#4A2B1E] text-white border-[#6B412E]"
                        : "bg-white text-[#6B412E] border-[#6B412E]"
                    }`}
                >
                  {/* Glow overlay */}
                  <span
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100
                      transition-opacity duration-700
                      ${
                        isDark
                          ? "bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]"
                          : "bg-[radial-gradient(circle_at_30%_20%,rgba(107,65,46,0.15),transparent_60%)]"
                      }`}
                  />

                  {/* Ripple layers */}
                  <span
                    className={`absolute inset-0 rounded-full pointer-events-none
                      opacity-0 scale-75
                      group-hover:opacity-100 group-hover:scale-150
                      transition-all duration-[1000ms] ease-out
                      ${isDark ? "bg-white/10" : "bg-[#6B412E]/10"}`}
                    style={{ transitionDelay: `${index * 90}ms` }}
                  />

                  <span
                    className={`absolute inset-0 rounded-full pointer-events-none
                      opacity-0 scale-50
                      group-hover:opacity-100 group-hover:scale-125
                      transition-all duration-[1400ms] ease-out
                      ${isDark ? "bg-white/5" : "bg-[#6B412E]/5"}`}
                    style={{ transitionDelay: `${index * 140}ms` }}
                  />

                  {/* Content */}
                  <div className="relative">
                    <div
                      className={`inline-block mb-2 px-4 py-1.5 rounded-full text-sm font-semibold border
                        ${
                          isDark
                            ? "bg-white text-[#6B412E] border-white"
                            : "bg-[#6B412E] text-white border-[#6B412E]"
                        }`}
                    >
                      {item.title}
                    </div>

                    <p className="text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.a
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.96 }}
          href="#aboutus"
          className="block w-fit mx-auto mt-10 px-8 py-4
                     bg-[#6B412E] text-white font-semibold rounded-full
                     shadow-lg hover:shadow-[0_20px_40px_-10px_rgba(107,65,46,0.6)]
                     transition-all duration-300"
        >
          Learn More About Us
        </motion.a>
      </div>
    </section>
  );
}
