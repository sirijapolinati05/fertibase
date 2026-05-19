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
        className="relative min-h-[100svh] overflow-hidden"
      >
        <img
          src={HomeHero}
          alt="Fertile agricultural fields"
          className="absolute inset-0 h-full w-full object-cover object-[62%_bottom] sm:object-bottom"
        />

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,243,235,0.78)_0%,rgba(255,243,235,0.3)_40%,rgba(255,243,235,0.16)_100%)] sm:bg-white/12" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex min-h-[100svh] items-start justify-center px-4 pt-24 text-center sm:px-6 sm:pt-20 md:pt-24"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center">
            <h1 className="max-w-[13ch] text-[38px] font-semibold leading-[1.02] tracking-[-0.03em] text-black sm:text-[52px] sm:leading-[1.06] md:text-[64px]">
              <span className="block">The Foundation of</span>
              <span className="mt-2 block">Fertile Fields</span>
            </h1>

            <p className="mt-5 max-w-[22rem] text-[16px] font-normal leading-[1.5] text-black sm:mt-6 sm:max-w-3xl sm:text-[20px] sm:leading-[1.4] md:text-[24px] md:leading-[1.35]">
              Bringing life back to the soil, one microbe at a time.
              <br className="hidden sm:block" />
              Because strong fields grow from a stronger foundation.
            </p>

            <a
              href="#solutions"
              className="mt-10 inline-flex h-12 w-full max-w-[280px] items-center justify-center rounded-full bg-white px-6 text-[16px] font-medium text-black shadow-lg transition-transform duration-300 hover:scale-105 sm:mt-16 sm:h-[50px] sm:w-[316px] sm:max-w-none sm:text-[20px]"
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
