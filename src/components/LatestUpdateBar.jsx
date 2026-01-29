import { useEffect, useState } from "react";
import { fetchLatestUpdate } from "../lib/latestUpdates";

export function LatestUpdateBar() {
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    fetchLatestUpdate().then(setUpdate);
  }, []);

  if (!update) return null;

  return (
    <section className="relative overflow-hidden bg-white text-black">
      
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Scrolling content */}
      <div
        className="relative flex items-center gap-6 px-6 py-3 whitespace-nowrap
                   animate-marquee hover:[animation-play-state:paused]"
      >
        {/* Message */}
        <span className="text-sm md:text-base font-medium tracking-wide text-black/95">
          {update.message}
        </span>

        {/* CTA */}
        {update.action_text && update.action_link && (
          <a
            href={update.action_link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-full
                       bg-[#F4ECE6] text-[#7A3E2E]
                       px-4 py-1.5 text-sm font-semibold
                       shadow-md hover:bg-white hover:scale-105
                       transition-all duration-300"
          >
            {update.action_text} →
          </a>
        )}
      </div>

      {/* Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 14s linear infinite;
        }
      `}</style>
    </section>
  );
}
