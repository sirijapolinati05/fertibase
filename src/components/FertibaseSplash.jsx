import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LOGOS } from "../config/images";

const LETTER_DELAY = 0.08;
const BOX_DURATION = 0.15;
const HOLD_DELAY = 2.0;
const SPLASH_FADE_OUT = 0.6;
const SHINE_DELAY = 1.2;

const FertibaseSplash = ({ onComplete, className = "" }) => {
  const [isFinished, setIsFinished] = useState(false);
  const [showShine, setShowShine] = useState(false);

  const totalTypingTime =
    "FERTI".length * LETTER_DELAY + "BASE".length * LETTER_DELAY + HOLD_DELAY;

  useEffect(() => {
    const shineTimer = setTimeout(
      () => setShowShine(true),
      (totalTypingTime - SHINE_DELAY) * 1000
    );
    const finishTimer = setTimeout(
      () => setIsFinished(true),
      totalTypingTime * 1000
    );
    return () => {
      clearTimeout(shineTimer);
      clearTimeout(finishTimer);
    };
  }, [totalTypingTime]);

  useEffect(() => {
    if (isFinished && onComplete) {
      const timer = setTimeout(onComplete, SPLASH_FADE_OUT * 1000);
      return () => clearTimeout(timer);
    }
  }, [isFinished, onComplete]);

  return (
    <motion.div
      className={`fixed inset-0 flex items-center justify-center ${className}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isFinished ? 0 : 1 }}
      transition={{ duration: SPLASH_FADE_OUT, ease: "easeOut" }}
      style={{
        pointerEvents: isFinished ? "none" : "auto",
        backgroundColor: "#f7f7f7",
      }}
    >
      <div className="
        relative flex flex-col sm:flex-row
        items-center gap-4 sm:gap-6
        px-6 overflow-hidden
      ">
        {/* LOGO */}
        <motion.img
          src={LOGOS.splash}
          alt="Fertibase Logo"
          className="
            w-20 h-20
            sm:w-24 sm:h-24
            md:w-32 md:h-32
            object-contain
            z-10
          "
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        />

        {/* TEXT */}
        <div className="relative text-center leading-none">
          <Typewriter text="FERTI" color="text-green-600" />
          <div className="h-1" />
          <Typewriter
            text="BASE"
            color="text-[#6B412E]"
            delayOffset={"FERTI".length * LETTER_DELAY}
          />

          {/* SHINE */}
          {showShine && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              <div
                className="h-full w-full"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4) 50%, transparent)",
                  transform: "skewX(-20deg)",
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

// RESPONSIVE TYPEWRITER
const Typewriter = ({ text, color, delayOffset = 0 }) => {
  return (
    <div className="inline-block">
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className={`
            relative inline-block font-bold tracking-tight ${color}
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
          `}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{
            delay: delayOffset + HOLD_DELAY,
            duration: SPLASH_FADE_OUT,
            ease: "easeInOut",
          }}
        >
          {/* Letter */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: delayOffset + i * LETTER_DELAY,
              duration: 0,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>

          {/* Reveal box */}
          <motion.span
            className="absolute inset-0 bg-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              delay: delayOffset + i * LETTER_DELAY,
              times: [0, 0.1, 1],
              duration: BOX_DURATION,
              ease: "easeInOut",
            }}
          />
        </motion.span>
      ))}
    </div>
  );
};

export default FertibaseSplash;
