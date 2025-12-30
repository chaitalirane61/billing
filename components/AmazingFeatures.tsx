
// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { Feature } from "@/app/types/features";

// // Import Icons
// import {
//   ShoppingCart,
//   FileText,
//   BarChart2,
//   Users,
//   Mail,
//   RefreshCw,
//   Package,
//   ShoppingBag,
//   Shield,
//   Zap,
//   Headphones,
// } from "lucide-react";

// // Import mock JSON directly
// import mockData from "../lib/data/ShopcareContent.json";

// // Icon Mapping
// const IconMap = {
//   ShoppingCart,
//   FileText,
//   BarChart2,
//   Users,
//   Mail,
//   RefreshCw,
//   Package,
//   ShoppingBag,
//   Shield,
//   Zap,
//   Headphones,
// };

// // Gradient palette
// const gradientPalette = [
//   "linear-gradient(135deg, #6D5DFB 0%, #928BFF 100%)",
//   "linear-gradient(135deg, #FF8A00 0%, #FFC000 100%)",
//   "linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)",
//   "linear-gradient(135deg, #FF5F6D 0%, #FFC371 100%)",
// ];

// // Animation Variants
// const cardVariants = {
//   hidden: { opacity: 0, y: 25 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
//     },
//   },
// };

// export default function AmazingFeatures() {
//   // Get features from JSON
//   // const features: Feature[] = mockData.features;
//   const features = mockData.features as Feature[];

//   return (
//     <section className="py-20 bg-gray-50">
//       <div className="max-w-7xl mx-auto px-5">
//         {/* Heading */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.7 }}
//           className="text-center mb-12"
//         >
//           <h2 className="text-4xl lg:text-5xl font-bold mb-3">
//             <span className="text-slate-900">Our </span>
//             <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
//               Amazing Features
//             </span>
//           </h2>

//           <p className="text-lg text-slate-600">
//             Discover the powerful tools that make our platform fast, easy, and
//             enjoyable to use.
//           </p>
//         </motion.div>

//         {/* Feature Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
//           {features.map((feature, index) => {
//             // SAFETY CHECK → avoid missing icon or data
//             if (!feature || !feature.icon) return null;

//             // Safe Icon Mapping
//             const key = feature.icon as keyof typeof IconMap;
//             const IconComponent = IconMap[key] || Zap;

//             const gradient = gradientPalette[index % gradientPalette.length];

//             return (
//               <motion.div
//                 key={index}
//                 variants={cardVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: false, amount: 0.2 }}
//                 className="p-6 rounded-2xl shadow-xl bg-white flex flex-col gap-4"
//               >
//                 {/* ICON */}
//                 <div
//                   className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
//                   style={{ background: gradient }}
//                 >
//                   <IconComponent size={30} />
//                 </div>

//                 {/* TITLE */}
//                 <h3 className="text-xl font-bold text-gray-800">
//                   {feature.title}
//                 </h3>

//                 {/* DESCRIPTION */}
//                 <p className="text-gray-600">{feature.description}</p>
//               </motion.div>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Feature } from "@/app/types/features";

// Import Icons
import {
  ShoppingCart,
  FileText,
  BarChart2,
  Users,
  Mail,
  RefreshCw,
  Package,
  ShoppingBag,
  Shield,
  Zap,
  Headphones,
} from "lucide-react";

// TypeScript interface for data
interface ShopcareContent {
  features: Feature[];
}

// Icon Mapping
const IconMap = {
  ShoppingCart,
  FileText,
  BarChart2,
  Users,
  Mail,
  RefreshCw,
  Package,
  ShoppingBag,
  Shield,
  Zap,
  Headphones,
};

// Gradient palette
const gradientPalette = [
  "linear-gradient(135deg, #6D5DFB 0%, #928BFF 100%)",
  "linear-gradient(135deg, #FF8A00 0%, #FFC000 100%)",
  "linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)",
  "linear-gradient(135deg, #FF5F6D 0%, #FFC371 100%)",
];

// Animation Variants
const cardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number],
    },
  },
};

export default function AmazingFeatures() {
  // State management
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ Fetch features data from public folder
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/ShopcareContent.json');
        
        if (!response.ok) {
          throw new Error('Failed to load features data');
        }
        
        const mockData: ShopcareContent = await response.json();
        setFeatures(mockData.features);
        setError(null);
      } catch (err) {
        console.error('Error loading features data:', err);
        setError('Failed to load features');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading features...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <p className="text-red-600 font-semibold mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // No data state
  if (features.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-gray-600">No features available</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-5">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-slate-900">Our </span>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Amazing Features
            </span>
          </h2>

          <p className="text-lg text-slate-600">
            Discover the powerful tools that make our platform fast, easy, and
            enjoyable to use.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => {
            // SAFETY CHECK → avoid missing icon or data
            if (!feature || !feature.icon) return null;

            // Safe Icon Mapping
            const key = feature.icon as keyof typeof IconMap;
            const IconComponent = IconMap[key] || Zap;

            const gradient = gradientPalette[index % gradientPalette.length];

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.2 }}
                className="p-6 rounded-2xl shadow-xl bg-white flex flex-col gap-4"
              >
                {/* ICON */}
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
                  style={{ background: gradient }}
                >
                  <IconComponent size={30} />
                </div>

                {/* TITLE */}
                <h3 className="text-xl font-bold text-gray-800">
                  {feature.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}