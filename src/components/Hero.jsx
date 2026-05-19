import { motion } from "framer-motion";
import About from "../components/About";
import PremiumProductSection from "./PremiumProductSection";
import IndiaMap from "./IndiaMap";
import FarmerStories from "./FarmerStories";
import { LatestUpdateBar } from "./LatestUpdateBar";
import HomeHero from "../assets/Home-Hero.png";
import BannerImage from "../assets/Banner.jpeg";

export default function Hero() {
  return (
    <div>
      <section
        id="home"
        className="relative min-h-screen overflow-hidden"
      >
        <img
          src={HomeHero}
          alt="Fertile agricultural fields"
          className="absolute inset-0 h-full w-full object-cover object-bottom"
        />

        <div className="absolute inset-0 bg-white/12" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex min-h-screen items-start justify-center px-6 pt-16 text-center sm:pt-20 md:pt-24"
        >
          <div className="mx-auto flex max-w-4xl flex-col items-center">
            <h1 className="text-[64px] font-semibold leading-[1.1] text-black">
              <span className="block">The Foundation of</span>
              <span className="mt-2 block">Fertile Fields</span>
            </h1>

            <p className="mt-6 max-w-3xl text-[24px] font-normal leading-[1.35] text-black">
              Bringing life back to the soil, one microbe at a time.
              <br />
              Because strong fields grow from a stronger foundation.
            </p>

            <a
              href="#solutions"
              className="mt-16 inline-flex h-[50px] w-[316px] items-center justify-center rounded-full bg-white text-[20px] font-medium text-black shadow-lg transition-transform duration-300 hover:scale-105"
            >
              Discover Solutions
            </a>
          </div>
        </motion.div>
      </section>

      <LatestUpdateBar />


      {/* BELOW SECTIONS */}
      <div className="relative z-30 w-full bg-soil-light">
        <About />
        <PremiumProductSection />
        <section className="bg-[#fff3eb] pb-8 md:pb-12">
          <div className="overflow-hidden">
            <img
              src={BannerImage}
              alt="Fertibase banner"
              className="h-auto w-full object-cover"
            />
          </div>
        </section>
        <IndiaMap />
        <FarmerStories />
      </div>
    </div>
  );
}
