import { motion } from "framer-motion";
import { useMemo } from "react";
import indiaMapImage from "../assets/indiamap.png";
import circle1Image from "../assets/circle1.png";
import circle2Image from "../assets/circle2.png";
import circle3Image from "../assets/circle3.png";
import { useTranslation } from "../i18n/useTranslation";

const sectionViewport = { once: true, amount: 0.25 };

const revealVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const circleVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const mapVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.18 },
  },
};

const stats = [
  {
    value: "50,000+",
    label: "Farmer Network",
    image: circle1Image,
    className:
      "h-[210px] w-[210px] sm:h-[240px] sm:w-[240px] lg:h-[373.18px] lg:w-[371.72px] lg:left-[-90px] lg:top-[180px]",
  },
  {
    value: "1000+",
    label: "Dealer Network",
    image: circle2Image,
    className:
      "h-[150px] w-[150px] sm:h-[180px] sm:w-[180px] lg:h-[284px] lg:w-[282.89px] lg:left-[190px] lg:top-[-40px]",
  },
  {
    value: "5",
    label: "States",
    image: circle3Image,
    className:
      "h-[110px] w-[110px] sm:h-[136px] sm:w-[136px] lg:h-[183.79px] lg:w-[232.58px] lg:left-[470px] lg:top-[-80px]",
  },
];

function StatCircle({ stat }) {
  return (
    <motion.div
      variants={circleVariants}
      whileHover={{ y: -6, scale: 1.03 }}
      whileTap={{ y: -6, scale: 1.03 }}
      className={`group relative overflow-hidden rounded-full lg:absolute ${stat.className}`}
    >
      <img
        src={stat.image}
        alt={stat.label}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white">
        <p className="text-[30px] font-bold leading-none drop-shadow-[0_2px_10px_rgba(0,0,0,0.35)] sm:text-[34px] lg:text-[52px]">
          {stat.value}
        </p>
        <p className="mt-1 text-[11px] font-medium leading-tight text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-[12px] lg:text-[20px]">
          {stat.label}
        </p>
      </div>
    </motion.div>
  );
}

