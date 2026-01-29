import { motion } from "framer-motion";
import About from "../components/About";
import { LatestUpdateBar } from "./LatestUpdateBar";
import WordCloudSection from "./WordCloudSection";
import IndiaMap from "./IndiaMap";
import FarmerStories from "./FarmerStories";
import Hero1 from "../assets/Hero.png";

export default function Hero() {
  return (
    <div>
      <section
        id="home"
        className="relative h-screen overflow-hidden bg-gradient-to-br from-[#741A1C] via-[#9B2D2F] to-[#E8C8C9]"
      >
        {/* Background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#E8C8C9]/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-[#10B981]/10 rounded-full blur-3xl" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 container mx-auto px-6 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center w-full">

            {/* LEFT TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                <span className="block">The Foundation of</span>
                <span className="block bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                  Fertile Fields
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-lg md:text-xl text-white/90 leading-relaxed"
              >
                Bringing life back to the soil, one microbe at a time.
                <br />
                Because strong fields grow from a stronger foundation.
              </motion.p>
            </motion.div>

            {/* RIGHT IMAGE */}
            
              <img
                src={Hero1}
                alt="Fertile agricultural fields"
                className="w-full max-w-[520px] lg:max-w-none lg:h-[700px] object-cover "
              />
            

          </div>
        </div>
      </section>

      {/* BELOW SECTIONS */}
      <div className="relative z-30 w-full bg-soil-light">
        <LatestUpdateBar />
        <About />
        <IndiaMap />
        <WordCloudSection />
        <FarmerStories />
      </div>
    </div>
  );
}
