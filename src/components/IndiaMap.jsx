import { motion } from "framer-motion";
import { Globe, MapPin, Users } from "lucide-react";
import indiaMapImage from "../assets/indiamap2.png";

export default function IndiaMap() {
  const mapImageSrc = indiaMapImage;

  const presenceStats = [
    { icon: null, value: "5", label: "States" },
    { icon: null, value: "1000+", label: "Dealer Network" },
    { icon: null, value: "50,000+", label: "Farmer Network" },
  ];

  const rightStats = [
    { label: "States Covered", value: "5+", icon: MapPin },
    { label: "Active Dealers", value: "750+", icon: Users },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Impact Section */}
          <div>
            <span className="inline-block bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-sm font-semibold mb-4">
              Impact
            </span>
            <h3 className="text-4xl md:text-5xl font-extrabold text-[#741A1C] mb-6">
              Making a Difference in Agriculture
            </h3>
            <p className="text-lg text-text-light mb-8 max-w-xl">
              Years of innovation and dedication have resulted in significant achievements across the agricultural sector.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">

              {presenceStats.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="bg-soil-light rounded-xl p-4 shadow-sm border border-primary-100"

                >
                  <p className="text-2xl font-bold text-primary-700 mb-1">{s.value}</p>
                  <p className="text-sm  font-extrabold text-text-light leading-tight">{s.label}</p>
<div className="h-1.5 bg-primary-100 rounded-full mt-2">

                    <div className="h-2 bg-primary-500 rounded-full w-3/4"></div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-[#741A1C] rounded-full  text-white text-sm border border-primary-100">FCO Approved</span>
              <span className="px-4 py-2 bg-[#741A1C] rounded-full text-white text-sm border border-primary-100">CIB Approved</span>
            </div>
          </div>

          {/* Right: Green Map Card with Presence Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 rounded-3xl shadow-2xl p-6 md:p-10 relative overflow-hidden h-full flex flex-col"
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

        
             

              {/* Map Image */}
               <img
                    src={mapImageSrc}
                    alt="India Map showing our presence across states"
                    className="w-full h-full object-cover"
                    onError={(e) => console.error("Failed to load map image")} style={{height:550}}
                  />
                

          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}



