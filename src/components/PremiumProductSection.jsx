import { motion } from "framer-motion";
import { ArrowRight, CalendarDays, Leaf, Star } from "lucide-react";
import { Link } from "react-router-dom";
import PremiumProductImage from "../assets/Premium-Product.png";
import CorbominImage from "../assets/Corbomin.png";

const productCategories = [

  // LEFT TOP CIRCLE
  {
    label: ["Beneficial", "Element", "Fertilizer"],
    className: "left-[0px] top-[220px]",
    routeCategory: "Beneficial Element Fertilizer",
  },

  // RIGHT TOP CIRCLE
  {
    label: ["Biofertilizers"],
    className: "right-[0px] top-[220px]",
    routeCategory: "Biofertilizer",
  },

  // LOWER LEFT
  {
    label: ["Straight", "Micronutrient"],
    className: "left-[85px] top-[380px]",
    routeCategory: "Straight Micronutrient",
  },

  // LOWER RIGHT
  {
    label: ["Organic", "Biofertilizers"],
    className: "right-[85px] top-[380px]",
    routeCategory: "Organic Biofertilizer",
  },

  // BOTTOM CENTER
  {
    label: ["Liquid", "Fertilizer"],
    className: "left-1/2 top-[450px] -translate-x-1/2",
    routeCategory: "Liquid Fertilizer",
  },
];

const premiumCards = Array.from({ length: 3 }, (_, index) => ({
  id: index,
  title: "CORBOMIN Organic Fertilizer",
  subtitle: "Liquid Fermented Formula",
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
            Our Premium Product
            <br />
            Range
          </h2>

          <p className="mt-4 text-[17px] leading-[1.45] text-[#1f1f1f] sm:mt-5 sm:text-[20px] sm:leading-[1.25] md:mt-6 md:text-[24px] md:leading-[1.08]">
            Trusted microbiological & nutrient solutions designed for modern agriculture.
          </p>

          <Link
            to="/product?category=All"
            className="mt-7 inline-flex min-h-[50px] w-full max-w-[280px] items-center justify-center rounded-full bg-[#7b4a33] px-6 text-[16px] font-medium text-white shadow-[0_8px_18px_rgba(123,74,51,0.28)] sm:max-w-fit sm:min-w-[256px] sm:px-10 sm:text-[20px]"
          >
            Explore Our Products
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
              alt="Premium product range"
              className="h-full w-full object-cover"
            />
          </div>

          {/* CATEGORY CIRCLES */}
          {productCategories.map((item, index) => (
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
                className="flex h-[153.31px] w-[153.31px] items-center justify-center rounded-full bg-[#c7eec5] px-3 text-center text-[14px] font-normal leading-[1.1] text-black transition-transform duration-300 hover:scale-[1.03]"
              >
                <div className="flex max-w-[92px] flex-col items-center justify-center">
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
            alt="Premium product range"
            className="h-[220px] w-[220px] rounded-full border-4 border-white/70 object-cover shadow-[0_18px_36px_rgba(74,46,32,0.12)] sm:h-[240px] sm:w-[240px]"
          />

          <div className="grid w-full grid-cols-2 justify-items-center gap-4 sm:gap-5">
            {productCategories.map((item, index) => (
              <Link
                key={item.label.join("-")}
                to={`/product?category=${encodeURIComponent(item.routeCategory)}`}
                className={`flex h-[148px] w-[148px] items-center justify-center rounded-full border border-white/60 bg-[linear-gradient(135deg,#d4f3c8_0%,#c0ecbc_100%)] px-4 text-center text-[15px] font-medium leading-[1.2] text-[#1d241d] shadow-[0_14px_30px_rgba(115,165,99,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(115,165,99,0.22)] ${
                  index === productCategories.length - 1 ? "col-span-2" : ""
                }`}
              >
                <div className="flex max-w-[9ch] flex-col items-center justify-center">
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
      <div className="mx-auto mt-12 grid max-w-7xl gap-6 md:mt-14 md:grid-cols-2 md:gap-8 xl:grid-cols-3">

        {premiumCards.map((card, index) => (
          <motion.article
            key={card.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.08,
            }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative overflow-hidden rounded-[24px] bg-[#fff3eb] p-4 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] hover:-translate-y-2 hover:bg-white hover:shadow-[0_24px_50px_-24px_rgba(107,65,46,0.18)] sm:rounded-[30px] sm:p-5">

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.82),transparent_35%),radial-gradient(circle_at_80%_100%,rgba(123,74,51,0.10),transparent_30%)]" />

              <div className="relative rounded-[18px] border-[3px] border-[#d5d8d9] bg-[#fffdfa] shadow-[inset_0_0_28px_rgba(0,0,0,0.06)]">

                <span className="absolute left-3 top-3 z-10 inline-flex rounded-full bg-[#0b9d42] px-4 py-1 text-xs font-medium text-white sm:px-5 sm:text-sm">
                  New
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

                  <span>({card.reviews} reviews)</span>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  {card.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs text-white ${tagStyles[tag]}`}
                    >
                      <Leaf className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-4 inline-flex items-start gap-3 rounded-[12px] border border-[#f0e4da] bg-[#fff8f3] px-3 py-2 shadow-sm">

                  <div className="rounded-[10px] border border-[#eadbd0] bg-[#fffdf9] p-2">
                    <CalendarDays className="h-4 w-4 text-[#7b4a33]" />
                  </div>

                  <div>
                    <p className="text-[11px] leading-none text-[#8f8f8f]">
                      Application Stage
                    </p>

                    <p className="mt-1 text-[16px] leading-none text-[#444444]">
                      All Stages
                    </p>
                  </div>
                </div>

                <Link
                  to="/product?category=All"
                  className="mt-5 inline-flex h-[46px] w-full items-center justify-center gap-2 rounded-full bg-[#7b4a33] text-[16px] font-medium text-white shadow-[0_10px_18px_rgba(123,74,51,0.28)] transition-all duration-300 group-hover:bg-[#6b412e] sm:text-[18px]"
                >
                  <span>View Details</span>

                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

              </div>
            </div>
          </motion.article>
        ))}

      </div>
    </section>
  );
}
