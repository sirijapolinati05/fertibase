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
  className="
    relative
    min-h-screen
    bg-gradient-to-br
    from-[#4E2F21]
    via-[#6B412E]
    to-[#8A5A44]
  "
>
  <div
    className="
      relative z-10
      grid
      lg:grid-cols-2
      min-h-screen
      lg:items-center
    "
  >
    {/* LEFT CONTENT */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="
        flex flex-col
        justify-start
        lg:justify-center
        px-6
        pt-20
        sm:pt-24
        lg:pt-0
        sm:px-10
        md:px-16
        lg:px-24
        space-y-6
      "
    >
      <h1
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
        <span className="block text-[#EAD8CB]">
          Fertile Fields
        </span>
      </h1>

      <p
        className="
          text-base
          sm:text-lg
          md:text-xl
          text-[#F2E8E2]/90
          max-w-xl
        "
      >
        Bringing life back to the soil, one microbe at a time.
        <br />
        Because strong fields grow from a stronger foundation.
      </p>
    </motion.div>

    {/* RIGHT IMAGE */}
    {/* RIGHT IMAGE */}
<div
  className="
    relative
    flex
    items-center
    justify-end
    overflow-hidden
    mt-8
    lg:mt-0
    lg:py-12
  "
>
  <img
    src={Hero1}
    alt="Fertile agricultural fields"
    className="
      w-full
      max-w-[520px]
      md:max-w-[620px]
      lg:max-w-[700px]
      h-auto
      object-contain
    "
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
