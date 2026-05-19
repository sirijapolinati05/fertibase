import { useEffect, useState } from "react";
import { fetchLatestUpdate } from "../lib/latestUpdates";

export function LatestUpdateBar() {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    fetchLatestUpdate().then((data) => {
      if (!data) {
        setUpdates([]);
        return;
      }

      setUpdates(Array.isArray(data) ? data : [data]);
    });
  }, []);

  const normalizedUpdates = updates.length
    ? updates
    : [
        {
          title: "Latest Update",
          message: "This website is releasing soon.",
        },
      ];

  const marqueeItems =
    normalizedUpdates.length > 1
      ? [...normalizedUpdates, ...normalizedUpdates]
      : [...normalizedUpdates, ...normalizedUpdates, ...normalizedUpdates];

  const animationClass =
    normalizedUpdates.length > 2
      ? "animate-[marquee_22s_linear_infinite]"
      : "animate-[marquee_30s_linear_infinite]";

  return (
    <section className="relative z-40 border-y border-[#cba995]/75 bg-[#fffaf6] shadow-[0_-1px_0_rgba(122,74,51,0.08),0_10px_24px_rgba(122,74,51,0.06)]">
      <div className="mx-auto flex w-full max-w-[100vw] flex-col sm:flex-row sm:items-center">
        <div className="flex shrink-0 items-center justify-center border-b border-[#d9c0b3] bg-[#fff2e8] px-4 py-3 sm:min-w-[260px] sm:border-b-0 sm:border-r sm:px-5">
          <span className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#8f2f22]">
            Latest Update
          </span>
        </div>

        <div className="relative flex-1 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#fffaf6] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#fffaf6] to-transparent" />

          <div className="group overflow-hidden py-3">
            <div
              className={`flex w-max items-center gap-8 whitespace-nowrap px-4 sm:px-6 ${animationClass} group-hover:[animation-play-state:paused]`}
            >
              {marqueeItems.map((update, idx) => {
                const hasLink = !!update.action_link;

                return (
                  <div
                    key={`${update.title || "update"}-${idx}`}
                    className="flex items-center gap-4 text-[#34231b]"
                  >
                    {hasLink ? (
                      <a
                        href={update.action_link}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-4 transition-colors duration-200 hover:text-[#8f2f22] hover:underline"
                      >
                        {update.title && (
                          <span className="cursor-pointer rounded-full border border-[#d6b8aa] bg-[#fff3eb] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8b3a2a]">
                            {update.title}
                          </span>
                        )}

                        <span className="max-w-[72vw] cursor-pointer text-sm font-medium sm:max-w-none sm:text-[15px]">
                          {update.message}
                        </span>
                      </a>
                    ) : (
                      <>
                        {update.title && (
                          <span className="rounded-full border border-[#d6b8aa] bg-[#fff3eb] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#8b3a2a]">
                            {update.title}
                          </span>
                        )}

                        <span className="max-w-[72vw] text-sm font-medium sm:max-w-none sm:text-[15px]">
                          {update.message}
                        </span>
                      </>
                    )}

                    {update.action_text && update.action_link && (
                      <a
                        href={update.action_link}
                        target="_blank"
                        rel="noreferrer"
                        className="rounded-full bg-[#7b4a33] px-4 py-1.5 text-xs font-semibold text-white transition-transform duration-300 hover:scale-105 hover:bg-[#643926]"
                      >
                        {update.action_text}
                      </a>
                    )}

                    <span className="text-[#b78c79]">&bull;</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
}
