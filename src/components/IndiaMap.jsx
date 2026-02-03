import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";
import indiaMapImage from "../assets/indiamap.png";

export default function IndiaMap() {
  const presenceStats = [
    { value: "5", label: "States" },
    { value: "1000+", label: "Dealer Network" },
    { value: "50,000+", label: "Farmer Network" },
  ];

  return (
    <section className="py-14 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start"
        >
          {/* LEFT CONTENT */}
          <div>
            <span className="inline-block bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              Impact
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#6B412E] mb-5">
              Making a Difference in Agriculture
            </h3>

            <p className="text-base sm:text-lg text-text-light mb-7 max-w-xl">
              Years of innovation and dedication have resulted in significant
              achievements across the agricultural sector.
            </p>

            {/* STATS – Glass Cards */}
<div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
  {presenceStats.map((s, i) => (
    <motion.div
      key={i}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.1, duration: 0.6 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="
        group relative overflow-hidden
        rounded-2xl
        border border-white/40
        bg-white/60
        backdrop-blur-xl
        shadow-lg
        p-6
        transition-all
        hover:shadow-2xl
      "
    >
      {/* Gradient glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100/40 via-transparent to-primary-200/40 opacity-0 group-hover:opacity-100 transition" />

      {/* Content */}
      <div className="relative z-10">
        <p className="text-3xl font-black text-[#6B412E] mb-1 tracking-tight">
          {s.value}
        </p>

        <p className="text-sm font-semibold text-slate-700">
          {s.label}
        </p>

        {/* Progress bar */}
        <div className="h-1.5 bg-primary-100 rounded-full mt-4 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary-500 to-primary-700 rounded-full w-0 group-hover:w-4/5 transition-all duration-700" />
        </div>
      </div>
    </motion.div>
  ))}
</div>


            {/* BADGES */}
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-[#6B412E] rounded-full text-white text-xs sm:text-sm">
                FCO Approved
              </span>
              <span className="px-4 py-2 bg-[#6B412E] rounded-full text-white text-xs sm:text-sm">
                CIB Approved
              </span>
            </div>
          </div>

          {/* RIGHT MAP CARD */}
          {/* RIGHT MAP CARD */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.04,
              rotateX: 6,
              rotateY: -6,
            }}
            className="
              group relative
              bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700
              rounded-3xl shadow-2xl
              p-4 sm:p-6 md:p-8
              overflow-hidden
              flex items-center justify-center
            "
          >
            {/* Glow blobs */}
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full blur-3xl" />

            {/* Map */}
            <img
              src={indiaMapImage}
              alt="India Map showing our presence"
              className="
                relative z-10
                w-full
                max-w-md sm:max-w-lg lg:max-w-full
                object-contain
                transition-all duration-700 ease-out
                group-hover:scale-110
                group-hover:drop-shadow-[0_30px_40px_rgba(0,0,0,0.4)]
              "
              loading="lazy"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
