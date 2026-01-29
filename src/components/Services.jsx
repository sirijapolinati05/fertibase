/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";
import { Sprout, Leaf, FlaskConical, Droplets, Network, Sun } from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  const services = [
    {
      icon: <Sprout className="w-10 h-10 text-primary-600" />,
      title: "Biofertilizer Development",
      desc: "We craft eco-friendly biofertilizers that enhance soil fertility and boost crop yields naturally.",
    },
    {
      icon: <Leaf className="w-10 h-10 text-primary-500" />,
      title: "Soil Health Improvement",
      desc: "Our products rejuvenate soil structure, increase water retention, and promote microbial balance.",
    },
    {
      icon: <FlaskConical className="w-10 h-10 text-primary-600" />,
      title: "Research & Innovation",
      desc: "We pioneer sustainable agricultural practices through continuous scientific R&D in biotechnology.",
    },
    {
      icon: <Droplets className="w-10 h-10 text-primary-500" />,
      title: "Eco-Friendly Crop Care",
      desc: "Chemical-free, sustainable crop enhancement solutions that protect soil and environment.",
    },
    {
      icon: <Network className="w-10 h-10 text-primary-600" />,
      title: "Farmer Empowerment",
      desc: "We train and support farmers through multiple platforms such as field trials, on-ground demonstrations, and farmer meetings led by our expert agronomists.",
    },
    {
      icon: <Sun className="w-10 h-10 text-primary-700" />,
      title: "Sustainable Farming",
      desc: "At Fertibase, we promote sustainable farming by improving soil health, reducing input costs, and increasing crop productivity through science-backed solutions.",
    },
  ];

  return (
    <section className="bg-soil-light text-text-base pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-bold text-primary-700 mb-6"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-primary-700">
            Our <span className="text-primary-600">Solutions</span>
          </h1>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-lg md:text-xl text-text-light max-w-3xl mx-auto mb-16"
        >
          At FertiBase, we blend science, innovation, and sustainability to deliver transformative agricultural solutions.
        </motion.p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-primary-200 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-100/30 to-primary-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="mb-6 flex justify-center">{service.icon}</div>
              <h3 className="text-2xl font-semibold text-primary-700 mb-3">{service.title}</h3>
              <p className="text-text-light leading-relaxed">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-24 bg-gradient-to-r from-primary-600 to-primary-700 text-soil-base py-16 px-8 rounded-3xl shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-30"></div>
          <div className="relative z-10">
            <h2 className="text-4xl font-bold mb-4">Partner With FertiBase</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Join us in redefining agriculture with innovation and sustainability. Together, we can grow a greener future.
            </p>
            <Link to="/contactus" className="inline-block bg-white text-primary-700 font-semibold px-8 py-3 rounded-full shadow-md hover:shadow-lg hover:bg-primary-50 transition-all duration-300">
              Get In Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
