export default function Benefits() {
  const stats = [
    { number: '50K+', label: 'Happy Farmers' },
    { number: '35%', label: 'Average Yield Increase' },
    { number: '15+', label: 'Years of Trust' },
    { number: '100%', label: 'Organic Certified' }
  ];

  return (
    <section id="benefits" className="py-20 bg-primary text-soil-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold mb-12">Real Farmers, Real Results</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <h3 className="text-5xl font-bold text-accent">{stat.number}</h3>
              <p className="mt-2 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}