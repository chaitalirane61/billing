// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import { LucideIcon } from "lucide-react";

// interface CardProps {
//   icon?: LucideIcon;      // optional
//   title?: string;         // optional
//   description?: string;   // optional
//   gradient?: string;      // optional
//   delay?: number;
//   hoverRotate?: boolean;
//   children?: React.ReactNode; // new: custom content
// }

// export default function Card({
//   icon: Icon,
//   title,
//   description,
//   gradient = "from-blue-500 to-cyan-400",
//   delay = 0,
//   hoverRotate = false,
//   children,
// }: CardProps) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       transition={{ delay }}
//       whileHover={{ y: -10, scale: 1.02 }}
//       className="group relative"
//     >
//       <div className="h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden">

//         {/* Icon */}
//         {Icon && (
//           <motion.div
//             whileHover={hoverRotate ? { rotate: 360 } : {}}
//             transition={{ duration: hoverRotate ? 0.6 : 0 }}
//             className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl mb-6 shadow-lg`}
//           >
//             <Icon className="w-7 h-7 text-white" />
//           </motion.div>
//         )}

//         {/* Title */}
//         {title && <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>}

//         {/* Description */}
//         {description && <p className="text-slate-600">{description}</p>}

//         {/* Custom content */}
//         {children}

//         {/* Hover Glow */}
//         <div
//           className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
//         />
//       </div>
//     </motion.div>
//   );
// }

"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface CardProps {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  gradient?: string;
  delay?: number;
  hoverRotate?: boolean;
  children?: React.ReactNode;
}

export default function Card({
  icon: Icon,
  title,
  description,
  gradient = "from-blue-500 to-cyan-400",
  delay = 0,
  hoverRotate = false,
  children,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      whileHover={{ y: -10, scale: 1.02 }}
      className="group relative h-full" // ✅ FIX: Ensures full equal height
    >
      <div className="h-full bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 relative overflow-hidden flex flex-col">
        {/* Icon */}
        {Icon && (
          <motion.div
            whileHover={hoverRotate ? { rotate: 360 } : {}}
            transition={{ duration: hoverRotate ? 0.6 : 0 }}
            className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${gradient} rounded-xl mb-6 shadow-lg`}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>
        )}

        {/* Title */}
        {title && (
          <h3 className="text-xl font-bold text-slate-800 mb-3">{title}</h3>
        )}

        {/* Description */}
        {description && <p className="text-slate-600 mb-4">{description}</p>}

        {/* Custom content */}
        <div className="mt-auto">{children}</div>

        {/* Hover Glow */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}
        />
      </div>
    </motion.div>
  );
}
