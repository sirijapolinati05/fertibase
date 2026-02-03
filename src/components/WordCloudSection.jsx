import { SectionWrapper } from "./SectionWrapper";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Leaf,
  Sprout,
  Droplet,
  FlaskConical,
  ShieldCheck,
} from "lucide-react";

/* ---------------- CONFIG ---------------- */

const HUB_RADIUS = 62;
const NODE_RADIUS = 36;
const RADIAL_DISTANCE = 180;

const categories = [
  {
    key: "biofertilizer",
    label: "Biofertilizer",
    icon: Leaf,
    gradient: ["#2E7D32", "#66BB6A"],
    angle: -90,
  },
  {
    key: "organic-biofertilizer",
    label: "Organic Biofertilizer",
    icon: Sprout,
    gradient: ["#558B2F", "#AED581"],
    angle: -18,
  },
  {
    key: "liquid-fertilizer",
    label: "Liquid Fertilizer",
    icon: Droplet,
    gradient: ["#1565C0", "#64B5F6"],
    angle: 54,
  },
  {
    key: "straight-micronutrient",
    label: "Straight Micronutrient",
    icon: FlaskConical,
    gradient: ["#EF6C00", "#FFB74D"],
    angle: 126,
  },
  {
    key: "beneficial-element",
    label: "Beneficial Element Fertilizer",
    icon: ShieldCheck,
    gradient: ["#6A1B9A", "#CE93D8"],
    angle: 198,
  },
];

/* ---------------- UTILS ---------------- */

const polarToCartesian = (cx, cy, r, angle) => {
  const rad = (angle * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
};

/* ---------------- COMPONENT ---------------- */

export default function WordCloudSection() {
  const navigate = useNavigate();
  const size = 520;
  const center = size / 2;

  return (
    <SectionWrapper id="products" className="py-10 md:py-14">
      <div className="flex flex-col md:flex-row items-start gap-10">

        {/* -------- LEFT : RADIAL DIAGRAM -------- */}
        <div className="w-full md:w-1/2 flex justify-center">
          <svg
            viewBox={`0 0 ${size} ${size}`}
            className="w-full max-w-[420px] h-auto"
          >
            {/* DEFINITIONS */}
            <defs>
              <radialGradient id="hubGradient">
                <stop offset="0%" stopColor="#C62828" />
                <stop offset="100%" stopColor="#6B412E" />
              </radialGradient>

              {categories.map((cat) => (
                <linearGradient
                  key={cat.key}
                  id={`grad-${cat.key}`}
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor={cat.gradient[0]} />
                  <stop offset="100%" stopColor={cat.gradient[1]} />
                </linearGradient>
              ))}
            </defs>

            {/* -------- CONNECTORS -------- */}
            {/* CONNECTORS (ALL EXCEPT BIOFERTILIZER) */}
{categories
  .filter((cat) => cat.key !== "biofertilizer")
  .map((cat) => {
    const start = polarToCartesian(
      center,
      center,
      HUB_RADIUS + 20,
      cat.angle
    );

    const end = polarToCartesian(
      center,
      center,
      RADIAL_DISTANCE - NODE_RADIUS,
      cat.angle
    );

    const control = polarToCartesian(
      center,
      center,
      RADIAL_DISTANCE / 1.45,
      cat.angle
    );

    return (
      <path
        key={cat.key}
        d={`M ${start.x} ${start.y} Q ${control.x} ${control.y} ${end.x} ${end.y}`}
        stroke={`url(#grad-${cat.key})`}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    );
  })}

            {/* -------- CENTER HUB -------- */}
            <circle
              cx={center}
              cy={center}
              r={HUB_RADIUS}
              fill="url(#hubGradient)"
              className="drop-shadow-xl"
            />
            <ellipse
              cx={center}
              cy={center + 16}
              rx="18"
              ry="6"
              fill="#5D4037"
            />
            <foreignObject
              x={center - 18}
              y={center - 28}
              width={36}
              height={36}
            >
              <Sprout size={36} color="#E8F5E9" />
            </foreignObject>

            {/* BIOFERTILIZER CONNECTOR (DRAWN ON TOP OF HUB) */}
{(() => {
  const start = polarToCartesian(
    center,
    center,
    HUB_RADIUS + 2,   // just outside hub
    -90
  );

  const end = polarToCartesian(
    center,
    center,
    RADIAL_DISTANCE - NODE_RADIUS,
    -90
  );

  return (
    <line
      x1={start.x}
      y1={start.y}
      x2={end.x}
      y2={end.y}
      stroke="url(#grad-biofertilizer)"
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
})()}

            {/* -------- NODES -------- */}
            {categories.map((cat) => {
              const { x, y } = polarToCartesian(
                center,
                center,
                RADIAL_DISTANCE,
                cat.angle
              );
              const Icon = cat.icon;

              return (
                <g key={cat.key}>
                  <circle
                    cx={x}
                    cy={y}
                    r={NODE_RADIUS}
                    fill="white"
                    stroke={`url(#grad-${cat.key})`}
                    strokeWidth="3"
                  />

                  <foreignObject x={x - 14} y={y - 14} width={28} height={28}>
                    <Icon size={28} color={cat.gradient[0]} />
                  </foreignObject>

                  {/* ✅ Biofertilizer button on RIGHT, others BELOW */}
                  {cat.key === "biofertilizer" ? (
                    <foreignObject
                      x={x + NODE_RADIUS + 14}
                      y={y - 20}
                      width={160}
                      height={40}
                    >
                      <button
                        onClick={() =>
                          navigate(`/products?category=${cat.key}`)
                        }
                        className="
                          w-full h-10 rounded-full text-sm font-semibold text-white
                          shadow-md transition-all duration-300
                          hover:-translate-y-1 hover:shadow-xl
                        "
                        style={{
                          background: `linear-gradient(135deg, ${cat.gradient[0]}, ${cat.gradient[1]})`,
                        }}
                      >
                        {cat.label}
                      </button>
                    </foreignObject>
                  ) : (
                    <foreignObject
                      x={x - 90}
                      y={y + NODE_RADIUS + 12}
                      width={180}
                      height={40}
                    >
                      <button
                        onClick={() =>
                          navigate(`/products?category=${cat.key}`)
                        }
                        className="
                          w-full h-10 rounded-full text-sm font-semibold text-white
                          shadow-md transition-all duration-300
                          hover:-translate-y-1 hover:shadow-xl
                        "
                        style={{
                          background: `linear-gradient(135deg, ${cat.gradient[0]}, ${cat.gradient[1]})`,
                        }}
                      >
                        {cat.label}
                      </button>
                    </foreignObject>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* -------- RIGHT : TEXT -------- */}
        <div className="w-full md:w-1/2 text-center md:text-left pt-6 md:pt-16">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-[#6B412E]">
            Our <span>Premium Product</span> Range
          </h1>

          <p className="text-lg md:text-xl text-primary-700 font-medium">
            Trusted microbiological & nutrient solutions designed for modern
            agriculture.
          </p>
          <motion.button
  whileHover={{ scale: 1.07 }}
  whileTap={{ scale: 0.96 }}
  onClick={() => navigate("/product")}
  className="block w-fit mx-auto mt-10 px-8 py-4 align-left
             bg-[#6B412E] text-white font-semibold rounded-full
             shadow-lg hover:shadow-[0_20px_40px_-10px_rgba(107,65,46,0.6)]
             transition-all duration-300"
>
  Explore Our Products
</motion.button>
        </div>
      </div>
    </SectionWrapper>
  );
}
