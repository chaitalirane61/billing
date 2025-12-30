

// "use client";

// import React from "react";
// import { motion, Variants } from "framer-motion";

// import { Feature } from "@/app/types/features";
// import mockData from "../lib/data/ShopcareContent.json";

// import {
//   Users,
//   Database,
//   MessageSquare,
//   Shield,
//   TrendingUp,
//   Mail,
//   ShoppingCart,
//   BarChart2,
//   FileText,
//   RefreshCw,
//   DollarSign,
//   LucideIcon,
// } from "lucide-react";

// // Icon Mapping
// const IconMap: Record<string, LucideIcon> = {
//   Users,
//   Database,
//   MessageSquare,
//   Shield,
//   TrendingUp,
//   Mail,
//   ShoppingCart,
//   BarChart2,
//   FileText,
//   RefreshCw,
//   DollarSign,
// };

// // Gradient Palette
// const gradientPalette = [
//   "from-blue-500 to-cyan-400",
//   "from-purple-500 to-pink-400",
//   "from-orange-500 to-red-400",
// ];

// // Container animation variants
// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
// };

// // Card animation variants
// const cardVariants: Variants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
// };

// // Card Component
// const Card = ({
//   icon: Icon,
//   title,
//   description,
//   gradient,
//   className = "",
// }: {
//   icon: LucideIcon;
//   title: string;
//   description: string;
//   gradient: string;
//   className?: string;
// }) => (
//   <motion.div
//     variants={cardVariants}
//     whileHover={{ y: -5 }}
//     className={`bg-white rounded-3xl shadow-xl border border-slate-100 p-4 flex flex-col h-full ${className}`}
//   >
//     <div
//       className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${gradient} mb-4`}
//     >
//       <Icon className="w-7 h-7 text-white" />
//     </div>

//     <h3 className="text-2xl font-bold text-slate-800 mb-3 line-clamp-1">
//       {title}
//     </h3>

//     <p className="text-base text-slate-600 flex-grow leading-relaxed line-clamp-4">
//       {description}
//     </p>
//   </motion.div>
// );

// // Main Component
// export default function SpecialFeatures() {
//   // Get features from JSON and filter by "special" category
//   // const allFeatures: Feature[] = mockData.features;
//   const allFeatures = mockData.features as Feature[];
//   const specialFeatures = allFeatures.filter((f) => f.category === "special");

//   return (
//     <section className="py-12 lg:py-16 px-6 bg-white relative">
//       <div className="max-w-7xl mx-auto">
//         {/* Header */}
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
//               Special Features
//             </span>
//           </h2>
//           <p className="text-lg text-slate-600">
//             Advanced capabilities that set us apart from the competition.
//           </p>
//         </motion.div>

//         {/* Features Grid */}
//         <motion.div
//           className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
//           variants={containerVariants}
//           initial="hidden"
//           whileInView="visible"
//           viewport={{ once: true, amount: 0.3 }}
//         >
//           {specialFeatures.map((feature, index) => {
//             const IconComponent =
//               feature.icon && IconMap[feature.icon] ? IconMap[feature.icon] : Users;
//             const gradient = gradientPalette[index % gradientPalette.length];

//             return (
//               <Card
//                 key={feature.title}
//                 icon={IconComponent}
//                 title={feature.title}
//                 description={feature.description}
//                 gradient={gradient}
//                 className="h-full"
//               />
//             );
//           })}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
"use client";

import React, { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

import { Feature } from "@/app/types/features";

import {
  Users,
  Database,
  MessageSquare,
  Shield,
  TrendingUp,
  Mail,
  ShoppingCart,
  BarChart2,
  FileText,
  RefreshCw,
  DollarSign,
  LucideIcon,
} from "lucide-react";

// Icon Mapping
const IconMap: Record<string, LucideIcon> = {
  Users,
  Database,
  MessageSquare,
  Shield,
  TrendingUp,
  Mail,
  ShoppingCart,
  BarChart2,
  FileText,
  RefreshCw,
  DollarSign,
};

// Gradient Palette
const gradientPalette = [
  "from-blue-500 to-cyan-400",
  "from-purple-500 to-pink-400",
  "from-orange-500 to-red-400",
];

// Container animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

// Card animation variants
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" } },
};

// Card Component
const Card = ({
  icon: Icon,
  title,
  description,
  gradient,
  className = "",
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  className?: string;
}) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -5 }}
    className={`bg-white rounded-3xl shadow-xl border border-slate-100 p-4 flex flex-col h-full ${className}`}
  >
    <div
      className={`w-14 h-14 flex items-center justify-center rounded-xl bg-gradient-to-br ${gradient} mb-4`}
    >
      <Icon className="w-7 h-7 text-white" />
    </div>

    <h3 className="text-2xl font-bold text-slate-800 mb-3 line-clamp-1">
      {title}
    </h3>

    <p className="text-base text-slate-600 flex-grow leading-relaxed line-clamp-4">
      {description}
    </p>
  </motion.div>
);

// Main Component
export default function SpecialFeatures() {
  const [features, setFeatures] = useState<Feature[]>([]);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const res = await fetch("/ShopcareContent.json");
        const data = await res.json();
        const allFeatures = data.features as Feature[];
        const specialFeatures = allFeatures.filter((f) => f.category === "special");
        setFeatures(specialFeatures);
      } catch (err) {
        console.error("Error fetching features:", err);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <section className="py-12 lg:py-16 px-6 bg-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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
              Special Features
            </span>
          </h2>
          <p className="text-lg text-slate-600">
            Advanced capabilities that set us apart from the competition.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {features.map((feature, index) => {
            const IconComponent =
              feature.icon && IconMap[feature.icon] ? IconMap[feature.icon] : Users;
            const gradient = gradientPalette[index % gradientPalette.length];

            return (
              <Card
                key={feature.title}
                icon={IconComponent}
                title={feature.title}
                description={feature.description}
                gradient={gradient}
                className="h-full"
              />
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
