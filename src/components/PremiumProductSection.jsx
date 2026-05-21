import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Leaf, Star } from "lucide-react";
import { Link } from "react-router-dom";
import PremiumProductImage from "../assets/Premium-Product.png";
import CorbominImage from "../assets/Corbomin.png";
import Circle1 from "../assets/circle-1.png";
import Circle2 from "../assets/circle-2.png";
import Circle3 from "../assets/circle-3.png";
import Circle4 from "../assets/circle-4.png";
import Circle5 from "../assets/circle-5.png";
import { useTranslation } from "../i18n/useTranslation";

const productCategories = [

  // LEFT TOP CIRCLE
  {
    label: ["Beneficial", "Element", "Fertilizer"],
    className: "left-[0px] top-[220px]",
    routeCategory: "Beneficial Element Fertilizer",
    image: null, // filled in component with Circle1
  },

  // RIGHT TOP CIRCLE
  {
    label: ["Biofertilizers"],
    className: "right-[0px] top-[220px]",
    routeCategory: "Biofertilizer",
    image: null,
  },

  // LOWER LEFT
  {
    label: ["Straight", "Micronutrient"],
    className: "left-[85px] top-[380px]",
    routeCategory: "Straight Micronutrient",
    image: null,
  },

  // LOWER RIGHT
  {
    label: ["Liquid", "Fertilizer"],
    className: "right-[85px] top-[380px]",
    routeCategory: "Liquid Fertilizer",
    image: null,
  },

  // BOTTOM CENTER
  {
    label: ["Organic", "Biofertilizers"],
    className: "left-1/2 top-[450px] -translate-x-1/2",
    routeCategory: "Organic Biofertilizer",
    image: null,
  },
];

const circleImages = [Circle1, Circle2, Circle3, Circle4, Circle5];

const premiumCards = Array.from({ length: 3 }, (_, index) => ({
  id: index,
  rating: 4.8,
  reviews: 240,
  tags: ["Organic", "Liquid", "All Crops"],
}));

const tagStyles = {
  Organic: "bg-[#4fb85f]",
  Liquid: "bg-[#53aec8]",
  "All Crops": "bg-[#8fce97]",
};

