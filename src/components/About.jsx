import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import About1 from "../assets/Why-Choose-Fertibase.png";

export default function About() {
  const aboutSections = [
    {
      title: "High-Quality Fertilizers",
      desc:
        "Scientifically driven microbial formulations that enhance soil health naturally",
    },
    {
      title: "Scientifically Tested Formulas",
      desc:
        "Proven products that boost nutrient availability and improve crop performance",
    },
    {
      title: "Affordable & Farmer-Friendly Pricing",
      desc:
        "Sustainable, residue-free solutions that support long-term soil fertility",
    },
    {
      title: "Sustainable & Eco-Friendly Solutions",
      desc:
        "Farmer-focused innovations designed for all AGRO-CLIMATIC conditions",
    },
  ];

  return (
    // BOTTOM SPACE REDUCED
    <section id="about" className="bg-[#fff3eb] px-5 pt-8 pb-2">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="mx-auto max-w-7xl rounded-[2.25rem] border border-[#b98f7b] bg-white px-8 py-10 shadow-sm md:px-10 lg:px-12"
      >
        <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.2fr_1fr]">
          <div className="flex h-full flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold leading-tight text-[#7b4a33] md:text-5xl">
                Why Choose
                <br />
                Fertibase?
              </h2>

              <p className="mt-6 max-w-[290px] text-[17px] leading-[1.25] text-black">
                Fertibase provides biofertilizers that boost soil health and strengthen crop growth. Our innovative
                solutions are designed to bring life back to the soil, one microbe at a time.
              </p>
            </div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/aboutus"
                className="mt-8 inline-flex h-[52px] w-fit items-center justify-center rounded-full bg-[#7b4a33] px-10 text-xl font-medium text-white shadow-md"
              >
                Learn More About Us
              </Link>
            </motion.div>
          </div>

          <div className="flex justify-center">
            <img
              src={About1}
              alt="Seedling growing in soil"
              className="h-[360px] w-full max-w-[340px] rounded-[2rem] object-cover md:h-[420px] md:max-w-[380px]"
            />
          </div>

          <div className="space-y-8 pt-6">
            {aboutSections.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <Check className="mt-1 h-6 w-6 text-[#7b4a33]" strokeWidth={2.3} />

                <div>
                  <h3 className="text-[18px] font-semibold leading-tight text-black">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-[320px] text-[14px] leading-[1.12] text-[#2f2f2f]">
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
