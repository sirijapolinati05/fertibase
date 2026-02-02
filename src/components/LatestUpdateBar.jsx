import { useEffect, useState } from "react";
import { fetchLatestUpdate } from "../lib/latestUpdates";

export function LatestUpdateBar() {
  const [updates, setUpdates] = useState([]);

  const marqueeItems =
  updates.length > 1 ? [...updates, ...updates] : updates;


  useEffect(() => {
  fetchLatestUpdate().then((data) => {
    if (!data) {
      setUpdates([]);
    } else if (Array.isArray(data)) {
      setUpdates(data);
    } else {
      setUpdates([data]);
    }
  });
}, []);


  if (!updates.length) return null;

  return (
    <section className="relative overflow-hidden bg-white text-black border-b">
      {/* Track */}
      <div className="marquee">
        <div
  className={`marquee__content ${
    updates.length > 1 ? "fast" : "slow"
  }`}
>
          {marqueeItems.map((update, idx) => (
            <div key={idx} className="marquee__item">
              {update.title && (
                <span className="title">{update.title}:</span>
              )}

              <span className="message">{update.message}</span>

              {update.action_text && update.action_link && (
                <a
                  href={update.action_link}
                  target="_blank"
                  rel="noreferrer"
                  className="cta"
                >
                  {update.action_text} →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .marquee {
          width: 100%;
          overflow: hidden;
        }

        .marquee__content {
  display: flex;
  width: max-content;
}

.marquee__content.fast {
  animation: marquee 12s linear infinite;
}

.marquee__content.slow {
  animation: marquee 20s linear infinite;
}


        .marquee:hover .marquee__content {
          animation-play-state: paused; /* 🛑 PAUSE ON HOVER */
        }

        .marquee__item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding-right: 4rem; /* SPACE BETWEEN ITEMS */
          white-space: nowrap;
          font-size: 0.95rem;
        }

        .title {
          font-weight: 700;
          color: #741A1C;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .message {
          font-weight: 500;
          color: rgba(0,0,0,0.85);
        }

        .cta {
          background: #f4ece6;
          color: #7a3e2e;
          padding: 0.25rem 0.75rem;
          border-radius: 999px;
          font-weight: 600;
          box-shadow: 0 2px 6px rgba(0,0,0,0.12);
          transition: transform 0.2s ease;
        }

        .cta:hover {
          transform: scale(1.08);
          background: white;
        }

        @keyframes marquee {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-50%);
  }
}
  .animate-marquee {
  animation: marquee 12s linear infinite;
}

.animate-marquee-slow {
  animation: marquee 20s linear infinite;
}
      `}</style>
    </section>
  );
}
