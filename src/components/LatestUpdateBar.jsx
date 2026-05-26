import { useEffect, useState } from "react";
import { fetchLatestUpdate } from "../lib/latestUpdates";
import { useTranslation } from "../i18n/useTranslation";

export function LatestUpdateBar() {
  const [updates, setUpdates] = useState([]);
  const { t, td } = useTranslation();

  useEffect(() => {
    fetchLatestUpdate().then((data) => {
      if (!data) {
        setUpdates([]);
        return;
      }

      setUpdates(Array.isArray(data) ? data : [data]);
    });
  }, []);

  const normalizedUpdates =
    updates.length > 0
      ? updates
      : [
          {
            title: "",
            message: t(
              "website_releasing_soon",
              "This website is releasing soon."
            ),
          },
        ];

  return (
    <section
      className="
        relative z-40
        border-y border-[#cba995]/70
        bg-[#fffaf6]
        shadow-[0_-1px_0_rgba(122,74,51,0.08),0_10px_24px_rgba(122,74,51,0.06)]
      "
    >
      <div className="flex w-full flex-col sm:flex-row">
        <div
          className="
            flex h-[58px] shrink-0 items-center justify-center
            border-b border-[#d9c0b3]
            bg-[#fff2e8]
            px-5
            sm:min-w-[240px]
            sm:border-b-0
            sm:border-r
          "
        >
          <span className="text-[13px] font-extrabold uppercase tracking-[0.14em] text-[#8f2f22]">
            {t("latest_update", "Latest Update")}
          </span>
        </div>

        <div className="relative flex h-[58px] flex-1 items-center overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-r from-[#fffaf6] to-transparent" />
          <div className="absolute right-0 top-0 bottom-0 z-10 w-10 bg-gradient-to-l from-[#fffaf6] to-transparent" />

          <div
            className="
              inline-flex
              items-center
              whitespace-nowrap
              animate-[latestTicker_14s_linear_infinite]
            "
          >
            {normalizedUpdates.map((update, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 px-8 text-[#34231b]"
              >
                {update.action_link ? (
                  <a
                    href={update.action_link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 hover:text-[#8f2f22]"
                  >
                    {update.title && (
                      <span
                        className="
                          rounded-full
                          border border-[#d6b8aa]
                          bg-[#fff3eb]
                          px-3 py-1
                          text-[11px]
                          font-bold
                          uppercase
                          leading-none
                          text-[#8b3a2a]
                        "
                      >
                        {td(
                          "latest_update",
                          update.id || idx,
                          "title",
                          update.title
                        )}
                      </span>
                    )}

                    <span className="text-sm font-medium sm:text-[15px]">
                      {td(
                        "latest_update",
                        update.id || idx,
                        "message",
                        update.message
                      )}
                    </span>
                  </a>
                ) : (
                  <>
                    {update.title && (
                      <span
                        className="
                          rounded-full
                          border border-[#d6b8aa]
                          bg-[#fff3eb]
                          px-3 py-1
                          text-[11px]
                          font-bold
                          uppercase
                          leading-none
                          text-[#8b3a2a]
                        "
                      >
                        {td(
                          "latest_update",
                          update.id || idx,
                          "title",
                          update.title
                        )}
                      </span>
                    )}

                    <span className="text-sm font-medium sm:text-[15px]">
                      {td(
                        "latest_update",
                        update.id || idx,
                        "message",
                        update.message
                      )}
                    </span>
                  </>
                )}

                {update.action_text && update.action_link && (
                  <a
                    href={update.action_link}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      rounded-full
                      bg-[#7b4a33]
                      px-4
                      py-1.5
                      text-xs
                      font-semibold
                      text-white
                      hover:bg-[#643926]
                    "
                  >
                    {td(
                      "latest_update",
                      update.id || idx,
                      "action_text",
                      update.action_text
                    )}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes latestTicker {
          from {
            transform: translateX(100vw);
          }

          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </section>
  );
}