export default function PremiumProductSection() {
  const { t } = useTranslation();

  const localizedCategories = [
    {
      ...productCategories[0],
      label: [
        t("premium_category_beneficial_1", "Beneficial"),
        t("premium_category_beneficial_2", "Element"),
        t("premium_category_beneficial_3", "Fertilizer"),
      ],
      image: circleImages[0],
    },
    {
      ...productCategories[1],
      label: [t("premium_category_bio_1", "Biofertilizers")],
      image: circleImages[1],
    },
    {
      ...productCategories[2],
      label: [
        t("premium_category_straight_1", "Straight"),
        t("premium_category_straight_2", "Micronutrient"),
      ],
      image: circleImages[2],
    },
    {
      ...productCategories[3],
      label: [
        t("premium_category_liquid_1", "Liquid"),
        t("premium_category_liquid_2", "Fertilizer"),
      ],
      image: circleImages[3],
    },
    {
      ...productCategories[4],
      label: [
        t("premium_category_organic_1", "Organic"),
        t("premium_category_organic_2", "Biofertilizers"),
      ],
      image: circleImages[4],
    },
  ];

  const localizedPremiumCards = premiumCards.map((card) => ({
    ...card,
    title: t("premium_card_title", "CORBOMIN Organic Fertilizer"),
    subtitle: t("premium_card_subtitle", "Liquid Fermented Formula"),
  }));

  return (
    <section className="bg-[#fff3eb] px-4 pb-10 pt-2 sm:px-5 md:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.2fr]">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-[520px] text-center lg:text-left"
        >
          <h2 className="text-[34px] font-bold leading-[1.05] text-[#7b4a33] sm:text-[42px] md:text-[48px]">
            {t("premium_heading_line_1", "Our Premium Product")}
            <br />
            {t("premium_heading_line_2", "Range")}
          </h2>

          <p className="mt-4 text-[17px] leading-[1.45] text-[#1f1f1f] sm:mt-5 sm:text-[20px] sm:leading-[1.25] md:mt-6 md:text-[24px] md:leading-[1.08]">
            {t(
              "premium_subtitle",
              "Trusted microbiological & nutrient solutions designed for modern agriculture."
            )}
          </p>

          <Link
            to="/product?category=All"
            className="mt-7 inline-flex min-h-[50px] w-full max-w-[280px] items-center justify-center rounded-full bg-[#7b4a33] px-6 text-[16px] font-medium text-white shadow-[0_8px_18px_rgba(123,74,51,0.28)] sm:max-w-fit sm:min-w-[256px] sm:px-10 sm:text-[20px]"
          >
            {t("premium_explore_products", "Explore Our Products")}
          </Link>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          viewport={{ once: true }}
          className="relative mx-auto hidden h-[620px] w-full max-w-[680px] md:block"
        >

          {/* CENTER IMAGE */}
          <div className="absolute left-1/2 top-[90px] z-10 h-[336.95px] w-[336.95px] -translate-x-1/2 overflow-hidden rounded-full">
            <img
              src={PremiumProductImage}
              alt={t("premium_visual_alt", "Premium product range")}
              className="h-full w-full object-cover"
            />
          </div>

          {/* CATEGORY CIRCLES */}
          {localizedCategories.map((item, index) => (
            <motion.div
              key={item.label.join("-")}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.45,
                delay: 0.12 + index * 0.06,
              }}
              viewport={{ once: true }}
              className={`absolute z-0 ${item.className}`}
            >
              <Link
                to={`/product?category=${encodeURIComponent(item.routeCategory)}`}
                className="relative flex h-[153.31px] w-[153.31px] overflow-hidden rounded-full transition-transform duration-300 hover:scale-[1.03] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
              >
                {/* Photo fills the circle */}
                <img
                  src={item.image}
                  alt={item.label.join(" ")}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                {/* Green label overlay at the bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-[#c7eec5]/90 px-2 py-[10px] text-center text-[13px] font-normal leading-[1.15] text-[#1a1a1a]">
                  {item.label.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* MOBILE VERSION */}
        <div className="mx-auto flex w-full max-w-[360px] flex-col items-center gap-6 md:hidden">

          <img
            src={PremiumProductImage}
            alt={t("premium_visual_alt", "Premium product range")}
            className="h-[220px] w-[220px] rounded-full border-4 border-white/70 object-cover shadow-[0_18px_36px_rgba(74,46,32,0.12)] sm:h-[240px] sm:w-[240px]"
          />

          <div className="grid w-full grid-cols-2 justify-items-center gap-4 sm:gap-5">
            {localizedCategories.map((item, index) => (
              <Link
                key={item.label.join("-")}
                to={`/product?category=${encodeURIComponent(item.routeCategory)}`}
                className={`relative h-[148px] w-[148px] overflow-hidden rounded-full shadow-[0_14px_30px_rgba(115,165,99,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(115,165,99,0.26)] ${
                  index === productCategories.length - 1 ? "col-span-2" : ""
                }`}
              >
                <img
                  src={item.image}
                  alt={item.label.join(" ")}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-center bg-[#c7eec5]/90 px-2 py-[9px] text-center text-[13px] font-medium leading-[1.15] text-[#1a1a1a]">
                  {item.label.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* PRODUCT CARDS */}
      <div className="mx-auto mt-12 max-w-7xl overflow-hidden md:mt-14">
        <div className="mb-4 flex items-center justify-between px-1 md:hidden">
          <p className="text-sm font-medium text-[#7b4a33]">
            {t(
              "premium_swipe_more",
              "Swipe to explore more products"
            )}
          </p>
        </div>

        <div className="flex snap-x snap-mandatory overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:grid md:grid-cols-2 md:gap-8 md:overflow-visible md:pb-0 xl:grid-cols-3">

          {localizedPremiumCards.map((card, index) => (
            <motion.article
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
              }}
              viewport={{ once: true }}
              className="group w-full min-w-full shrink-0 snap-center px-4 md:w-auto md:min-w-0 md:px-0"
            >
              <div className="relative overflow-hidden rounded-[24px] bg-[#fff3eb] p-4 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-2 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgba(107,65,46,0.18)] sm:rounded-[30px] sm:p-5">

                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.82),transparent_35%),radial-gradient(circle_at_80%_100%,rgba(123,74,51,0.10),transparent_30%)]" />

                <div className="relative rounded-[18px] border-[3px] border-[#d5d8d9] bg-[#fffdfa] shadow-[inset_0_0_28px_rgba(0,0,0,0.06)]">

                  <span className="absolute left-3 top-3 z-10 inline-flex rounded-full bg-[#0b9d42] px-4 py-1 text-xs font-medium text-white sm:px-5 sm:text-sm">
                    {t("premium_badge_new", "New")}
                  </span>

                  <div className="mx-auto aspect-square w-full overflow-hidden rounded-[14px]">
                    <img
                      src={CorbominImage}
                      alt={card.title}
                      className="h-full w-full object-cover object-center transition-all duration-500 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                </div>

                <div className="relative mt-5">

                  <h3 className="text-[17px] font-semibold leading-snug text-[#7b4a33] sm:text-[18px]">
                    {card.title}
                  </h3>

                  <p className="mt-1 text-[14px] text-[#3f312a] sm:text-[15px]">
                    {card.subtitle}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-[15px] text-[#666666]">

                    <div className="flex items-center gap-0.5 text-[#ffb400]">
                      {Array.from({ length: 5 }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="h-4 w-4 fill-current"
                        />
                      ))}
                    </div>

                    <span className="font-semibold text-[#3d3028]">
                      {card.rating}
                    </span>

                    <span>|</span>

                    <span>
                      ({card.reviews}{" "}
                      {t("premium_reviews_suffix", "reviews")})
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs text-white ${tagStyles[tag]}`}
                      >
                        <Leaf className="h-3 w-3" />
                        {tag === "Organic"
                          ? t("premium_tag_organic", "Organic")
                          : tag === "Liquid"
                            ? t("premium_tag_liquid", "Liquid")
                            : t(
                                "premium_tag_all_crops",
                                "All Crops"
                              )}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 inline-flex items-start gap-3 rounded-[12px] border border-[#f0e4da] bg-[#fff8f3] px-3 py-2 shadow-sm">

                    <div className="rounded-[10px] border border-[#eadbd0] bg-[#fffdf9] p-2">
                      <CalendarDays className="h-4 w-4 text-[#7b4a33]" />
                    </div>

                    <div>
                      <p className="text-[11px] leading-none text-[#8f8f8f]">
                        {t(
                          "premium_application_stage",
                          "Application Stage"
                        )}
                      </p>

                      <p className="mt-1 text-[16px] leading-none text-[#444444]">
                        {t("premium_all_stages", "All Stages")}
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/product?category=All"
                    className="mt-5 inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#7b4a33] text-[16px] font-medium text-white shadow-[0_10px_18px_rgba(123,74,51,0.28)] transition-all duration-300 group-hover:bg-[#6b412e] sm:text-[18px]"
                  >
                    <span>
                      {t("premium_view_details", "View Details")}
                    </span>

                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>

                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
