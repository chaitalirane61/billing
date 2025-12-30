"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface Benefit {
  title: string;
  description: string;
}

export default function KBazzarBenefits() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/kbazzarBenefits.json");
        if (!response.ok) throw new Error("Failed to load benefits data");
        const data = await response.json();
        setBenefits(data.benefits || []);
      } catch (err: any) {
        console.error("Error loading benefits data:", err);
        setError(err.message || "Error loading data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Motion variants
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref}
      className="relative py-20 px-6 md:px-12"
      style={{
        backgroundImage:
          "url('https://kbazzar.soulsoft.in/wp-content/uploads/2025/03/6-1-1536x1249.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-white mb-12"
        >
          Benefits of{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            K-Bazzar
          </span>
        </motion.h2>

        {loading && <p className="text-white/70">Loading benefits...</p>}
        {error && <p className="text-red-400">{error}</p>}

        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/30 cursor-pointer"
              >
                <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white">
                  {benefit.title}
                </h3>
                <p className="text-white/90 text-sm md:text-base">{benefit.description}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
