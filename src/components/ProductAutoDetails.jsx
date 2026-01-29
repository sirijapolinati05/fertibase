// import React, { useState } from "react";
// import { useParams, Link, useLocation } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import { PRODUCTS_DATA } from "../data/productsData";

// export default function ProductAutoDetails() {
//   const { slug } = useParams();

//   // Convert slug → Product Name
//   const name = slug
//     .replace(/-/g, " ")
//     .replace(/\b\w/g, (l) => l.toUpperCase());

//   const key = name.toUpperCase();
//   const info = PRODUCTS_DATA[key];

//   // Image from Product grid
//   const location = useLocation();
//   const image = location.state?.image || null;
//   const displayName = location.state?.displayName || name;

//   const [showImageDetails, setShowImageDetails] = useState(false);

//   /* =========================
//      SAFETY: PRODUCT NOT FOUND
//   ========================= */
//   if (!info) {
//     return (
//       <div className="min-h-screen bg-soil-light flex items-center justify-center">
//         <div className="bg-white p-8 rounded-xl shadow-md text-center">
//           <h2 className="text-2xl font-bold mb-3">Product Details Coming Soon</h2>
//           <p className="text-text-light mb-4">
//             Detailed information for <strong>{name}</strong> will be available shortly.
//           </p>
//           <Link
//             to="/product"
//             className="inline-flex items-center gap-2 text-primary-700 font-semibold hover:underline"
//           >
//             <ArrowLeft size={18} /> Back to Products
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-soil-light">
//       <div className="max-w-7xl mx-auto p-6">
//         <Link
//           to="/product"
//           className="inline-flex items-center gap-2 text-primary-700 font-semibold mb-6 hover:underline"
//         >
//           <ArrowLeft size={18} /> Back to Products
//         </Link>

//         <div className="bg-white rounded-2xl p-8 shadow-lg">
//           <div className="flex flex-col md:flex-row gap-10">

//             {/* ================= LEFT CONTENT ================= */}
//             <div className="flex-1">
//               <div className="inline-block px-4 py-1.5 rounded-full bg-primary-100 text-primary-700 text-sm font-bold tracking-wide mb-4">
//                 {info.type}
//               </div>

//               <h1 className="text-4xl font-extrabold mb-4">
//                 {displayName}
//               </h1>

//               <p className="text-lg text-text-light mb-8">
//                 {info.description}
//               </p>

//               {/* Key Advantages */}
//               <h3 className="text-xl font-bold mb-2">Key Advantages</h3>
//               <ul className="list-disc pl-5 text-text-light mb-6">
//                 {info.keyAdvantages.map((item, i) => (
//                   <li key={i}>{item}</li>
//                 ))}
//               </ul>

//               {/* Crop Benefits */}
//               <h3 className="text-xl font-bold mb-2">Crop Benefits</h3>
//               <ul className="list-disc pl-5 text-text-light mb-6">
//                 {info.cropBenefits.map((item, i) => (
//                   <li key={i}>{item}</li>
//                 ))}
//               </ul>

//               {/* Recommended Crops */}
//               <h3 className="text-xl font-bold mb-2">Recommended Crops</h3>
//               <div className="flex flex-wrap gap-2 mb-6">
//                 {info.recommendedCrops.map((crop, i) => (
//                   <span
//                     key={i}
//                     className="px-3 py-1 rounded-full bg-primary-50 text-primary-700 text-sm font-medium"
//                   >
//                     {crop}
//                   </span>
//                 ))}
//               </div>
//               {/* Application Stage */}
//               {/* Application Stage */}
// <div className="mt-6">
//   <h3 className="text-lg font-semibold mb-2">
//     Application Stage
//   </h3>
//   <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-medium text-sm border border-primary-100">
//     🌱 {info.applicationStage}
//   </div>
// </div>
//             </div>

//             {/* ================= RIGHT PANEL ================= */}
//             <div className="w-full md:w-80 flex-shrink-0 flex flex-col">

//               {/* Product Image */}
//               <div
//                 className="bg-gray-50 rounded-md flex items-center justify-center border border-gray-100 overflow-hidden cursor-pointer min-h-[240px]"
//                 role="button"
//                 tabIndex={0}
//                 onClick={() => setShowImageDetails((s) => !s)}
//               >
//                 {image ? (
//                   <img
//                     src={image}
//                     alt={displayName}
//                     className="w-full h-full object-contain"
//                   />
//                 ) : (
//                   <div className="text-sm text-gray-400">Product Image</div>
//                 )}
//               </div>

//               {/* Dosage */}
//               <div className="mt-6 bg-white rounded-lg p-4 border border-primary-100 shadow-sm">
//                 <h4 className="font-bold text-primary-700 mb-2">
//                   Recommended Dosage
//                 </h4>
//                 <ul className="list-disc pl-5 text-text-light">
//                   {info.dosage.map((d, i) => (
//                     <li key={i} className="text-sm">{d}</li>
//                   ))}
//                 </ul>
//               </div>

//               {/* Application Details */}
//               <div className="mt-4 bg-white rounded-lg p-4 border border-primary-100 shadow-sm">
//                 <h4 className="font-bold text-primary-700 mb-2">
//                   Application Details
//                 </h4>
//                 <ul className="list-disc pl-5 text-text-light">
//                   {info.applicationDetails.map((a, i) => (
//                     <li key={i} className="text-sm">{a}</li>
//                   ))}
//                 </ul>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
