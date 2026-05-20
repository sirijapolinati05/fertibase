import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import About from "../components/About";
import PremiumProductSection from "./PremiumProductSection";
import IndiaMap from "./IndiaMap";
import FarmerStories from "./FarmerStories";
import { LatestUpdateBar } from "./LatestUpdateBar";
import Hero1 from "../assets/Hero1.jpeg";
import Hero2 from "../assets/Hero2.jpeg";
import Hero3 from "../assets/Hero3.png";
import BannerImage from "../assets/Banner.jpeg";
import { useTranslation } from "../i18n/useTranslation";

export default function Hero() {
  const heroImages = [Hero1, Hero2, Hero3];
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4200);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <div>
      <section
        id="home"
        className="relative min-h-[100svh] overflow-hidden bg-[#e9ddd2]"
      >
        {heroImages.map((image, index) => (
          <motion.div
            key={image}
            initial={false}
            animate={{
              opacity: index === currentImage ? 1 : 0,
              scale: index === currentImage ? 1 : 1.05,
            }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,14,10,0.18)_0%,rgba(20,14,10,0.34)_100%)]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex min-h-[100svh] items-start justify-center px-4 pt-36 text-center sm:px-6 sm:pt-32 md:pt-36"
        >
          <div className="mx-auto flex w-full max-w-4xl flex-col items-center px-4 py-8 sm:px-8 md:px-10">
            <h1 className="max-w-[13ch] text-[38px] font-semibold leading-[1.02] tracking-[-0.03em] text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.28)] sm:text-[52px] sm:leading-[1.06] md:text-[64px]">
              <span className="block">
                {t("hero_title_line_1", "The Foundation of")}
              </span>
              <span className="mt-2 block">
                {t("hero_title_line_2", "Fertile Fields")}
              </span>
            </h1>

            <p className="mt-5 max-w-[22rem] text-[16px] font-normal leading-[1.5] text-white/95 drop-shadow-[0_8px_24px_rgba(0,0,0,0.24)] sm:mt-6 sm:max-w-3xl sm:text-[20px] sm:leading-[1.4] md:text-[24px] md:leading-[1.35]">
              {t(
                "hero_subtitle_line_1",
                "Bringing life back to the soil, one microbe at a time."
              )}
              <br className="hidden sm:block" />
              {t(
                "hero_subtitle_line_2",
                "Because strong fields grow from a stronger foundation."
              )}
            </p>

            <a
              href="#solutions"
              className="mt-14 inline-flex h-12 w-full max-w-[280px] items-center justify-center rounded-full bg-[#7b4a33] px-6 text-[16px] font-medium text-white shadow-[0_16px_30px_rgba(123,74,51,0.28)] transition-transform duration-300 hover:scale-105 sm:mt-20 sm:h-[50px] sm:w-[316px] sm:max-w-none sm:text-[20px]"
            >
              {t("discover_solutions", "Discover Solutions")}
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