export default function IndiaMap() {
  const { language, t } = useTranslation();

  const localizedStats = useMemo(
    () =>
      stats.map((stat) => ({
        ...stat,
        label:
          stat.label === "Farmer Network"
            ? t("india_stat_farmer_network", stat.label)
            : stat.label === "Dealer Network"
              ? t("india_stat_dealer_network", stat.label)
              : t("india_stat_states", stat.label),
      })),
    [t]
  );

  const mobileStats = useMemo(
    () =>
      [...localizedStats].sort((a, b) => {
        const getSize = (className) => {
          const match = className.match(/h-\[(\d+)/);
          return match ? Number(match[1]) : 0;
        };

        return getSize(a.className) - getSize(b.className);
      }),
    [localizedStats]
  );

  return (
    <section className="overflow-hidden bg-[#fff3eb] py-8 sm:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-[580px] text-center lg:text-left"
          >
            <h2 className="max-w-[820px] text-[32px] font-bold leading-[1.02] text-[#764734] sm:text-[48px] lg:text-[64px]">
              {t("india_heading_line_1", "Making a Difference in")}
              <br />
              {t("india_heading_line_2", "Agriculture")}
            </h2>

            <p className="mx-auto mt-4 max-w-[520px] text-[16px] leading-[1.5] text-[#2f241f] sm:mt-6 sm:text-[20px] sm:leading-[1.2] lg:mx-0">
              {t(
                "india_subtitle",
                "Years of innovation and dedication have resulted in significant achievements across the agricultural sector."
              )}
            </p>

            <motion.div
              key={`mobile-stats-${language}`}
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:hidden"
            >
              {mobileStats.map((stat) => (
                <div key={stat.value} className="flex justify-center">
                  <StatCircle
                    stat={{
                      ...stat,
                      className: stat.className.split(" lg:")[0],
                    }}
                  />
                </div>
              ))}
            </motion.div>

            <motion.div
              key={`desktop-stats-${language}`}
              variants={revealVariants}
              initial="hidden"
              animate="visible"
              className="relative mt-10 hidden h-[660px] lg:block"
            >
              {localizedStats.map((stat) => (
                <div key={stat.value} className="absolute">
                  <StatCircle stat={stat} />
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mx-auto w-full max-w-[1100px]"
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
              <div className="flex-1 -mt-3 lg:mt-0 lg:pt-[100px]">
                <div className="mx-auto mb-4 flex w-full max-w-[320px] flex-col gap-4 lg:hidden">
                  <div className="w-full text-center">
                    <h3 className="text-[24px] font-black uppercase leading-[0.95] text-[#764734]">
                      <span className="block">
                        {t("india_presence_line_1", "OUR PRESENCE")}
                      </span>
                      <span className="block">
                        {t("india_presence_line_2", "ACROSS INDIA")}
                      </span>
                    </h3>

                    <div className="mx-auto mt-4 h-[2px] w-[70px] bg-[#8e715c]" />

                    <p className="mt-4 text-[12px] leading-[1.55] text-[#5d5047]">
                      {t(
                        "india_presence_copy_1",
                        "Delivering trusted agricultural solutions across the country."
                      )}{" "}
                      {t(
                        "india_presence_copy_2",
                        "Strong roots, wider reach, better tomorrow."
                      )}
                    </p>
                  </div>
                </div>

                <motion.div
                  variants={mapVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={sectionViewport}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ y: -6, scale: 1.03 }}
                  className="group mx-auto w-fit"
                >
                  <img
                    src={indiaMapImage}
                    alt="India active states map"
                    loading="lazy"
                    className="
                      mx-auto
                      w-full
                      max-w-[760px]
                      rounded-[1.5rem]
                      object-contain
                      transition-transform
                      duration-500
                      group-hover:scale-105
                      -mt-12
                      -mb-12
                      sm:-mt-8
                      sm:-mb-8
                      lg:mt-0
                      lg:mb-0
                      lg:-ml-[55px]
                      lg:h-[920px]
                      lg:w-[860px]
                    "
                  />
                </motion.div>

                <div className="mx-auto mt-4 w-full max-w-[320px] rounded-[18px] bg-white/90 px-5 py-4 shadow-lg lg:hidden">
                  <p className="text-[16px] font-bold uppercase tracking-[0.06em] text-[#764734]">
                    {t("india_legend_title", "India - Active States")}
                  </p>

                  <div className="mt-4 space-y-3 text-sm text-[#3b312b]">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-[4px] bg-[#764734]" />
                      <span>{t("india_legend_active", "Active States")}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-[4px] border border-[#764734] bg-[#f3e5dc]" />
                      <span>{t("india_legend_other", "Other States")}</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 mx-auto mt-4 hidden w-full max-w-[320px] rounded-[18px] bg-white/90 px-5 py-4 shadow-lg lg:ml-[360px] lg:mt-[-320px] lg:block lg:w-fit lg:max-w-none lg:px-6">
                  <p className="text-[16px] font-bold uppercase tracking-[0.06em] text-[#764734]">
                    {t("india_legend_title", "India - Active States")}
                  </p>

                  <div className="mt-4 space-y-3 text-sm text-[#3b312b]">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-[4px] bg-[#764734]" />
                      <span>{t("india_legend_active", "Active States")}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-[4px] border border-[#764734] bg-[#f3e5dc]" />
                      <span>{t("india_legend_other", "Other States")}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden w-full max-w-[320px] text-center lg:-ml-[360px] lg:block lg:max-w-[260px] lg:pt-[220px] lg:text-left">
                <h3 className="text-[24px] font-black uppercase leading-[0.95] text-[#764734] sm:text-[28px] lg:text-[32px]">
                  <span className="block">
                    {t("india_presence_line_1", "OUR PRESENCE")}
                  </span>
                  <span className="block">
                    {t("india_presence_line_2", "ACROSS INDIA")}
                  </span>
                </h3>

                <div className="mx-auto mt-4 h-[2px] w-[70px] bg-[#8e715c] lg:mx-0" />

                <p className="mt-4 text-[12px] leading-[1.55] text-[#5d5047]">
                  {t(
                    "india_presence_copy_1",
                    "Delivering trusted agricultural solutions across the country."
                  )}{" "}
                  {t(
                    "india_presence_copy_2",
                    "Strong roots, wider reach, better tomorrow."
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
