// src/components/SectionWrapper.jsx
export function SectionWrapper({ children, id }) {
  return (
    <section
      id={id}
      className="relative py-20 md:py-24 bg-soil-light overflow-hidden"
    >
      {/* Optional overlay for soft effect */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]"></div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
