"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

interface Feature {
  icon: string;
  label: string;
}

interface Blob {
  top: string;
  left: string;
  size: number;
  rotate: number;
  duration: number;
}

interface IconItem {
  icon: string;
  top: string;
  left: string;
  size: number;
  rotate: number;
  duration: number;
  delay: number;
}

const features: Feature[] = [
  { icon: "📊", label: "Smart GST Billing" },
  { icon: "📦", label: "Inventory Management" },
  { icon: "🔍", label: "Barcode / QR Support" },
  { icon: "👥", label: "Customer Tracking" },
  { icon: "⚡", label: "Fast Billing Interface" },
];

const iconElements = [
  "💰", "🧾", "🛒", "📦", "🔖", "📊", "💳", "⏰",
  "💵", "📈", "🖩", "📇", "📱", "🧮", "🔄", "📌"
];

export default function HeroSection() {
  /** -------------------------------
   *  FIX: Prevent SSR hydration mismatch
   * ------------------------------- */
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  /** Generate blobs ONLY after mount */
  const blobs = React.useMemo<Blob[]>(() => {
    if (!mounted) return [];
    return Array.from({ length: 6 }).map(() => ({
      top: `${Math.random() * 70 + 10}%`,
      left: `${Math.random() * 70 + 10}%`,
      size: Math.random() * 120 + 100,
      rotate: Math.random() * 360,
      duration: 15 + Math.random() * 10,
    }));
  }, [mounted]);

  /** Generate icons ONLY after mount */
  const icons = React.useMemo<IconItem[]>(() => {
    if (!mounted) return [];
    return Array.from({ length: 15 }).map(() => ({
      icon: iconElements[Math.floor(Math.random() * iconElements.length)],
      top: `${Math.random() * 70 + 10}%`,
      left: `${Math.random() * 70 + 10}%`,
      size: Math.random() * 18 + 12,
      rotate: Math.random() * 360,
      duration: Math.random() * 6 + 4,
      delay: Math.random() * 2,
    }));
  }, [mounted]);

  /** Feature animations */
  const featureVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.1, type: "spring", stiffness: 300 },
    }),
  };

  /** Scroll helper */
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-10"
      style={{ background: "linear-gradient(135deg, #d1d1d1ff, #9bb0d6, #4a7bd5)" }}
    >
      {/* FLOATING BLOBS & ICONS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {blobs.map((blob, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              rotate: [blob.rotate, blob.rotate + 30, blob.rotate],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
            className="absolute rounded-full blur-3xl"
            style={{
              top: blob.top,
              left: blob.left,
              width: blob.size,
              height: blob.size,
              background: "radial-gradient(circle, #e0e0e0, #4a7bd5, #1a3c8b)"
            }}
          />
        ))}

        {icons.map((item, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              rotate: [item.rotate, item.rotate + 25, item.rotate],
              opacity: [0.1, 0.4, 0.1],
              scale: [1, 1.15, 1]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: item.delay
            }}
            className="absolute select-none"
            style={{
              top: item.top,
              left: item.left,
              fontSize: item.size,
              color: "#1a3c8b",
              textShadow: "0 0 3px #fff, 0 0 6px #4a7bd5"
            }}
          >
            {item.icon}
          </motion.div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 flex flex-col md:flex-row h-full items-center justify-center md:justify-between px-4 sm:px-8 lg:px-16 py-8">

        {/* LEFT SIDE CONTENT */}
        <div className="max-w-xl text-center md:text-left space-y-4">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gradient-metallic leading-tight">
            K-Bazzar Billing <br /> Software
          </h1>

          <p className="text-gray-700 text-md">
            Solid solution to solve various problems in your grocery business – ‘Kirana Bazaar’ software!
          </p>

          <p className="text-gray-700 text-md">
            Focus fully on customer service and business growth while this software handles everything smoothly.
          </p>
<div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mt-4">
  {/* WATCH DEMO */}
  <a href="#product-demo"> 
  <motion.button
    onClick={() => scrollToSection("product-demo")}
    whileHover={{ scale: 1.05 }}
    className="
      h-11 px-6 text-base
      sm:h-12 sm:px-7 sm:text-lg
      md:h-12 md:px-8 md:text-lg
      bg-gradient-to-r from-blue-700 to-blue-500
      text-white rounded-lg shadow flex items-center gap-2
    "
  >
    <Play className="w-5 h-5 sm:w-6 sm:h-6" />
    Watch Demo
  </motion.button></a>

  {/* CONTACT BUTTON */}
  <a href="#contact">
    <motion.button
      whileHover={{ scale: 1.05 }}
      className="
        h-11 px-6 text-base
        sm:h-12 sm:px-7 sm:text-lg
        md:h-12 md:px-8 md:text-lg
        bg-gradient-to-r from-blue-700 to-blue-500
        text-white rounded-lg shadow flex items-center gap-2
      "
    >
      Contact Us
      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
    </motion.button>
  </a>
</div>


        </div>

        {/* RIGHT SIDE FLIP CARD */}
        <div className="relative w-full max-w-[300px] sm:max-w-[500px] h-[280px] sm:h-[430px] perspective-1000 group cursor-pointer mt-10 md:mt-16">
          <div className="relative w-full h-full preserve-3d transition-transform duration-700 group-hover:rotate-y-180 group-hover:scale-105">

            {/* FRONT */}
            <div
              className="absolute inset-0 rounded-xl overflow-hidden shadow-xl backface-hidden border border-gray-300"
              style={{ background: "linear-gradient(135deg, #9bb0d6, #9bb0d6, #4a7bd5)" }}
            >
              <Image
                src="https://soulsoft.in/wp-content/uploads/2025/04/Pending-stock-report-1536x1249.png"
                alt="Pending Stock Report"
                fill
                className="object-cover opacity-90"
              />
            </div>

            {/* BACK */}
            <div
              className="absolute inset-0 rotate-y-180 backface-hidden rounded-xl shadow-xl p-4 flex flex-col justify-center border border-gray-400"
              style={{ background: "linear-gradient(135deg, #9bb0d6, #9bb0d6, #4a7bd5)" }}
            >
              <h3 className="text-xl font-bold text-center text-black mb-4 drop-shadow">
                Kirana Bazaar Features
              </h3>

              <motion.div className="grid grid-cols-2 gap-3" initial="hidden" animate="visible">
                {features.map((item, i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={featureVariants}
                    whileHover={{ scale: 1.1 }}
                    className={`flex flex-col items-center bg-white/70 rounded-xl p-3 shadow text-gray-800 font-semibold ${
                      i === 4 ? "col-span-2 mx-auto w-2/3" : ""
                    }`}
                  >
                    <div className="text-2xl">{item.icon}</div>
                    <div className="text-sm">{item.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>

      </div>

      {/* STYLES */}
      <style jsx>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .text-gradient-metallic {
          background: linear-gradient(135deg, #0e0759ff, #4a7bd5, #082975ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
}
