/* eslint-disable no-unused-vars */

import { Leaf, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { HERO_IMAGES } from "../config/images";

export default function About() {
  const features = [
    "Scientifically driven microbial formulations that enhance soil health naturally",
    "Proven products that boost nutrient availability and improve crop performance",
    "Sustainable, residue-free solutions that support long-term soil fertility",
    "Farmer-focused innovations designed for all AGRO-CLIMATIC conditions",
  ];

  return (
    <section
      id="about"
      className="relative py-24 bg-soil-light overflow-hidden"
    >
      

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-16 items-center">
        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
  src={HERO_IMAGES.about}
  alt="About Fertibase"
  className="w-full h-[80vh] object-cover"
/>



          
        </motion.div>

        {/* Right: Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-extrabold text-[#741A1C] mb-6 leading-tight">
            Why Choose{" "}
            <span className="bg-clip-text bg-gradient-to-r from-primary-600 to-primary-500">
              Fertibase?
            </span>
          </h2>

          <p className="text-lg text-text-light mb-8 leading-relaxed">
            Fertibase provides biofertilizers that boost soil health and strengthen crop growth.
            Our innovative solutions are designed to bring life back to the soil, one microbe at a time,
            ensuring strong fields grow from a stronger foundation.
          </p>

          <ul className="space-y-5">
            {features.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.15 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm p-3 rounded-xl shadow-sm hover:shadow-md transition border border-primary-100"
              >
                <CheckCircle2 className="h-6 w-6 text-primary-600 flex-shrink-0" />
                <span className="text-text-base font-medium">{item}</span>
              </motion.li>
            ))}
          </ul>

          <motion.a
            whileHover={{ scale: 1.05 }}
            href="#aboutus"
            className="inline-block mt-10 px-8 py-4 bg-[#741A1C] text-white font-semibold rounded-full shadow-lg hover:bg-primary-700 transition"
          >
            Learn More About Us
          </motion.a>
        </motion.div>
      </div>

     
    </section>
  );
}
