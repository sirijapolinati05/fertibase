import { motion } from "framer-motion";
import About from "../components/About";
import { LatestUpdateBar } from "./LatestUpdateBar";
import WordCloudSection from "./WordCloudSection";
import IndiaMap from "./IndiaMap";
import FarmerStories from "./FarmerStories";
import Hero1 from "../assets/hero.png";

export default function Hero() {
  return (
    <div>
      <section
        id="home"
        className="relative min-h-screen overflow-hidden
                   bg-gradient-to-br
                   from-[#4E2F21]
                   via-[#6B412E]
                   to-[#8A5A44]"
      >
        {/* Background blobs */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10
                          w-48 h-48 md:w-72 md:h-72
                          bg-[#E6D3C6]/15
                          rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10
                          w-48 h-48 md:w-72 md:h-72
                          bg-[#B07A5A]/20
                          rounded-full blur-3xl" />
        </div>

        {/* CONTENT */}
        <div className="relative z-10 flex items-center min-h-screen">
          <div className="grid w-full lg:grid-cols-2">

            {/* LEFT TEXT */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="
                flex flex-col justify-center
                px-6 py-16
                sm:px-10
                md:px-16
                lg:px-24
                space-y-6
              "
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  lg:text-6xl
                  font-bold
                  text-white
                  leading-tight
                "
              >
                <span className="block">The Foundation of</span>
                <span
                  className="
                    block
                    bg-gradient-to-r
                    from-[#F5E6DC]
                    to-[#D6B8A6]
                    bg-clip-text
                    text-transparent
                  "
                >
                  Fertile Fields
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="
                  text-base
                  sm:text-lg
                  md:text-xl
                  text-[#F2E8E2]/90
                  leading-relaxed
                "
              >
                Bringing life back to the soil, one microbe at a time.
                <br />
                Because strong fields grow from a stronger foundation.
              </motion.p>
            </motion.div>

            {/* RIGHT IMAGE */}
            <div className="relative h-[320px] sm:h-[380px] md:h-[480px] lg:h-[786px]">
              <img
                src={Hero1}
                alt="Fertile agricultural fields"
                className="
                  absolute inset-0
                  w-full h-full
                  object-cover
                "
              />
              {/* Soft soil overlay for theme consistency */}
              <div className="absolute inset-0 bg-[#6B412E]/15" />
            </div>

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
