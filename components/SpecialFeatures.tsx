"use client";

import React, { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Blob {
  top: string;
  left: string;
  size: number;
  rotate: number;
  duration: number;
}

// Features data
const features: Feature[] = [
  { icon: "📊", title: "Smart GST Billing", description: "Automated GST billing for all transactions." },
  { icon: "📦", title: "Inventory Management", description: "Track stock across multiple locations in real-time." },
  { icon: "🔍", title: "Barcode / QR Support", description: "Scan products instantly using barcode or QR codes." },
  { icon: "👥", title: "Customer Tracking", description: "Monitor customer purchases and loyalty points." },
  { icon: "⚡", title: "Fast Billing Interface", description: "Lightning-fast interface to reduce billing time." },
  { icon: "💳", title: "Multiple Payment Methods", description: "Accept cash, card, UPI, or wallet payments seamlessly." },
];

export default function SpecialFeatures() {
  const [blobs, setBlobs] = useState<Blob[]>([]);

  // Generate blobs only on the client after mount
  useEffect(() => {
    const id = setTimeout(() => {
      const generated = Array.from({ length: 6 }).map(() => ({
        top: `${Math.random() * 70 + 15}%`,
        left: `${Math.random() * 70 + 15}%`,
        size: Math.random() * 180 + 120,
        rotate: Math.random() * 360,
        duration: 18 + Math.random() * 8,
      }));
      setBlobs(generated);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  // Card animation variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 250, damping: 20 } },
    hover: {
      scale: 1.05,
      boxShadow: "0 20px 40px rgba(50, 50, 50, 0.3), 0 0 30px rgba(100, 100, 100, 0.2)",
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const iconVariants: Variants = {
    float: {
      y: [0, -10, 0],
      transition: { duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" },
    },
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 overflow-hidden py-16 px-4 sm:px-6 lg:px-16">

      {/* Floating Grey Blobs */}
      {blobs.map((blob, i) => (
        <motion.div
          key={i}
          animate={{ y: [0, -40, 0], x: [0, 30, 0], rotate: [blob.rotate, blob.rotate + 50, blob.rotate] }}
          transition={{ duration: blob.duration, repeat: Infinity, ease: "easeInOut" }}
          className="absolute rounded-full bg-gradient-to-br from-gray-300/40 via-gray-400/30 to-gray-500/20 blur-3xl pointer-events-none"
          style={{ top: blob.top, left: blob.left, width: blob.size, height: blob.size }}
        />
      ))}

      {/* Header */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold mb-4 bg-clip-text text-transparent
                       bg-gradient-to-r from-gray-600 via-gray-500 to-gray-700 whitespace-nowrap">
          K-Bazzar Billing Software
        </h1>
        <p className="text-gray-700 text-lg sm:text-xl">
          Explore the powerful tools that make K-Bazzar the ultimate solution for grocery business management.
        </p>
      </div>

      {/* Features Grid */}
      <motion.div
        className="relative z-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            variants={cardVariants}
            whileHover="hover"
            className="relative p-6 rounded-2xl backdrop-blur-md bg-white/20 border border-white/20 flex flex-col items-center text-center cursor-pointer transition-all"
          >
            <motion.div className="text-6xl mb-4 text-gray-700" variants={iconVariants} animate="float">
              {feature.icon}
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-sm sm:text-base text-gray-700">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
